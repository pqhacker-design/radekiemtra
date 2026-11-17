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

export function formatModelDisplayName(model: string): string {
  if (model.includes('3.8-flash')) return 'Gemini 3.8 Flash';
  if (model.includes('3.1-flash-lite')) return 'Gemini 3.1 Flash Lite';
  if (model.includes('flash-latest')) return 'Gemini Flash Latest';
  if (model.includes('3.1-pro')) return 'Gemini 3.1 Pro';
  return model;
}

function getModelTimeoutMs(modelName: string): number {
  if (modelName.includes('3.8-flash')) return 18000; // 18s max for 3.8 flash so it does not hang
  if (modelName.includes('3.1-pro')) return 25000;
  return 30000; // 30s for 3.1 flash lite / flash latest
}

export function registerExamRoutes(app: express.Express) {
  // 1. Gemini AI Generation Proxy Endpoint (Supports JSON and Streaming SSE)
  app.post('/api/gemini/generate', async (req: Request, res: Response) => {
    const isStream = req.body?.stream === true || (req.headers['accept'] && req.headers['accept'].includes('text/event-stream'));

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
        if (isStream) {
          sendSseEvent('error', { error: 'Nội dung yêu cầu (prompt) không được để trống.' });
          res.end();
          return;
        }
        return res.status(400).json({
          error: 'Nội dung yêu cầu (prompt) không được để trống.',
        });
      }

      function cleanKey(k?: any): string {
        if (!k || typeof k !== 'string') return '';
        let cleaned = k.replace(/[\u200B-\u200D\uFEFF\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '').trim();
        const match = cleaned.match(/(?:AIzaSy[A-Za-z0-9_-]{33}|AQ\.[A-Za-z0-9_.-]+)/);
        if (match) return match[0];
        return cleaned.replace(/[^\x20-\x7E]/g, '').trim();
      }

      const userKey = cleanKey(customApiKey) || cleanKey(req.headers['x-custom-api-key']);
      const systemKey = cleanKey(process.env.GEMINI_API_KEY);
      const apiKey = userKey || systemKey;

      if (!apiKey) {
        const noKeyMsg = '[NO_API_KEY] Chưa cấu hình Gemini API Key. Vui lòng nhập API Key để tiếp tục.';
        if (isStream) {
          sendSseEvent('error', { error: noKeyMsg });
          res.end();
          return;
        }
        return res.status(400).json({
          error: noKeyMsg,
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

            const responseText = response.text || '';
            if (responseText) {
              sendSseEvent('complete', {
                text: responseText,
                modelUsed: currentModel,
                wasFallback: currentModel !== requestedModel,
                requestedModel,
              });

              if (isStream) {
                res.end();
                return;
              }

              return res.json({
                text: responseText,
                modelUsed: currentModel,
                wasFallback: currentModel !== requestedModel,
                requestedModel,
              });
            }
          } catch (err: any) {
            if (timer) clearTimeout(timer);
            lastError = err;
            const formatted = formatApiError(err);
            console.warn(
              `[Gemini Proxy] Lỗi với model ${currentModel} (vòng ${pass}):`,
              formatted.message.slice(0, 150)
            );

            // If API key is fundamentally invalid, terminate immediately
            if (formatted.statusCode === 403) {
              if (isStream) {
                sendSseEvent('error', { error: formatted.message });
                res.end();
                return;
              }
              return res.status(403).json({ error: formatted.message });
            }

            // Notify client of automatic switch to next candidate
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

        // Wait 1000ms before pass 2 if all candidate models failed on pass 1
        if (pass < 2) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      console.error('[Gemini Proxy] Tất cả các mô hình dự phòng đều thất bại:', lastError?.message || lastError);
      const finalFormatted = formatApiError(lastError);

      if (isStream) {
        sendSseEvent('error', { error: finalFormatted.message });
        res.end();
        return;
      }

      return res.status(finalFormatted.statusCode).json({
        error: finalFormatted.message,
      });
    } catch (err: any) {
      console.error('Server generate error:', err);
      const formatted = formatApiError(err);
      if (isStream) {
        sendSseEvent('error', { error: formatted.message });
        res.end();
        return;
      }
      return res.status(formatted.statusCode).json({ error: formatted.message });
    }
  });

  // 2. Cached Same-Origin Proxy for GeoGebra Web SDK & Assets (/api/geogebra/apps/*)
  const geogebraCache = new Map<string, { body: Buffer; contentType: string; cachedAt: number }>();
  const GEOGEBRA_CACHE_MAX_ENTRIES = 80;
  const GEOGEBRA_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

  const inferGeoGebraMimeType = (subpath: string, upstreamMime?: string | null): string => {
    const cleanPath = subpath.split('?')[0].toLowerCase();
    if (cleanPath.endsWith('.js')) return 'application/javascript; charset=utf-8';
    if (cleanPath.endsWith('.css')) return 'text/css; charset=utf-8';
    if (cleanPath.endsWith('.html') || cleanPath.endsWith('.htm')) return 'text/html; charset=utf-8';
    if (cleanPath.endsWith('.wasm')) return 'application/wasm';
    if (cleanPath.endsWith('.woff2')) return 'font/woff2';
    if (cleanPath.endsWith('.woff')) return 'font/woff';
    if (cleanPath.endsWith('.ttf')) return 'font/ttf';
    if (cleanPath.endsWith('.svg')) return 'image/svg+xml';
    if (cleanPath.endsWith('.png')) return 'image/png';
    if (cleanPath.endsWith('.gif')) return 'image/gif';
    if (cleanPath.endsWith('.json')) return 'application/json; charset=utf-8';
    return upstreamMime || 'application/octet-stream';
  };

  app.get('/api/geogebra/apps/*', async (req: Request, res: Response) => {
    const rawSubpath = String((req.params as any)[0] || '').replace(/^\/+/, '');
    if (!rawSubpath || rawSubpath.includes('..') || rawSubpath.includes('://')) {
      return res.status(400).json({ error: 'Đường dẫn GeoGebra không hợp lệ.' });
    }

    const cacheKey = rawSubpath;
    const now = Date.now();
    const cached = geogebraCache.get(cacheKey);
    if (cached && now - cached.cachedAt < GEOGEBRA_CACHE_TTL_MS) {
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(cached.body);
    }

    const upstreamOrigins = [
      `https://www.geogebra.org/apps/${rawSubpath}`,
      `https://cdn.geogebra.org/apps/${rawSubpath}`,
    ];

    for (const upstreamUrl of upstreamOrigins) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const upstreamRes = await fetch(upstreamUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; AITestGeneratorPro/1.0)',
            Accept: '*/*',
          },
        });
        clearTimeout(timeout);

        if (!upstreamRes.ok) {
          continue;
        }

        const arrayBuf = await upstreamRes.arrayBuffer();
        let body = Buffer.from(arrayBuf);
        const contentType = inferGeoGebraMimeType(rawSubpath, upstreamRes.headers.get('content-type'));

        // Rewrite codebase URLs inside deployggb.js to use same-origin proxy (preserving http:// check)
        if (rawSubpath === 'deployggb.js') {
          const jsCode = body
            .toString('utf8')
            .replace(
              /"https?:\/\/(?:www|cdn)\.geogebra\.org\/apps\/([^"]*)"/g,
              '(window.location.origin+"/api/geogebra/apps/$1")'
            );
          body = Buffer.from(jsCode, 'utf8');
        }

        if (geogebraCache.size >= GEOGEBRA_CACHE_MAX_ENTRIES) {
          const oldestKey = geogebraCache.keys().next().value;
          if (oldestKey) geogebraCache.delete(oldestKey);
        }
        geogebraCache.set(cacheKey, { body, contentType, cachedAt: now });

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).send(body);
      } catch {
        clearTimeout(timeout);
      }
    }

    return res.status(502).json({
      error: 'Không thể tải tài nguyên GeoGebra từ máy chủ gốc.',
    });
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

