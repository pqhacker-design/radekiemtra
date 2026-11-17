import { callGeminiApi } from './geminiClient';
import { safeJsonParse } from './jsonRepair';
import { StorageEngine } from './storageEngine';

export type GeoGebraAppMode = 'geometry' | 'graphing' | 'classic' | '3d';

export interface GeneratedGeoGebraResult {
  commands: string[];
  mode: GeoGebraAppMode;
  summary: string;
}

declare global {
  interface Window {
    GGBApplet?: new (params: Record<string, any>, useWebSimple?: boolean) => any;
  }
}

export type GeoGebraSdkSource = 'proxy' | 'cdn';

let ggbLoadPromise: Promise<GeoGebraSdkSource> | null = null;
let loadedSdkSource: GeoGebraSdkSource | null = null;

function loadSingleScript(src: string, timeoutMs: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-geogebra-sdk', 'true');

    let settled = false;
    const cleanup = () => {
      script.onload = null;
      script.onerror = null;
    };

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      script.remove();
      reject(new Error(`Quá thời gian tải (${Math.round(timeoutMs / 1000)}s): ${src}`));
    }, timeoutMs);

    script.onload = () => {
      if (settled) return;
      clearTimeout(timer);
      settled = true;
      cleanup();
      if (window.GGBApplet) {
        resolve();
      } else {
        script.remove();
        reject(new Error(`Script đã tải nhưng chưa khởi tạo được GGBApplet (${src}).`));
      }
    };

    script.onerror = () => {
      if (settled) return;
      clearTimeout(timer);
      settled = true;
      cleanup();
      script.remove();
      reject(new Error(`Không thể kết nối tới ${src}.`));
    };

    document.head.appendChild(script);
  });
}

/**
 * Tải động thư viện GeoGebra Web (deployggb.js) qua proxy nội bộ trước, tự động fallback CDN nếu cần
 */
export function loadGeoGebraScript(options?: {
  preferredSource?: GeoGebraSdkSource;
  forceReload?: boolean;
}): Promise<GeoGebraSdkSource> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('GeoGebra chỉ khả dụng trên trình duyệt.'));
  }

  const preferredSource = options?.preferredSource || 'proxy';
  const forceReload = Boolean(options?.forceReload);

  if (window.GGBApplet && !forceReload) {
    return Promise.resolve(loadedSdkSource || preferredSource);
  }

  if (ggbLoadPromise && !forceReload) {
    return ggbLoadPromise;
  }

  // Xóa thẻ script cũ bị treo/lỗi nếu trước đó tải thất bại hoặc yêu cầu nạp lại
  document.querySelectorAll('script[data-geogebra-sdk="true"]').forEach((el) => el.remove());

  const candidateUrls: { url: string; source: GeoGebraSdkSource; timeoutMs: number }[] =
    preferredSource === 'cdn'
      ? [
          { url: 'https://cdn.geogebra.org/apps/deployggb.js', source: 'cdn', timeoutMs: 8000 },
          { url: 'https://www.geogebra.org/apps/deployggb.js', source: 'cdn', timeoutMs: 8000 },
          { url: '/api/geogebra/apps/deployggb.js', source: 'proxy', timeoutMs: 8000 },
        ]
      : [
          { url: '/api/geogebra/apps/deployggb.js', source: 'proxy', timeoutMs: 9000 },
          { url: 'https://cdn.geogebra.org/apps/deployggb.js', source: 'cdn', timeoutMs: 8000 },
          { url: 'https://www.geogebra.org/apps/deployggb.js', source: 'cdn', timeoutMs: 8000 },
        ];

  ggbLoadPromise = (async () => {
    const errors: string[] = [];
    for (const candidate of candidateUrls) {
      try {
        await loadSingleScript(candidate.url, candidate.timeoutMs);
        loadedSdkSource = candidate.source;
        return candidate.source;
      } catch (err: any) {
        errors.push(err?.message || candidate.url);
      }
    }
    ggbLoadPromise = null;
    throw new Error(
      `Không thể tải công cụ GeoGebra từ máy chủ nội bộ lẫn CDN (${errors[0] || 'lỗi kết nối'}). Bạn có thể chuyển sang "Bảng vẽ nhanh nội bộ" để dựng hình tức thì.`
    );
  })();

  return ggbLoadPromise;
}

/**
 * Làm sạch từng dòng lệnh GeoGebra trước khi gọi api.evalCommand(...)
 */
