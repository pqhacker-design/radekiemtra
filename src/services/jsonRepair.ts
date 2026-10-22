import { jsonrepair } from 'jsonrepair';

/**
 * Loại bỏ Markdown wrapper và trích xuất khối JSON chính { ... } hoặc [ ... ]
 */
export function cleanMarkdownAndExtractJson(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';

  let str = rawText.trim();
  str = str.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  const firstBrace = str.indexOf('{');
  const firstBracket = str.indexOf('[');
  let startIdx = -1;

  if (firstBrace !== -1 && firstBracket !== -1) {
    startIdx = Math.min(firstBrace, firstBracket);
  } else if (firstBrace !== -1) {
    startIdx = firstBrace;
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
  }

  const lastBrace = str.lastIndexOf('}');
  const lastBracket = str.lastIndexOf(']');
  let endIdx = -1;

  if (lastBrace !== -1 && lastBracket !== -1) {
    endIdx = Math.max(lastBrace, lastBracket);
  } else if (lastBrace !== -1) {
    endIdx = lastBrace;
  } else if (lastBracket !== -1) {
    endIdx = lastBracket;
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    str = str.substring(startIdx, endIdx + 1);
  }

  return str.trim();
}

/**
 * Chuẩn hóa các dấu nháy kép bên trong thẻ SVG XML để không phá vỡ chuỗi JSON
 * Biến các thuộc tính như viewBox="0 0 400 300" thành viewBox='0 0 400 300'
 */
export function fixSvgQuotes(str: string): string {
  return str.replace(/<svg[\s\S]*?<\/svg>/gi, (svgBlock) => {
    return svgBlock.replace(/=([\"\'])(.*?)\1/g, (m, q, val) => {
      return `='${val}'`;
    });
  });
}

/**
 * Phát hiện và tự động escape các dấu nháy kép bên trong nội dung chuỗi (inner unescaped quotes)
 * Ví dụ: "Một mảnh vườn "hình chữ nhật" có..." -> "Một mảnh vườn \"hình chữ nhật\" có..."
 */
export function fixUnescapedInnerQuotes(jsonStr: string): string {
  let result = '';
  let inString = false;
  let isEsc = false;

  for (let i = 0; i < jsonStr.length; i++) {
    const c = jsonStr[i];

    if (c === '"' && !isEsc) {
      if (!inString) {
        inString = true;
        result += c;
      } else {
        // Kiểm tra ký tự không rỗng tiếp theo xem có phải là ký tự phân tách JSON hợp lệ không
        let nextNonSpace = '';
        let j = i + 1;
        while (j < jsonStr.length) {
          const nextC = jsonStr[j];
          if (nextC !== ' ' && nextC !== '\t' && nextC !== '\r' && nextC !== '\n') {
            nextNonSpace = nextC;
            break;
          }
          j++;
        }

        // Một dấu đóng chuỗi hợp lệ trong JSON phải được theo sau bởi :, ,, }, ], hoặc hết chuỗi
        const isLikelyClosing =
          nextNonSpace === ':' ||
          nextNonSpace === ',' ||
          nextNonSpace === '}' ||
          nextNonSpace === ']' ||
          nextNonSpace === '';

        if (isLikelyClosing) {
          inString = false;
          result += c;
        } else {
          // Dấu ngoặc kép này nằm giữa câu mà không theo sau bởi phân cách JSON -> escape nó!
          result += '\\"';
        }
      }
    } else {
      result += c;
      if (c === '\\' && !isEsc) {
        isEsc = true;
      } else {
        isEsc = false;
      }
    }
  }

  return result;
}

/**
 * Xử lý các ký tự điều khiển ASCII thô (0x00 - 0x1F như newline thực sự, tab) bên trong chuỗi literal
 * Ngăn chặn triệt để lỗi "Bad control character in string literal in JSON"
 */
export function escapeRawControlCharactersInStrings(str: string): string {
  let result = '';
  let inString = false;
  let isEsc = false;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (c === '"' && !isEsc) {
      inString = !inString;
      result += c;
    } else if (inString) {
      if (c === '\n') {
        result += '\\n';
      } else if (c === '\r') {
        // bỏ qua carriage return
      } else if (c === '\t') {
        result += '\\t';
      } else if (c.charCodeAt(0) < 32) {
        // Ký tự điều khiển ASCII không hợp lệ khác
        result += ' ';
      } else {
        result += c;
      }
    } else {
      result += c;
    }

    if (c === '\\' && !isEsc) {
      isEsc = true;
    } else {
      isEsc = false;
    }
  }

  return result;
}

/**
 * Bảo vệ và escape các dấu gạch chéo ngược LaTeX (\frac, \sqrt, \alpha, \text, \times...)
 * để JSON.parse không bị lỗi Invalid escape hay biến \text thành Tab, \frac thành FormFeed
 */
export function escapeLatexBackslashes(str: string): string {
  return str.replace(/\\([a-zA-Z]+|\(|\)|\[|\]|\{|\}|\^|_|\+|-|=|<|>|!|,|;|:|\.|\/|~|'|"|\|)/g, (match, cmd) => {
    if (match === '\\"') return match;
    if (cmd === 'n' || cmd === 'r' || cmd === 't') {
      return match;
    }
    return '\\\\' + cmd;
  });
}

