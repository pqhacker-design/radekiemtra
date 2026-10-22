import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

export function registerExamRoutes(app: express.Express) {
  // 1. Gemini AI Generation Proxy Endpoint with Randomness & Temperature support
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
        temperature = 0.85,
        topP = 0.95,
      } = req.body;

      const apiKey =
        (customApiKey || '').trim() ||
        ((req.headers['x-custom-api-key'] as string) || '').trim() ||
        process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: '[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key để tiếp tục.',
        });
      }

      const selectedModel =
        typeof model === 'string' && model.trim().length > 0
          ? model.trim()
          : 'gemini-3.8-flash';

      const candidateModels = Array.from(
        new Set([
          selectedModel,
          'gemini-3.8-flash',
          'gemini-3.1-flash-lite',
          'gemini-2.5-flash',
          'gemini-3.1-pro-preview',
        ])
      );

      let lastError: any = null;

      for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
        const currentModel = candidateModels[mIdx];

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

            return res.json({ text: response.text });
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
              await new Promise((r) => setTimeout(r, 1500 * attempt));
              continue;
            }
            break;
          }
        }
      }

      console.error('Gemini API Proxy Error:', lastError);
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
