export interface GeminiApiOptions {
  prompt: string;
  systemInstruction?: string;
  responseMimeType?: string;
  responseSchema?: any;
  customApiKey?: string;
  model?: string;
  images?: string[];
  temperature?: number;
  topP?: number;
  onStatusUpdate?: (msg: string) => void;
}

/**
 * Chuẩn hóa và làm sạch Gemini API Key:
 * - Loại bỏ khoảng trắng thừa, ký tự ẩn không nhìn thấy (zero-width space \u200B-\u200D, BOM \uFEFF, Unicode spaces)
 * - Nếu người dùng dán cả chuỗi chứa nhãn như "Khóa API: AIzaSy...", tự động trích xuất chuỗi key hợp lệ dạng AIzaSy...
 * - Loại bỏ hoàn toàn ký tự non-ASCII (> 0xFF) để tránh lỗi browser "String contains non ISO-8859-1 code point"
 */
export function sanitizeApiKey(rawKey?: string | null): string {
  if (!rawKey || typeof rawKey !== 'string') return '';
  let cleaned = rawKey
    .replace(/[\u200B-\u200D\uFEFF\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '')
    .trim();

  // Tự động trích xuất nếu người dùng dán kèm văn bản khác chứa key
  const match = cleaned.match(/AIzaSy[A-Za-z0-9_-]{33}/);
  if (match) {
    return match[0];
  }

  // Loại bỏ các ký tự ngoài dải ASCII in được (32-126)
  cleaned = cleaned.replace(/[^\x20-\x7E]/g, '').trim();
  return cleaned;
}

/**
 * Gửi yêu cầu sinh nội dung AI thông qua Server Proxy (/api/gemini/generate).
 * Toàn bộ xử lý gọi Google GenAI SDK được thực hiện an toàn ở phía Backend,
 * loại bỏ hoàn toàn lỗi PROXY_GENERATION_DISABLED trên trình duyệt client.
 */
export async function callGeminiApi({
  prompt,
  systemInstruction,
  responseMimeType,
  responseSchema,
  customApiKey,
  model = 'gemini-3.1-flash-lite',
  images = [],
  temperature = 0.45,
  topP = 0.95,
  onStatusUpdate,
}: GeminiApiOptions): Promise<string> {
  const apiKey = sanitizeApiKey(customApiKey);
  const selectedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';

  if (onStatusUpdate) {
    onStatusUpdate(`Đang kết nối tới máy chủ AI (${selectedModel})...`);
  }

  try {
    // Chỉ đính kèm header nếu là chuỗi ASCII hợp lệ để phòng ngừa triệt để lỗi ISO-8859-1
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey && /^[\x20-\x7E]+$/.test(apiKey)) {
      headers['x-custom-api-key'] = apiKey;
    }

    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt,
        systemInstruction,
        responseMimeType,
        responseSchema,
        customApiKey: apiKey,
        model: selectedModel,
        images,
        temperature,
        topP,
      }),
    });

    const responseText = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { error: responseText };
    }

    if (response.ok && data && typeof data.text === 'string') {
      return data.text;
    }

    if (data && data.error) {
      const errMsg = String(data.error);
      throw new Error(errMsg);
    }

    throw new Error(`Máy chủ phản hồi với mã lỗi HTTP ${response.status}`);
  } catch (err: any) {
    const message = String(err?.message || err || '');

    // Phân loại các thông báo lỗi trực quan cho người dùng
    if (message.includes('NO_API_KEY')) {
      throw new Error('[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key trong phần Cài Đặt.');
    }
    if (message.includes('INVALID_API_KEY') || message.includes('API_KEY_INVALID') || message.includes('403') || message.includes('401')) {
      throw new Error('[INVALID_API_KEY] API Key của bạn không hợp lệ hoặc đã bị khóa. Vui lòng kiểm tra lại trong phần Cài Đặt.');
    }
    if (message.includes('QUOTA_EXHAUSTED') || message.includes('RESOURCE_EXHAUSTED') || message.includes('429')) {
      throw new Error('[QUOTA_EXHAUSTED] Hạn ngạch miễn phí của Gemini API hôm nay đã tạm hết. Bạn có thể nhập API Key riêng trong mục Cài Đặt để tiếp tục sử dụng ngay.');
    }

    throw new Error(message || 'Không thể tạo dữ liệu từ mô hình AI. Vui lòng thử lại sau.');
  }
}