export function normalizeGeoGebraCommand(raw: string): string {
  if (!raw) return '';
  let cmd = raw.trim();
  // Bỏ đánh số đầu dòng hoặc markdown bullet
  cmd = cmd.replace(/^[-*•]\s*/, '').replace(/^\d+[\.)]\s*/, '');
  // Bỏ dấu backtick hoặc dấu chấm phẩy cuối dòng
  cmd = cmd.replace(/^`+|`+$/g, '').replace(/;+\s*$/, '').trim();
  return cmd;
}

/**
 * Yêu cầu AI phân tích đề bài / lời giải và sinh chuỗi lệnh GeoGebra chuẩn
 */
export async function generateGeoGebraCommands(params: {
  questionContent: string;
  solutionText?: string;
  target: 'question' | 'answer';
  preferredMode?: GeoGebraAppMode | 'auto';
  extraInstruction?: string;
  onStatusUpdate?: (msg: string) => void;
}): Promise<GeneratedGeoGebraResult> {
  const {
    questionContent,
    solutionText = '',
    target,
    preferredMode = 'auto',
    extraInstruction = '',
    onStatusUpdate,
  } = params;

  const settings = StorageEngine.getSettings();
  const effectiveModeHint =
    preferredMode === '3d'
      ? 'BẮT BUỘC dùng tọa độ 3D (x, y, z) cho chế độ "3d" (GeoGebra 3D Calculator).'
      : preferredMode === 'graphing'
      ? 'BẮT BUỘC dùng chế độ "graphing" (Đồ thị hàm số 2D có hệ trục tọa độ Oxy).'
      : preferredMode === 'geometry'
      ? 'BẮT BUỘC dùng chế độ "geometry" (Hình học phẳng / Hình học không gian chiếu 2D không cần trục tọa độ).'
      : preferredMode === 'classic'
      ? 'Dùng chế độ "classic" (hỗ trợ cả hệ trục tọa độ và hình học phẳng).'
      : 'Tự chọn mode phù hợp nhất: "graphing" nếu bài toán về đồ thị hàm số/tích phân/parabol/hệ trục tọa độ; "geometry" nếu là bài toán hình học phẳng hoặc hình chóp/lăng trụ (dùng phép chiếu song song 2D kèm nét đứt cho cạnh khuất để in đề thi đẹp và rõ nét nhất).';

  const targetInstruction =
    target === 'question'
      ? 'MỤC TIÊU: Vẽ hình cho ĐỀ BÀI (chỉ vẽ các giả thiết đề bài đã cho, KHÔNG vẽ sẵn các đường phụ chứng minh hay lời giải ẩn).'
      : 'MỤC TIÊU: Vẽ hình cho ĐÁP ÁN / LỜI GIẢI (vẽ đầy đủ giả thiết VÀ bổ sung các đường phụ, đường cao, điểm trung điểm, giao điểm, góc vuông hoặc miền diện tích được nêu trong lời giải; tô màu nổi bật đường phụ bằng SetColor).';

  const systemInstruction = `Bạn là chuyên gia Toán học & GeoGebra Script. Nhiệm vụ của bạn là chuyển đổi đề toán tiếng Việt thành danh sách câu lệnh GeoGebra (cú pháp TIẾNG ANH chuẩn của GeoGebra evalCommand) để tự động dựng hình chính xác tuyệt đối.

QUY TẮC BẮT BUỘC VỀ CÚ PHÁP GEOGEBRA:
1. LUÔN dùng tên lệnh TIẾNG ANH của GeoGebra:
   - Điểm: A = (0, 0), B = (4, 0), C = (1.5, 3) (với 3D: A = (0, 0, 0), S = (0, 0, 4))
   - Đoạn thẳng: sAB = Segment(A, B) hoặc Segment(A, B)
   - Đa giác: poly = Polygon(A, B, C)
   - Đường thẳng / Tia: Line(A, B), Ray(A, B)
   - Đường tròn / Cung: c = Circle(O, 3) hoặc Circle(A, B, C) hoặc Semicircle(A, B)
   - Quan hệ hình học: Midpoint(A, B), PerpendicularLine(A, Line(B, C)), Line(A, B) hoặc ParallelLine(A, Segment(B, C)), Intersect(obj1, obj2), Tangent(P, c)
   - Ký hiệu góc vuông & góc: Angle(A, B, C)
   - Đồ thị hàm số: f(x) = x^3 - 3*x + 2, g(x) = (2*x + 1)/(x - 1)
   - Tích phân tô miền: IntegralBetween(f, g, 0, 2) hoặc Integral(f, 0, 2)
   - Trang trí nét vẽ (rất quan trọng để hình in ra đẹp như sách giáo khoa):
     + Nét đứt cho cạnh khuất/đường gióng/tiệm cận: SetLineStyle(objName, 1) (1 là dashed, 0 là solid)
     + Độ dày nét: SetLineThickness(objName, 3)
     + Màu sắc: SetColor(objName, 30, 64, 175) (RGB 0..255) hoặc SetColor(objName, "red")
     + Ẩn/hiện nhãn đoạn thẳng: ShowLabel(sAB, false), ShowLabel(A, true)
     + Cỡ điểm: SetPointSize(A, 4)
     + Không dùng ký tự tiếng Việt có dấu làm tên biến đối tượng trong GeoGebra (chỉ dùng A, B, C, S, M, N, sAB, d1, f...).
2. Với Hình học không gian khi vẽ ở chế độ 2D ("geometry"):
   - Dựng các đỉnh bằng tọa độ 2D hợp lý sao cho hình cân đối, rõ góc nhìn, không bị trùng đỉnh/chồng chữ.
   - Đặt tên biến cho các cạnh khuất (ví dụ: sAB = Segment(A, B), sSA = Segment(S, A), sAD = Segment(A, D)) rồi gọi SetLineStyle(sAB, 1) để biểu diễn nét đứt chuẩn SGK Việt Nam.
   - Tắt nhãn tự động cho đoạn thẳng bằng ShowLabel(tên_đoạn, false) để tránh rối hình bằng chữ f, g, h, a, b, c.
3. Với bài toán Đồ thị hàm số ("graphing"):
   - Chọn hệ số đẹp vừa khung nhìn [-6, 6] x [-5, 5].
   - Đánh dấu các điểm đặc biệt (cực trị, giao điểm, tâm đối xứng) và đường tiệm cận (nét đứt đỏ: SetLineStyle(..., 1), SetColor(..., 220, 38, 38)).
4. Mỗi phần tử trong mảng "commands" chỉ là MỘT lệnh GeoGebra thuần túy hợp lệ với evalCommand(), KHÔNG chứa chú thích // hay #.

ĐỊNH DẠNG ĐẦU RA JSON DUY NHẤT:
{
  "mode": "geometry" | "graphing" | "classic" | "3d",
  "summary": "Mô tả ngắn gọn bằng tiếng Việt về hình đã dựng",
  "commands": [
    "A = (0, 0)",
    "B = (5, 0)",
    "..."
  ]
}`;

  const prompt = `Hãy phân tích bài toán sau và sinh bộ lệnh GeoGebra chính xác:

${targetInstruction}
${effectiveModeHint}

NỘI DUNG ĐỀ BÀI:
${questionContent || '(Chưa nhập nội dung đề bài)'}

${solutionText ? `NỘI DUNG LỜI GIẢI / ĐÁP ÁN THAM KHẢO:\n${solutionText}\n` : ''}
${extraInstruction ? `YÊU CẦU BỔ SUNG CỦA GIÁO VIÊN:\n${extraInstruction}\n` : ''}

Hãy trả về đúng JSON chứa "mode", "summary" và mảng "commands" (chỉ gồm các lệnh GeoGebra hợp lệ).`;

  const responseText = await callGeminiApi({
    prompt,
    systemInstruction,
    responseMimeType: 'application/json',
    customApiKey: settings.customApiKey,
    model: settings.selectedModel || 'gemini-3.1-flash-lite',
    temperature: 0.25,
    onStatusUpdate,
  });

  const parsed = safeJsonParse<{
    mode?: string;
    summary?: string;
    commands?: string[];
  }>(responseText);

  const rawCommands = Array.isArray(parsed?.commands) ? parsed.commands : [];
  const commands = rawCommands
    .map((c) => normalizeGeoGebraCommand(String(c || '')))
    .filter((c) => c.length > 0);

  if (commands.length === 0) {
    throw new Error('AI không tạo được câu lệnh GeoGebra hợp lệ từ đề bài này. Vui lòng thử bổ sung chi tiết hình học hoặc chọn lại chế độ.');
  }

  const rawMode = String(parsed?.mode || '').toLowerCase();
  const mode: GeoGebraAppMode =
    preferredMode !== 'auto'
      ? preferredMode
      : rawMode === '3d' || rawMode === 'graphing' || rawMode === 'classic' || rawMode === 'geometry'
      ? (rawMode as GeoGebraAppMode)
      : 'geometry';

  return {
    commands,
    mode,
    summary: parsed?.summary || 'Đã dựng hình minh họa bằng GeoGebra từ đề bài.',
  };
}
