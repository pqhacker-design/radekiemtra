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
  const apiKey = customApiKey?.trim() || '';
  const selectedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';

  if (onStatusUpdate) {
    onStatusUpdate(`Đang kết nối tới máy chủ AI (${selectedModel})...`);
  }

  try {
    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'x-custom-api-key': apiKey } : {}),
      },
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
