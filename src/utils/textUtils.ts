/**
 * Phục hồi các từ khóa LaTeX bị AI hoặc JSON parser làm rách chữ:
 * - ightarrow -> \rightarrow
 * - ightleftharpoons -> \rightleftharpoons
 * - ight), ight], ight|, ight\} -> \right), \right], \right|, \right\}
 * - \\ ight -> \right
 * - rac{ -> \frac{
 * - egin{ -> \begin{
 * - imes -> \times
 */
export function repairLatexCorruptions(text: string): string {
  if (!text) return '';
  let str = text;

  // 0a. Sửa chữa các chuỗi đã bị lỗi lặp \r hoặc \Leftr trước mũi tên (\r\r\r\r\r\rightarrow, \Leftr\r\r\r\r\r \rightarrow)
  str = str.replace(/\\Left[rR](?:\\[rR]|\s|[\r\n])*(?:\\?rightarrow|→)/gi, '\\Leftrightarrow ');
  str = str.replace(/(?:\\[rR]|\r)+(?=\s*\\?(rightarrow|rightleftharpoons|Rightarrow|Leftrightarrow|Leftarrow|to)\b)/gi, '');
  str = str.replace(/(?:\\[rR]){2,}/g, ' ');

  // 0b. Khôi phục các ký tự điều khiển ASCII thô từ JSON.parse lỡ chuyển đổi
  str = str.replace(/\x0Crac/g, '\\frac');
  str = str.replace(/\x0C(lat|rown|forall)/g, '\\f$1');
  str = str.replace(/\x0C([a-zA-Z]+)/g, '\\f$1');
  str = str.replace(/\x0C/g, '');
  str = str.replace(/\t(ext|heta|imes|an|au|ilde|riangle)\b/g, '\\$1');
  str = str.replace(/\r(ight|ho|eal|ightarrow|ightleftharpoons)\b/g, '\\$1');
  str = str.replace(/\x0A(otin|eq|abla|neq|ni)\b/g, '\\n$1');

  // 0c. Khôi phục nhiều dấu backslash \\+ thừa trước các lệnh LaTeX phổ biến
  str = str.replace(/\\+(frac|dfrac|text|mathrm|mathbf|tan|sin|cos|cot|sqrt|vec|widehat|alpha|beta|gamma|ne|neq|notin|in|Leftrightarrow|Rightarrow|rightarrow|rightleftharpoons)\b/g, '\\$1');

  // 0d. Chuẩn hóa nhiệt độ độ C bị lỗi dạng \circC, ^\circC, ^\circ C, \circ C, °C, hỗ trợ cả số âm
  str = str.replace(/(-?\d+(?:(?:[.,]|\{,\})\d+)?)\s*(?:\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)|\^\s*°\s*C\b|°\s*C\b)/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°C`;
  });

  // 0e. Phục hồi \notin khi bị rách thành otin hoặc mất dấu gạch chéo
  str = str.replace(/\\+otin\b/g, '\\notin');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)otin\b/g, '\\notin');
  str = str.replace(/\bnot\s+in\b/gi, '\\notin');

  // 0f. Loại bỏ dấu backslash thừa giữa các hàng nghìn trong số lớn (e.g. 40\ 000 -> 40 000, 13\ 920\ 000 -> 13 920 000)
  while (/(\d+)\\\s+(\d+)/.test(str)) {
    str = str.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }

  // 1. Phục hồi mũi tên \rightarrow và \rightleftharpoons khi bị mất backslash hoặc bị rách chữ
  // Đảm bảo KHÔNG match khi đứng sau bất kỳ chữ cái nào (như 'r' trong \rightarrow hay 't' trong \Leftrightarrow)
  str = str.replace(/\\+[ \t]*ightarrow\b/gi, '\\rightarrow');
  str = str.replace(/\r\s*ightarrow\b/gi, '\\rightarrow');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ightarrow\b/gi, '\\rightarrow');

  str = str.replace(/\\+[ \t]*ightleftharpoons\b/gi, '\\rightleftharpoons');
  str = str.replace(/\r\s*ightleftharpoons\b/gi, '\\rightleftharpoons');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ightleftharpoons\b/gi, '\\rightleftharpoons');

  // 2. Phục hồi lệnh \right bị mất '\r' thành ight, \ ight hoặc \\ ight
  // 2a. Các trường hợp có backslash: \\ ight), \ ight], \\ ight|, v.v.
  str = str.replace(/\\+[ \t]*ight\s*([)\]}|.])/g, '\\right$1');
  str = str.replace(/\\+[ \t]*ight\s*\\([{}])/g, '\\right\\$1');

  // 2b. Các trường hợp không có backslash trước chữ ight (e.g. (-1/2 ight)^2)
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ight\s*([)\]}|.])/g, '\\right$1');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ight\s*\\([{}])/g, '\\right\\$1');

  // 2c. Loại bỏ dấu ngắt dòng \\ vô tình bị chèn ngay trước \right bên trong cases
  str = str.replace(/\\\\\s*\\right/g, ' \\right');

  // 2d. Xóa bỏ các lệnh \right. thừa dán phía sau \end{cases}
  str = str.replace(/\\end\{cases\}(\s*\\right\.)+/g, '\\end{cases}');

  // 3. Phục hồi \frac và \dfrac bị mất backslash hoặc bị rách:
  str = str.replace(/\\+rac\{/g, '\\frac{');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)rac\{/g, '\\frac{');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)d?frac\{/g, '\\frac{');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)frac([A-Z]{2})([A-Z]{2})\b/g, '\\frac{$1}{$2}');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)frac([A-Z])([A-Z])\b/g, '\\frac{$1}{$2}');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)frac([A-Z]{3})([A-Z]{3})\b/g, '\\frac{$1}{$2}');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)frac(\d)(\d)\b/g, '\\frac{$1}{$2}');

  // 4. Phục hồi \text bị rách thành ext, \ext hoặc \\ext:
  str = str.replace(/\\+ext\{/g, '\\text{');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ext\{/g, '\\text{');
  str = str.replace(/\\text\{\s*c\s+ạnh\s+đối\s*\}/g, '\\text{cạnh đối}');
  str = str.replace(/\\text\{\s*cạnh\s+kè\s*\}/g, '\\text{cạnh kề}');

  // 5. Phục hồi đơn vị đo lường bị rách: extcm, extkg, extm, extkm, extmm, extdm, extg, exts, exth
  str = str.replace(/(\d+)\s*ext(cm|kg|m|km|mm|dm|g|s|h|l|ml)\b/g, '$1 $2');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ext(cm|kg|m|km|mm|dm|g|s|h|l|ml)\b/g, '\\text{$1}');

  // 6. Phục hồi \tan bị rách thành an:
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\s+([A-Z]\b|\\alpha|\\beta|\\widehat|\()/g, '\\tan $1');

  // 7. Phục hồi \ne và \neq bị biến thành e hoặc eq trong điều kiện / kết quả:
  str = str.replace(/([a-zA-Z0-9_\'\)\}]|\b[xyz])\s*\be\s*(-?\s*\d+|[a-zA-Z]\b)/g, '$1 \\ne $2');
  str = str.replace(/([a-zA-Z0-9_\'\)\}]|\b[xyz])\s*\beq\s*(-?\s*\d+|[a-zA-Z]\b)/g, '$1 \\neq $2');

  // 8. Phục hồi chữ "n " đơn độc ở đầu dòng do \n bị mất dấu gạch chéo:
  str = str.replace(/(^|[\r\n])n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1$2');
  str = str.replace(/(\([0-9a-zA-Z]+\))n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1\n$2');
  str = str.replace(/([.?!:;])\s*n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1\n$2');

  // 9. Phục hồi \begin bị mất \b: egin{ -> \begin{
  str = str.replace(/(?<=[^a-zA-Z\\]|^)egin\{/g, '\\begin{');

  // 10. Phục hồi \times bị mất \t: imes -> \times
  str = str.replace(/(?<=[^a-zA-Z\\]|^)imes\b/g, '\\times');

  return str;
}

/**
 * Chuẩn hóa xuống dòng và dọn dẹp các ký hiệu \n, \\, \ ngoài công thức toán học
 */
export function normalizeNewlines(text: string): string {
  if (!text) return text;

  // 0. Phục hồi ngay các từ khóa LaTeX bị hỏng do \r bị gọt mất
  let str = repairLatexCorruptions(text);

  // 1. Chuẩn hóa ký tự xuống dòng thực tế (CRLF -> LF)
  str = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 2. Chuyển chuỗi literal "\r\n" thành '\n'
  str = str.replace(/\\r\\n/g, '\n');

  // 2b. Chuyển đổi literal "\n" hoặc "\\" đứng trước các nhãn câu con a), b), c), d) hoặc 1), 2), 3), 4) thành xuống dòng
  str = str.replace(/\\+n\s*([a-dA-D0-9]+[.)])/g, '\n$1 ');
  str = str.replace(/\\+([a-dA-D0-9]+[.)])/g, '\n$1 ');

  // 2c. Phục hồi ký tự "n" bị dính vào nhãn câu a), b), c), d) (e.g. "na) " -> "a) ", "\nb) " -> "\nb) ")
  str = str.replace(/(^|[\r\n]|[:;?!.])\s*n([a-dA-D][.)])/g, '$1\n$2 ');
  str = str.replace(/(\d+|[a-zA-Z\)\}\]])\s*n([a-dA-D][.)])/g, '$1\n$2 ');

  // 3. Chuyển chuỗi literal "\n" thành '\n' CHỈ KHI không phải là lệnh LaTeX hợp lệ
  // Các lệnh LaTeX hợp lệ bắt đầu bằng \n: \neq, \notin, \nabla, \ni, \not, \nexists, \ngtr, \nless, \ngeq, \nleq, \natural, \nearrow
  str = str.replace(
    /\\+n(?!(?:eq|notin|nabla|ni|not|nexists|ngtr|nless|ngeq|nleq|natural|nearrow|Leftarrow|Leftrightarrow|Rightarrow)\b)/g,
    '\n'
  );

  // 4. Tách text theo các khối toán ($...$, $$...$$, hoặc môi trường \begin{...}...\end{...})
  const mathBlockRegex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|\\begin\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\}[\s\S]*?\\end\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\})/g;

  const parts = str.split(mathBlockRegex);
  for (let i = 0; i < parts.length; i += 2) {
    if (!parts[i]) continue;
    let plain = parts[i];

    // Khắc phục triệt để lỗi dấu phẩy thập phân LaTeX {,} hoặc \{,\} bị lộ trong văn bản thường
    plain = plain.replace(/\\?\{\s*,\s*\\?\}/g, ',');

    // Loại bỏ dấu backslash thừa giữa các hàng nghìn trong số lớn (40\ 000 -> 40 000, 13\ 920\ 000 -> 13 920 000)
    while (/(\d+)\\\s+(\d+)/.test(plain)) {
      plain = plain.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
    }
    plain = plain.replace(/(\d+)\\\s+/g, '$1 ');

    // Khắc phục lỗi AI dùng LaTeX \Chi hoặc \chi trước "ều rộng" -> Chiều rộng
    plain = plain.replace(/\\Chi\s*ều\b/gi, 'Chiều');
    plain = plain.replace(/\\chi\s*ều\b/gi, 'chiều');
    plain = plain.replace(/X\s*ều\b/g, 'Chiều');

    // Khắc phục lỗi AI dùng \Di ện hoặc \di ện -> Diện / diện
    plain = plain.replace(/\\Di\s*ện\b/gi, 'Diện');
    plain = plain.replace(/\\di\s*ện\b/gi, 'diện');

    // Chuyển ".\ \" hoặc ".\ \\" thành ".\n"
    plain = plain.replace(/\.[ \t]*\\[ \t]*\\*[ \t]*/g, '.\n');
    plain = plain.replace(/([?!:;])\s*\\+\s*(?=[A-Za-z0-9àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '$1\n');

    // Chuyển '\\' trước số thứ tự ý con: \\1), \\2), \\a), \\b)... thành \n1), \n2), \na)...
    plain = plain.replace(/\\+([0-9]+[.)])/g, '\n$1');
    plain = plain.replace(/\\+([a-zA-Z][.)])/g, '\n$1');
    plain = plain.replace(/\\+([-*•])/g, '\n$1');

    // Chuyển các dấu '\\' còn lại trong plain text thành '\n'
    plain = plain.replace(/\\\\+/g, '\n');

    // Loại bỏ dấu '\' thừa dính trước từ tiếng Việt
    plain = plain.replace(/\\([A-Za-z]*[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ][A-Za-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)/g, '$1');

    // Dọn dẹp dấu '\' đơn độc không đi liền với lệnh LaTeX (chỉ xóa khi theo sau là khoảng trắng, dấu câu hoặc cuối dòng)
    plain = plain.replace(/(^|\n)\s*\\+(?=\s|[.,;:?!]|$)/g, '$1');
    plain = plain.replace(/\s*\\+$/g, '');

    parts[i] = plain;
  }

  str = parts.join('');

  // Chuẩn hóa không để quá 2 dấu xuống dòng liên tiếp
  str = str.replace(/\n{3,}/g, '\n\n');

  return str;
}

/**
 * Làm sạch công thức toán học bên trong khối KaTeX ($...$ hoặc $$...$$)
 * Trong ngữ cảnh công thức toán LaTeX, xuống dòng (\r, \n) được coi là khoảng trắng.
 * Không tự tiện chèn thêm '\\' vào giữa các dòng để tránh làm gãy cặp \left và \right.
 */
export function cleanMathNewlines(mathStr: string): string {
  if (!mathStr) return '';
  let s = repairLatexCorruptions(mathStr.trim());

  // Trong LaTeX math mode, \r và \n là khoảng trắng, các dòng phương trình ngắt bằng '\\'
  s = s.replace(/[\r\n]+/g, ' ');

  // Dọn dẹp khoảng trắng kép
  s = s.replace(/[ \t]{2,}/g, ' ');
  return s;
}

export interface RequirementsByLevel {
  remember: string;
  understand: string;
  apply: string;
}

/**
 * Phân tích chuỗi yêu cầu cần đạt (requirements) thành 3 mức độ: Biết, Hiểu, Vận dụng
 */
export function parseRequirementsByLevel(reqText: string): RequirementsByLevel {
  if (!reqText) {
    return { remember: '', understand: '', apply: '' };
  }

  const text = reqText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  // Regex bắt mọi biến thể nhãn mức độ: [Nhận biết]:, - Nhận biết:, 1. Biết:, - Thông hiểu:, - Vận dụng:, v.v.
  const regex = /(?:^|\n)(?:[-*•+]\s*)?(?:\[|\()?([0-9a-dA-D]+[\.\)]\s*)?(?:Mức\s*(?:độ\s*)?)?(Nhận biết|Biết|NB|Thông hiểu|Hiểu|TH|Vận dụng cao|Vận dụng|VDC|VD)(?:\]|\))?\s*[:：\-–]([\s\S]*?)(?=(?:\n(?:[-*•+]\s*)?(?:\[|\()?([0-9a-dA-D]+[\.\)]\s*)?(?:Mức\s*(?:độ\s*)?)?(?:Nhận biết|Biết|NB|Thông hiểu|Hiểu|TH|Vận dụng cao|Vận dụng|VDC|VD)(?:\]|\))?\s*[:：\-–])|$)/gi;

  const matches = Array.from(text.matchAll(regex));

  if (matches.length > 0) {
    let remember = '';
    let understand = '';
    let apply = '';

    for (const match of matches) {
      const label = (match[2] || '').trim().toLowerCase();
      const content = (match[3] || '').trim().replace(/^[-*•+]\s*/, '');

      if (label.includes('nhận biết') || label === 'biết' || label === 'nb') {
        remember = remember ? `${remember}\n${content}` : content;
      } else if (label.includes('thông hiểu') || label === 'hiểu' || label === 'th') {
        understand = understand ? `${understand}\n${content}` : content;
      } else if (label.includes('vận dụng') || label.includes('vd') || label.includes('vdc')) {
        apply = apply ? `${apply}\n${content}` : content;
      }
    }

    return { remember, understand, apply };
  }

  // Phân tách dự phòng theo dòng nếu không có nhãn tường minh
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 3) {
    return {
      remember: lines[0].replace(/^[-*•+]\s*(?:Nhận biết|Biết|NB)?[：:\-–]?\s*/i, ''),
      understand: lines[1].replace(/^[-*•+]\s*(?:Thông hiểu|Hiểu|TH)?[：:\-–]?\s*/i, ''),
      apply: lines.slice(2).join('\n').replace(/^[-*•+]\s*(?:Vận dụng|VD|VDC)?[：:\-–]?\s*/i, ''),
    };
  } else if (lines.length === 2) {
    return {
      remember: lines[0].replace(/^[-*•+]\s*/, ''),
      understand: lines[1].replace(/^[-*•+]\s*/, ''),
      apply: '',
    };
  } else if (lines.length === 1) {
    return {
      remember: lines[0].replace(/^[-*•+]\s*/, ''),
      understand: '',
      apply: '',
    };
  }

  return { remember: text, understand: '', apply: '' };
}

/**
 * Gộp 3 mức độ YCCĐ thành chuỗi text chuẩn
 */
export function combineRequirementsByLevel(levels: RequirementsByLevel): string {
  const parts: string[] = [];
  if (levels.remember.trim()) parts.push(`- Biết: ${levels.remember.trim()}`);
  if (levels.understand.trim()) parts.push(`- Hiểu: ${levels.understand.trim()}`);
  if (levels.apply.trim()) parts.push(`- VD: ${levels.apply.trim()}`);
  return parts.join('\n');
}

/**
 * Đếm số lượng câu hỏi từ chuỗi hoặc số trong ô ma trận/đặc tả
 */
export function countQuestionsInValue(val: any): number {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const str = String(val).trim();
  if (!str || str === '-') return 0;
  if (/^\d+$/.test(str)) return parseInt(str, 10);
  const parts = str.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts.length : 1;
}

