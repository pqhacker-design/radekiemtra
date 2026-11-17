import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  Eye,
  Globe,
  Grid,
  ImagePlus,
  Lightbulb,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  GeoGebraAppMode,
  GeoGebraSdkSource,
  generateGeoGebraCommands,
  loadGeoGebraScript,
  normalizeGeoGebraCommand,
} from '../services/geogebraService';
import { DiagramRenderer } from './DiagramRenderer';
import { LocalGeometryBoard, LocalGeometryBoardRef } from './LocalGeometryBoard';

interface GeoGebraStudioProps {
  questionContent: string;
  solutionText: string;
  currentQuestionDiagram?: string;
  currentSolutionDiagram?: string;
  initialCommands?: string;
  initialSolutionCommands?: string;
  onInsertToQuestion: (diagramDataUrl: string, commandsText: string) => void;
  onInsertToAnswer: (diagramDataUrl: string, commandsText: string) => void;
  onClearQuestionDiagram: () => void;
  onClearSolutionDiagram: () => void;
}

const MODE_LABELS: { id: GeoGebraAppMode; label: string; desc: string }[] = [
  { id: 'geometry', label: 'Hình học 2D', desc: 'Tam giác, đường tròn, hình chiếu không gian' },
  { id: 'graphing', label: 'Đồ thị hàm số', desc: 'Hàm số, cực trị, tiệm cận, tích phân' },
  { id: 'classic', label: 'Cổ điển (Tổng hợp)', desc: 'Kết hợp đại số & hình học' },
  { id: '3d', label: 'Không gian 3D', desc: 'Hình chóp, lăng trụ, mặt cầu trực quan 3D' },
];

