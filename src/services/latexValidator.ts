import { ExamPackage, Question } from '../types';

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


export interface LatexCorrectionRule {
  id: string;
  name: string;
  pattern: RegExp;
  replacement: string | ((substring: string, ...args: any[]) => string);
  description: string;
}

/**
 * Danh mục các quy tắc Regex kiểm tra và sửa lỗi ký hiệu toán học / LaTeX
 * được tinh chỉnh sâu cho tiếng Việt và dữ liệu xuất từ LLM
 */
export const LATEX_CORRECTION_RULES: LatexCorrectionRule[] = [
  // 1. KHÔI PHỤC KÝ TỰ ĐIỀU KHIỂN ASCII BỊ LỖI DO JSON ESCAPING
  {
    id: 'ascii-backspace-beta-begin',
    name: 'Khôi phục ASCII 0x08 (backspace) thành \\beta hoặc \\begin',
    pattern: /\x08(eta|egin\{)/gi,
    replacement: (m, p1) => (p1.toLowerCase().startsWith('eta') ? '\\beta' : '\\begin{'),
    description: 'Khắc phục \\b bị parse thành backspace (0x08)',
  },
  {
    id: 'ascii-tab-tan-text-times',
    name: 'Khôi phục ASCII 0x09 (tab) thành \\tan, \\text, \\times, \\theta',
    pattern: /\t(an|ext|imes|heta|au|riangle|ilde)\b/gi,
    replacement: (m, p1) => `\\${p1}`,
    description: 'Khắc phục \\t bị parse thành tab (0x09)',
  },
  {
    id: 'ascii-formfeed-frac',
    name: 'Khôi phục ASCII 0x0C (formfeed) thành \\frac',
    pattern: /\x0C(rac\{|lat|rown|forall|[a-zA-Z]+)/g,
    replacement: (m, p1) => `\\f${p1}`,
    description: 'Khắc phục \\f bị parse thành formfeed (0x0C)',
  },
  {
    id: 'ascii-formfeed-strip',
    name: 'Loại bỏ ký tự formfeed đơn độc',
    pattern: /\x0C/g,
    replacement: '',
    description: 'Xóa ký tự 0x0C sót lại',
  },
  {
    id: 'ascii-newline-math-prefix',
    name: 'Khôi phục ASCII 0x0A (newline) dính vào tên lệnh toán',
    pattern: /\x0A(otin|eq|abla|neq|ni)\b/g,
    replacement: (m, p1) => `\\n${p1}`,
    description: 'Khắc phục \\n dính vào otin, eq',
  },

  // 2. KHÔI PHỤC \tan BỊ RÁCH HOẶC MẤT CHỮ 't' (anQ, anP, anA, anB, an\alpha, ...)
  {
    id: 'tan-uppercase-vertex',
    name: 'Khôi phục an[A-Z] thành \\tan [A-Z] (như anP, anQ, anA, anB, anC, anD, anM, anN)',
    pattern: /(?<=[^a-zA-Z\\]|^)an\s*([A-Z])\b/g,
    replacement: '\\tan $1',
    description: 'Sửa anP -> \\tan P, anQ -> \\tan Q, anA -> \\tan A',
  },
  {
    id: 'tan-alpha-short',
    name: 'Khôi phục an a, ana thành \\tan \\alpha',
    pattern: /(?<=[^a-zA-Z\\]|^)(?:an\s*a\b|ana\b)/g,
    replacement: '\\tan \\alpha',
    description: 'Sửa an a, ana -> \\tan \\alpha',
  },
  {
    id: 'tan-alpha-beta-theta-widehat',
    name: 'Khôi phục an\\alpha, an\\beta, an\\theta, an\\widehat',
    pattern: /(?<=[^a-zA-Z\\]|^)an\s*(\\alpha|\\beta|\\theta|\\widehat|\\angle)\b/g,
    replacement: '\\tan $1',
    description: 'Sửa an\\alpha -> \\tan \\alpha, an\\beta -> \\tan \\beta',
  },
  {
    id: 'tan-eta-angle',
    name: 'Khôi phục an eta / an \\eta thành \\tan \\beta',
    pattern: /(?<=[^a-zA-Z\\]|^)an\s*(?:eta|\\eta)\b/gi,
    replacement: '\\tan \\beta',
    description: 'Sửa an eta -> \\tan \\beta',
  },
  {
    id: 'tan-double-an-eta',
    name: 'Khôi phục an an eta thành \\tan \\beta',
    pattern: /(?<=[^a-zA-Z\\]|^)an\s*an\s*(?:eta|\\beta|\\alpha)\b/gi,
    replacement: '\\tan \\beta',
    description: 'Sửa an an eta -> \\tan \\beta',
  },
  {
    id: 'tan-degree',
    name: 'Khôi phục an đi kèm độ (như an 60°, an30^\\circ)',
    pattern: /(?<=[^a-zA-Z\\]|^)an\s*(\d+\s*(?:°|\\circ|\^|\b))/g,
    replacement: '\\tan $1',
    description: 'Sửa an 60° -> \\tan 60°',
  },
  {
    id: 'tan-before-math-operand',
    name: 'Khôi phục an đứng trước toán hạng hoặc sau toán tử',
    pattern: /([=+\-*/\cdot\s($]|^)an(?=\s*[\d(]|[A-Za-z]\b|\\alpha|\\beta|\\widehat)/g,
    replacement: '$1\\tan ',
    description: 'Sửa an trong biểu thức toán thành \\tan',
  },
  {
    id: 'tan-missing-backslash',
    name: 'Bổ sung backslash cho tan đứng trước biến số / góc',
    pattern: /(?<=[^a-zA-Z\\]|^)tan\s*([A-Z]\b|\\alpha|\\beta|\\theta|\\widehat|\()/g,
    replacement: '\\tan $1',
    description: 'Chuẩn hóa tan -> \\tan',
  },
  {
    id: 'trig-missing-backslash-angles',
    name: 'Bổ sung backslash cho sin, cos, tan, cot đứng trước góc hoặc đỉnh',
    pattern: /(?<!\\)\b(sin|cos|tan|cot)\s*(\\alpha|\\beta|\\gamma|\\theta|[A-Z]\b)/g,
    replacement: (m, fn, ang) => `\\${fn} ${ang}`,
    description: 'Chuẩn hóa cot \\beta -> \\cot \\beta, sin \\alpha -> \\sin \\alpha',
  },

  // 3. KHÔI PHỤC \cot, \sin, \cos BỊ DÍNH TÊN ĐỈNH (cotQ, sinQ, cosQ)
  {
    id: 'cot-uppercase-vertex',
    name: 'Khôi phục cot[A-Z] thành \\cot [A-Z] (như cotQ, cotA, cotB)',
    pattern: /(?<=[^a-zA-Z\\]|^)cot([A-Z])\b/g,
    replacement: '\\cot $1',
    description: 'Sửa cotQ -> \\cot Q',
  },
  {
    id: 'sin-uppercase-vertex',
    name: 'Khôi phục sin[A-Z] thành \\sin [A-Z] (như sinQ, sinA, sinB)',
    pattern: /(?<=[^a-zA-Z\\]|^)sin([A-Z])\b/g,
    replacement: '\\sin $1',
    description: 'Sửa sinQ -> \\sin Q',
  },
  {
    id: 'cos-uppercase-vertex',
    name: 'Khôi phục cos[A-Z] thành \\cos [A-Z] (như cosQ, cosA, cosB)',
    pattern: /(?<=[^a-zA-Z\\]|^)cos([A-Z])\b/g,
    replacement: '\\cos $1',
    description: 'Sửa cosQ -> \\cos Q',
  },

  // 4. KHÔI PHỤC GÓC \beta BỊ BIẾN THÀNH 'eta' DO MẤT '\b'
  {
    id: 'beta-after-alpha-relation',
    name: 'Khôi phục eta thành \\beta sau \\alpha và liên từ/phép tính',
    pattern: /(?<=\\alpha[^\w\\]*(?:và|va|hoặc|hoac|,|\+|-|\*|\/|=)\s*)eta\b/gi,
    replacement: '\\beta',
    description: 'Sửa \\alpha và eta -> \\alpha và \\beta',
  },
  {
    id: 'beta-after-trig-function',
    name: 'Khôi phục eta thành \\beta sau sin, cos, tan, cot',
    pattern: /(?<=(?:\\sin|\\cos|\\tan|\\cot|sin|cos|tan|cot)\s*)eta\b/gi,
    replacement: '\\beta',
    description: 'Sửa sin eta, cos eta -> \\sin \\beta, \\cos \\beta',
  },
  {
    id: 'beta-equation-angles',
    name: 'Khôi phục eta thành \\beta trong phương trình góc (eta = 90°, eta phụ nhau)',
    pattern: /(?<=[=+\-*/(\s,]|^)eta(?=\s*=\s*(?:90|180|45|30|60|\d+)|phụ\s+nhau|bù\s+nhau)/gi,
    replacement: '\\beta',
    description: 'Sửa eta = 90° -> \\beta = 90°',
  },
  {
    id: 'beta-alpha-plus-eta',
    name: 'Khôi phục \\alpha + eta thành \\alpha + \\beta',
    pattern: /\\alpha\s*\+\s*eta\b/gi,
    replacement: '\\alpha + \\beta',
    description: 'Sửa \\alpha + eta -> \\alpha + \\beta',
  },
  {
    id: 'beta-alpha-equal-eta',
    name: 'Khôi phục \\alpha = eta thành \\alpha = \\beta',
    pattern: /\\alpha\s*=\s*eta\b/gi,
    replacement: '\\alpha = \\beta',
    description: 'Sửa \\alpha = eta -> \\alpha = \\beta',
  },

  // 5. KHÔI PHỤC DẤU KHÁC \ne BỊ BIẾN THÀNH 'e' HOẶC 'eq' (xe4, x e4, x e - 4, x e \frac{5}{2}, x e0, x - 4 e0)
  {
    id: 'ne-var-any-value',
    name: 'Khôi phục [biến/biểu thức] e [giá trị/phân số/số âm] thành \\ne',
    pattern: /(\b[xyzabcmkntuvpqrXYZABCMKNTUVPQR](?:\s*[+\-–—−]\s*\d+)?|[)\\}])\s*(?:\\?e|\\?eq)\s*([–—−\-]?\s*(?:\\(?:d?frac|frac)\{[^{}]+\}\{[^{}]+\}|\d+(?:[.,]\d+)?|[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b|\\sqrt\{[^{}]+\}))/g,
    replacement: (m, lhs, val) => {
      const cleanVal = val.replace(/^[–—−]/, '-').replace(/\s+/g, '');
      return `${lhs.trim()} \\ne ${cleanVal}`;
    },
    description: 'Sửa x e4 -> x \\ne 4, x e - 4 -> x \\ne -4, x e \\frac{5}{2} -> x \\ne \\frac{5}{2}',
  },
  {
    id: 'ne-standalone-e-any-value',
    name: 'Khôi phục chữ e đứng trước giá trị trong ngữ cảnh toán thành \\ne',
    pattern: /(?<=\s|[;,(])(?:\\?e|\\?eq)\s*([–—−\-]?\s*(?:\\(?:d?frac|frac)\{[^{}]+\}\{[^{}]+\}|\d+(?:[.,]\d+)?|[xyzabcmkntuvpqrXYZABCMKNTUVPQR]\b|\\sqrt\{[^{}]+\}))(?=\s|[,;.!?)(\$\]]|$)/g,
    replacement: (m, val) => {
      const cleanVal = val.replace(/^[–—−]/, '-').replace(/\s+/g, '');
      return `\\ne ${cleanVal}`;
    },
    description: 'Sửa e - 4 -> \\ne -4, e \\frac{5}{2} -> \\ne \\frac{5}{2}, e0 -> \\ne 0',
  },
  {
    id: 'ne-expr-number-legacy',
    name: 'Khôi phục [biểu thức] e [số]',
    pattern: /\b([xyzabcmkntuvpqrXYZABCMKNTUVPQR]\s*[\+\-–—−]\s*\d+)\s*e\s*(-?\s*\d+)/g,
    replacement: (m, expr, n) => `${expr} \\ne ${n.replace(/\s+/g, '')}`,
    description: 'Sửa x - 4 e0 -> x - 4 \\ne 0',
  },
  {
    id: 'ne-closing-bracket-e-number',
    name: 'Khôi phục ngoặc đóng ) e [số] thành ) \\ne [số]',
    pattern: /([)\}]\s*)e\s*(-?\s*\d+)/g,
    replacement: (m, p1, n) => `${p1}\\ne ${n.replace(/\s+/g, '')}`,
    description: 'Sửa (x) e 0 -> (x) \\ne 0',
  },

  // 6. KHÔI PHỤC CÁC BẤT ĐẲNG THỨC \le VÀ \ge BỊ RÁCH (\l\n\n\n\ne 0, \g\n\n\n\ne 0, \l\ne, \g\ne)
  {
    id: 'ineq-le-broken',
    name: 'Khôi phục \\le bị rách do lặp newline và e',
    pattern: /\\l(?:\s|\\+[nNrR])*(?:\\?ne|e)(?=\s*[\d+-]|\s*[a-zA-Z]\b|\s*\(|\s*\{|\s*$)/gi,
    replacement: '\\le ',
    description: 'Sửa \\l\\n\\n\\ne 0 -> \\le 0',
  },
  {
    id: 'ineq-ge-broken',
    name: 'Khôi phục \\ge bị rách do lặp newline và e',
    pattern: /\\g(?:\s|\\+[nNrR])*(?:\\?ne|e)(?=\s*[\d+-]|\s*[a-zA-Z]\b|\s*\(|\s*\{|\s*$)/gi,
    replacement: '\\ge ',
    description: 'Sửa \\g\\n\\n\\ne 0 -> \\ge 0',
  },
  {
    id: 'ineq-le-ne-short',
    name: 'Khôi phục \\l\\ne thành \\le',
    pattern: /\\l\s*\\?ne\b/gi,
    replacement: '\\le ',
    description: 'Sửa \\l\\ne -> \\le',
  },
  {
    id: 'ineq-ge-ne-short',
    name: 'Khôi phục \\g\\ne thành \\ge',
    pattern: /\\g\s*\\?ne\b/gi,
    replacement: '\\ge ',
    description: 'Sửa \\g\\ne -> \\ge',
  },

  // 7. KHÔI PHỤC HỆ PHƯƠNG TRÌNH \begin{cases} VÀ MŨI TÊN TƯƠNG ĐƯƠNG \Leftrightarrow
  {
    id: 'cases-from-curly-braces',
    name: 'Khôi phục hệ phương trình bị rơi về dạng { 2x - y = 3 x + 3y = 5 }',
    pattern: /(?<!\\begin)\s*\\?\{\s*([a-zA-Z0-9_\^\+\-\*/\(\)\s]+?=\s*[a-zA-Z0-9_\^\+\-\*/\(\)\s]+?)\s*(?:\\\\|;|(?<=\d|[a-zA-Z]|\))\s+(?=[a-zA-Z0-9_\-][^={}]*=))\s*([a-zA-Z0-9_\^\+\-\*/\(\)\s]+?=\s*[a-zA-Z0-9_\^\+\-\*/\(\)\s]+?)\s*\\?\}(?!\s*\\end)/g,
    replacement: (m, eq1, eq2) => {
      if (/^\\(text|mathrm|mathbf|frac|dfrac|sqrt|widehat|hat|vec|mathbb)\b/.test(eq1.trim())) return m;
      const cleanEq1 = eq1.trim().replace(/\\\\+$/, '').trim();
      const cleanEq2 = eq2.trim().replace(/^\\\\+/, '').trim();
      return `\\begin{cases} ${cleanEq1} \\\\ ${cleanEq2} \\end{cases}`;
    },
    description: 'Sửa { 2x - y = 3 x + 3y = 5 } -> \\begin{cases} 2x - y = 3 \\\\ x + 3y = 5 \\end{cases}',
  },
  {
    id: 'cases-missing-newline-separator',
    name: 'Bổ sung \\\\ giữa hai phương trình trong cases nếu bị mất',
    pattern: /\\begin\{cases\}\s*([^{}]+?)\s*\\end\{cases\}/g,
    replacement: (m, inner) => {
      if (/\\\\|\\cr|;/.test(inner)) {
        const normalized = inner.replace(/(\\\\\s*){2,}/g, ' \\\\ ');
        return `\\begin{cases} ${normalized.trim()} \\end{cases}`;
      }
      const eqMatch = inner.match(/^([^{}]+?=\s*[^={}\s]+)\s+([^{}]+?=\s*[^={}\s]+)$/);
      if (eqMatch) {
        return `\\begin{cases} ${eqMatch[1].trim()} \\\\ ${eqMatch[2].trim()} \\end{cases}`;
      }
      return m;
    },
    description: 'Bổ sung \\\\ trong \\begin{cases}',
  },
  {
    id: 'cases-begin-broken',
    name: 'Khôi phục \\begin{cases} bị rách thành \\begin{cas \\n \\n \\ne s}',
    pattern: /\\begin\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi,
    replacement: '\\begin{cases}',
    description: 'Sửa \\begin{cas \\n \\n \\ne s} -> \\begin{cases}',
  },
  {
    id: 'cases-end-broken',
    name: 'Khôi phục \\end{cases} bị rách thành \\end{cas \\n \\n \\ne s}',
    pattern: /\\end\{\s*cas(?:\s|\\+[nNrR]|\\?ne|\\[a-zA-Z]+)*s\s*\}/gi,
    replacement: '\\end{cases}',
    description: 'Sửa \\end{cas \\n \\n \\ne s} -> \\end{cases}',
  },
  {
    id: 'cases-missing-backslash',
    name: 'Bổ sung backslash cho begin{cases} / end{cases}',
    pattern: /(?<!\\)\b(begin|end)\{cases\}/g,
    replacement: '\\$1{cases}',
    description: 'Sửa begin{cases} -> \\begin{cases}',
  },
  {
    id: 'arrow-leftrightarrow-broken',
    name: 'Khôi phục mũi tên \\Leftrightarrow bị rách chuỗi \\Leftr... hoặc \\Left \\ne',
    pattern: /\\Left[rR]?(?:\\[rR]|\s|[\r\n]|\\+[nNrR]|\\?ne)*(?:\\?rightarrow|→)/gi,
    replacement: '\\Leftrightarrow ',
    description: 'Sửa \\Leftr\\r\\rightarrow -> \\Leftrightarrow',
  },
  {
    id: 'arrow-left-ne-broken',
    name: 'Khôi phục \\Left\\ne thành \\Leftrightarrow',
    pattern: /\\Left(?:\s|\\+[nNrR]|\\?ne)+(?:\\?Rightarrow|⇒|\\?Leftrightarrow|⇔|s\b)?/gi,
    replacement: '\\Leftrightarrow ',
    description: 'Sửa \\Left\\ne -> \\Leftrightarrow',
  },

  // 8. KHỬ LỖI XUỐNG DÒNG VÔ LÝ TRONG CÔNG THỨC TOÁN (GÂY LỖI KATEX & HIỂN THỊ DỌC)
  {
    id: 'newline-operator-operand',
    name: 'Khử ngắt dòng vô lý giữa toán tử và toán hạng trong công thức',
    pattern: /(\\alpha\s*[\+\-\*\/\=])\s*[\r\n]+\s*(\\?beta|eta)\b/gi,
    replacement: '$1 \\beta',
    description: 'Sửa \\alpha + \\n eta -> \\alpha + \\beta',
  },
  {
    id: 'newline-trig-beta',
    name: 'Khử ngắt dòng giữa hàm lượng giác và góc beta',
    pattern: /(\\sin|\\cos|\\tan|\\cot)\s*[\r\n]+\s*(\\?beta|eta)\b/gi,
    replacement: '$1 \\beta',
    description: 'Sửa cos \\n eta -> \\cos \\beta',
  },
  {
    id: 'newline-equality-trig',
    name: 'Khử ngắt dòng trong đẳng thức lượng giác',
    pattern: /(\\tan\s*\\alpha\s*=)\s*[\r\n]+\s*(?:\\tan|an)\s*[\r\n]+\s*(\\?beta|eta)\b/gi,
    replacement: '$1 \\tan \\beta',
    description: 'Sửa an\\alpha = \\n an \\n eta -> \\tan \\alpha = \\tan \\beta',
  },
  {
    id: 'newline-var-ne-num',
    name: 'Khử ngắt dòng giữa biến và dấu khác (x \\n e4 -> x \\ne 4)',
    pattern: /([xyzabcmkntuvpqrXYZABCMKNTUVPQR](?:\s*[\+\-]\s*\d+)?)\s*[\r\n]+\s*(?:\\ne|e)\s*(-?\s*\d+)/g,
    replacement: (m, v, n) => `${v} \\ne ${n.replace(/\s+/g, '')}`,
    description: 'Sửa x \\n e4 -> x \\ne 4',
  },
  {
    id: 'repeated-n-before-ne',
    name: 'Khử các chuỗi \\n\\n\\n\\ne thừa',
    pattern: /(?:\\+[nNrR]\s*){1,}\\?ne\b/gi,
    replacement: ' \\ne ',
    description: 'Sửa \\n\\n\\ne -> \\ne',
  },

  // 9. KHÔI PHỤC CÁC TỪ KHÓA LATEX CƠ BẢN BỊ RÁCH (frac, text, times, begin, right, left)
  {
    id: 'frac-torn',
    name: 'Khôi phục \\frac bị rách (rac{ -> \\frac{)',
    pattern: /(?:\\+rac\{|(?<=[^a-zA-Z\\]|^)rac\{|(?<=[^a-zA-Z\\]|^)d?frac\{)/g,
    replacement: '\\frac{',
    description: 'Sửa rac{ -> \\frac{',
  },
  {
    id: 'frac-shorthand-digits',
    name: 'Khôi phục phân số dạng tắt frac12 -> \\frac{1}{2}',
    pattern: /(?<=[^a-zA-Z\\]|^)frac(\d)(\d)\b/g,
    replacement: '\\frac{$1}{$2}',
    description: 'Sửa frac12 -> \\frac{1}{2}',
  },
  {
    id: 'frac-shorthand-letters',
    name: 'Khôi phục phân số đoạn thẳng fracABAC -> \\frac{AB}{AC}',
    pattern: /(?<=[^a-zA-Z\\]|^)frac([A-Z]{1,3})([A-Z]{1,3})\b/g,
    replacement: '\\frac{$1}{$2}',
    description: 'Sửa fracABAC -> \\frac{AB}{AC}',
  },
  {
    id: 'text-torn',
    name: 'Khôi phục \\text bị rách (ext{ -> \\text{)',
    pattern: /(?:\\+ext\{|(?<=[^a-zA-Z\\]|^)ext\{)/g,
    replacement: '\\text{',
    description: 'Sửa ext{ -> \\text{',
  },
  {
    id: 'times-torn',
    name: 'Khôi phục \\times bị rách (imes -> \\times)',
    pattern: /(?<=[^a-zA-Z\\]|^)imes\b/g,
    replacement: '\\times',
    description: 'Sửa imes -> \\times',
  },
  {
    id: 'begin-torn',
    name: 'Khôi phục \\begin bị rách (egin{ -> \\begin{)',
    pattern: /(?<=[^a-zA-Z\\]|^)egin\{/g,
    replacement: '\\begin{',
    description: 'Sửa egin{ -> \\begin{',
  },
  {
    id: 'right-bracket-torn',
    name: 'Khôi phục \\right bị rách (ight) -> \\right))',
    pattern: /(?<=[^a-zA-Z\\]|^)ight([)\]|}])/g,
    replacement: '\\right$1',
    description: 'Sửa ight) -> \\right)',
  },
  {
    id: 'left-bracket-torn',
    name: 'Khôi phục \\left bị rách (left( -> \\left()',
    pattern: /(?<!\\)\bleft([(\[{])/g,
    replacement: '\\left$1',
    description: 'Sửa left( -> \\left(',
  },
  {
    id: 'multiple-backslashes-cleanup',
    name: 'Khử dấu gạch chéo ngược thừa lặp lại (\\\\\\frac -> \\frac)',
    pattern: /\\{2,}(frac|dfrac|text|mathrm|mathbf|tan|sin|cos|cot|sqrt|vec|widehat|alpha|beta|gamma|ne|neq|le|leq|ge|geq|notin|in|Leftrightarrow|Rightarrow|rightarrow|rightleftharpoons)\b/g,
    replacement: '\\$1',
    description: 'Chuẩn hóa số lượng backslash trước lệnh LaTeX',
  },
];

export interface ValidationSummary {
  fixedCount: number;
  appliedRules: string[];
}

/**
 * Validator thực hiện kiểm tra và tự động thay thế/khắc phục các lỗi ký hiệu LaTeX
 */
export class LatexPostProcessingValidator {
  /**
   * Quét và sửa toàn diện chuỗi ký tự theo danh mục quy tắc regex
   */
  static validateAndCorrectString(input: string): { corrected: string; fixedCount: number; appliedRules: string[] } {
    if (!input || typeof input !== 'string') {
      return { corrected: input || '', fixedCount: 0, appliedRules: [] };
    }

    let str = cleanExplanationAndNotes(input);
    let totalFixed = 0;
    const applied: string[] = [];

    for (const rule of LATEX_CORRECTION_RULES) {
      if (rule.pattern.test(str)) {
        // Đếm số lần xuất hiện
        const matches = str.match(rule.pattern);
        const count = matches ? matches.length : 1;
        totalFixed += count;
        applied.push(`${rule.id} (${count}x)`);

        // Thay thế bằng regex
        if (typeof rule.replacement === 'function') {
          str = str.replace(rule.pattern, rule.replacement as any);
        } else {
          str = str.replace(rule.pattern, rule.replacement);
        }
      }
    }

    return {
      corrected: str,
      fixedCount: totalFixed,
      appliedRules: applied,
    };
  }

  /**
   * Sửa chữa trực tiếp một chuỗi văn bản (hàm tiện ích nhanh)
   */
  static correctString(input: string): string {
    return this.validateAndCorrectString(input).corrected;
  }

  /**
   * Quét và sửa toàn diện một đối tượng câu hỏi Question
   */
  static validateAndCorrectQuestion(question: Question): { question: Question; fixedCount: number; appliedRules: string[] } {
    if (!question) return { question, fixedCount: 0, appliedRules: [] };

    let totalFixed = 0;
    const allApplied: string[] = [];

    const fixField = (val: string | undefined): string | undefined => {
      if (!val) return val;
      const res = this.validateAndCorrectString(val);
      if (res.fixedCount > 0) {
        totalFixed += res.fixedCount;
        allApplied.push(...res.appliedRules);
      }
      return res.corrected;
    };

    const correctedQ: Question = {
      ...question,
      content: fixField(question.content) || question.content,
      explanation: fixField(question.explanation),
      shortAnswer: fixField(question.shortAnswer),
      essayAnswerGuide: fixField(question.essayAnswerGuide),
      options: question.options?.map((opt) => {
        const fixedContent = fixField(opt.content) || opt.content;
        return {
          ...opt,
          content: fixedContent,
        };
      }),
      trueFalseStatements: question.trueFalseStatements?.map((stmt) => {
        const fixedContent = fixField(stmt.content) || stmt.content;
        return {
          ...stmt,
          content: fixedContent,
        };
      }),
      rubric: question.rubric?.map((r) => ({
        ...r,
        criteria: fixField(r.criteria) || r.criteria,
        description: fixField(r.description) || r.description,
      })),
    };

    return {
      question: correctedQ,
      fixedCount: totalFixed,
      appliedRules: Array.from(new Set(allApplied)),
    };
  }

  /**
   * Quét và sửa một danh sách các câu hỏi
   */
  static validateAndCorrectQuestions(questions: Question[]): { questions: Question[]; totalFixed: number } {
    let totalFixed = 0;
    const validatedQuestions = (questions || []).map((q) => {
      const res = this.validateAndCorrectQuestion(q);
      totalFixed += res.fixedCount;
      return res.question;
    });

    return {
      questions: validatedQuestions,
      totalFixed,
    };
  }

  /**
   * Quét và chuẩn hóa toàn bộ một gói đề thi ExamPackage trước khi lưu
   */
  static validateAndCorrectExamPackage(pkg: ExamPackage): { examPackage: ExamPackage; totalFixed: number; appliedSummary: string[] } {
    if (!pkg) return { examPackage: pkg, totalFixed: 0, appliedSummary: [] };

    let totalFixed = 0;
    const allRules: string[] = [];

    const updatedExams = (pkg.exams || []).map((exam) => {
      const qRes = this.validateAndCorrectQuestions(exam.questions || []);
      totalFixed += qRes.totalFixed;
      return {
        ...exam,
        questions: qRes.questions,
      };
    });

    const updatedAnswerKeys = (pkg.answerKeys || []).map((ak) => {
      return {
        ...ak,
        part3Answers: ak.part3Answers?.map((p3) => {
          const res = this.validateAndCorrectString(p3.shortAnswer || '');
          if (res.fixedCount > 0) {
            totalFixed += res.fixedCount;
            allRules.push(...res.appliedRules);
          }
          return {
            ...p3,
            shortAnswer: res.corrected,
          };
        }),
        part4Answers: ak.part4Answers?.map((p4) => {
          const guideRes = this.validateAndCorrectString(p4.essayAnswerGuide || '');
          if (guideRes.fixedCount > 0) {
            totalFixed += guideRes.fixedCount;
            allRules.push(...guideRes.appliedRules);
          }
          return {
            ...p4,
            essayAnswerGuide: guideRes.corrected,
            rubric: p4.rubric?.map((r) => {
              const critRes = this.validateAndCorrectString(r.criteria || '');
              const descRes = this.validateAndCorrectString(r.description || '');
              totalFixed += critRes.fixedCount + descRes.fixedCount;
              return {
                ...r,
                criteria: critRes.corrected,
                description: descRes.corrected,
              };
            }),
          };
        }),
      };
    });

    const updatedPackage: ExamPackage = {
      ...pkg,
      exams: updatedExams,
      answerKeys: updatedAnswerKeys,
    };

    return {
      examPackage: updatedPackage,
      totalFixed,
      appliedSummary: Array.from(new Set(allRules)),
    };
  }
}
