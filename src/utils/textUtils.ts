import { LatexPostProcessingValidator } from '../services/latexValidator';

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
  let str = LatexPostProcessingValidator.correctString(text);


  // 0. KHÔI PHỤC NGAY MÔI TRƯỜNG HỆ PHƯƠNG TRÌNH \begin{cases} và \end{cases}
  // Bị AI hoặc regex cũ phá vỡ thành \begin{cas \n \n \n \ne s}, \begin{cas \ne s}, \begin{casnes}, {cas \n \n \ne s}
  str = str.replace(/\\begin\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi, '\\begin{cases}');
  str = str.replace(/\\end\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi, '\\end{cases}');
  str = str.replace(/(?<!\\)\bbegin\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi, '\\begin{cases}');
  str = str.replace(/(?<!\\)\bend\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi, '\\end{cases}');
  str = str.replace(/(?<!\\)\b(begin|end)\{cases\}/g, '\\$1{cases}');
  str = str.replace(/\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi, '{cases}');

  // 0a. Sửa chữa các chuỗi đã bị lỗi lặp \r hoặc \Leftr trước mũi tên (\r\r\r\r\r\rightarrow, \Leftr\r\r\r\r\r \rightarrow)
  str = str.replace(/\\Left[rR]?(?:\\[rR]|\s|[\r\n]|\\+[nNrR]|\\?ne)*(?:\\?rightarrow|→)/gi, '\\Leftrightarrow ');
  str = str.replace(/\\Left(?:\s|\\+[nNrR]|\\?ne)+(?:\\?Rightarrow|⇒|\\?Leftrightarrow|⇔)/gi, '\\Leftrightarrow ');
  str = str.replace(/\\Left\s*\\?ne\b/gi, '\\Leftrightarrow ');
  str = str.replace(/(?:\\[rR]|\r)+(?=\s*\\?(rightarrow|rightleftharpoons|Rightarrow|Leftrightarrow|Leftarrow|to)\b)/gi, '');
  str = str.replace(/(?:\\[rR]){2,}/g, ' ');

  // 0b. Khôi phục các bất đẳng thức \le và \ge bị rách do regex cũ biến thành \l\n\n\n\n\ne 0, \g\n\n\n\n\ne 4, \l\ne, \g\ne
  str = str.replace(/\\l(?:\s|\\+[nNrR])*(?:\\?ne|e)(?=\s*[\d+-]|\s*[a-zA-Z]\b|\s*\(|\s*\{|\s*$)/gi, '\\le ');
  str = str.replace(/\\g(?:\s|\\+[nNrR])*(?:\\?ne|e)(?=\s*[\d+-]|\s*[a-zA-Z]\b|\s*\(|\s*\{|\s*$)/gi, '\\ge ');
  str = str.replace(/\\l\s*\\?ne\b/gi, '\\le ');
  str = str.replace(/\\g\s*\\?ne\b/gi, '\\ge ');
  str = str.replace(/\\l\s*\\?le\b/gi, '\\le ');
  str = str.replace(/\\g\s*\\?ge\b/gi, '\\ge ');

  // 0c. Khôi phục dấu khác \ne bị rách do lặp \n: \n \n \n \n \ne 3, x\n\n\n\n \ne 1, a\n\n\n\n\ne 0
  str = str.replace(/(?:\\+[nNrR]\s+)+\\?ne\b|(?:\\+[nNrR]\s*){2,}\\?ne\b/gi, ' \\ne ');
  str = str.replace(/(?:\\+[nNrR]\s+)+\\?e(?=\s*[\d+-]|\s*[xyz]\b)|(?:\\+[nNrR]\s*){2,}e(?=\s*[\d+-]|\s*[xyz]\b)/gi, ' \\ne ');
  str = str.replace(/(?:\\+[nNrR]\s*){1,}≠/g, ' \\ne ');

  // 0d. Khôi phục các ký tự điều khiển ASCII thô từ JSON.parse lỡ chuyển đổi
  str = str.replace(/\x0Crac/g, '\\frac');
  str = str.replace(/\x0C(lat|rown|forall)/g, '\\f$1');
  str = str.replace(/\x0C([a-zA-Z]+)/g, '\\f$1');
  str = str.replace(/\x0C/g, '');
  str = str.replace(/\t(ext|heta|imes|an|au|ilde|riangle)(?=[^a-z]|$)/gi, '\\$1');
  str = str.replace(/\tan(?=[A-Z0-9\\({\s]|\^|$)/g, '\\tan ');
  str = str.replace(/\r(ight|ho|eal|ightarrow|ightleftharpoons)\b/g, '\\$1');
  str = str.replace(/\x0A(otin|eq|abla|neq|ni)\b/g, '\\n$1');
  str = str.replace(/\x0Ae(?=\s*[\d+-]|\s*[xyz]\b)/g, ' \\ne ');

  // 0e. Khôi phục nhiều dấu backslash \\+ thừa trước các lệnh LaTeX phổ biến
  str = str.replace(/\\+(frac|dfrac|text|mathrm|mathbf|tan|sin|cos|cot|sqrt|vec|widehat|alpha|beta|gamma|ne|neq|le|leq|ge|geq|notin|in|Leftrightarrow|Rightarrow|rightarrow|rightleftharpoons)\b/g, '\\$1');

  // 0f. Chuẩn hóa nhiệt độ độ C bị lỗi dạng \circC, ^\circC, ^\circ C, \circ C, °C, hỗ trợ cả số âm
  str = str.replace(/(-?\d+(?:(?:[.,]|\{,\})\d+)?)\s*(?:\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)|\^\s*°\s*C\b|°\s*C\b)/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°C`;
  });

  // 0g. Phục hồi \notin khi bị rách thành otin hoặc mất dấu gạch chéo
  str = str.replace(/\\+otin\b/g, '\\notin');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)otin\b/g, '\\notin');
  str = str.replace(/\bnot\s+in\b/gi, '\\notin');

  // 0h. Loại bỏ dấu backslash thừa giữa các hàng nghìn trong số lớn (e.g. 40\ 000 -> 40 000, 13\ 920\ 000 -> 13 920 000)
  while (/(\d+)\\\s+(\d+)/.test(str)) {
    str = str.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }

  // 1. Phục hồi mũi tên \rightarrow và \rightleftharpoons khi bị mất backslash hoặc bị rách chữ
  str = str.replace(/\\+[ \t]*ightarrow\b/gi, '\\rightarrow');
  str = str.replace(/\r\s*ightarrow\b/gi, '\\rightarrow');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ightarrow\b/gi, '\\rightarrow');

  str = str.replace(/\\+[ \t]*ightleftharpoons\b/gi, '\\rightleftharpoons');
  str = str.replace(/\r\s*ightleftharpoons\b/gi, '\\rightleftharpoons');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ightleftharpoons\b/gi, '\\rightleftharpoons');

  // 2. Phục hồi lệnh \right bị mất '\r' thành ight, \ ight hoặc \\ ight
  str = str.replace(/\\+[ \t]*ight\s*([)\]}|.])/g, '\\right$1');
  str = str.replace(/\\+[ \t]*ight\s*\\([{}])/g, '\\right\\$1');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ight\s*([)\]}|.])/g, '\\right$1');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)ight\s*\\([{}])/g, '\\right\\$1');
  str = str.replace(/\\\\\s*\\right/g, ' \\right');
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

  // 6. Phục hồi ký hiệu góc \beta bị biến thành eta do mất \b hoặc ASCII 0x08:
  str = str.replace(/\x08eta\b/gi, '\\beta');
  str = str.replace(/\\+eta\b/gi, (m, offset) => {
    // Nếu trong ngữ cảnh góc nhọn / phụ nhau / đi liền với \alpha thì luôn là \beta
    const before = str.substring(Math.max(0, offset - 40), offset);
    const after = str.substring(offset, Math.min(str.length, offset + 40));
    if (/alpha|phụ|bù|tam giác|sin|cos|tan|cot|góc/i.test(before) || /phụ|bù|90|180|45|cos|sin/i.test(after)) {
      return '\\beta';
    }
    return m;
  });
  // Khắc phục chữ "eta" thường trong ngữ cảnh toán học / góc:
  str = str.replace(/(?<=\\alpha[^\w\\]*(?:và|va|hoặc|hoac|,|\+|-|\*|\/|=)\s*)eta\b/gi, '\\beta');
  str = str.replace(/(?<=(?:sin|cos|tan|cot|\\sin|\\cos|\\tan|\\cot)\s*)eta\b/gi, '\\beta');
  str = str.replace(/\b(sin|cos|tan|cot)\s*eta\b/gi, '\\$1 \\beta');
  str = str.replace(/(?<=[=+\-*/(\s,]|^)eta(?=\s*=\s*(?:90|180|45|30|60|\d+))/gi, '\\beta');
  str = str.replace(/(?<=[=+\-*/(\s,]|^)eta(?=\s*phụ\s+nhau|\s*=\s*90^\circ)/gi, '\\beta');
  str = str.replace(/\\alpha\s*\+\s*eta\b/gi, '\\alpha + \\beta');
  str = str.replace(/\\alpha\s*=\s*eta\b/gi, '\\alpha = \\beta');
  str = str.replace(/([A-Za-z])\s*=\s*eta\b/g, '$1 = \\beta');

  // 7. Phục hồi \tan bị rách thành an (như an\alpha, an\beta, an eta, an60^\circ, anQ, an A):
  str = str.replace(/\tan\b/g, '\\tan');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\\alpha\b/g, '\\tan \\alpha');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\\beta\b/g, '\\tan \\beta');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\s*eta\b/g, '\\tan \\beta');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\s*an\s*(?:eta|\\beta)\b/g, '\\tan \\beta');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\s*(\d+\s*(?:°|\\circ|\^|\b))/g, '\\tan $1');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an([A-Z])\b/g, '\\tan $1');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)an\s+([A-Z]\b|\\alpha|\\beta|\\widehat|\()/g, '\\tan $1');
  str = str.replace(/([=+\-*/\cdot\s($]|^)an(?=\s*[\d(]|[A-Za-z]\b|\\alpha|\\beta|\\widehat)/g, '$1\\tan ');

  // Khử ngắt dòng vô lý giữa toán tử và toán hạng trong công thức bị gãy từ AI:
  str = str.replace(/(\\alpha\s*[\+\-\*\/\=])\s*[\r\n]+\s*(\\?beta|eta)\b/gi, '$1 \\beta');
  str = str.replace(/(\\sin\s*\\alpha\s*=\s*\\cos)\s*[\r\n]+\s*(\\?beta|eta)\b/gi, '$1 \\beta');
  str = str.replace(/(\\cos\s*\\alpha\s*=\s*\\sin)\s*[\r\n]+\s*(\\?beta|eta)\b/gi, '$1 \\beta');
  str = str.replace(/(\\tan\s*\\alpha\s*=\s*\\cot)\s*[\r\n]+\s*(\\?beta|eta)\b/gi, '$1 \\beta');
  str = str.replace(/(\\tan\s*\\alpha\s*=)\s*[\r\n]+\s*(?:\\tan|an)\s*[\r\n]+\s*(\\?beta|eta)\b/gi, '$1 \\tan \\beta');
  str = str.replace(/(\\alpha\s*=)\s*[\r\n]+\s*(\\?beta|eta)\s*=\s*45/gi, '$1 \\beta = 45');

  // 8. Phục hồi \ne và \neq khi bị biến thành chữ 'e' / 'eq' đơn lẻ trong ngữ cảnh điều kiện xác định / so sánh
  // Bắt mọi trường hợp: x e4, x e - 1, x - 4 e0, x + 1 e0, x e \frac{5}{2}, xe1, xe4, xe0, v.v.
  str = str.replace(/(\b[xyzabcmkntuvpqrXYZABCMKNTUVPQR](?:\s*[+\-–—−]\s*\d+)?|[)\\}])\s*(?:\\?e|\\?eq)\s*([–—−\-]?\s*(?:\\(?:d?frac|frac)\{[^{}]+\}\{[^{}]+\}|\d+(?:[.,]\d+)?|[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b|\\sqrt\{[^{}]+\}))/g, (m, lhs, val) => {
    const cleanVal = val.replace(/^[–—−]/, '-').replace(/\s+/g, '');
    return `${lhs.trim()} \\ne ${cleanVal}`;
  });

  str = str.replace(/(?<=\s|[;,(])(?:\\?e|\\?eq)\s*([–—−\-]?\s*(?:\\(?:d?frac|frac)\{[^{}]+\}\{[^{}]+\}|\d+(?:[.,]\d+)?|[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b|\\sqrt\{[^{}]+\}))(?=\s|[,;.!?)(\$\]]|$)/g, (m, val) => {
    const cleanVal = val.replace(/^[–—−]/, '-').replace(/\s+/g, '');
    return `\\ne ${cleanVal}`;
  });

  str = str.replace(/\b([xyzabcmkntuvpqrXYZABCMKNTUVPQR])\s*e\s*(?=[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b)/g, '$1 \\ne ');

  // Sửa trường hợp AI xuống dòng giữa biến/biểu thức và e: "x\n e4", "x - 4\n e0"
  str = str.replace(/([xyzabcmkntuvpqrXYZABCMKNTUVPQR](?:\s*[\+\-]\s*\d+)?)\s*[\r\n]+\s*(?:\\ne|e)\s*([–—−\-]?\s*(?:\\(?:d?frac|frac)\{[^{}]+\}\{[^{}]+\}|\d+(?:[.,]\d+)?|[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b))/g, (m, v, val) => {
    const cleanVal = val.replace(/^[–—−]/, '-').replace(/\s+/g, '');
    return `${v} \\ne ${cleanVal}`;
  });

  // 9. Phục hồi chữ "n " đơn độc ở đầu dòng do \n bị mất dấu gạch chéo:
  str = str.replace(/(^|[\r\n])n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1$2');
  str = str.replace(/(\([0-9a-zA-Z]+\))n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1\n$2');
  str = str.replace(/([.?!:;])\s*n\s+([A-ZÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1\n$2');

  // 10. Phục hồi \begin bị mất \b: egin{ -> \begin{
  str = str.replace(/\x08egin\{/g, '\\begin{');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)egin\{/g, '\\begin{');

  // 11. Phục hồi \times bị mất \t: imes -> \times
  str = str.replace(/\times\b/g, '\\times');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)imes\b/g, '\\times');

  return LatexPostProcessingValidator.correctString(str);
}

/**
 * Làm sạch hoàn toàn các ghi chú nội bộ, suy nghĩ CoT (Chain-of-Thought)
 * và tự sửa chữa (Self-correction, Revised explanation) bằng tiếng Anh bị AI xuất vào lời giải
 */
export function cleanExplanationAndNotes(text: string): string {
  if (!text) return '';
  let str = text;

  // 1. Xóa các khối *Self-correction: ... Revised ... explanation:*
  str = str.replace(
    /\*?\s*Self-correction[\s\S]*?(?:Revised[^\n:]*explanation:\s*|\n\n(?=(?:[a-dA-D0-9][\.\)]|\bThay\b|\bLời giải\b|\bTa có\b|\bXét\b|\bPhương trình\b|\bĐiều kiện\b|\bVì\b|\bDo\b|\bVậy\b|\bÁp dụng\b|\bTheo đề\b))|(?=\n\s*[a-dA-D][\.\)]\s))/gi,
    ''
  );

  // 2. Xóa các tiền tố Self-correction đơn độc nếu còn sót
  str = str.replace(/\*?\s*Self-correction:[\s\S]*?(?:\n\n|\*)/gi, '');

  // 3. Xóa các dòng tiêu đề Revised explanation / Revised Q...
  str = str.replace(/Revised\s+(?:Q\d+|Part\d+|question)?[^\n:]*explanation:\s*/gi, '');

  // 4. Xóa các khối Chain-of-thought, Internal note, Thought process
  str = str.replace(/\*?\s*(?:Chain-of-thought|Thought process|Thinking process|Internal note|Reasoning):[\s\S]*?(?:\n\n|\*)/gi, '');

  // 5. Xóa các đoạn mở đầu tiếng Anh bắt đầu bằng *The problem states... hoặc *Let's check...
  str = str.replace(/^\s*\*?(?:The problem states|Let's check|I need to make sure|To ensure|My original)[\s\S]*?(?:\n\n|(?=\n[a-dA-D0-9][\.\)]|\bThay\b|\bLời giải\b|\bTa có\b))/gi, '');

  // 6. Xóa các dấu sao thừa ở đầu/cuối sau khi đã bóc tách
  str = str.trim();
  if (str.startsWith('*') && !str.slice(1).includes('*')) {
    str = str.replace(/^\*+\s*/, '');
  }
  if (str.endsWith('*') && !str.slice(0, -1).includes('*')) {
    str = str.replace(/\s*\*+$/, '');
  }

  return str.trim();
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

  // 3. Tách text theo các khối toán ($...$, $$...$$, hoặc môi trường \begin{...}...\end{...})
  const mathBlockRegex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|\\begin\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\}[\s\S]*?\\end\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\})/g;

  const parts = str.split(mathBlockRegex);
  for (let i = 0; i < parts.length; i += 2) {
    if (!parts[i]) continue;
    let plain = parts[i];

    // Chuyển chuỗi literal "\n" thành '\n' CHỈ KHI không phải là lệnh LaTeX hợp lệ
    // Các lệnh LaTeX hợp lệ bắt đầu bằng \n: \ne, \neq, \notin, \nabla, \ni, \not, \nexists, \ngtr, \nless, \ngeq, \nleq, \natural, \nearrow, \nu
    plain = plain.replace(
      /\\+n(?!(?:ne|neq|notin|nabla|ni|not|nexists|ngtr|nless|ngeq|nleq|natural|nearrow|nu|Leftarrow|Leftrightarrow|Rightarrow)\b)/g,
      '\n'
    );

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