/**
 * Tiền xử lý tổng hợp chuỗi thô từ AI qua 4 tầng làm sạch
 */
export function preprocessRawJson(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';
  const step0 = cleanMarkdownAndExtractJson(rawText);
  const step1 = fixSvgQuotes(step0);
  const step2 = fixUnescapedInnerQuotes(step1);
  const step3 = escapeRawControlCharactersInStrings(step2);
  const step4 = escapeLatexBackslashes(step3);
  return step4;
}

/**
 * Hàm chuẩn hóa tổng hợp
 */
export function repairJsonString(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';

  const extracted = cleanMarkdownAndExtractJson(rawText);

  const hasUnescapedLatex = /(?<!\\)\\(frac|dfrac|text|mathrm|mathbf|mathit|tan|sin|cos|cot|sqrt|vec|widehat|alpha|beta|gamma|delta|ne|neq|notin|begin|end|right|rightarrow|times|theta|triangle)\b/.test(extracted);

  // Thử parse trực tiếp nếu đã hợp lệ và không chứa lệnh LaTeX với single backslash
  if (!hasUnescapedLatex) {
    try {
      JSON.parse(extracted);
      return extracted;
    } catch {}
  }

  const sanitized = preprocessRawJson(rawText);
  try {
    JSON.parse(sanitized);
    return sanitized;
  } catch {}

  try {
    const repaired = jsonrepair(sanitized);
    JSON.parse(repaired);
    return repaired;
  } catch {}

  try {
    const repairedDirect = jsonrepair(extracted);
    JSON.parse(repairedDirect);
    return repairedDirect;
  } catch {}

  return sanitized;
}

/**
 * Trích xuất một mảng JSON theo độ sâu dấu ngoặc vuông '[' ... ']'
 * Hỗ trợ tự động bù ngoặc nếu mảng bị cắt ngắn do độ dài token
 */
function extractBalancedArray(text: string, key: string): string | null {
  const regex = new RegExp('"' + key + '"\\s*:\\s*\\[');
  const match = text.match(regex);
  if (!match || match.index === undefined) return null;
  const startIdx = match.index + match[0].length - 1; // index của '['
  let depth = 0;
  let inString = false;
  let isEsc = false;

  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (c === '"' && !isEsc) {
      inString = !inString;
    } else if (!inString) {
      if (c === '[') depth++;
      else if (c === ']') {
        depth--;
        if (depth === 0) return text.substring(startIdx, i + 1);
      }
    }
    if (c === '\\' && !isEsc) isEsc = true;
    else isEsc = false;
  }

  // Nếu depth > 0 (chuỗi bị cắt ngắn do hết token), tự động đóng ngoặc
  if (depth > 0) {
    let sliced = text.substring(startIdx);
    if (inString) sliced += '"';
    sliced += ']';
    return sliced;
  }

  return null;
}

/**
 * Trích xuất các đối tượng cấp 1 bên trong một chuỗi mảng JSON "[ {..}, {..} ]"
 */
function extractTopLevelObjectsFromArrayString(arrStr: string): string[] {
  const objects: string[] = [];
  let depth = 0;
  let objStart = -1;
  let inString = false;
  let isEsc = false;

  for (let i = 0; i < arrStr.length; i++) {
    const c = arrStr[i];
    if (c === '"' && !isEsc) {
      inString = !inString;
    } else if (!inString) {
      if (c === '{') {
        if (depth === 0) objStart = i;
        depth++;
      } else if (c === '}') {
        depth--;
        if (depth === 0 && objStart !== -1) {
          objects.push(arrStr.substring(objStart, i + 1));
          objStart = -1;
        }
      }
    }
    if (c === '\\' && !isEsc) isEsc = true;
    else isEsc = false;
  }
  return objects;
}

function safeParseSingleObject(str: string): any {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {}
  try {
    const sanitized = preprocessRawJson(str);
    return JSON.parse(sanitized);
  } catch {}
  try {
    const repaired = jsonrepair(str);
    return JSON.parse(repaired);
  } catch {}
  try {
    const sanitized = preprocessRawJson(str);
    const repaired = jsonrepair(sanitized);
    return JSON.parse(repaired);
  } catch {}
  return null;
}

/**
 * Trích xuất từng phần dữ liệu dự phòng nếu JSON tổng thể bị lỗi cú pháp nặng
 */
