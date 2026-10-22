import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'katex/dist/contrib/mhchem.js';
import { autoWrapUnwrappedLatex, cleanLatexForDocx } from '../services/exportDocx';
import { normalizeNewlines, cleanMathNewlines, repairLatexCorruptions } from '../utils/textUtils';

interface MathTextProps {
  content?: string;
  text?: string;
  className?: string;
}

function cleanMathForKaTeX(str: string): string {
  // 1. Phục hồi ngay các từ khóa bị mất \r, \frac, \begin
  let s = repairLatexCorruptions(str);
  s = cleanMathNewlines(s);
  s = s.replace(/\\$/, '');
  
  // 2. Chuẩn hóa ký hiệu độ C và góc độ
  // Mọi biến thể độ C: \circC, ^\circC, ^\circ C, \circ C, °C, ^{\circ}C, ^\circ\text{C} -> ^\circ\text{C}
  s = s.replace(/\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)/g, '^\\circ\\text{C}');
  s = s.replace(/\^\{\s*°\s*C\s*\}/g, '^\\circ\\text{C}');
  s = s.replace(/\^\s*°\s*C\b/g, '^\\circ\\text{C}');
  s = s.replace(/°\s*C\b/g, '^\\circ\\text{C}');

  // Góc độ thuần (không đi kèm chữ C)
  s = s.replace(/\\degree\b/g, '^\\circ');
  s = s.replace(/\^\{\s*°\s*\}/g, '^\\circ');
  s = s.replace(/\^\s*°/g, '^\\circ');
  s = s.replace(/°/g, '^\\circ');
  s = s.replace(/(\d+)\s*\\circ\b/g, '$1^\\circ');

  // 3. Loại bỏ \cdot hoặc dấu chấm phẩy thừa ở cuối công thức
  s = s.replace(/\\cdot\s*$/g, '');
  s = s.replace(/;\s*$/g, '');

  // 4. Tự động đóng môi trường \begin{cases} nếu thiếu \end{cases}
  const beginCases = (s.match(/\\begin\{cases\}/g) || []).length;
  const endCases = (s.match(/\\end\{cases\}/g) || []).length;
  if (beginCases > endCases) {
    s += ' \\end{cases}'.repeat(beginCases - endCases);
  }

  // 5. Loại bỏ các \\ right. thừa đứng ngoài cases
  s = s.replace(/\\end\{cases\}(\s*\\right\.)+/g, '\\end{cases}');

  // 6. Cân bằng \left và \right cho từng dòng trong cases hoặc biểu thức thông thường
  if (/\\begin\{(cases|aligned|array|matrix|pmatrix|bmatrix)\}/.test(s)) {
    s = s.replace(
      /(\\begin\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\})([\s\S]*?)(\\end\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\})/g,
      (match, beginTag, inner, endTag) => {
        const lines = inner.split(/\\\\/);
        const balancedLines = lines.map((line: string) => {
          let l = line;
          const leftCount = (l.match(/\\left(\b|[([{|.]|\\[{}])/g) || []).length;
          const rightCount = (l.match(/\\right(\b|[)\]}|.]|\\[{}])/g) || []).length;
          if (leftCount > rightCount) {
            l += ' \\right.'.repeat(leftCount - rightCount);
          } else if (rightCount > leftCount) {
            l = ' \\left.'.repeat(rightCount - leftCount) + l;
          }
          return l;
        });
        return `${beginTag}${balancedLines.join(' \\\\ ')}${endTag}`;
      }
    );
  } else {
    const leftMatches = s.match(/\\left(\b|[([{|.]|\\[{}])/g) || [];
    const rightMatches = s.match(/\\right(\b|[)\]}|.]|\\[{}])/g) || [];
    if (leftMatches.length > rightMatches.length) {
      s += ' \\right.'.repeat(leftMatches.length - rightMatches.length);
    } else if (rightMatches.length > leftMatches.length) {
      s = ' \\left.'.repeat(rightMatches.length - leftMatches.length) + s;
    }
  }

  return s;
}

export const MathText: React.FC<MathTextProps> = ({ content, text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const actualText = content ?? text ?? '';

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    el.innerHTML = '';

    if (!actualText) return;

    // 0. Phục hồi ngay lập tức các lệnh LaTeX bị mất \r (ight), \rightarrow, \frac
    let preparedText = repairLatexCorruptions(actualText);

    // 1. Chuẩn hóa trước \[ ... \] thành $$ ... $$ và \( ... \) thành $ ... $
    preparedText = normalizeNewlines(preparedText);
    preparedText = preparedText.replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `$$${inner.trim()}$$`);
    preparedText = preparedText.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${inner.trim()}$`);

    const formattedContent = autoWrapUnwrappedLatex(preparedText);

    // Regex tách các thẻ $...$ hoặc $$...$$
    const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/gs;
    const parts = formattedContent.split(mathRegex);

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
        // Display Math Block
        const mathStr = cleanMathForKaTeX(part.slice(2, -2));
        const span = document.createElement('span');
        span.className = 'my-2 block text-center overflow-x-auto py-1 font-sans';
        try {
          katex.render(mathStr, span, { displayMode: true, throwOnError: false });
        } catch {
          span.textContent = cleanLatexForDocx(mathStr) || mathStr;
        }
        el.appendChild(span);
      } else if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
        // Inline Math (Tự động chuyển sang displayMode nếu chứa môi trường nhiều dòng như hệ phương trình cases)
        const mathStr = cleanMathForKaTeX(part.slice(1, -1));
        const isMultiLineEnv = /\\begin\{(cases|aligned|array|matrix|pmatrix|bmatrix)\}/.test(mathStr);
        const span = document.createElement('span');
        span.className = isMultiLineEnv
          ? 'inline-block my-1 align-middle px-1 overflow-x-auto font-sans text-left'
          : 'inline-block px-0.5 align-middle';
        try {
          katex.render(mathStr, span, { displayMode: isMultiLineEnv, throwOnError: false });
        } catch {
          span.textContent = cleanLatexForDocx(mathStr) || mathStr;
        }
        el.appendChild(span);
      } else {
        // Text thường: Hỗ trợ ngắt dòng \n, chuyển đổi mũi tên \rightarrow, \Leftrightarrow trong văn bản và loại bỏ ký hiệu thoát
        let cleanPart = normalizeNewlines(part);
        cleanPart = cleanPart.replace(/\\?\{\s*,\s*\\?\}/g, ',');
        cleanPart = cleanPart.replace(/\\rightarrow(?![a-zA-Z])/g, ' → ')
                             .replace(/\\Leftrightarrow(?![a-zA-Z])/g, ' ⇔ ')
                             .replace(/\\Rightarrow(?![a-zA-Z])/g, ' ⇒ ');
        const lines = cleanPart.split('\n');
        lines.forEach((line, index) => {
          if (line) {
            el.appendChild(document.createTextNode(line));
          }
          if (index < lines.length - 1) {
            el.appendChild(document.createElement('br'));
          }
        });
      }
    });
  }, [actualText]);

  return <span ref={containerRef} className={`math-rendered inline ${className}`} />;
};
