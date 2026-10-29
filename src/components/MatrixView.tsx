import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Download,
  Edit3,
  Grid,
  Layers,
  Minus,
  Percent,
  Plus,
  RotateCcw,
  Save,
  Sliders,
  Sparkles,
  Square,
  Trash2,
  Wand2,
  X,
} from 'lucide-react';
import { CognitiveBreakdown, ExamPackage, MatrixRow, calculateExamScores } from '../types';
import { MathText } from './MathText';

const ensureBreakdown = (cb?: Partial<CognitiveBreakdown>): CognitiveBreakdown => ({
  remember: cb?.remember ?? '',
  understand: cb?.understand ?? '',
  apply: cb?.apply ?? '',
  ...(cb?.advanced !== undefined ? { advanced: cb.advanced } : {}),
});

interface MatrixViewProps {
  examPackage: ExamPackage | null;
  onUpdateMatrix?: (updatedMatrix: MatrixRow[]) => void;
  onExportWord?: () => void;
  onExportExcel?: () => void;
}

type PartKey = 'part1' | 'part2' | 'part3' | 'part4';
type LevelKey = 'remember' | 'understand' | 'apply';
type BulkUpdateAction =
  | 'set_count'
  | 'adjust_count'
  | 'set_cognitive_level'
  | 'cognitive_preset'
  | 'clear_cells';

