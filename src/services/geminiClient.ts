import { GoogleGenAI } from '@google/genai';

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

export async function callGeminiApi({
  prompt,
  systemInstruction,
  responseMimeType,
  responseSchema,
  customApiKey,
  model = 'gemini-3.8-flash',
  images = [],
  temperature = 0.85,
  topP = 0.95,
  onStatusUpdate,
}: GeminiApiOptions): Promise<string> {
  const apiKey = customApiKey?.trim() || '';
  const selectedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.8-flash';

  // 1. Gọi qua Backend Server (/api/gemini/generate)
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
    } catch {}

    if (response.ok && data && typeof data.text === 'string') {
      return data.text;
    }

    if (data && data.error) {
      const errMsg = String(data.error);
      if (
        !errMsg.includes('404') &&
        !errMsg.includes('Cannot POST') &&
        !errMsg.includes('Unexpected token') &&
        !errMsg.includes('Failed to fetch')
      ) {
        throw new Error(data.error);
      }
    }
  } catch (err: any) {
    if (
      err.message &&
      (err.message.includes('Máy chủ AI') ||
        err.message.includes('API Key') ||
        err.message.includes('NO_API_KEY') ||
        err.message.includes('INVALID_API_KEY') ||
        err.message.includes('QUOTA_EXHAUSTED') ||
        err.message.includes('quá tải'))
    ) {
      throw err;
    }
    if (!apiKey) {
      throw new Error(err.message || 'Không thể kết nối tới máy chủ tạo đề thi AI.');
    }
  }

  if (!apiKey) {
    throw new Error('[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key để tiếp tục.');
  }

  // 2. Client-side fallback: Gọi trực tiếp GoogleGenAI SDK
  const candidateModels = Array.from(
    new Set([selectedModel, 'gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash', 'gemini-3.1-pro-preview'])
  );

  let lastError: any = null;

  for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
    const currentModel = candidateModels[mIdx];
    if (mIdx > 0 && onStatusUpdate) {
      onStatusUpdate(`Đang chuyển sang mô hình dự phòng: ${currentModel}...`);
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const config: any = {
          temperature: typeof temperature === 'number' ? temperature : 0.45,
          topP: typeof topP === 'number' ? topP : 0.95,
          maxOutputTokens: 32768,
        };

        if (systemInstruction) config.systemInstruction = systemInstruction;
        if (responseMimeType) config.responseMimeType = responseMimeType;
        if (responseSchema) config.responseSchema = responseSchema;

        let contents: any = prompt;
        if (Array.isArray(images) && images.length > 0) {
          const parts: any[] = [];
          for (const imgUrl of images) {
            if (typeof imgUrl === 'string' && imgUrl.startsWith('data:')) {
              const match = imgUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
              if (match) {
                parts.push({
                  inlineData: {
                    mimeType: match[1],
                    data: match[2],
                  },
                });
              }
            }
          }
          parts.push({ text: prompt });
          contents = parts;
        }

        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config,
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const errStr = (err?.message || '') + (err?.status || '');
        const isRetryable =
          errStr.includes('503') ||
          errStr.includes('UNAVAILABLE') ||
          errStr.includes('high demand') ||
          errStr.includes('RESOURCE_EXHAUSTED') ||
          errStr.includes('429');

        if (isRetryable && attempt < 3) {
          if (onStatusUpdate) onStatusUpdate(`Hệ thống đang bận, tự động thử lại lần ${attempt + 1}...`);
          await new Promise((r) => setTimeout(r, 1500 * attempt));
          continue;
        }
        break;
      }
    }
  }

  throw new Error(lastError?.message || 'Không thể tạo đề thi với AI. Vui lòng thử lại sau.');
}
