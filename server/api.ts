import express, { type Request, type Response } from 'express';
import { GoogleGenAI } from '@google/genai';

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

      const apiKey =
        (customApiKey || '').trim() ||
        ((req.headers['x-custom-api-key'] as string) || '').trim() ||
        process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: '[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key để tiếp tục.',
        });
      }

      // Sanitize model selection: filter out deprecated models
      let requestedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';
      if (
        requestedModel.includes('2.5') ||
        requestedModel.includes('2.0') ||
        requestedModel.includes('1.5') ||
        requestedModel.includes('gemini-pro')
      ) {
        requestedModel = 'gemini-3.1-flash-lite';
      }

      // Order candidates: requested model, then gemini-3.1-flash-lite (high availability & quota), then gemini-3.8-flash
      const candidateModels = Array.from(
        new Set([
          requestedModel,
          'gemini-3.1-flash-lite',
          'gemini-3.8-flash',
        ])
      );

      let lastError: any = null;

      for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
        const currentModel = candidateModels[mIdx];

        // Transient retry attempts (only for 503/UNAVAILABLE)
        const maxAttempts = 2;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
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
              maxOutputTokens: 32768,
            };

            // Temperature & topP are supported on gemini-3.1-flash-lite; avoid deprecated params on gemini-3.8-flash
            if (currentModel.includes('3.1-flash-lite')) {
              if (typeof temperature === 'number') config.temperature = temperature;
              if (typeof topP === 'number') config.topP = topP;
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
            return res.json({ text: responseText, modelUsed: currentModel });
          } catch (err: any) {
            lastError = err;
            const errStr = String(err?.message || err?.status || err || '');
            console.warn(`[Gemini Proxy] Lỗi với model ${currentModel} (lần ${attempt}):`, errStr.slice(0, 150));

            // If API key is invalid, terminate immediately
            if (
              errStr.includes('API_KEY_INVALID') ||
              errStr.includes('API key not valid') ||
              errStr.includes('401') ||
              errStr.includes('403')
            ) {
              return res.status(403).json({
                error: '[INVALID_API_KEY] Gemini API Key không hợp lệ hoặc đã bị khóa. Vui lòng kiểm tra lại trong phần Cài Đặt.',
              });
            }

            // If quota exhausted (429) or model not found (404), do not retry the same model; switch to next candidate immediately!
            if (
              errStr.includes('429') ||
              errStr.includes('RESOURCE_EXHAUSTED') ||
              errStr.includes('Quota exceeded') ||
              errStr.includes('404') ||
              errStr.includes('NOT_FOUND') ||
              errStr.includes('no longer available')
            ) {
              break;
            }

            // Retry for transient 503 / UNAVAILABLE
            const isTransient =
              errStr.includes('503') ||
              errStr.includes('UNAVAILABLE') ||
              errStr.includes('high demand') ||
              errStr.includes('timeout') ||
              errStr.includes('ECONNRESET');

            if (isTransient && attempt < maxAttempts) {
              await new Promise((r) => setTimeout(r, 1000));
              continue;
            }
            break;
          }
        }
      }

      console.error('[Gemini Proxy] Tất cả các mô hình dự phòng đều thất bại:', lastError?.message || lastError);

      const finalErrStr = String(lastError?.message || lastError || '');
      if (
        finalErrStr.includes('429') ||
        finalErrStr.includes('RESOURCE_EXHAUSTED') ||
        finalErrStr.includes('Quota exceeded')
      ) {
        return res.status(429).json({
          error: '[QUOTA_EXHAUSTED] Hạn ngạch yêu cầu miễn phí trong ngày của Gemini API đã đạt giới hạn. Bạn có thể nhập thêm Gemini API Key riêng trong mục Cài Đặt để tiếp tục sử dụng ngay.',
        });
      }

      return res.status(500).json({
        error: lastError?.message || 'Không thể kết nối tới mô hình AI. Vui lòng thử lại.',
      });
    } catch (err: any) {
      console.error('Server generate error:', err);
      return res.status(500).json({ error: err.message || 'Lỗi xử lý yêu cầu AI.' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'AI Test Generator Pro' });
  });
}
