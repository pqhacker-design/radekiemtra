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

function formatModelDisplayName(model: string): string {
  if (model.includes('3.8-flash')) return 'Gemini 3.8 Flash';
  if (model.includes('3.1-flash-lite')) return 'Gemini 3.1 Flash Lite';
  if (model.includes('flash-latest')) return 'Gemini Flash Latest';
  if (model.includes('3.1-pro')) return 'Gemini 3.1 Pro';
  return model;
}

function getModelTimeoutMs(modelName: string): number {
  if (modelName.includes('3.8-flash')) return 18000;
  if (modelName.includes('3.1-pro')) return 25000;
  return 30000;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-custom-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const isStream = req.body?.stream === true || (req.headers && req.headers['accept'] && req.headers['accept'].includes('text/event-stream'));

  const sendSseEvent = (event: string, data: any) => {
    if (isStream && !res.writableEnded) {
      try {
        res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      } catch {}
    }
  };

  if (isStream) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
  }

  try {
    const { prompt, systemInstruction, responseMimeType, responseSchema, customApiKey, images, model } = req.body || {};

    if (!prompt) {
      if (isStream) {
        sendSseEvent('error', { error: 'Nội dung Yêu cầu (prompt) không được để trống.' });
        res.end();
        return;
      }
      return res.status(400).json({ error: 'Nội dung Yêu cầu (prompt) không được để trống.' });
    }

    function cleanKey(k?: any): string {
      if (!k || typeof k !== 'string') return '';
      let cleaned = k.replace(/[\u200B-\u200D\uFEFF\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '').trim();
      const match = cleaned.match(/(?:AIzaSy[A-Za-z0-9_-]{33}|AQ\.[A-Za-z0-9_.-]+)/);
      if (match) return match[0];
      return cleaned.replace(/[^\x20-\x7E]/g, '').trim();
    }

    const userKey = cleanKey(customApiKey) || cleanKey(req.headers?.['x-custom-api-key']);
    const systemKey = cleanKey(process.env.GEMINI_API_KEY);
    const apiKey = userKey || systemKey;

    if (!apiKey) {
      const noKeyMsg = '[NO_API_KEY] Chưa cấu hình API Key. Vui lòng cấu hình GEMINI_API_KEY hoặc nhập Gemini API Key trong phần Cài Đặt.';
      if (isStream) {
        sendSseEvent('error', { error: noKeyMsg });
        res.end();
        return;
      }
      return res.status(400).json({
        error: noKeyMsg,
      });
    }

    let requestedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';
    if (
      requestedModel.includes('2.0') ||
      requestedModel.includes('1.5') ||
      requestedModel.includes('gemini-pro')
    ) {
      requestedModel = 'gemini-3.1-flash-lite';
    }

    const candidateModels = Array.from(
      new Set([requestedModel, 'gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'])
    );

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

    let lastError: any = null;

    for (let pass = 1; pass <= 2; pass++) {
      for (let idx = 0; idx < candidateModels.length; idx++) {
        const currentModel = candidateModels[idx];
        const timeoutMs = getModelTimeoutMs(currentModel);

        sendSseEvent('status', {
          message: `Đang kết nối tới mô hình AI ${formatModelDisplayName(currentModel)}...`,
          model: currentModel,
          pass,
        });

        let timer: NodeJS.Timeout | null = null;
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

          if (currentModel.includes('3.8-flash')) {
            config.thinkingConfig = { thinkingLevel: 'LOW' };
          }

          if (systemInstruction) config.systemInstruction = systemInstruction;
          if (responseMimeType) config.responseMimeType = responseMimeType;
          if (responseSchema) config.responseSchema = responseSchema;

          const timeoutPromise = new Promise<never>((_, reject) => {
            timer = setTimeout(() => {
              reject(
                new Error(
                  `[TIMEOUT] Mô hình ${formatModelDisplayName(currentModel)} phản hồi quá ${Math.round(
                    timeoutMs / 1000
                  )}s`
                )
              );
            }, timeoutMs);
          });

          const response = await Promise.race([
            ai.models.generateContent({
              model: currentModel,
              contents,
              config,
            }),
            timeoutPromise,
          ]);

          if (timer) clearTimeout(timer);

          const text = response.text || '';
          if (text) {
            sendSseEvent('complete', {
              text,
              modelUsed: currentModel,
              wasFallback: currentModel !== requestedModel,
              requestedModel,
            });

            if (isStream) {
              res.end();
              return;
            }

            return res.status(200).json({ text, modelUsed: currentModel, wasFallback: currentModel !== requestedModel });
          }
        } catch (err: any) {
          if (timer) clearTimeout(timer);
          lastError = err;
          const formatted = formatApiError(err);
          console.warn(`Lỗi khi gọi model ${currentModel} (vòng ${pass}):`, formatted.message.slice(0, 150));

          if (formatted.statusCode === 403) {
            if (isStream) {
              sendSseEvent('error', { error: formatted.message });
              res.end();
              return;
            }
            return res.status(403).json({ error: formatted.message });
          }

          const nextCandidate = candidateModels[idx + 1] || candidateModels[0];
          sendSseEvent('status', {
            message: `Mô hình ${formatModelDisplayName(
              currentModel
            )} phản hồi lâu hoặc bận. Đang tự động chuyển sang ${formatModelDisplayName(nextCandidate)}...`,
            model: nextCandidate,
            previousModel: currentModel,
            isSwitching: true,
          });
        }
      }

      if (pass < 2) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    const finalFormatted = formatApiError(lastError);
    if (isStream) {
      sendSseEvent('error', { error: finalFormatted.message });
      res.end();
      return;
    }
    return res.status(finalFormatted.statusCode).json({ error: finalFormatted.message });
  } catch (error: any) {
    console.error('Lỗi khi gọi Gemini API:', error);
    const formatted = formatApiError(error);
    if (isStream) {
      sendSseEvent('error', { error: formatted.message });
      res.end();
      return;
    }
    return res.status(formatted.statusCode).json({ error: formatted.message });
  }
}

