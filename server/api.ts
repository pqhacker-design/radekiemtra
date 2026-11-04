import express, { type Request, type Response } from 'express';
import { GoogleGenAI } from '@google/genai';

function formatApiError(err: any): { statusCode: number; message: string } {
  let rawStr = '';
  if (err && typeof err === 'object') {
    if (typeof err.message === 'string') rawStr = err.message;
    else if (typeof err.error === 'string') rawStr = err.error;
    else rawStr = JSON.stringify(err);
  } else {
    rawStr = String(err || '');
  }

  // Parse inner JSON if error message itself is a serialized JSON object from Google SDK
  try {
    const parsed = JSON.parse(rawStr);
    if (parsed && typeof parsed === 'object') {
      if (parsed.error && typeof parsed.error.message === 'string') {
        rawStr = parsed.error.message;
      } else if (typeof parsed.message === 'string') {
        rawStr = parsed.message;
      }
    }
  } catch {}

  const lower = rawStr.toLowerCase();

  if (
    lower.includes('api_key_invalid') ||
    lower.includes('api key not valid') ||
    lower.includes('401') ||
    lower.includes('permission_denied')
  ) {
    return {
      statusCode: 403,
      message: '[INVALID_API_KEY] Gemini API Key không hợp lệ hoặc đã bị khóa. Vui lòng kiểm tra lại trong phần Cài Đặt.',
    };
  }

  if (
    lower.includes('429') ||
    lower.includes('resource_exhausted') ||
    lower.includes('quota exceeded') ||
    lower.includes('rate limit')
  ) {
    return {
      statusCode: 429,
      message: '[QUOTA_EXHAUSTED] Hạn ngạch yêu cầu miễn phí trong ngày của Gemini API đã đạt giới hạn. Bạn có thể nhập thêm Gemini API Key riêng trong mục Cài Đặt để tiếp tục sử dụng ngay.',
    };
  }

  if (
    lower.includes('503') ||
    lower.includes('unavailable') ||
    lower.includes('high demand') ||
    lower.includes('overloaded') ||
    lower.includes('temporarily unavailable')
  ) {
    return {
      statusCode: 503,
      message: '[SERVICE_UNAVAILABLE] Máy chủ AI Google đang chịu tải cao (Lỗi 503 - High Demand). Hệ thống đã tự động thử các mô hình dự phòng nhưng tất cả đều đang bận. Vui lòng bấm "Thử Lại" sau vài giây hoặc đổi mô hình/nhập API Key riêng trong Cài Đặt.',
    };
  }

  return {
    statusCode: 500,
    message: rawStr || 'Không thể kết nối tới mô hình AI. Vui lòng thử lại sau.',
  };
}

export function registerExamRoutes(app: express.Express) {
  // 1. Gemini AI Generation Proxy Endpoint
  app.post('/api/gemini/generate', async (req: Request, res: Response) => {
    try {
      const {
        prompt,
        systemInstruction,
        responseMimeType,
        responseSchema,
        customApiKey,
        model,
        images,
        temperature = 0.45,
        topP = 0.95,
      } = req.body;

      if (!prompt) {
        return res.status(400).json({
          error: 'Nội dung yêu cầu (prompt) không được để trống.',
        });
      }

      function cleanKey(k?: any): string {
        if (!k || typeof k !== 'string') return '';
        let cleaned = k.replace(/[\u200B-\u200D\uFEFF\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '').trim();
        const match = cleaned.match(/AIzaSy[A-Za-z0-9_-]{33}/);
        if (match) return match[0];
        return cleaned.replace(/[^\x20-\x7E]/g, '').trim();
      }

      const userKey = cleanKey(customApiKey) || cleanKey(req.headers['x-custom-api-key']);
      const systemKey = cleanKey(process.env.GEMINI_API_KEY);
      const apiKey = userKey || systemKey;

      if (!apiKey) {
        return res.status(400).json({
          error: '[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key để tiếp tục.',
        });
      }

      // Sanitize model selection
      let requestedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';
      if (
        requestedModel.includes('2.0') ||
        requestedModel.includes('1.5') ||
        requestedModel.includes('gemini-pro')
      ) {
        requestedModel = 'gemini-3.1-flash-lite';
      }

      // Order candidate models: requested model first, then high-throughput models
      const defaultCandidates = [
        'gemini-3.1-flash-lite',
        'gemini-flash-latest',
        'gemini-3.8-flash',
      ];
      const candidateModels = Array.from(new Set([requestedModel, ...defaultCandidates]));

      let lastError: any = null;

      // Try up to 2 passes across candidate models
      for (let pass = 1; pass <= 2; pass++) {
        for (const currentModel of candidateModels) {
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
              maxOutputTokens: 16384,
            };

            // Temperature & topP are supported on gemini-3.1-flash-lite
            if (currentModel.includes('3.1-flash-lite')) {
              if (typeof temperature === 'number') config.temperature = temperature;
              if (typeof topP === 'number') config.topP = topP;
            } else if (currentModel.includes('3.8-flash')) {
              config.thinkingConfig = { thinkingLevel: 'LOW' };
            }

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

            const responseText = response.text || '';
            if (responseText) {
              return res.json({ text: responseText, modelUsed: currentModel });
            }
          } catch (err: any) {
            lastError = err;
            const formatted = formatApiError(err);
            console.warn(`[Gemini Proxy] Lỗi với model ${currentModel} (vòng ${pass}):`, formatted.message.slice(0, 150));

            // If API key is fundamentally invalid, terminate immediately
            if (formatted.statusCode === 403) {
              return res.status(403).json({ error: formatted.message });
            }

            // For 503 / UNAVAILABLE / 429, immediately continue to the NEXT candidate model!
          }
        }

        // Wait 1500ms before pass 2 if all candidate models failed on pass 1
        if (pass < 2) {
          await new Promise((r) => setTimeout(r, 1500));
        }
      }

      console.error('[Gemini Proxy] Tất cả các mô hình dự phòng đều thất bại:', lastError?.message || lastError);
      const finalFormatted = formatApiError(lastError);
      return res.status(finalFormatted.statusCode).json({
        error: finalFormatted.message,
      });
    } catch (err: any) {
      console.error('Server generate error:', err);
      const formatted = formatApiError(err);
      return res.status(formatted.statusCode).json({ error: formatted.message });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'AI Test Generator Pro',
      hasKey: !!process.env.GEMINI_API_KEY,
    });
  });
}