export const GeoGebraStudio: React.FC<GeoGebraStudioProps> = ({
  questionContent,
  solutionText,
  currentQuestionDiagram,
  currentSolutionDiagram,
  initialCommands = '',
  initialSolutionCommands = '',
  onInsertToQuestion,
  onInsertToAnswer,
  onClearQuestionDiagram,
  onClearSolutionDiagram,
}) => {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const containerDomId = `ggb-studio-${reactId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const ggbApiRef = useRef<any>(null);
  const localBoardRef = useRef<LocalGeometryBoardRef>(null);
  const pendingCommandsRef = useRef<string[] | null>(null);
  const mountedModeRef = useRef<GeoGebraAppMode | null>(null);

  const [engineMode, setEngineMode] = useState<'geogebra' | 'local'>('geogebra');
  const [sdkSource, setSdkSource] = useState<GeoGebraSdkSource>('proxy');
  const [appMode, setAppMode] = useState<GeoGebraAppMode>('geometry');
  const [aiTarget, setAiTarget] = useState<'question' | 'answer'>('question');
  const [extraInstruction, setExtraInstruction] = useState('');
  const [showExtraInput, setShowExtraInput] = useState(false);

  const [showAxes, setShowAxes] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const [commandText, setCommandText] = useState<string>(initialCommands || initialSolutionCommands || '');
  const [showCommandEditor, setShowCommandEditor] = useState(false);

  const [isLoadingSdk, setIsLoadingSdk] = useState(true);
  const [isAppletReady, setIsAppletReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  const [isAiBuilding, setIsAiBuilding] = useState(false);
  const [aiStatusMsg, setAiStatusMsg] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const isBoardReady = engineMode === 'local' || isAppletReady;

  // Sync axes/grid toggles immediately to active applet
  const syncViewSettings = (api: any, mode: GeoGebraAppMode, axes: boolean, grid: boolean) => {
    if (!api) return;
    try {
      if (mode !== '3d') {
        if (typeof api.setAxesVisible === 'function') {
          api.setAxesVisible(axes, axes);
        }
        if (typeof api.setGridVisible === 'function') {
          api.setGridVisible(grid);
        }
      }
    } catch {
      // Ignore if applet method unavailable in current perspective
    }
  };

  // Run an array of GeoGebra commands on the live applet
  const executeCommandsOnApi = (api: any, commands: string[], clearFirst = true) => {
    if (!api) return { executed: 0, failed: commands.length };

    if (clearFirst) {
      try {
        if (typeof api.newConstruction === 'function') {
          api.newConstruction();
        } else if (typeof api.reset === 'function') {
          api.reset();
        }
      } catch {
        // Fallback: delete existing objects individually
        try {
          const allObjs = api.getAllObjectNames?.() || [];
          allObjs.forEach((name: string) => api.deleteObject?.(name));
        } catch {}
      }
    }

    syncViewSettings(api, mountedModeRef.current || appMode, showAxes, showGrid);

    let executed = 0;
    let failed = 0;

    for (const rawCmd of commands) {
      const cmd = normalizeGeoGebraCommand(rawCmd);
      if (!cmd) continue;
      try {
        const ok = api.evalCommand(cmd);
        if (ok === false) {
          failed++;
        } else {
          executed++;
        }
      } catch {
        failed++;
      }
    }

    return { executed, failed };
  };

  // Load GeoGebra SDK and mount/remount applet whenever appMode, engineMode, sdkSource or reloadNonce changes
  useEffect(() => {
    if (engineMode !== 'geogebra') {
      setIsLoadingSdk(false);
      setLoadError(null);
      setIsAppletReady(false);
      ggbApiRef.current = null;
      return;
    }

    let cancelled = false;
    let appletInitTimer: ReturnType<typeof setTimeout> | null = null;

    const initApplet = async () => {
      setIsLoadingSdk(true);
      setIsAppletReady(false);
      setLoadError(null);
      ggbApiRef.current = null;

      try {
        await loadGeoGebraScript({
          preferredSource: sdkSource,
          forceReload: reloadNonce > 0,
        });
        if (cancelled) return;

        setIsLoadingSdk(false);

        const hostEl = containerRef.current;
        if (!hostEl || !window.GGBApplet) {
          throw new Error('Không tìm thấy vùng chứa GeoGebra.');
        }

        hostEl.innerHTML = '';

        const measuredWidth = hostEl.clientWidth > 320 ? Math.floor(hostEl.clientWidth) : 780;
        const appletHeight = 450;
        const uniqueAppletName = `ggbApplet_${reactId}_${reloadNonce}_${appMode}_${sdkSource}`;

        const defaultAxes = appMode === 'graphing' || appMode === 'classic' || appMode === '3d';
        const effectiveAxes = mountedModeRef.current !== appMode ? defaultAxes : showAxes;
        const effectiveGrid = mountedModeRef.current !== appMode ? appMode === 'graphing' : showGrid;

        if (mountedModeRef.current !== appMode) {
          setShowAxes(effectiveAxes);
          setShowGrid(effectiveGrid);
        }
        mountedModeRef.current = appMode;

        // Đặt giới hạn chờ tối đa 18s cho appletOnLoad để tránh xoay vòng vô hạn nếu bundle web3d bị chặn
        appletInitTimer = setTimeout(() => {
          if (!cancelled && !ggbApiRef.current) {
            setLoadError(
              'Không gian vẽ GeoGebra phản hồi quá lâu (18 giây). Bạn có thể thử nguồn khác hoặc chuyển sang "Bảng vẽ nhanh nội bộ" để vẽ hình ngay.'
            );
          }
        }, 18000);

        const ggbParams: Record<string, any> = {
          id: uniqueAppletName,
          appName: appMode,
          width: measuredWidth,
          height: appletHeight,
          showToolBar: true,
          showAlgebraInput: true,
          showMenuBar: false,
          allowStyleBar: true,
          enableRightClick: true,
          enableLabelDrags: true,
          showResetIcon: true,
          useBrowserForJS: true,
          preventFocus: true,
          language: 'vi',
          showLogging: false,
          appletOnLoad: (api: any) => {
            if (appletInitTimer) {
              clearTimeout(appletInitTimer);
              appletInitTimer = null;
            }
            if (cancelled) return;
            ggbApiRef.current = api;
            setIsAppletReady(true);
            syncViewSettings(api, appMode, effectiveAxes, effectiveGrid);

            const queued = pendingCommandsRef.current;
            if (queued && queued.length > 0) {
              pendingCommandsRef.current = null;
              const { executed, failed } = executeCommandsOnApi(api, queued, true);
              setFeedback({
                type: failed > 0 && executed === 0 ? 'error' : 'success',
                message:
                  failed > 0
                    ? `Đã dựng ${executed} đối tượng trên GeoGebra (${failed} lệnh bỏ qua). Bạn có thể kéo chỉnh trực tiếp rồi bấm "Chèn vào Đề bài" hoặc "Chèn vào Đáp án".`
                    : `Đã dựng xong ${executed} đối tượng hình học trên GeoGebra! Hãy kiểm tra và bấm "Chèn vào Đề bài" hoặc "Chèn vào Đáp án".`,
              });
            } else if (commandText.trim()) {
              const initialLines = commandText
                .split('\n')
                .map(normalizeGeoGebraCommand)
                .filter(Boolean);
              if (initialLines.length > 0) {
                executeCommandsOnApi(api, initialLines, true);
              }
            }
          },
        };

        const applet = new window.GGBApplet(ggbParams, true);
        applet.inject(hostEl);
      } catch (err: any) {
        if (appletInitTimer) {
          clearTimeout(appletInitTimer);
          appletInitTimer = null;
        }
        if (!cancelled) {
          setIsLoadingSdk(false);
          setLoadError(err?.message || 'Không thể khởi tạo trình vẽ GeoGebra.');
        }
      }
    };

    initApplet();

    return () => {
      cancelled = true;
      if (appletInitTimer) {
        clearTimeout(appletInitTimer);
        appletInitTimer = null;
      }
      ggbApiRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appMode, reloadNonce, engineMode, sdkSource]);

  const handleToggleAxes = () => {
    const next = !showAxes;
    setShowAxes(next);
    if (engineMode === 'geogebra') {
      syncViewSettings(ggbApiRef.current, appMode, next, showGrid);
    }
  };

  const handleToggleGrid = () => {
    const next = !showGrid;
    setShowGrid(next);
    if (engineMode === 'geogebra') {
      syncViewSettings(ggbApiRef.current, appMode, showAxes, next);
    }
  };

  const handleClearCanvas = () => {
    if (engineMode === 'local') {
      setCommandText('');
      setFeedback({ type: 'info', message: 'Đã làm sạch bảng vẽ.' });
      return;
    }
    if (!ggbApiRef.current) return;
    try {
      if (typeof ggbApiRef.current.newConstruction === 'function') {
        ggbApiRef.current.newConstruction();
      } else {
        ggbApiRef.current.reset?.();
      }
      syncViewSettings(ggbApiRef.current, appMode, showAxes, showGrid);
      setFeedback({ type: 'info', message: 'Đã làm sạch bảng vẽ GeoGebra.' });
    } catch {}
  };

  const handleRunManualCommands = () => {
    const lines = commandText
      .split('\n')
      .map(normalizeGeoGebraCommand)
      .filter(Boolean);

    if (lines.length === 0) {
      setFeedback({ type: 'error', message: 'Chưa có câu lệnh GeoGebra nào để chạy.' });
      return;
    }

    if (engineMode === 'local') {
      setFeedback({ type: 'success', message: `Đã dựng tức thì ${lines.length} dòng lệnh trên bảng vẽ nội bộ.` });
      return;
    }

    if (!ggbApiRef.current) {
      pendingCommandsRef.current = lines;
      setFeedback({ type: 'info', message: 'GeoGebra đang tải, lệnh sẽ tự động chạy ngay khi sẵn sàng.' });
      return;
    }

    const { executed, failed } = executeCommandsOnApi(ggbApiRef.current, lines, true);
    setFeedback({
      type: executed > 0 ? 'success' : 'error',
      message:
        failed > 0
          ? `Đã chạy ${executed} lệnh (${failed} lệnh không hợp lệ).`
          : `Đã dựng thành công ${executed} lệnh trên bảng vẽ.`,
    });
  };

  const handleAiBuildFigure = async () => {
    const sourceText = aiTarget === 'question' ? questionContent : solutionText || questionContent;
    if (!sourceText.trim()) {
      setFeedback({
        type: 'error',
        message: 'Vui lòng nhập nội dung câu hỏi (hoặc lời giải) ở tab Soạn thảo trước khi để AI dựng hình.',
      });
      return;
    }

    setIsAiBuilding(true);
    setFeedback(null);
    setAiStatusMsg('AI đang đọc đề bài và tính toán tọa độ GeoGebra...');

    try {
      const result = await generateGeoGebraCommands({
        questionContent,
        solutionText,
        target: aiTarget,
        preferredMode: appMode === '3d' ? '3d' : 'auto',
        extraInstruction: extraInstruction.trim(),
        onStatusUpdate: (msg) => setAiStatusMsg(msg),
      });

      const joinedScript = result.commands.join('\n');
      setCommandText(joinedScript);

      if (result.mode !== appMode) {
        // Switch perspective mode & run commands on load
        pendingCommandsRef.current = result.commands;
        if (result.mode === 'graphing' || result.mode === 'classic' || result.mode === '3d') {
          setShowAxes(true);
          setShowGrid(result.mode === 'graphing');
        } else {
          setShowAxes(false);
          setShowGrid(false);
        }
        setAppMode(result.mode);
        setFeedback({
          type: engineMode === 'local' ? 'success' : 'info',
          message:
            engineMode === 'local'
              ? `AI đã dựng xong trên bảng vẽ nội bộ: ${result.summary}. Hãy chỉnh góc nhìn rồi bấm "Chèn vào Đề bài" hoặc "Chèn vào Đáp án".`
              : `AI đề xuất chế độ ${result.mode.toUpperCase()} (${result.summary}). Đang nạp ${result.commands.length} lệnh lên bảng vẽ...`,
        });
      } else if (engineMode === 'local') {
        setFeedback({
          type: 'success',
          message: `AI đã dựng xong: ${result.summary}. Hãy chỉnh vị trí/góc nhìn rồi bấm "Chèn vào Đề bài" hoặc "Chèn vào Đáp án".`,
        });
      } else if (ggbApiRef.current && isAppletReady) {
        const { executed, failed } = executeCommandsOnApi(ggbApiRef.current, result.commands, true);
        setFeedback({
          type: executed > 0 ? 'success' : 'error',
          message:
            failed > 0
              ? `AI đã dựng ${executed}/${result.commands.length} đối tượng (${result.summary}). Bạn có thể chỉnh trực tiếp trên hình trước khi chèn.`
              : `AI đã dựng xong: ${result.summary}. Hãy chỉnh sửa nếu cần rồi bấm "Chèn vào Đề bài" hoặc "Chèn vào Đáp án".`,
        });
      } else {
        pendingCommandsRef.current = result.commands;
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Không thể tự dựng hình từ đề bài. Vui lòng thử lại.',
      });
    } finally {
      setIsAiBuilding(false);
      setAiStatusMsg('');
    }
  };

  /**
   * Chụp hình ảnh sắc nét (PNG Base64 Data URL) từ GeoGebra hoặc bảng vẽ nhanh nội bộ
   */
  const captureDiagramDataUrl = async (): Promise<string> => {
    if (engineMode === 'local') {
      if (!localBoardRef.current) {
        throw new Error('Bảng vẽ nội bộ chưa sẵn sàng.');
      }
      return localBoardRef.current.toDataURL();
    }

    const api = ggbApiRef.current;
    if (!api) {
      throw new Error('Bảng vẽ GeoGebra chưa sẵn sàng. Vui lòng đợi vài giây hoặc chuyển sang Bảng vẽ nhanh nội bộ.');
    }

    // 1. Ưu tiên getPNGBase64 của GeoGebra (hỗ trợ cả 2D và 3D sắc nét, scale 2x, 150 DPI)
    try {
      if (typeof api.getPNGBase64 === 'function') {
        let base64 = '';
        try {
          base64 = api.getPNGBase64(2, false, 150);
        } catch {
          base64 = api.getPNGBase64(1, false);
        }
        if (base64 && typeof base64 === 'string' && base64.length > 50) {
          return base64.startsWith('data:image/') ? base64 : `data:image/png;base64,${base64}`;
        }
      }
    } catch {}

    // 2. Fallback qua exportSVG (với bản 2D)
    try {
      if (typeof api.exportSVG === 'function') {
        const svgResult = await new Promise<string | null>((resolve) => {
          try {
            const ret = api.exportSVG((svgStr: string) => resolve(svgStr || null));
            if (typeof ret === 'string' && ret.includes('<svg')) {
              resolve(ret);
            }
            setTimeout(() => resolve(null), 1500);
          } catch {
            resolve(null);
          }
        });
        if (svgResult && svgResult.includes('<svg')) {
          return svgResult;
        }
      }
    } catch {}

    // 3. Fallback cuối cùng: chụp trực tiếp thẻ <canvas> bên trong container
    const canvas = containerRef.current?.querySelector('canvas');
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl && dataUrl.length > 100) {
          return dataUrl;
        }
      } catch {}
    }

    throw new Error('Không thể chụp ảnh từ bảng vẽ GeoGebra. Vui lòng đảm bảo trên bảng đã có đối tượng hình học.');
  };

  const handleCaptureAndInsert = async (target: 'question' | 'answer') => {
    try {
      const dataUrl = await captureDiagramDataUrl();
      if (target === 'question') {
        onInsertToQuestion(dataUrl, commandText);
        setFeedback({
          type: 'success',
          message: 'Đã chụp & chèn hình GeoGebra vào Đề bài! Nhớ bấm "Lưu thay đổi câu hỏi" để đồng bộ các mã đề và xuất Word/PDF.',
        });
      } else {
        onInsertToAnswer(dataUrl, commandText);
        setFeedback({
          type: 'success',
          message: 'Đã chụp & chèn hình GeoGebra vào Đáp án / Lời giải! Nhớ bấm "Lưu thay đổi câu hỏi" để đồng bộ các mã đề và xuất Word/PDF.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Lỗi khi chụp hình từ GeoGebra.',
      });
    }
  };

  const handleLoadCommandsIntoCanvas = (script: string, label: string) => {
    if (!script.trim()) {
      setFeedback({ type: 'info', message: `Chưa có mã lệnh GeoGebra lưu cho ${label}.` });
      return;
    }
    setCommandText(script);
    const lines = script.split('\n').map(normalizeGeoGebraCommand).filter(Boolean);
    if (engineMode === 'local') {
      setFeedback({ type: 'success', message: `Đã nạp lại lệnh vẽ từ ${label} lên bảng vẽ nội bộ.` });
    } else if (ggbApiRef.current && isAppletReady) {
      executeCommandsOnApi(ggbApiRef.current, lines, true);
      setFeedback({ type: 'success', message: `Đã nạp lại lệnh vẽ từ ${label} lên bảng GeoGebra.` });
    }
  };

  return (
    <div className="space-y-4">
      {/* Top AI & Perspective Toolbar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50/70 to-slate-50 dark:from-teal-950/50 dark:via-emerald-950/30 dark:to-slate-900 border border-teal-200 dark:border-teal-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                Trình Vẽ Hình Học & Đồ Thị GeoGebra Tương Tác
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Vẽ trực tiếp bằng công cụ GeoGebra hoặc để AI tự dựng hình từ nội dung câu hỏi
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Target for AI build */}
            <div className="flex bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setAiTarget('question')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  aiTarget === 'question'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Theo Đề bài
              </button>
              <button
                type="button"
                onClick={() => setAiTarget('answer')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  aiTarget === 'answer'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Theo Lời giải
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowExtraInput(!showExtraInput)}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Thêm yêu cầu chi tiết cho AI khi dựng hình"
            >
              {showExtraInput ? 'Ẩn ghi chú AI' : '+ Ghi chú AI'}
            </button>

            <button
              type="button"
              onClick={handleAiBuildFigure}
              disabled={isAiBuilding}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20 flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-60 active:scale-95"
            >
              {isAiBuilding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isAiBuilding ? 'AI đang dựng hình...' : 'AI tự dựng hình từ đề bài'}</span>
            </button>
          </div>
        </div>

        {showExtraInput && (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={extraInstruction}
              onChange={(e) => setExtraInstruction(e.target.value)}
              placeholder="Ví dụ: Vẽ thêm đường cao AH nét đứt màu đỏ, ký hiệu góc vuông tại H, ẩn tên đoạn thẳng..."
              className="flex-1 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}

        {isAiBuilding && aiStatusMsg && (
          <div className="text-[11px] font-semibold text-teal-800 dark:text-teal-300 flex items-center space-x-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            <span>{aiStatusMsg}</span>
          </div>
        )}

        {/* Mode, Engine Switcher & Canvas Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-teal-200/70 dark:border-teal-800/70">
          <div className="flex flex-wrap items-center gap-1">
            {MODE_LABELS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setAppMode(m.id)}
                title={m.desc}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  appMode === m.id
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            {/* Engine switcher: GeoGebra Web vs Instant Local Board */}
            <div className="flex bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setEngineMode('geogebra')}
                className={`px-2 py-0.5 rounded-md flex items-center space-x-1 transition-all cursor-pointer ${
                  engineMode === 'geogebra'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Dùng bộ công cụ GeoGebra Web đầy đủ (tải qua proxy máy chủ)"
              >
                <Globe className="w-3 h-3" />
                <span>GeoGebra Web</span>
              </button>
              <button
                type="button"
                onClick={() => setEngineMode('local')}
                className={`px-2 py-0.5 rounded-md flex items-center space-x-1 transition-all cursor-pointer ${
                  engineMode === 'local'
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Bảng vẽ nhanh nội bộ 0ms, hoạt động ngay cả khi GeoGebra.org bị chặn"
              >
                <Cpu className="w-3 h-3" />
                <span>Bảng vẽ nhanh (0ms)</span>
              </button>
            </div>

            {appMode !== '3d' && (
              <>
                <button
                  type="button"
                  onClick={handleToggleAxes}
                  className={`px-2.5 py-1 rounded-lg border flex items-center space-x-1 cursor-pointer transition-colors ${
                    showAxes
                      ? 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-700'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Trục Oxy</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleGrid}
                  className={`px-2.5 py-1 rounded-lg border flex items-center space-x-1 cursor-pointer transition-colors ${
                    showGrid
                      ? 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-700'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Grid className="w-3 h-3" />
                  <span>Lưới</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setShowCommandEditor(!showCommandEditor)}
              className={`px-2.5 py-1 rounded-lg border flex items-center space-x-1 cursor-pointer transition-colors ${
                showCommandEditor
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Mã lệnh GeoGebra</span>
            </button>

            <button
              type="button"
              onClick={handleClearCanvas}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 flex items-center space-x-1 cursor-pointer transition-colors"
              title="Xóa trắng bảng vẽ hiện tại"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : feedback.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
              : 'bg-teal-50 dark:bg-teal-950/50 border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span className="flex-1">{feedback.message}</span>
        </div>
      )}

      {/* Collapsible GeoGebra Command Script Editor */}
      {showCommandEditor && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Danh sách câu lệnh GeoGebra (Mỗi dòng một lệnh chuẩn tiếng Anh):
            </label>
            <button
              type="button"
              onClick={handleRunManualCommands}
              className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>Chạy lệnh trên bảng vẽ</span>
            </button>
          </div>
          <textarea
            rows={5}
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder={`A = (0, 0)\nB = (4, 0)\nC = (1.5, 3)\nPolygon(A, B, C)\nH = Intersect(PerpendicularLine(C, Line(A, B)), Line(A, B))\nsCH = Segment(C, H)\nSetLineStyle(sCH, 1)`}
            className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2.5 font-mono text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      {/* Canvas Host: GeoGebra Web OR Fast Local Geometry Board */}
      <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-white overflow-hidden min-h-[455px]">
        {engineMode === 'local' ? (
          <LocalGeometryBoard
            ref={localBoardRef}
            commandsText={commandText}
            appMode={appMode}
            showAxes={showAxes}
            showGrid={showGrid}
          />
        ) : (
          <>
            {(isLoadingSdk || (!isAppletReady && !loadError)) && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/95 dark:bg-slate-950/95 text-center p-6 space-y-3">
                <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isLoadingSdk ? 'Đang tải trình vẽ GeoGebra...' : 'Đang khởi tạo không gian vẽ hình...'}
                </div>
                <p className="text-xs text-slate-500 max-w-md">
                  Đang nạp công cụ GeoGebra qua {sdkSource === 'proxy' ? 'máy chủ nội bộ' : 'CDN chính thức'}. Nếu mạng chậm, bạn có thể chuyển sang bảng vẽ nhanh nội bộ ngay bên dưới.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEngineMode('local')}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Dùng bảng vẽ nhanh nội bộ (0ms)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSdkSource((prev) => (prev === 'proxy' ? 'cdn' : 'proxy'));
                      setReloadNonce((n) => n + 1);
                    }}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    {sdkSource === 'proxy' ? 'Thử nguồn CDN trực tiếp' : 'Thử nguồn Proxy nội bộ'}
                  </button>
                </div>
              </div>
            )}

            {loadError && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-rose-50/95 dark:bg-slate-950/95 text-center p-6 space-y-3">
                <AlertCircle className="w-10 h-10 text-rose-500" />
                <div className="text-sm font-bold text-rose-800 dark:text-rose-300">
                  Không thể nạp trình vẽ GeoGebra Web
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">{loadError}</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEngineMode('local')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Chuyển sang Bảng vẽ nhanh nội bộ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReloadNonce((n) => n + 1)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Thử tải lại GeoGebra</span>
                  </button>
                </div>
              </div>
            )}

            <div id={containerDomId} ref={containerRef} className="w-full min-h-[450px]" />
          </>
        )}
      </div>

      {/* Primary Insert Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Chỉnh góc nhìn, nhãn điểm vừa ý rồi chọn chèn hình vào <strong>Đề bài</strong> hoặc <strong>Đáp án</strong>:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!isBoardReady}
            onClick={() => handleCaptureAndInsert('question')}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <ImagePlus className="w-4 h-4" />
            <span>Chèn vào Đề bài</span>
          </button>

          <button
            type="button"
            disabled={!isBoardReady}
            onClick={() => handleCaptureAndInsert('answer')}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Chèn vào Đáp án</span>
          </button>
        </div>
      </div>

      {/* Attached Diagram Previews (Question & Answer) */}
      {(currentQuestionDiagram || currentSolutionDiagram) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestionDiagram && (
            <div className="p-3 rounded-2xl border border-teal-200 dark:border-teal-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-teal-800 dark:text-teal-300 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hình đã gắn vào Đề bài</span>
                </span>
                <div className="flex items-center space-x-1.5">
                  {initialCommands && (
                    <button
                      type="button"
                      onClick={() => handleLoadCommandsIntoCanvas(initialCommands, 'Đề bài')}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:bg-teal-100 cursor-pointer"
                    >
                      Nạp lại lệnh
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClearQuestionDiagram}
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Gỡ hình</span>
                  </button>
                </div>
              </div>
              <DiagramRenderer diagram={currentQuestionDiagram} alt="Hình đề bài" imageClassName="max-h-48" />
            </div>
          )}

          {currentSolutionDiagram && (
            <div className="p-3 rounded-2xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hình đã gắn vào Đáp án / Lời giải</span>
                </span>
                <div className="flex items-center space-x-1.5">
                  {initialSolutionCommands && (
                    <button
                      type="button"
                      onClick={() => handleLoadCommandsIntoCanvas(initialSolutionCommands, 'Đáp án')}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-100 cursor-pointer"
                    >
                      Nạp lại lệnh
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClearSolutionDiagram}
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Gỡ hình</span>
                  </button>
                </div>
              </div>
              <DiagramRenderer diagram={currentSolutionDiagram} alt="Hình đáp án" imageClassName="max-h-48" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
