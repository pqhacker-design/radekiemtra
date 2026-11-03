import { GoogleGenAI } from '@google/genai';

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

  try {
    const { prompt, systemInstruction, responseMimeType, responseSchema, customApiKey, images, model } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Nội dung Yêu cầu (prompt) không được để trống.' });
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
        error: '[NO_API_KEY] Chưa cấu hình API Key. Vui lòng cấu hình GEMINI_API_KEY hoặc nhập Gemini API Key trong phần Cài Đặt.',
      });
    }

    let requestedModel = typeof model === 'string' && model.trim().length > 0 ? model.trim() : 'gemini-3.1-flash-lite';
    if (
      requestedModel.includes('2.5') ||
      requestedModel.includes('2.0') ||
      requestedModel.includes('1.5') ||
      requestedModel.includes('gemini-pro')
    ) {
      requestedModel = 'gemini-3.1-flash-lite';
    }

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

    const candidateModels = Array.from(
      new Set([requestedModel, 'gemini-3.1-flash-lite', 'gemini-3.8-flash'])
    );

    let lastError: any = null;
    for (const currentModel of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: currentModel,
          contents,
          config,
        });

        const text = response.text || '';
        if (text) {
          return res.status(200).json({ text, modelUsed: currentModel });
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = String(err.message || err);
        console.warn(`Lỗi khi gọi model ${currentModel}:`, errMsg.slice(0, 150));
        if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('401') || errMsg.includes('API key not valid')) {
          return res.status(403).json({
            error: '[INVALID_API_KEY] Gemini API Key không hợp lệ. Vui lòng kiểm tra lại trong phần Cài Đặt.',
          });
        }
        // If 429 or 404, loop will try next candidate model
      }
    }

    throw lastError || new Error('Không thể tạo dữ liệu từ các mô hình Gemini AI.');
  } catch (error: any) {
    console.error('Lỗi khi gọi Gemini API:', error);
    return res.status(500).json({
      error: error.message || 'Đã xảy ra lỗi khi tạo dữ liệu từ Gemini AI.',
    });
  }
}