function extractFallbackExamData(rawText: string): any {
  const result: any = { matrix: [], specification: [], questions: [] };

  try {
    // 1. Trích xuất questions array bằng cân bằng ngoặc
    const questionsArrayStr = extractBalancedArray(rawText, 'questions');
    if (questionsArrayStr) {
      try {
        result.questions = JSON.parse(questionsArrayStr);
      } catch {
        try {
          const sanitized = preprocessRawJson(questionsArrayStr);
          result.questions = JSON.parse(sanitized);
        } catch {
          try {
            result.questions = JSON.parse(jsonrepair(questionsArrayStr));
          } catch {
            // Trích xuất từng object câu hỏi riêng biệt theo độ sâu ngoặc nhọn
            const questionObjects = extractTopLevelObjectsFromArrayString(questionsArrayStr);
            result.questions = questionObjects
              .map((qo) => safeParseSingleObject(qo))
              .filter(Boolean);
          }
        }
      }
    }

    // 2. Trích xuất matrix array
    const matrixArrayStr = extractBalancedArray(rawText, 'matrix');
    if (matrixArrayStr) {
      try {
        result.matrix = JSON.parse(matrixArrayStr);
      } catch {
        try {
          result.matrix = JSON.parse(jsonrepair(matrixArrayStr));
        } catch {
          const matrixObjs = extractTopLevelObjectsFromArrayString(matrixArrayStr);
          result.matrix = matrixObjs
            .map((mo) => safeParseSingleObject(mo))
            .filter(Boolean);
        }
      }
    }

    // 3. Trích xuất specification array
    const specArrayStr = extractBalancedArray(rawText, 'specification');
    if (specArrayStr) {
      try {
        result.specification = JSON.parse(specArrayStr);
      } catch {
        try {
          result.specification = JSON.parse(jsonrepair(specArrayStr));
        } catch {
          const specObjs = extractTopLevelObjectsFromArrayString(specArrayStr);
          result.specification = specObjs
            .map((so) => safeParseSingleObject(so))
            .filter(Boolean);
        }
      }
    }

    if (Array.isArray(result.questions) && result.questions.length > 0) {
      return result;
    }
  } catch (err) {
    console.warn('Lỗi trích xuất dự phòng JSON:', err);
  }

  return null;
}

/**
 * An toàn parse JSON với cơ chế tự sửa chữa 6 cấp độ chống mọi lỗi LaTeX, SVG và Control Character
 */
export function safeJsonParse<T = any>(rawText: string): T {
  if (!rawText || !rawText.trim()) throw new Error('Dữ liệu JSON phản hồi rỗng.');

  const cleaned = cleanMarkdownAndExtractJson(rawText);

  // Kiểm tra xem chuỗi có chứa các lệnh LaTeX dùng dấu gạch chéo ngược đơn (\frac, \text, \tan, \ne, \right...)
  // Nếu có, KHÔNG parse trực tiếp vì JSON.parse sẽ biến \frac thành FormFeed, \text thành Tab, \ne thành Newline
  const hasUnescapedLatex = /(?<!\\)\\(frac|dfrac|text|mathrm|mathbf|mathit|tan|sin|cos|cot|sqrt|vec|widehat|alpha|beta|gamma|delta|ne|neq|notin|begin|end|right|rightarrow|times|theta|triangle)\b/.test(cleaned);

  // Pass 1: Parse trực tiếp nếu chuỗi đã là JSON chuẩn và không chứa lệnh LaTeX với single backslash
  if (!hasUnescapedLatex) {
    try {
      return JSON.parse(cleaned);
    } catch {}
  }

  // Pass 2: Khử các ký tự điều khiển, sửa lỗi SVG quotes, escape unescaped inner quotes và xử lý LaTeX backslashes
  const sanitized = preprocessRawJson(cleaned);
  try {
    return JSON.parse(sanitized);
  } catch {}

  // Pass 3: Sửa chữa với thư viện jsonrepair chuyên dụng trên chuỗi đã khử control characters
  try {
    const repaired = jsonrepair(sanitized);
    return JSON.parse(repaired);
  } catch {}

  // Pass 4: Sửa chữa với jsonrepair trên chuỗi gốc
  try {
    const repairedDirect = jsonrepair(cleaned);
    return JSON.parse(repairedDirect);
  } catch {}

  // Pass 5: Trích xuất từng khối dữ liệu dự phòng (Block & Array Extraction)
  const fallback = extractFallbackExamData(rawText);
  if (fallback && Array.isArray(fallback.questions) && fallback.questions.length > 0) {
    return fallback as T;
  }

  // Pass 6: Thử sửa chữa triệt để lần cuối
  try {
    const aggressive = sanitized
      .replace(/\\([a-zA-Z])/g, '\\\\$1')
      .replace(/\\\\\\\\/g, '\\\\');
    return JSON.parse(jsonrepair(aggressive));
  } catch (finalErr: any) {
    // Nếu vẫn lỗi, thử cứu vớt các object câu hỏi trong toàn bộ văn bản
    const allObjects = extractTopLevelObjectsFromArrayString(cleaned);
    const candidateQuestions = allObjects
      .map((o) => safeParseSingleObject(o))
      .filter((q) => q && (q.content || q.question || q.stem || q.options || q.partType));

    if (candidateQuestions.length > 0) {
      return {
        matrix: [],
        specification: [],
        questions: candidateQuestions,
      } as unknown as T;
    }

    throw new Error(`Dữ liệu AI trả về không phải định dạng JSON hợp lệ: ${finalErr.message}`);
  }
}
