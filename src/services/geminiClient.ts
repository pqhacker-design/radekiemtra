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

export function formatModelDisplayName(model: string): string {
  if (model.includes('3.8-flash')) return 'Gemini 3.8 Flash';
  if (model.includes('3.1-flash-lite')) return 'Gemini 3.1 Flash Lite';
  if (model.includes('flash-latest')) return 'Gemini Flash Latest';
  if (model.includes('3.1-pro')) return 'Gemini 3.1 Pro';
  return model;
}

/**
 * Gửi yêu cầu sinh nội dung AI thông qua Server Proxy (/api/gemini/generate).
 * Hỗ trợ nhận tiến trình thời gian thực (SSE) và tự động nhận diện chuyển đổi mô hình (Smart Fallback).
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
  const modelName = formatModelDisplayName(selectedModel);

  if (onStatusUpdate) {
    onStatusUpdate(`Đang kết nối tới máy chủ AI (${modelName})...`);
  }

  // Timer dự phòng client-side cập nhật thông điệp nếu máy chủ đang chuyển đổi mô hình
  let clientTimer: any = null;
  if (onStatusUpdate) {
    let elapsed = 0;
    clientTimer = setInterval(() => {
      elapsed += 4;
      if (elapsed === 8) {
        onStatusUpdate(`Đang phân tích và xử lý dữ liệu với ${modelName}...`);
      } else if (elapsed === 16 && selectedModel.includes('3.8-flash')) {
        onStatusUpdate(`Mô hình ${modelName} đang xử lý suy luận sâu, hệ thống đang giám sát để tự động chuyển sang Gemini 3.1 Flash Lite nếu vượt ngưỡng...`);
      } else if (elapsed >= 22 && selectedModel.includes('3.8-flash')) {
        onStatusUpdate(`Đang tự động chuyển sang mô hình siêu tốc Gemini 3.1 Flash Lite...`);
      }
    }, 4000);
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream, application/json',
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
        stream: true,
      }),
    });

    const contentType = response.headers.get('content-type') || '';

    // Xử lý Server-Sent Events (SSE) để nhận cập nhật tiến trình trực tiếp
    if (contentType.includes('text/event-stream') && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let generatedText = '';
      let modelUsed = selectedModel;
      let wasFallback = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const lines = part.trim().split('\n');
          let eventType = '';
          let dataStr = '';

          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventType = line.replace('event:', '').trim();
            } else if (line.startsWith('data:')) {
              dataStr = line.replace('data:', '').trim();
            }
          }

          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);
              if (eventType === 'status' || data.type === 'status') {
                if (data.message && onStatusUpdate) {
                  onStatusUpdate(data.message);
                }
              } else if (eventType === 'complete' || data.type === 'complete' || typeof data.text === 'string') {
                generatedText = data.text || '';
                modelUsed = data.modelUsed || modelUsed;
                wasFallback = !!data.wasFallback;
              } else if (eventType === 'error' || data.type === 'error' || data.error) {
                throw new Error(data.error || 'Lỗi từ máy chủ AI');
              }
            } catch (jsonErr: any) {
              if (jsonErr.message && !jsonErr.message.includes('Unexpected token')) {
                throw jsonErr;
              }
            }
          }
        }
      }

      if (clientTimer) clearInterval(clientTimer);

      if (generatedText) {
        if (wasFallback && onStatusUpdate) {
          onStatusUpdate(`Đã tạo thành công đề thi qua mô hình siêu tốc ${formatModelDisplayName(modelUsed)}!`);
        }
        return generatedText;
      }
    }

    // Fallback: Xử lý phản hồi JSON thông thường
    const responseText = await response.text();
    if (clientTimer) clearInterval(clientTimer);

    let data: any = null;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { error: responseText };
    }

    if (response.ok && data && typeof data.text === 'string') {
      if (data.wasFallback && onStatusUpdate) {
        onStatusUpdate(`Đã tạo thành công đề thi qua mô hình siêu tốc ${formatModelDisplayName(data.modelUsed)}!`);
      }
      return data.text;
    }

    if (data && data.error) {
      let errMsg = String(data.error);
      try {
        const parsed = JSON.parse(errMsg);
        if (parsed?.error?.message) errMsg = parsed.error.message;
        else if (parsed?.message) errMsg = parsed.message;
      } catch {}
      throw new Error(errMsg);
    }

    throw new Error(`Máy chủ phản hồi với mã lỗi HTTP ${response.status}`);
  } catch (err: any) {
    if (clientTimer) clearInterval(clientTimer);
    let message = String(err?.message || err || '');
    try {
      const parsed = JSON.parse(message);
      if (parsed?.error?.message) message = parsed.error.message;
      else if (parsed?.message) message = parsed.message;
    } catch {}

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
    if (
      message.includes('SERVICE_UNAVAILABLE') ||
      message.includes('503') ||
      message.includes('UNAVAILABLE') ||
      message.includes('high demand') ||
      message.includes('overloaded')
    ) {
      throw new Error('[SERVICE_UNAVAILABLE] Máy chủ AI Google đang chịu tải cao (Lỗi 503 - High Demand). Hệ thống đã tự động thử các mô hình dự phòng nhưng tạm thời chưa thể kết nối. Vui lòng bấm "Thử Lại" sau vài giây hoặc đổi mô hình/nhập API Key riêng trong Cài Đặt.');
    }

    throw new Error(message || 'Không thể tạo dữ liệu từ mô hình AI. Vui lòng thử lại sau.');
  }
}