export const MatrixView: React.FC<MatrixViewProps> = ({
  examPackage,
  onUpdateMatrix,
  onExportWord,
  onExportExcel,
}) => {
  if (!examPackage) {
    return (
      <div className="max-w-5xl mx-auto p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <Grid className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Chưa Có Dữ Liệu Ma Trận Đề Kiểm Tra
        </h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Vui lòng vào mục "Tạo đề kiểm tra" để hệ thống AI sinh Ma trận đề chuẩn Công văn 7991/BGDĐT.
        </p>
      </div>
    );
  }

  const { metadata, matrix } = examPackage;
  const [isEditing, setIsEditing] = useState(false);
  const [editableMatrix, setEditableMatrix] = useState<MatrixRow[]>(matrix);
  const [originalMatrix, setOriginalMatrix] = useState<MatrixRow[]>(matrix);

  // Sync state if exam package prop changes
  useEffect(() => {
    setEditableMatrix(matrix);
    setOriginalMatrix(matrix);
    setSelectedRowStts([]);
  }, [matrix]);

  // Bulk update states
  const [selectedRowStts, setSelectedRowStts] = useState<number[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal configuration states
  const [bulkScope, setBulkScope] = useState<'selected' | 'all'>('selected');
  const [bulkParts, setBulkParts] = useState<Record<PartKey, boolean>>({
    part1: true,
    part2: true,
    part3: true,
    part4: true,
  });
  const [bulkLevels, setBulkLevels] = useState<Record<LevelKey, boolean>>({
    remember: true,
    understand: true,
    apply: true,
  });
  const [bulkAction, setBulkAction] = useState<BulkUpdateAction>('set_count');

  // Parameters for specific bulk actions
  const [targetCount, setTargetCount] = useState<number>(1);
  const [adjustDelta, setAdjustDelta] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<LevelKey>('remember');
  const [cognitivePreset, setCognitivePreset] = useState<'4_3_3' | '5_3_2' | '3_4_3' | '4_3_2_1'>('4_3_3');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const getCellStr = (part: any, field: string): string => {
    if (!part || part[field] === undefined || part[field] === null || part[field] === 0 || part[field] === '0') return '';
    return String(part[field]);
  };

  const getCellCount = (val: any): number => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const str = String(val).trim();
    if (!str || str === '-') return 0;

    // Tách các mục phân cách bởi dấu phẩy, chấm phẩy hoặc xuống dòng
    const tokens = str.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    if (tokens.length === 0) return 0;

    let count = 0;
    for (const token of tokens) {
      // Nếu có dạng khoảng câu như "1-3", "1 - 3", "1 đến 3"
      const rangeMatch = token.match(/^(\d+)\s*[-–—đến\s]\s*(\d+)$/i);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1], 10);
        const end = parseInt(rangeMatch[2], 10);
        if (end >= start) {
          count += (end - start + 1);
          continue;
        }
      }

      // Nếu có chữ "câu" hoặc "ý" kèm số, ví dụ "3 câu", "4 ý"
      const wordMatch = token.match(/^(\d+)\s*(?:câu|ý)/i);
      if (wordMatch) {
        count += parseInt(wordMatch[1], 10);
        continue;
      }

      // Trong ma trận chuẩn Công văn 7991, mỗi phần tử được liệt kê (ví dụ "1", "3", "4", "1a", "2b", "Câu 3")
      // chính là MỘT câu hỏi hoặc MỘT lệnh hỏi/ý đánh giá cụ thể
      count += 1;
    }
    return count;
  };

  // Helper to recompute row totals and point weights
  const recalculateRow = (row: MatrixRow): MatrixRow => {
    const p1_rem = getCellCount(row.part1?.remember);
    const p1_und = getCellCount(row.part1?.understand);
    const p1_app = getCellCount(row.part1?.apply) + getCellCount(row.part1?.advanced);

    const p2_rem = getCellCount(row.part2?.remember);
    const p2_und = getCellCount(row.part2?.understand);
    const p2_app = getCellCount(row.part2?.apply) + getCellCount(row.part2?.advanced);

    const p3_rem = getCellCount(row.part3?.remember);
    const p3_und = getCellCount(row.part3?.understand);
    const p3_app = getCellCount(row.part3?.apply) + getCellCount(row.part3?.advanced);

    const p4_rem = getCellCount(row.part4?.remember);
    const p4_und = getCellCount(row.part4?.understand);
    const p4_app = getCellCount(row.part4?.apply) + getCellCount(row.part4?.advanced);

    const totalRemember = p1_rem + p2_rem + p3_rem + p4_rem;
    const totalUnderstand = p1_und + p2_und + p3_und + p4_und;
    const totalApply = p1_app + p2_app + p3_app + p4_app;

    const p1Pts = metadata.questionCounts?.part1_PointsPerQuestion ?? 0.25;
    const p2Statements = metadata.questionCounts?.part2_TFStatementsPerQuestion ?? 4;
    const p2Pts = metadata.questionCounts?.part2_PointsPerQuestion ?? 1.0;
    const p2ItemPts = p2Statements > 0 ? p2Pts / p2Statements : 0.25;
    const p3Pts = metadata.questionCounts?.part3_PointsPerQuestion ?? 0.5;

    // Tính điểm tự luận theo câu hỏi thực tế trong đề hoặc cấu hình
    const examQuestions = examPackage.exams?.[0]?.questions || [];
    const essayQuestions = examQuestions.filter((q) => q.partType === 'PART4');
    const examP4Score = essayQuestions.reduce((s, q) => s + (q.points || 0), 0);
    const configuredScores = calculateExamScores(metadata.questionCounts || ({} as any));
    const targetPart4Score = examP4Score > 0 ? examP4Score : (configuredScores.part4Score || 3.0);
    const targetPart4Count = metadata.questionCounts?.part4_Essay || essayQuestions.length || 3;
    const p4Pts = targetPart4Count > 0 ? Math.round((targetPart4Score / targetPart4Count) * 100) / 100 : 1.0;

    const p1Points = (p1_rem + p1_und + p1_app) * p1Pts;
    const p2Points = (p2_rem + p2_und + p2_app) * p2ItemPts;
    const p3Points = (p3_rem + p3_und + p3_app) * p3Pts;
    const p4Points = (p4_rem + p4_und + p4_app) * p4Pts;

    const totalPoints = Math.round((p1Points + p2Points + p3Points + p4Points) * 100) / 100;
    const totalQuestions = totalRemember + totalUnderstand + totalApply;

    // Tỉ lệ % điểm theo chuẩn Công văn 7991: tính chính xác theo số điểm của dòng trên tổng điểm đề thi (10.0đ)
    const examTotalPoints = metadata.totalPoints || 10.0;
    const percentage = Math.round((totalPoints / examTotalPoints) * 1000) / 10;

    return {
      ...row,
      totalRemember,
      totalUnderstand,
      totalApply,
      totalQuestions,
      totalPoints,
      percentage: totalPoints > 0 ? percentage : (row.percentage || 0),
    };
  };

  const handleCellChange = (stt: number, field: string, value: any) => {
    setEditableMatrix((prev) =>
      prev.map((row) => {
        if (row.stt !== stt) return row;
        const updated = { ...row, [field]: value };
        return recalculateRow(updated);
      })
    );
  };

  const handleNestedCellChange = (
    stt: number,
    partKey: PartKey,
    field: string,
    value: any
  ) => {
    setEditableMatrix((prev) =>
      prev.map((row) => {
        if (row.stt !== stt) return row;
        const curPart = (row as any)[partKey] || {};
        const updatedPart = {
          ...curPart,
          [field]: value,
        };
        const updated = {
          ...row,
          [partKey]: updatedPart,
        };
        return recalculateRow(updated);
      })
    );
  };

  // Row selection handlers
  const handleToggleRowSelection = (stt: number) => {
    setSelectedRowStts((prev) =>
      prev.includes(stt) ? prev.filter((s) => s !== stt) : [...prev, stt]
    );
  };

  const handleSelectAllRows = () => {
    if (selectedRowStts.length === editableMatrix.length) {
      setSelectedRowStts([]);
    } else {
      setSelectedRowStts(editableMatrix.map((r) => r.stt));
    }
  };

  // Quick batch actions from floating bar
  const handleQuickAddQuestion = (level: LevelKey, delta: number) => {
    if (selectedRowStts.length === 0) return;
    const targetStts = new Set(selectedRowStts);
    let cellsUpdated = 0;

    setEditableMatrix((prev) =>
      prev.map((row) => {
        if (!targetStts.has(row.stt)) return row;

        const curPart1 = ensureBreakdown(row.part1);
        const currentCount = getCellCount(curPart1[level]);
        const newCount = Math.max(0, currentCount + delta);
        (curPart1 as any)[level] = newCount > 0 ? newCount : '';
        cellsUpdated++;

        return recalculateRow({
          ...row,
          part1: curPart1,
        });
      })
    );

    showToast(`Đã ${delta > 0 ? 'tăng' : 'giảm'} ${Math.abs(delta)} câu mức ${level === 'remember' ? 'Nhận biết' : level === 'understand' ? 'Thông hiểu' : 'Vận dụng'} cho ${selectedRowStts.length} chương đã chọn.`);
  };

  const handleQuickSetZero = () => {
    if (selectedRowStts.length === 0) return;
    const targetStts = new Set(selectedRowStts);

    setEditableMatrix((prev) =>
      prev.map((row) => {
        if (!targetStts.has(row.stt)) return row;
        return recalculateRow({
          ...row,
          part1: { remember: '', understand: '', apply: '' },
          part2: { remember: '', understand: '', apply: '' },
          part3: { remember: '', understand: '', apply: '' },
          part4: { remember: '', understand: '', apply: '' },
        });
      })
    );

    showToast(`Đã xóa số câu hỏi về 0 cho ${selectedRowStts.length} chương đã chọn.`);
  };


  // Comprehensive bulk update executor from modal
  const handleApplyBulkUpdate = () => {
    const effectiveScope = bulkScope === 'selected' && selectedRowStts.length > 0
      ? new Set(selectedRowStts)
      : new Set(editableMatrix.map((r) => r.stt));

    const activeParts = (Object.keys(bulkParts) as PartKey[]).filter((p) => bulkParts[p]);
    const activeLevels = (Object.keys(bulkLevels) as LevelKey[]).filter((l) => bulkLevels[l]);

    if (effectiveScope.size === 0) {
      showToast('Vui lòng chọn ít nhất một chương hoặc chọn phạm vi "Tất cả các chương".');
      return;
    }

    let updatedCellsCount = 0;

    setEditableMatrix((prev) => {
      const updated = prev.map((row) => {
        if (!effectiveScope.has(row.stt)) return row;

        let newRow = { ...row };

        // 1. Set specific question count
        if (bulkAction === 'set_count') {
          activeParts.forEach((part) => {
            const partObj = ensureBreakdown(newRow[part]);
            activeLevels.forEach((lvl) => {
              (partObj as any)[lvl] = targetCount > 0 ? targetCount : '';
              updatedCellsCount++;
            });
            newRow[part] = partObj;
          });
        }

        // 2. Adjust count (+/-)
        else if (bulkAction === 'adjust_count') {
          activeParts.forEach((part) => {
            const partObj = ensureBreakdown(newRow[part]);
            activeLevels.forEach((lvl) => {
              const current = getCellCount(partObj[lvl]);
              const nextVal = Math.max(0, current + adjustDelta);
              (partObj as any)[lvl] = nextVal > 0 ? nextVal : '';
              updatedCellsCount++;
            });
            newRow[part] = partObj;
          });
        }

        // 3. Set consistent cognitive level (consolidate count to targetLevel)
        else if (bulkAction === 'set_cognitive_level') {
          activeParts.forEach((part) => {
            const partObj = ensureBreakdown(newRow[part]);
            // sum existing counts in this part
            const totalInPart =
              getCellCount(partObj.remember) +
              getCellCount(partObj.understand) +
              getCellCount(partObj.apply);
            const countToAssign = totalInPart > 0 ? totalInPart : (targetCount || 1);

            partObj.remember = '';
            partObj.understand = '';
            partObj.apply = '';
            (partObj as any)[targetLevel] = countToAssign;
            updatedCellsCount += 3;
            newRow[part] = partObj;
          });
        }


        // 6. Preset cognitive distribution (e.g. 40-30-30)
        else if (bulkAction === 'cognitive_preset') {
          let remCount = 1;
          let undCount = 1;
          let appCount = 1;

          if (cognitivePreset === '4_3_3') {
            remCount = 2;
            undCount = 1;
            appCount = 1;
          } else if (cognitivePreset === '5_3_2') {
            remCount = 3;
            undCount = 2;
            appCount = 1;
          } else if (cognitivePreset === '3_4_3') {
            remCount = 1;
            undCount = 2;
            appCount = 1;
          } else if (cognitivePreset === '4_3_2_1') {
            remCount = 2;
            undCount = 1;
            appCount = 1;
          }

          activeParts.forEach((part) => {
            const partObj = ensureBreakdown(newRow[part]);
            if (activeLevels.includes('remember')) partObj.remember = remCount;
            if (activeLevels.includes('understand')) partObj.understand = undCount;
            if (activeLevels.includes('apply')) partObj.apply = appCount;
            updatedCellsCount += 3;
            newRow[part] = partObj;
          });
        }

        // 7. Clear cells
        else if (bulkAction === 'clear_cells') {
          activeParts.forEach((part) => {
            const partObj = ensureBreakdown(newRow[part]);
            activeLevels.forEach((lvl) => {
              (partObj as any)[lvl] = '';
              updatedCellsCount++;
            });
            newRow[part] = partObj;
          });
        }

        return recalculateRow(newRow);
      });

      return updated;
    });

    setIsBulkModalOpen(false);
    showToast(`Đã cập nhật hàng loạt thành công cho ${effectiveScope.size} chương (${updatedCellsCount} ô ma trận đã được xử lý)!`);
  };

  const handleResetToOriginal = () => {
    setEditableMatrix(originalMatrix);
    showToast('Đã khôi phục ma trận về trạng thái ban đầu.');
  };

  const handleSave = () => {
    if (onUpdateMatrix) {
      onUpdateMatrix(editableMatrix);
    }
    setOriginalMatrix(editableMatrix);
    setIsEditing(false);
    showToast('Đã lưu thành công các thay đổi trong Ma trận đề kiểm tra!');
  };

  // Tính toán tổng số câu ở từng cột cho Footer
  const p1_rem_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part1?.remember), 0);
  const p1_und_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part1?.understand), 0);
  const p1_app_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part1?.apply) + getCellCount(b.part1?.advanced), 0);

  const p2_rem_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part2?.remember), 0);
  const p2_und_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part2?.understand), 0);
  const p2_app_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part2?.apply) + getCellCount(b.part2?.advanced), 0);

  const p3_rem_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part3?.remember), 0);
  const p3_und_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part3?.understand), 0);
  const p3_app_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part3?.apply) + getCellCount(b.part3?.advanced), 0);

  const p4_rem_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part4?.remember), 0);
  const p4_und_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part4?.understand), 0);
  const p4_app_sum = editableMatrix.reduce((a, b) => a + getCellCount(b.part4?.apply) + getCellCount(b.part4?.advanced), 0);

  const sum_rem = p1_rem_sum + p2_rem_sum + p3_rem_sum + p4_rem_sum;
  const sum_und = p1_und_sum + p2_und_sum + p3_und_sum + p4_und_sum;
  const sum_app = p1_app_sum + p2_app_sum + p3_app_sum + p4_app_sum;

  const total_items = sum_rem + sum_und + sum_app;
  const totalQuestions =
    (examPackage.exams[0]?.questions?.length) ||
    editableMatrix.reduce((a, b) => a + Number(b.totalQuestions || 0), 0) ||
    (p1_rem_sum + p1_und_sum + p1_app_sum + (p2_rem_sum + p2_und_sum + p2_app_sum > 0 ? Math.ceil((p2_rem_sum + p2_und_sum + p2_app_sum) / 4) : 0) + (p3_rem_sum + p3_und_sum + p3_app_sum) + (p4_rem_sum + p4_und_sum + p4_app_sum));

  // Điểm số các phần
  const examQuestions = examPackage.exams?.[0]?.questions || [];
  const examP1Pts = examQuestions.filter((q) => q.partType === 'PART1').reduce((s, q) => s + (q.points || 0), 0);
  const examP2Pts = examQuestions.filter((q) => q.partType === 'PART2').reduce((s, q) => s + (q.points || 0), 0);
  const examP3Pts = examQuestions.filter((q) => q.partType === 'PART3').reduce((s, q) => s + (q.points || 0), 0);
  const examP4Pts = examQuestions.filter((q) => q.partType === 'PART4').reduce((s, q) => s + (q.points || 0), 0);

  const configuredScores = calculateExamScores(metadata.questionCounts || ({} as any));

  const p1PtsPerQ = metadata.questionCounts?.part1_PointsPerQuestion ?? 0.25;
  const p1TotalPoints =
    Math.round((p1_rem_sum + p1_und_sum + p1_app_sum) * p1PtsPerQ * 100) / 100 ||
    examP1Pts ||
    configuredScores.part1Score ||
    3.0;

  const p2StatementsPerQ = metadata.questionCounts?.part2_TFStatementsPerQuestion ?? 4;
  const p2StatementsCount = p2_rem_sum + p2_und_sum + p2_app_sum;
  const p2QuestionsCount = Math.max(p2StatementsCount > 0 ? 1 : 0, Math.round(p2StatementsCount / p2StatementsPerQ));
  const p2PtsPerQ = metadata.questionCounts?.part2_PointsPerQuestion ?? 1.0;
  const p2TotalPoints =
    Math.round(p2QuestionsCount * p2PtsPerQ * 100) / 100 ||
    examP2Pts ||
    configuredScores.part2Score ||
    2.0;

  const p3TotalQuestionsCount = p3_rem_sum + p3_und_sum + p3_app_sum;
  const p3PtsPerQ = metadata.questionCounts?.part3_PointsPerQuestion ?? (examP3Pts > 0 && p3TotalQuestionsCount > 0 ? Math.round((examP3Pts / p3TotalQuestionsCount) * 100) / 100 : 0.5);
  const p3TotalPoints =
    Math.round(p3TotalQuestionsCount * p3PtsPerQ * 100) / 100 ||
    (p3TotalQuestionsCount > 0 ? (examP3Pts || configuredScores.part3Score || 2.0) : 0);

  const p4TotalQuestionsCount = p4_rem_sum + p4_und_sum + p4_app_sum;
  let p4TotalPoints = 0;
  if (p4TotalQuestionsCount > 0) {
    if (examP4Pts > 0 && p4TotalQuestionsCount === examQuestions.filter((q) => q.partType === 'PART4').length) {
      p4TotalPoints = Math.round(examP4Pts * 100) / 100;
    } else if (configuredScores.part4Score > 0 && p4TotalQuestionsCount === (metadata.questionCounts?.part4_Essay || 0)) {
      p4TotalPoints = Math.round(configuredScores.part4Score * 100) / 100;
    } else {
      p4TotalPoints = Math.max(0, Math.round((10.0 - p1TotalPoints - p2TotalPoints - p3TotalPoints) * 100) / 100);
    }
  }

  // Điểm các mức độ nhận thức
  const examRemPts = examQuestions.filter((q) => q.cognitiveLevel === 'REMEMBER').reduce((s, q) => s + (q.points || 0), 0);
  const examUndPts = examQuestions.filter((q) => q.cognitiveLevel === 'UNDERSTAND').reduce((s, q) => s + (q.points || 0), 0);
  const examAppPts = examQuestions.filter((q) => q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED').reduce((s, q) => s + (q.points || 0), 0);

  const p4ItemPts = p4TotalQuestionsCount > 0 ? p4TotalPoints / p4TotalQuestionsCount : 1.0;
  const remPoints =
    examRemPts > 0
      ? Math.round(examRemPts * 100) / 100
      : Math.round((p1_rem_sum * p1PtsPerQ + (p2_rem_sum * p2PtsPerQ / p2StatementsPerQ) + p3_rem_sum * p3PtsPerQ + p4_rem_sum * p4ItemPts) * 100) / 100 || 4.0;
  const undPoints =
    examUndPts > 0
      ? Math.round(examUndPts * 100) / 100
      : Math.round((p1_und_sum * p1PtsPerQ + (p2_und_sum * p2PtsPerQ / p2StatementsPerQ) + p3_und_sum * p3PtsPerQ + p4_und_sum * p4ItemPts) * 100) / 100 || 3.0;
  const appPoints =
    examAppPts > 0
      ? Math.round(examAppPts * 100) / 100
      : Math.max(0, Math.round((10.0 - remPoints - undPoints) * 100) / 100);

  const mcqTotalPoints = Math.round((p1TotalPoints + p2TotalPoints + p3TotalPoints) * 100) / 100;
  const mcqRatio = Math.round((mcqTotalPoints / (metadata.totalPoints || 10.0)) * 100);
  const essayRatio = 100 - mcqRatio;
  const totalPercentageSum = editableMatrix.reduce((a, b) => a + (Number(b.percentage) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-900/30 text-xs font-bold border border-emerald-400/40 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:bg-emerald-700 p-1 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Công văn 7991/BGDĐT
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {metadata.matrixOutputFormat === 'classic'
                ? 'Định dạng: Mẫu truyền thống'
                : metadata.matrixOutputFormat === 'both'
                ? 'Định dạng: Cả 2 mẫu'
                : 'Định dạng: Mẫu chuẩn 7991'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Khung Ma Trận Đề Kiểm Tra - Môn {metadata.subject} ({metadata.grade})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kỳ thi: {metadata.examTitle || 'Kiểm tra'} | Thời gian: {metadata.durationMinutes} phút | Thang điểm: 10,0 điểm | Bộ sách: {metadata.curriculum}
          </p>
          {metadata.customMatrixContext && (
            <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Đề thi &amp; Ma trận được sinh bám sát theo Khung Ma trận Tổ bộ môn cung cấp</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Nút Kích Hoạt Cập Nhật Hàng Loạt */}
          <button
            onClick={() => {
              if (selectedRowStts.length === 0) {
                setBulkScope('all');
              } else {
                setBulkScope('selected');
              }
              setIsBulkModalOpen(true);
            }}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
            title="Mở bảng công cụ gán đồng loạt số câu, mức độ nhận thức hoặc % điểm"
          >
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Cập Nhật Hàng Loạt</span>
            {selectedRowStts.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px]">
                {selectedRowStts.length}
              </span>
            )}
          </button>

          {/* Chế độ Chỉnh sửa trực tiếp */}
          {isEditing ? (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleResetToOriginal}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                title="Hủy các thay đổi và trở về ma trận gốc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Hoàn tác</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Ma Trận</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <Edit3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Chỉnh Sửa Ô</span>
            </button>
          )}

          {onExportWord && (
            <button
              onClick={onExportWord}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-teal-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Xuất Word</span>
            </button>
          )}
        </div>
      </div>

      {/* Ma Trận Table Container - Chuẩn Công văn 7991 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 overflow-x-auto relative">
        <table className="w-full text-xs text-left border-collapse border border-slate-400 dark:border-slate-700">
          <thead>
            {/* Hàng 1 */}
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center">
              {/* Checkbox select all */}
              <th rowSpan={4} className="border border-slate-400 dark:border-slate-700 p-2 w-9">
                <button
                  type="button"
                  onClick={handleSelectAllRows}
                  className="flex items-center justify-center mx-auto text-slate-600 dark:text-slate-300 hover:text-teal-600"
                  title={selectedRowStts.length === editableMatrix.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                >
                  {selectedRowStts.length === editableMatrix.length && editableMatrix.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </th>
              <th rowSpan={4} className="border border-slate-400 dark:border-slate-700 p-2 w-10">
                TT
              </th>
              <th rowSpan={4} className="border border-slate-400 dark:border-slate-700 p-2 min-w-[130px]">
                Chủ đề / Chương
              </th>
              <th rowSpan={4} className="border border-slate-400 dark:border-slate-700 p-2 min-w-[180px]">
                Nội dung / Đơn vị kiến thức
              </th>
              <th colSpan={12} className="border border-slate-400 dark:border-slate-700 p-2 bg-slate-200/80 dark:bg-slate-800 font-extrabold">
                Mức độ đánh giá
              </th>
              <th colSpan={3} rowSpan={3} className="border border-slate-400 dark:border-slate-700 p-2 bg-slate-100 dark:bg-slate-800 font-extrabold align-middle">
                Tổng
              </th>
              <th rowSpan={4} className="border border-slate-400 dark:border-slate-700 p-2 w-16">
                Tỉ lệ % điểm
              </th>
            </tr>

            {/* Hàng 2: Trắc nghiệm khách quan vs Tự luận */}
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-center text-[11px]">
              <th colSpan={9} className="border border-slate-400 dark:border-slate-700 p-1 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold">
                Trắc nghiệm khách quan ({mcqRatio}%)
              </th>
              <th colSpan={3} rowSpan={2} className="border border-slate-400 dark:border-slate-700 p-1 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold align-middle">
                Tự luận ({essayRatio}%)
              </th>
            </tr>

            {/* Hàng 3: 3 Dạng bài trắc nghiệm (Nhiều lựa chọn, Đúng-Sai, Trả lời ngắn) */}
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-center text-[11px]">
              <th colSpan={3} className="border border-slate-400 dark:border-slate-700 p-1 bg-teal-100/50 dark:bg-teal-900/30">
                Nhiều lựa chọn
              </th>
              <th colSpan={3} className="border border-slate-400 dark:border-slate-700 p-1 bg-teal-100/50 dark:bg-teal-900/30">
                Đúng – Sai
              </th>
              <th colSpan={3} className="border border-slate-400 dark:border-slate-700 p-1 bg-teal-100/50 dark:bg-teal-900/30">
                Trả lời ngắn
              </th>
            </tr>

            {/* Hàng 4: Biết - Hiểu - Vận dụng */}
            <tr className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-center text-[10px]">
              {/* Nhiều lựa chọn */}
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Biết</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Hiểu</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-12">Vận dụng</th>

              {/* Đúng - Sai */}
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Biết</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Hiểu</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-12">Vận dụng</th>

              {/* Trả lời ngắn */}
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Biết</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10">Hiểu</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-12">Vận dụng</th>

              {/* Tự luận */}
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300">Biết</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300">Hiểu</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-12 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300">Vận dụng</th>

              {/* Tổng Biết - Hiểu - Vận dụng */}
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10 bg-slate-100 dark:bg-slate-800">Biết</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-10 bg-slate-100 dark:bg-slate-800">Hiểu</th>
              <th className="border border-slate-400 dark:border-slate-700 p-1 w-12 bg-slate-100 dark:bg-slate-800">Vận dụng</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {editableMatrix.map((row) => {
              const isSelected = selectedRowStts.includes(row.stt);

              const p1_rem = getCellStr(row.part1, 'remember');
              const p1_und = getCellStr(row.part1, 'understand');
              const p1_app = getCellStr(row.part1, 'apply') || getCellStr(row.part1, 'advanced');

              const p2_rem = getCellStr(row.part2, 'remember');
              const p2_und = getCellStr(row.part2, 'understand');
              const p2_app = getCellStr(row.part2, 'apply') || getCellStr(row.part2, 'advanced');

              const p3_rem = getCellStr(row.part3, 'remember');
              const p3_und = getCellStr(row.part3, 'understand');
              const p3_app = getCellStr(row.part3, 'apply') || getCellStr(row.part3, 'advanced');

              const p4_rem = getCellStr(row.part4, 'remember');
              const p4_und = getCellStr(row.part4, 'understand');
              const p4_app = getCellStr(row.part4, 'apply') || getCellStr(row.part4, 'advanced');

              const row_rem =
                row.totalRemember !== undefined
                  ? row.totalRemember
                  : getCellCount(p1_rem) + getCellCount(p2_rem) + getCellCount(p3_rem) + getCellCount(p4_rem);

              const row_und =
                row.totalUnderstand !== undefined
                  ? row.totalUnderstand
                  : getCellCount(p1_und) + getCellCount(p2_und) + getCellCount(p3_und) + getCellCount(p4_und);

              const row_app =
                row.totalApply !== undefined
                  ? row.totalApply
                  : getCellCount(p1_app) + getCellCount(p2_app) + getCellCount(p3_app) + getCellCount(p4_app);

              const renderCell = (partKey: PartKey, field: string, val: string) => {
                if (isEditing) {
                  return (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleNestedCellChange(row.stt, partKey, field, e.target.value)}
                      className="w-full bg-amber-50 dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-center text-xs p-1 rounded-xs focus:ring-1 focus:ring-amber-500"
                    />
                  );
                }
                return val ? (
                  <span className="font-semibold text-slate-900 dark:text-white">{val}</span>
                ) : (
                  <span className="text-slate-300 dark:text-slate-600">-</span>
                );
              };

              return (
                <tr
                  key={row.stt}
                  className={`text-center transition-colors ${
                    isSelected
                      ? 'bg-teal-50/70 dark:bg-teal-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {/* Row Checkbox */}
                  <td className="border border-slate-300 dark:border-slate-700 p-2">
                    <button
                      type="button"
                      onClick={() => handleToggleRowSelection(row.stt)}
                      className="flex items-center justify-center mx-auto text-slate-500 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </td>

                  {/* TT */}
                  <td className="border border-slate-300 dark:border-slate-700 p-2 font-bold text-slate-800 dark:text-slate-200">
                    {row.stt}
                  </td>

                  {/* Chủ đề / Chương */}
                  <td className="border border-slate-300 dark:border-slate-700 p-2 text-left font-semibold text-slate-900 dark:text-white">
                    {isEditing ? (
                      <input
                        type="text"
                        value={row.topic}
                        onChange={(e) => handleCellChange(row.stt, 'topic', e.target.value)}
                        className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-xs text-xs"
                      />
                    ) : (
                      <MathText content={row.topic} />
                    )}
                  </td>

                  {/* Nội dung / Đơn vị kiến thức */}
                  <td className="border border-slate-300 dark:border-slate-700 p-2 text-left text-slate-700 dark:text-slate-300">
                    {isEditing ? (
                      <input
                        type="text"
                        value={row.subTopic}
                        onChange={(e) => handleCellChange(row.stt, 'subTopic', e.target.value)}
                        className="w-full bg-amber-50 dark:bg-slate-800 border p-1 rounded-xs text-xs"
                      />
                    ) : (
                      <MathText content={row.subTopic} />
                    )}
                  </td>

                  {/* Nhiều lựa chọn */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part1', 'remember', p1_rem)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part1', 'understand', p1_und)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part1', 'apply', p1_app)}</td>

                  {/* Đúng - Sai */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part2', 'remember', p2_rem)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part2', 'understand', p2_und)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part2', 'apply', p2_app)}</td>

                  {/* Trả lời ngắn */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part3', 'remember', p3_rem)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part3', 'understand', p3_und)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part3', 'apply', p3_app)}</td>

                  {/* Tự luận */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part4', 'remember', p4_rem)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part4', 'understand', p4_und)}</td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5">{renderCell('part4', 'apply', p4_app)}</td>

                  {/* Tổng: Biết - Hiểu - Vận dụng */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5 font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200">
                    {row_rem || 0}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5 font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200">
                    {row_und || 0}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5 font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200">
                    {row_app || 0}
                  </td>

                  {/* Tỉ lệ % điểm */}
                  <td className="border border-slate-300 dark:border-slate-700 p-1.5 font-bold text-teal-700 dark:text-teal-400">
                    {isEditing ? (
                      <div className="flex items-center justify-center space-x-0.5">
                        <input
                          type="number"
                          value={row.percentage || 0}
                          onChange={(e) => handleCellChange(row.stt, 'percentage', Number(e.target.value))}
                          className="w-12 bg-amber-50 dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-center text-xs p-1 rounded-xs"
                        />
                        <span>%</span>
                      </div>
                    ) : (
                      <span>{row.percentage ? `${row.percentage}%` : '-'}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Footer Tổng kết chuẩn 7991 */}
          <tfoot>
            {/* Hàng 1: Tổng số câu */}
            <tr className="bg-slate-100 dark:bg-slate-800 font-extrabold text-center text-slate-900 dark:text-white text-xs">
              <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-left font-bold">
                Tổng số câu / ý hỏi
              </td>
              {/* Nhiều lựa chọn */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p1_rem_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p1_und_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p1_app_sum}</td>

              {/* Đúng – Sai */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p2_rem_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p2_und_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p2_app_sum}</td>

              {/* Trả lời ngắn */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p3_rem_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p3_und_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p3_app_sum}</td>

              {/* Tự luận */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p4_rem_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p4_und_sum}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5">{p4_app_sum}</td>

              {/* Tổng Biết - Hiểu - Vận dụng */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">{sum_rem}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">{sum_und}</td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">{sum_app}</td>

              {/* Tổng câu / ý */}
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-center font-black text-teal-800 dark:text-teal-300">
                {total_items} ý ({totalQuestions} câu)
              </td>
            </tr>

            {/* Hàng 2: Tổng số điểm */}
            <tr className="bg-slate-50 dark:bg-slate-900 font-extrabold text-center text-slate-900 dark:text-white text-xs">
              <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-left font-bold">
                Tổng số điểm
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 font-bold text-teal-700 dark:text-teal-400">
                {p1TotalPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 font-bold text-teal-700 dark:text-teal-400">
                {p2TotalPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 font-bold text-teal-700 dark:text-teal-400">
                {p3TotalPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                {p4TotalPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-100 dark:bg-slate-800">
                {remPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-100 dark:bg-slate-800">
                {undPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-100 dark:bg-slate-800">
                {appPoints.toFixed(1).replace('.', ',')} điểm
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 text-center font-black text-red-600 dark:text-red-400">
                10,0 điểm
              </td>
            </tr>

            {/* Hàng 3: Tỉ lệ % */}
            <tr className="bg-slate-100 dark:bg-slate-800 font-extrabold text-center text-slate-900 dark:text-white text-xs">
              <td colSpan={4} className="border border-slate-400 dark:border-slate-600 p-2 text-left font-bold">
                Tỉ lệ % điểm
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5">
                {Math.round((p1TotalPoints / 10) * 100)}%
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5">
                {Math.round((p2TotalPoints / 10) * 100)}%
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5">
                {Math.round((p3TotalPoints / 10) * 100)}%
              </td>
              <td colSpan={3} className="border border-slate-400 dark:border-slate-600 p-1.5">
                {Math.round((p4TotalPoints / 10) * 100)}%
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">
                {Math.round((remPoints / 10) * 100)}%
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">
                {Math.round((undPoints / 10) * 100)}%
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 bg-slate-200 dark:bg-slate-700">
                {Math.round((appPoints / 10) * 100)}%
              </td>
              <td className="border border-slate-400 dark:border-slate-600 p-1.5 font-black text-teal-800 dark:text-teal-300">
                {totalPercentageSum}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Floating Action Bar when rows are selected */}
      {selectedRowStts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 dark:bg-slate-800/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center space-x-2 border-r border-slate-700 pr-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">
              Đã chọn <strong className="text-teal-400">{selectedRowStts.length}</strong> / {editableMatrix.length} chương
            </span>
          </div>

          {/* Nút mở Modal Cập nhật chi tiết */}
          <button
            onClick={() => {
              setBulkScope('selected');
              setIsBulkModalOpen(true);
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Cập nhật hàng loạt...</span>
          </button>

          {/* Quick Buttons */}
          <div className="flex items-center space-x-1.5 border-l border-slate-700 pl-3">
            <button
              onClick={() => handleQuickAddQuestion('remember', 1)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-slate-200 hover:text-white transition-all flex items-center space-x-1"
              title="Cộng 1 câu Biết vào trắc nghiệm cho các chương đã chọn"
            >
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>+1 Biết</span>
            </button>

            <button
              onClick={() => handleQuickAddQuestion('understand', 1)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-slate-200 hover:text-white transition-all flex items-center space-x-1"
              title="Cộng 1 câu Hiểu vào trắc nghiệm cho các chương đã chọn"
            >
              <Plus className="w-3 h-3 text-cyan-400" />
              <span>+1 Hiểu</span>
            </button>

            <button
              onClick={() => handleQuickAddQuestion('apply', 1)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-slate-200 hover:text-white transition-all flex items-center space-x-1"
              title="Cộng 1 câu Vận dụng vào trắc nghiệm cho các chương đã chọn"
            >
              <Plus className="w-3 h-3 text-indigo-400" />
              <span>+1 Vận dụng</span>
            </button>

            <button
              onClick={handleQuickSetZero}
              className="px-2.5 py-1.5 bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs font-medium rounded-lg transition-all flex items-center space-x-1"
              title="Đặt toàn bộ số câu của các chương đã chọn về 0"
            >
              <Trash2 className="w-3 h-3 text-rose-400" />
              <span>Đặt 0</span>
            </button>
          </div>

          <button
            onClick={() => setSelectedRowStts([])}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white ml-1"
            title="Bỏ chọn tất cả"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comprehensive Bulk Update Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Cập Nhật Hàng Loạt Ô Ma Trận
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Thiết lập đồng loạt số lượng câu hỏi, mức độ nhận thức hoặc trọng số điểm (% điểm) cho các chương.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope Selection: Target Chapters */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                1. Phạm vi áp dụng (Chương / Nội dung)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBulkScope('selected')}
                  className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                    bulkScope === 'selected'
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div>Chỉ các chương đã tích chọn</div>
                    <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                      {selectedRowStts.length > 0
                        ? `Đã chọn ${selectedRowStts.length} chương`
                        : 'Chưa có chương nào được chọn (sẽ áp dụng khi chọn)'}
                    </div>
                  </div>
                  {bulkScope === 'selected' && <Check className="w-4 h-4 text-indigo-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setBulkScope('all')}
                  className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                    bulkScope === 'all'
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div>Tất cả các chương trong ma trận</div>
                    <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                      Toàn bộ {editableMatrix.length} chương
                    </div>
                  </div>
                  {bulkScope === 'all' && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              </div>

              {/* Quick toggle chips for individual chapters if scope is selected */}
              {bulkScope === 'selected' && (
                <div className="pt-2">
                  <div className="text-[11px] text-slate-500 mb-1.5 flex items-center justify-between">
                    <span>Chọn danh sách chương cụ thể:</span>
                    <button
                      type="button"
                      onClick={handleSelectAllRows}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px] font-bold"
                    >
                      {selectedRowStts.length === editableMatrix.length ? 'Bỏ chọn hết' : 'Chọn tất cả'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                    {editableMatrix.map((row) => {
                      const isChecked = selectedRowStts.includes(row.stt);
                      return (
                        <button
                          key={row.stt}
                          type="button"
                          onClick={() => handleToggleRowSelection(row.stt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                            isChecked
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{row.stt}. {row.topic.length > 25 ? row.topic.slice(0, 25) + '...' : row.topic}</span>
                          {isChecked && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Target Parts (Question Types) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  2. Dạng câu hỏi (Phần đề thi)
                </label>
                <div className="flex items-center space-x-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setBulkParts({ part1: true, part2: true, part3: true, part4: true })}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
                  >
                    Tất cả
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setBulkParts({ part1: true, part2: true, part3: true, part4: false })}
                    className="text-slate-500 hover:underline font-semibold"
                  >
                    Chỉ trắc nghiệm (P1-3)
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setBulkParts({ part1: false, part2: false, part3: false, part4: true })}
                    className="text-slate-500 hover:underline font-semibold"
                  >
                    Chỉ tự luận (P4)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'part1', label: 'Phần I: Nhiều lựa chọn', badge: '0.25đ' },
                  { key: 'part2', label: 'Phần II: Đúng - Sai', badge: '1.0đ' },
                  { key: 'part3', label: 'Phần III: Trả lời ngắn', badge: '0.5đ' },
                  { key: 'part4', label: 'Phần IV: Tự luận', badge: 'Điểm câu' },
                ].map((item) => {
                  const active = bulkParts[item.key as PartKey];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setBulkParts((prev) => ({
                          ...prev,
                          [item.key as PartKey]: !prev[item.key as PartKey],
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                        active
                          ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {active && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.badge}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Cognitive Levels */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  3. Mức độ nhận thức
                </label>
                <div className="flex items-center space-x-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setBulkLevels({ remember: true, understand: true, apply: true })}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
                  >
                    Tất cả (Biết + Hiểu + VD)
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setBulkLevels({ remember: true, understand: true, apply: false })}
                    className="text-slate-500 hover:underline font-semibold"
                  >
                    Cơ bản (Biết + Hiểu)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'remember', label: 'Nhận biết (Biết)', color: 'text-emerald-600 dark:text-emerald-400' },
                  { key: 'understand', label: 'Thông hiểu (Hiểu)', color: 'text-cyan-600 dark:text-cyan-400' },
                  { key: 'apply', label: 'Vận dụng (VD / VDC)', color: 'text-indigo-600 dark:text-indigo-400' },
                ].map((item) => {
                  const active = bulkLevels[item.key as LevelKey];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setBulkLevels((prev) => ({
                          ...prev,
                          [item.key as LevelKey]: !prev[item.key as LevelKey],
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                        active
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 font-bold text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <div className={active ? item.color : 'text-slate-400'}>{item.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Type & Parameters */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                4. Thao tác muốn thực hiện
              </label>

              {/* Action tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'set_count', label: 'Gán số câu cố định', icon: CheckSquare },
                  { id: 'adjust_count', label: 'Tăng / Giảm (+/-)', icon: Plus },
                  { id: 'set_cognitive_level', label: 'Đồng nhất mức độ', icon: Sliders },
                  { id: 'cognitive_preset', label: 'Mẫu phân bổ chuẩn', icon: Wand2 },
                  { id: 'clear_cells', label: 'Xóa ô về 0', icon: Trash2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = bulkAction === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setBulkAction(tab.id as BulkUpdateAction)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center space-x-2 transition-all ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Parameter controls for selected action */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                {bulkAction === 'set_count' && (
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      Số lượng câu hỏi gán cho mỗi ô được chọn:
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setTargetCount((prev) => Math.max(0, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={targetCount}
                        onChange={(e) => setTargetCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                        className="w-16 p-1.5 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg font-bold text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setTargetCount((prev) => prev + 1)}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-slate-400 text-[11px]">(Nhập 0 để xóa trắng ô)</span>
                  </div>
                )}

                {bulkAction === 'adjust_count' && (
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      Cộng hoặc trừ số câu cho từng ô hiện tại:
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setAdjustDelta(-1)}
                        className={`px-3 py-1.5 rounded-lg border font-bold ${
                          adjustDelta === -1
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        -1 câu
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdjustDelta(1)}
                        className={`px-3 py-1.5 rounded-lg border font-bold ${
                          adjustDelta === 1
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        +1 câu
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdjustDelta(2)}
                        className={`px-3 py-1.5 rounded-lg border font-bold ${
                          adjustDelta === 2
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        +2 câu
                      </button>
                    </div>
                  </div>
                )}

                {bulkAction === 'set_cognitive_level' && (
                  <div className="space-y-2">
                    <div className="text-slate-700 dark:text-slate-300 font-semibold">
                      Tập trung tất cả câu hỏi của các dạng bài được chọn vào duy nhất một mức độ nhận thức:
                    </div>
                    <div className="flex items-center space-x-2">
                      {[
                        { id: 'remember', label: 'Tất cả sang Nhận biết (Biết)' },
                        { id: 'understand', label: 'Tất cả sang Thông hiểu (Hiểu)' },
                        { id: 'apply', label: 'Tất cả sang Vận dụng (VD)' },
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setTargetLevel(lvl.id as LevelKey)}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                            targetLevel === lvl.id
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bulkAction === 'cognitive_preset' && (
                  <div className="space-y-2">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold block">
                      Chọn mẫu phân bổ nhận thức chuẩn:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '4_3_3', title: 'Mẫu chuẩn 4 - 3 - 3', desc: '40% Biết - 30% Hiểu - 30% Vận dụng' },
                        { id: '5_3_2', title: 'Mẫu cơ bản 5 - 3 - 2', desc: '50% Biết - 30% Hiểu - 20% Vận dụng' },
                        { id: '3_4_3', title: 'Mẫu nâng cao 3 - 4 - 3', desc: '30% Biết - 40% Hiểu - 30% Vận dụng' },
                        { id: '4_3_2_1', title: 'Mẫu phân hóa 4 - 3 - 2 - 1', desc: '40% NB - 30% TH - 20% VD - 10% VDC' },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setCognitivePreset(preset.id as any)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            cognitivePreset === preset.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200'
                              : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-xs">{preset.title}</div>
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bulkAction === 'clear_cells' && (
                  <div className="text-rose-600 dark:text-rose-400">
                    Toàn bộ các ô ma trận thuộc các dạng câu hỏi và mức độ nhận thức đã chọn sẽ được xóa trắng về giá trị 0 ('-').
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleApplyBulkUpdate}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Áp Dụng Cập Nhật</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
