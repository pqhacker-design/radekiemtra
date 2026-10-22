import {
  AlignmentType,
  BorderStyle,
  BuilderElement,
  Document,
  Footer,
  Header,
  ImageRun,
  Math as DocxMath,
  MathCurlyBrackets,
  MathFraction,
  MathRadical,
  MathRoundBrackets,
  MathRun,
  MathSquareBrackets,
  MathSubScript,
  MathSubSuperScript,
  MathSuperScript,
  Packer,
  PageBreak,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
  XmlComponent,
} from 'docx';
import { AppSettings, ExamMetadata, ExamPackage, MatrixRow, Question, SpecRow, calculateExamScores, getCognitiveTag, getSpecRowQuestionDetails } from '../types';
import { StorageEngine } from './storageEngine';
import { normalizeNewlines, repairLatexCorruptions, parseRequirementsByLevel } from '../utils/textUtils';
import { getSpecCellQuestions, getSubjectCompetencies } from '../utils/competencyUtils';

/**
 * Tạo Header đầu trang chuẩn Microsoft Word (.docx)
 * Chứa thông tin tác giả và bản quyền ở vùng Running Header (lề trên trang)
 * ĐẶC BIỆT: Nằm hoàn toàn ở vùng Header của trang Word (lề trên), 
 * KHÔNG nằm trong thân bài thi nên KHÔNG làm ảnh hưởng đến cấu trúc câu hỏi hay bảng ma trận, bảng đặc tả.
 */
function createDocxPageHeader(): Header {
  return new Header({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 45, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Biên soạn đề kiểm tra chuẩn CV 7991/BGDĐT',
                        size: 16, // 8pt
                        italics: true,
                        font: 'Times New Roman',
                        color: '6B7280',
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 55, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        text: 'Tác giả: Ngô Thanh Hùng - GV THCS Bình San - Mỹ Đức, Hà Tiên (ĐT/Zalo: 0913117321)',
                        size: 16, // 8pt
                        italics: true,
                        bold: true,
                        font: 'Times New Roman',
                        color: '374151',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ text: '', spacing: { after: 120 } }),
    ],
  });
}

/**
 * Tạo Footer chân trang chuẩn Word (.docx) với số trang tự động
 */
function createDocxPageFooter(): Footer {
  return new Footer({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 60, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Ứng dụng AI Test Generator Pro - Thầy Ngô Thanh Hùng',
                        size: 16,
                        italics: true,
                        font: 'Times New Roman',
                        color: '9CA3AF',
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 40, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        children: ['Trang ', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES],
                        size: 16,
                        font: 'Times New Roman',
                        color: '6B7280',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

/**
 * Tạo Section chuẩn cho Document docx, hỗ trợ cấu hình Header/Footer
 */
function createDocxSection(children: any[]) {
  let includeAuthor = true;
  try {
    const s = StorageEngine.getSettings();
    if (s && s.includeAuthorHeaderDocx === false) {
      includeAuthor = false;
    }
  } catch {
    includeAuthor = true;
  }

  return {
    properties: {
      page: {
        margin: {
          top: 1440,
          bottom: 1440,
          left: 1440,
          right: 1440,
          header: 720,
          footer: 720,
        },
      },
    },
    headers: includeAuthor
      ? {
          default: createDocxPageHeader(),
        }
      : undefined,
    footers: {
      default: createDocxPageFooter(),
    },
    children,
  };
}

/**
 * Sinh khối tiêu đề bài thi / đáp án chuẩn bộ mẫu hành chính cho Word (.docx)
 */
function buildDocxHeaderBlock(
  metadata: ExamMetadata,
  code?: string,
  isAnswerKey: boolean = false
): (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  // Bảng 2 cột không viền cho tiêu đề Sở/Trường & Kỳ thi/Năm học
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: (metadata.departmentName || 'SỞ GIÁO DỤC VÀ ĐÀO TẠO').toUpperCase(),
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: (metadata.schoolName || 'TRƯỜNG THCS/THPT').toUpperCase(),
                    bold: true,
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `KỲ THI ${metadata.examTitle ? metadata.examTitle.toUpperCase() : 'KIỂM TRA'}`,
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `NĂM HỌC ${metadata.schoolYear || '2026 - 2027'}`,
                    bold: true,
                    size: 22,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  elements.push(headerTable);

  // Mã đề thi
  if (code) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 120, after: 100 },
        children: [
          new TextRun({
            text: `MÃ ĐỀ THI: ${code}`,
            bold: true,
            size: 26,
            color: '008080',
            font: 'Times New Roman',
          }),
        ],
      })
    );
  }

  // Tiêu đề môn học & khối lớp
  const mainTitleText = isAnswerKey
    ? `ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM MÔN: ${metadata.subject.toUpperCase()} - LỚP ${metadata.grade}`
    : `ĐỀ KIỂM TRA MÔN: ${metadata.subject.toUpperCase()} - LỚP ${metadata.grade}`;

  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
      children: [
        new TextRun({
          text: mainTitleText,
          bold: true,
          size: 26,
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Hiển thị Tên Bài / Tên Chương / Mạch Nội Dung Kiến Thức nếu có
  if (metadata.chapterTitle && metadata.chapterTitle.trim()) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: `Nội dung / Chương: ${metadata.chapterTitle.trim()}`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  }

  // Thời gian & Thang điểm
  if (!isAnswerKey) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 250 },
        children: [
          new TextRun({
            text: `(Thời gian làm bài: ${metadata.durationMinutes} phút | Thang điểm: ${metadata.totalPoints} điểm)`,
            italics: true,
            size: 20,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  } else {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `(Thang điểm tổng: ${metadata.totalPoints} điểm | Bám sát Công văn 7991/BGDĐT)`,
            italics: true,
            size: 20,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  }

  return elements;
}

/**
 * Class tùy chỉnh tạo ký hiệu Hệ phương trình trong Office MathML (OMML) chuẩn Word
 * bao gồm dấu ngoặc nhọn mở bên trái ({) kéo dài theo chiều cao các phương trình xếp dọc (m:eqArr)
 */
class MathCases extends XmlComponent {
  constructor(linesChildren: any[][]) {
    super('m:d');

    // 1. Delimiter properties m:dPr với begChr = '{' và endChr = ''
    const dPr = new BuilderElement({
      name: 'm:dPr',
      children: [
        new BuilderElement({
          name: 'm:begChr',
          attributes: { character: { key: 'm:val', value: '{' } },
        }),
        new BuilderElement({
          name: 'm:endChr',
          attributes: { character: { key: 'm:val', value: '' } },
        }),
      ],
    });

    // 2. Các dòng phương trình nằm trong m:eqArr
    const eqArrChildren = linesChildren.map((line) => {
      return new BuilderElement({
        name: 'm:e',
        children: line,
      });
    });

    const eqArr = new BuilderElement({
      name: 'm:eqArr',
      children: eqArrChildren,
    });

    const outerE = new BuilderElement({
      name: 'm:e',
      children: [eqArr],
    });

    this.root.push(dPr);
    this.root.push(outerE);
  }
}

/**
 * Làm sạch chuỗi LaTeX thành văn bản thuần cho Excel / Plain Text Export
 */
export function cleanLatexForDocx(latex: string): string {
  if (!latex) return '';
  let str = repairLatexCorruptions(latex);
  // Khử triệt để lỗi dấu phẩy số thập phân {,} hoặc \{,\} -> ,
  str = str.replace(/\\?\{\s*,\s*\\?\}/g, ',');
  str = str.replace(/\\+rac\{/g, '\\frac{');
  str = str.replace(/\\*notin\b/g, '∉');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)otin\b/g, '∉');
  while (/(\d+)\\\s+(\d+)/.test(str)) {
    str = str.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }
  str = str.replace(/\\\s+/g, ' ');
  str = str.replace(/\\%/g, '%');
  str = str.replace(/\\begin\{cases\}/g, '{ ');
  str = str.replace(/\\end\{cases\}/g, ' }');
  str = str.replace(/\\\\|\\cr/g, '; ');
  str = str.replace(/&/g, ' ');
  str = str.replace(/\\\s+/g, ' ');
  str = str.replace(/\\\(|\\\)/g, '');
  str = str.replace(/\\(frac|dfrac)\{([^{}]+)\}\{([^{}]+)\}/g, '$2/$3');
  str = str.replace(/\\sqrt\{([^{}]+)\}/g, '√($1)');
  str = str.replace(/\$(.*?)\$/g, '$1');
  str = str.replace(/\\(text|mathrm|mathbf|mathit)\{([^{}]+)\}/g, '$2');
  str = str.replace(/\\(widehat|hat)\{([^{}]+)\}/g, '$2');
  str = str.replace(/\\mathbb\{R\}/g, 'ℝ').replace(/\\mathbb\{N\}/g, 'ℕ').replace(/\\mathbb\{Z\}/g, 'ℤ').replace(/\\mathbb\{Q\}/g, 'ℚ').replace(/\\mathbb\{C\}/g, 'ℂ');
  str = str.replace(/\\mathbb\{([A-Za-z])\}/g, '$1');
  str = str.replace(/\\setminus\b/g, '\\');
  str = str.replace(/\\\{/g, '{').replace(/\\\}/g, '}');
  str = str.replace(/\\left\s*/g, '').replace(/\\right\s*/g, '');
  str = str.replace(/\\alpha/g, 'α').replace(/\\beta/g, 'β').replace(/\\gamma/g, 'γ').replace(/\\Delta/g, 'Δ').replace(/\\pi/g, 'π');
  str = str.replace(/\\sim\b/g, '∼').replace(/\\perp\b/g, '⊥').replace(/\\parallel\b/g, '∥').replace(/\\angle\b/g, '∠');
  str = str.replace(/\\le(q)?\b/g, '≤').replace(/\\ge(q)?\b/g, '≥').replace(/\\ne(q)?\b/g, '≠').replace(/\\approx\b/g, '≈').replace(/\\infty\b/g, '∞');
  str = str.replace(/\\in\b/g, '∈').replace(/\\notin\b/g, '∉').replace(/\\times\b/g, '×').replace(/\\cdot\b/g, '·');
  str = str.replace(/\\vdots\b/g, '⋮').replace(/\\cdots\b/g, '⋯').replace(/\\ldots\b/g, '…').replace(/\\dots\b/g, '…').replace(/\\ddots\b/g, '⋱');
  str = str.replace(/\\mid\b/g, '|').replace(/\\nmid\b/g, '∤').replace(/\\div\b/g, '÷');
  str = str.replace(/\\triangle\b/g, '△').replace(/\\cong\b/g, '≅').replace(/\\equiv\b/g, '≡');
  str = str.replace(/\\Leftrightarrow\b/g, '⇔');
  str = str.replace(/\\Rightarrow\b/g, '⇒');
  str = str.replace(/\\Leftarrow\b/g, '⇐');
  str = str.replace(/\\(rightarrow|to)\b/g, '→');
  str = str.replace(/\\(leftarrow|gets)\b/g, '←');
  str = str.replace(/\\rightleftharpoons\b/g, '⇌');
  str = str.replace(/\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)/g, '°C');
  str = str.replace(/\^\{\s*°\s*C\s*\}/g, '°C');
  str = str.replace(/\^\s*°\s*C\b/g, '°C');
  str = str.replace(/°\s*C\b/g, '°C');
  str = str.replace(/\\degree\b/g, '°');
  str = str.replace(/\^\{\s*\\circ\s*\}/g, '°');
  str = str.replace(/\^\\circ\b/g, '°');
  str = str.replace(/\\circ\b/g, '°');
  str = str.replace(/\^\{\s*°\s*\}/g, '°');
  str = str.replace(/\^\s*°/g, '°');
  str = str.replace(/\\forall/g, '∀').replace(/\\exists/g, '∃');
  str = str.replace(/\\([a-zA-Z]+)/g, '$1');
  return str;
}

/**
 * Trích xuất khối ngoặc nhọn { ... } từ vị trí startIdx
 */
function extractBraceGroup(str: string, startIdx: number): { content: string; endIdx: number } | null {
  if (str[startIdx] !== '{') return null;
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return { content: str.substring(startIdx + 1, i), endIdx: i };
      }
    }
  }
  return null;
}

/**
 * Chuyển đổi công thức hóa học \ce{...} hoặc biểu thức hóa học thuần sang LaTeX hỗ trợ chỉ số dưới/mũ
 * Ví dụ: "H2SO4" -> "H_2SO_4", "Fe2(SO4)3" -> "Fe_2(SO_4)_3", "2H2 + O2 -> 2H2O" -> "2H_2 + O_2 \rightarrow 2H_2O"
 */
export function formatCeToLatex(ceStr: string): string {
  if (!ceStr) return '';
  let str = ceStr.trim();

  // 1. Mũi tên phản ứng
  str = str.replace(/->|-->/g, ' \\rightarrow ');
  str = str.replace(/<->|<=>/g, ' \\rightleftharpoons ');

  // 2. Ký hiệu kết tủa & bay hơi
  str = str.replace(/\\?v\b/g, ' \\downarrow ');
  str = str.replace(/\\\^/g, ' \\uparrow ');

  // 3. Tự động bọc chỉ số dưới _cho các con số đứng sau nguyên tố hóa học hoặc ngoặc ) ]
  // Ví dụ: H2SO4 -> H_2SO_4, Fe2(SO4)3 -> Fe_2(SO_4)_3, Ca(OH)2 -> Ca(OH)_2
  str = str.replace(/([A-Z][a-z]?|[\)\]])(\d+)(?![_\^0-9])/g, '$1_$2');

  // 4. Điện tích ion: e.g. Fe^3+ -> Fe^{3+}, SO4^2- -> SO_4^{2-}, OH^- -> OH^-
  str = str.replace(/([A-Z][a-z]?|[\)\]]|_?\d+)\^([0-9]*[\+\-])/g, '$1^{$2}');

  return str;
}

/**
 * Phân tích chuỗi công thức LaTeX thành danh sách các nút phông chuẩn Microsoft Word Equation (OMML)
 */
export function parseMathChildren(
  latex: string
): (
  | MathRun
  | MathFraction
  | MathRadical
  | MathSubScript
  | MathSuperScript
  | MathSubSuperScript
  | MathRoundBrackets
  | MathCurlyBrackets
  | MathSquareBrackets
)[] {
  let str = repairLatexCorruptions(latex.trim());
  // Khử triệt để lỗi dấu phẩy số thập phân LaTeX {,} hoặc \{,\} -> , cho Word Equation OMML
  str = str.replace(/\\?\{\s*,\s*\\?\}/g, ',');
  // Phục hồi \frac bị rách và \notin
  str = str.replace(/\\+rac\{/g, '\\frac{');
  str = str.replace(/\\*notin\b/g, '\\notin');
  str = str.replace(/(?<=[^a-zA-Z\\]|^)otin\b/g, '\\notin');
  while (/(\d+)\\\s+(\d+)/.test(str)) {
    str = str.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }
  const elements: any[] = [];

  // 1. Tiền xử lý & làm sạch các lệnh LaTeX cấu trúc
  str = str.replace(/\\displaystyle\s*/g, '');
  str = str.replace(/\\limits\s*/g, '');
  str = str.replace(/\\nolimits\s*/g, '');
  str = str.replace(/\\(big|Big|bigg|Bigg)\b/g, '');
  str = str.replace(/\\left\./g, '');
  str = str.replace(/\\right\./g, '');

  // Xử lý tập hợp \mathbb{R}, \mathbb{N},... và \setminus, \{ \}
  str = str.replace(/\\mathbb\{R\}/g, 'ℝ');
  str = str.replace(/\\mathbb\{N\}/g, 'ℕ');
  str = str.replace(/\\mathbb\{Z\}/g, 'ℤ');
  str = str.replace(/\\mathbb\{Q\}/g, 'ℚ');
  str = str.replace(/\\mathbb\{C\}/g, 'ℂ');
  str = str.replace(/\\mathbb\{([A-Za-z])\}/g, '$1');
  str = str.replace(/\\setminus\b/g, '\\');
  str = str.replace(/\\\{/g, '{');
  str = str.replace(/\\\}/g, '}');

  // Khử lệnh \text{...}, \mathrm{...}
  while (/\\(text|mathrm|mathbf|mathit)\{([^{}]+)\}/.test(str)) {
    str = str.replace(/\\(text|mathrm|mathbf|mathit)\{([^{}]+)\}/g, '$2');
  }
  str = str.replace(/\\(wide(hat|tilde)|hat|tilde)\{([^{}]+)\}/g, '$3̂');
  str = str.replace(/\\(wide(hat|tilde)|hat|tilde)\s+([A-Za-z0-9]+)/g, '$3̂');
  str = str.replace(/\\(overrightarrow|vec)\{([^{}]+)\}/g, '$2⃗');
  str = str.replace(/\\(overrightarrow|vec)\s+([A-Za-z0-9]+)/g, '$2⃗');
  str = str.replace(/\\(overline|bar)\{([^{}]+)\}/g, '$2̄');
  str = str.replace(/\\(overline|bar)\s+([A-Za-z0-9]+)/g, '$2̄');

  // Chuẩn hóa toàn bộ biến thể độ C và góc độ
  str = str.replace(/\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)/g, '°C');
  str = str.replace(/\^\{\s*°\s*C\s*\}/g, '°C');
  str = str.replace(/\^\s*°\s*C\b/g, '°C');
  str = str.replace(/°\s*C\b/g, '°C');
  str = str.replace(/\\degree\b/g, '°');
  str = str.replace(/\^\{\s*\\circ\s*\}/g, '°');
  str = str.replace(/\^\\circ\b/g, '°');
  str = str.replace(/\\circ\b/g, '°');
  str = str.replace(/\^\{\s*°\s*\}/g, '°');
  str = str.replace(/\^\s*°/g, '°');

  // Chuẩn hóa phân số và căn thức viết không ngoặc { }
  str = str.replace(/\\(d?frac)\s*(\d)\s*(\d)/g, '\\frac{$2}{$3}');
  str = str.replace(/\\(d?frac)\{([^{}]+)\}\s*(\d)/g, '\\frac{$2}{$3}');
  str = str.replace(/\\(d?frac)\s*(\d)\s*\{([^{}]+)\}/g, '\\frac{$2}{$3}');
  str = str.replace(/\\sqrt\s*(\d)/g, '\\sqrt{$1}');
  str = str.replace(/\\sqrt\s*([a-zA-Z])/g, '\\sqrt{$1}');

  // Thay thế ký hiệu toán học & hóa học toàn diện
  const symbolMap: [RegExp, string][] = [
    // Tích phân, vi phân, tổng, tích
    [/\\iiint(?![a-zA-Z])/g, '∭'], [/\\iint(?![a-zA-Z])/g, '∬'], [/\\oint(?![a-zA-Z])/g, '∮'], [/\\int(?![a-zA-Z])/g, '∫'],
    [/\\sum(?![a-zA-Z])/g, '∑'], [/\\prod(?![a-zA-Z])/g, '∏'],
    [/\\partial(?![a-zA-Z])/g, '∂'], [/\\nabla(?![a-zA-Z])/g, '∇'],
    [/\\prime(?![a-zA-Z])/g, '′'], [/\\mp(?![a-zA-Z])/g, '∓'],

    // Bảng ký tự Hy Lạp chữ thường & in hoa
    [/\\alpha(?![a-zA-Z])/g, 'α'], [/\\beta(?![a-zA-Z])/g, 'β'], [/\\gamma(?![a-zA-Z])/g, 'γ'], [/\\delta(?![a-zA-Z])/g, 'δ'],
    [/\\epsilon(?![a-zA-Z])/g, 'ε'], [/\\varepsilon(?![a-zA-Z])/g, 'ε'], [/\\zeta(?![a-zA-Z])/g, 'ζ'], [/\\eta(?![a-zA-Z])/g, 'η'],
    [/\\theta(?![a-zA-Z])/g, 'θ'], [/\\vartheta(?![a-zA-Z])/g, 'θ'], [/\\iota(?![a-zA-Z])/g, 'ι'], [/\\kappa(?![a-zA-Z])/g, 'κ'],
    [/\\lambda(?![a-zA-Z])/g, 'λ'], [/\\mu(?![a-zA-Z])/g, 'μ'], [/\\nu(?![a-zA-Z])/g, 'ν'], [/\\xi(?![a-zA-Z])/g, 'ξ'],
    [/\\pi(?![a-zA-Z])/g, 'π'], [/\\varpi(?![a-zA-Z])/g, 'π'], [/\\rho(?![a-zA-Z])/g, 'ρ'], [/\\varrho(?![a-zA-Z])/g, 'ρ'],
    [/\\sigma(?![a-zA-Z])/g, 'σ'], [/\\varsigma(?![a-zA-Z])/g, 'σ'], [/\\tau(?![a-zA-Z])/g, 'τ'], [/\\upsilon(?![a-zA-Z])/g, 'υ'],
    [/\\phi(?![a-zA-Z])/g, 'φ'], [/\\varphi(?![a-zA-Z])/g, 'φ'], [/\\chi(?![a-zA-Z])/g, 'χ'], [/\\psi(?![a-zA-Z])/g, 'ψ'], [/\\omega(?![a-zA-Z])/g, 'ω'],
    [/\\Gamma(?![a-zA-Z])/g, 'Γ'], [/\\Delta(?![a-zA-Z])/g, 'Δ'], [/\\Theta(?![a-zA-Z])/g, 'Θ'], [/\\Lambda(?![a-zA-Z])/g, 'Λ'],
    [/\\Xi(?![a-zA-Z])/g, 'Ξ'], [/\\Pi(?![a-zA-Z])/g, 'Π'], [/\\Sigma(?![a-zA-Z])/g, 'Σ'], [/\\Upsilon(?![a-zA-Z])/g, 'Υ'],
    [/\\Phi(?![a-zA-Z])/g, 'Φ'], [/\\Psi(?![a-zA-Z])/g, 'Ψ'], [/\\Omega(?![a-zA-Z])/g, 'Ω'],

    // So sánh & tập hợp & logic
    [/\\le(q)?(?![a-zA-Z])/g, '≤'], [/\\ge(q)?(?![a-zA-Z])/g, '≥'], [/\\ne(q)?(?![a-zA-Z])/g, '≠'], [/\\approx(?![a-zA-Z])/g, '≈'],
    [/\\infty(?![a-zA-Z])/g, '∞'], [/\\*notin(?![a-zA-Z])/g, '∉'], [/\\in(?![a-zA-Z])/g, '∈'],
    [/\\subset(?![a-zA-Z])/g, '⊂'], [/\\supset(?![a-zA-Z])/g, '⊃'], [/\\subseteq(?![a-zA-Z])/g, '⊆'], [/\\supseteq(?![a-zA-Z])/g, '⊇'],
    [/\\cup(?![a-zA-Z])/g, '∪'], [/\\cap(?![a-zA-Z])/g, '∩'], [/\\emptyset(?![a-zA-Z])/g, '∅'], [/\\varnothing(?![a-zA-Z])/g, '∅'],
    [/\\times(?![a-zA-Z])/g, '×'], [/\\cdot(?![a-zA-Z])/g, '·'], [/\\pm(?![a-zA-Z])/g, '±'],
    [/\\to(?![a-zA-Z])/g, '→'], [/\\rightarrow(?![a-zA-Z])/g, '→'],
    [/\\uparrow(?![a-zA-Z])/g, '↑'], [/\\downarrow(?![a-zA-Z])/g, '↓'],
    [/\\rightleftharpoons(?![a-zA-Z])/g, '⇌'], [/\\leftarrow(?![a-zA-Z])/g, '←'], [/\\leftrightarrow(?![a-zA-Z])/g, '↔'],
    [/\\Leftarrow(?![a-zA-Z])/g, '⇐'], [/\\Rightarrow(?![a-zA-Z])/g, '⇒'], [/\\Leftrightarrow(?![a-zA-Z])/g, '⇔'],
    [/\\vdots(?![a-zA-Z])/g, '⋮'], [/\\cdots(?![a-zA-Z])/g, '⋯'], [/\\ldots(?![a-zA-Z])/g, '…'], [/\\dots(?![a-zA-Z])/g, '…'], [/\\ddots(?![a-zA-Z])/g, '⋱'],
    [/\\mid(?![a-zA-Z])/g, '|'], [/\\nmid(?![a-zA-Z])/g, '∤'], [/\\triangle(?![a-zA-Z])/g, '△'], [/\\div(?![a-zA-Z])/g, '÷'],
    [/\\cong(?![a-zA-Z])/g, '≅'], [/\\equiv(?![a-zA-Z])/g, '≡'], [/\\setminus(?![a-zA-Z])/g, '∖'],
    [/\\degree(?![a-zA-Z])/g, '°'], [/\^\{\\circ\}/g, '°'], [/\^\\circ(?![a-zA-Z])/g, '°'], [/\\circ(?![a-zA-Z])/g, '°'],
    [/\\forall(?![a-zA-Z])/g, '∀'], [/\\exists(?![a-zA-Z])/g, '∃'], [/\\angle(?![a-zA-Z])/g, '∠'],
    [/\\sim(?![a-zA-Z])/g, '∼'], [/\\perp(?![a-zA-Z])/g, '⊥'], [/\\parallel(?![a-zA-Z])/g, '∥'], [/\\%/g, '%'],
    [/\\quad/g, '  '], [/\\qquad/g, '    '],
    [/\\(sin|cos|tan|cot|arcsin|arccos|arctan|arccot|ln|log|lg|exp|lim|max|min|det|gcd)(?![a-zA-Z])/g, '$1'],
    [/\\\s+/g, ' '], [/\\\,/g, ' '], [/\\;/g, ' '], [/\\:/g, ' '], [/\\!/g, '']
  ];

  for (const [pattern, val] of symbolMap) {
    str = str.replace(pattern, val);
  }

  let i = 0;
  let textBuffer = '';

  const flushText = () => {
    if (textBuffer.length > 0) {
      elements.push(new MathRun(textBuffer));
      textBuffer = '';
    }
  };

  while (i < str.length) {
    // 0. Xử lý môi trường LaTeX: \begin{cases}, \begin{aligned}, \begin{array}, \begin{matrix}, \begin{pmatrix}, \begin{bmatrix}
    if (str.startsWith('\\begin{', i)) {
      flushText();
      const envMatch = str.substring(i).match(/^\\begin\{(cases|aligned|array|matrix|pmatrix|bmatrix)\}/);
      if (envMatch) {
        const envType = envMatch[1];
        const startLen = envMatch[0].length;
        const endTag = `\\end{${envType}}`;
        const endIdx = str.indexOf(endTag, i + startLen);
        if (endIdx !== -1) {
          const innerBody = str.substring(i + startLen, endIdx);
          const lines = innerBody.split(/\\\\|\\cr/);
          const linesChildren: any[][] = [];

          lines.forEach((line) => {
            let cleanLine = line;
            cleanLine = cleanLine.replace(/&/g, ' ');
            cleanLine = cleanLine.replace(/\\\s+/g, ' ');
            cleanLine = cleanLine.replace(/\\\(|\\\)/g, '');
            cleanLine = cleanLine.replace(/\\(text|mathrm|mathbf|mathit)\{([^{}]+)\}/g, '$2');

            const lineChildren = parseMathChildren(cleanLine.trim());
            if (lineChildren.length > 0) {
              linesChildren.push(lineChildren);
            }
          });

          if (envType === 'cases') {
            elements.push(new MathCases(linesChildren.length > 0 ? linesChildren : [[new MathRun('')]]));
          } else if (envType === 'pmatrix') {
            const flatChildren = linesChildren.flat();
            elements.push(new MathRoundBrackets({ children: flatChildren }));
          } else if (envType === 'bmatrix') {
            const flatChildren = linesChildren.flat();
            elements.push(new MathSquareBrackets({ children: flatChildren }));
          } else {
            elements.push(...linesChildren.flat());
          }

          i = endIdx + endTag.length;
          continue;
        }
      }
    }

    // 0.1 Xử lý lệnh hóa học \ce{...}
    if (str.startsWith('\\ce{', i)) {
      flushText();
      const bg = extractBraceGroup(str, i + 3);
      if (bg) {
        const formattedCe = formatCeToLatex(bg.content);
        elements.push(...parseMathChildren(formattedCe));
        i = bg.endIdx + 1;
        continue;
      }
    }

    // 0.2 Xử lý mũi tên phản ứng hóa học: \xrightarrow, \xleftarrow, \xrightleftharpoons
    if (str.startsWith('\\xrightarrow', i) || str.startsWith('\\xleftarrow', i) || str.startsWith('\\xrightleftharpoons', i)) {
      flushText();
      let arrowSym = ' → ';
      let len = 11; // \xrightarrow
      if (str.startsWith('\\xleftarrow', i)) {
        arrowSym = ' ← ';
        len = 10;
      } else if (str.startsWith('\\xrightleftharpoons', i)) {
        arrowSym = ' ⇌ ';
        len = 19;
      }

      let cur = i + len;
      let belowContent: string | null = null;
      let aboveContent: string | null = null;

      if (str[cur] === '[') {
        const closeIdx = str.indexOf(']', cur);
        if (closeIdx !== -1) {
          belowContent = str.substring(cur + 1, closeIdx);
          cur = closeIdx + 1;
        }
      }

      while (cur < str.length && str[cur] === ' ') cur++;

      if (str[cur] === '{') {
        const bg = extractBraceGroup(str, cur);
        if (bg) {
          aboveContent = bg.content;
          cur = bg.endIdx + 1;
        }
      }

      const baseEl = new MathRun(arrowSym);
      if (aboveContent !== null && belowContent !== null) {
        elements.push(
          new MathSubSuperScript({
            children: [baseEl],
            subScript: parseMathChildren(belowContent),
            superScript: parseMathChildren(aboveContent),
          })
        );
      } else if (aboveContent !== null) {
        elements.push(
          new MathSuperScript({
            children: [baseEl],
            superScript: parseMathChildren(aboveContent),
          })
        );
      } else if (belowContent !== null) {
        elements.push(
          new MathSubScript({
            children: [baseEl],
            subScript: parseMathChildren(belowContent),
          })
        );
      } else {
        elements.push(baseEl);
      }

      i = cur;
      continue;
    }

    // 1. Ngoặc tự động co giãn \left( ... \right)
    if (str.startsWith('\\left(', i)) {
      flushText();
      let depth = 1;
      let cur = i + 6;
      let matchIdx = -1;
      while (cur < str.length) {
        if (str.startsWith('\\left(', cur) || str.startsWith('\\left[', cur) || str.startsWith('\\left\\{', cur)) {
          depth++;
          cur += 6;
        } else if (str.startsWith('\\right)', cur)) {
          depth--;
          if (depth === 0) {
            matchIdx = cur;
            break;
          }
          cur += 7;
        } else {
          cur++;
        }
      }
      if (matchIdx !== -1) {
        const inner = str.substring(i + 6, matchIdx);
        elements.push(
          new MathRoundBrackets({
            children: parseMathChildren(inner),
          })
        );
        i = matchIdx + 7;
        continue;
      }
    }

    // Ngoặc vuông \left[ ... \right]
    if (str.startsWith('\\left[', i)) {
      flushText();
      let depth = 1;
      let cur = i + 6;
      let matchIdx = -1;
      while (cur < str.length) {
        if (str.startsWith('\\left[', cur) || str.startsWith('\\left(', cur) || str.startsWith('\\left\\{', cur)) {
          depth++;
          cur += 6;
        } else if (str.startsWith('\\right]', cur)) {
          depth--;
          if (depth === 0) {
            matchIdx = cur;
            break;
          }
          cur += 7;
        } else {
          cur++;
        }
      }
      if (matchIdx !== -1) {
        const inner = str.substring(i + 6, matchIdx);
        elements.push(
          new MathSquareBrackets({
            children: parseMathChildren(inner),
          })
        );
        i = matchIdx + 7;
        continue;
      }
    }

    // Ngoặc nhọn \left\{ ... \right\}
    if (str.startsWith('\\left\\{', i)) {
      flushText();
      let depth = 1;
      let cur = i + 7;
      let matchIdx = -1;
      while (cur < str.length) {
        if (str.startsWith('\\left\\{', cur) || str.startsWith('\\left(', cur) || str.startsWith('\\left[', cur)) {
          depth++;
          cur += 7;
        } else if (str.startsWith('\\right\\}', cur)) {
          depth--;
          if (depth === 0) {
            matchIdx = cur;
            break;
          }
          cur += 8;
        } else {
          cur++;
        }
      }
      if (matchIdx !== -1) {
        const inner = str.substring(i + 7, matchIdx);
        elements.push(
          new MathCurlyBrackets({
            children: parseMathChildren(inner),
          })
        );
        i = matchIdx + 8;
        continue;
      }
    }

    // 2. Phân số \frac{A}{B} hoặc \dfrac{A}{B}
    if (str.startsWith('\\frac', i) || str.startsWith('\\dfrac', i)) {
      flushText();
      const len = str.startsWith('\\dfrac', i) ? 6 : 5;
      let cur = i + len;
      while (cur < str.length && str[cur] === ' ') cur++;
      const numGroup = extractBraceGroup(str, cur);
      if (numGroup) {
        cur = numGroup.endIdx + 1;
        while (cur < str.length && str[cur] === ' ') cur++;
        const denGroup = extractBraceGroup(str, cur);
        if (denGroup) {
          const numChildren = parseMathChildren(numGroup.content);
          const denChildren = parseMathChildren(denGroup.content);
          elements.push(
            new MathFraction({
              numerator: numChildren.length > 0 ? numChildren : [new MathRun('')],
              denominator: denChildren.length > 0 ? denChildren : [new MathRun('')],
            })
          );
          i = denGroup.endIdx + 1;
          continue;
        }
      }
    }

    // 3. Căn thức \sqrt{A} hoặc \sqrt[n]{A}
    if (str.startsWith('\\sqrt', i)) {
      flushText();
      let cur = i + 5;
      let degreeGroup: string | null = null;
      if (str[cur] === '[') {
        const closeIdx = str.indexOf(']', cur);
        if (closeIdx !== -1) {
          degreeGroup = str.substring(cur + 1, closeIdx);
          cur = closeIdx + 1;
        }
      }
      while (cur < str.length && str[cur] === ' ') cur++;
      const bodyGroup = extractBraceGroup(str, cur);
      if (bodyGroup) {
        const radChildren = parseMathChildren(bodyGroup.content);
        elements.push(
          new MathRadical({
            children: radChildren.length > 0 ? radChildren : [new MathRun('')],
            ...(degreeGroup ? { degree: parseMathChildren(degreeGroup) } : {}),
          })
        );
        i = bodyGroup.endIdx + 1;
        continue;
      }
    }

    // 4. Chỉ số trên ^ và chỉ số dưới _
    if (str[i] === '^' || str[i] === '_') {
      const isSuper = str[i] === '^';
      let nextCur = i + 1;
      while (nextCur < str.length && str[nextCur] === ' ') nextCur++;
      let argContent = '';
      let endIdx = nextCur;

      if (str[nextCur] === '{') {
        const bg = extractBraceGroup(str, nextCur);
        if (bg) {
          argContent = bg.content;
          endIdx = bg.endIdx + 1;
        }
      } else {
        argContent = str[nextCur] || '';
        endIdx = nextCur + 1;
      }

      let secondArgContent: string | null = null;
      let finalEndIdx = endIdx;
      let checkCur = endIdx;
      while (checkCur < str.length && str[checkCur] === ' ') checkCur++;

      if (checkCur < str.length && str[checkCur] === (isSuper ? '_' : '^')) {
        let secondNext = checkCur + 1;
        while (secondNext < str.length && str[secondNext] === ' ') secondNext++;
        if (str[secondNext] === '{') {
          const bg2 = extractBraceGroup(str, secondNext);
          if (bg2) {
            secondArgContent = bg2.content;
            finalEndIdx = bg2.endIdx + 1;
          }
        } else {
          secondArgContent = str[secondNext] || '';
          finalEndIdx = secondNext + 1;
        }
      }

      let baseElements: any[] = [];
      if (textBuffer.length > 0) {
        const lastChar = textBuffer[textBuffer.length - 1];
        textBuffer = textBuffer.slice(0, -1);
        flushText();
        baseElements = [new MathRun(lastChar)];
      } else if (elements.length > 0) {
        baseElements = [elements.pop()];
      } else {
        baseElements = [new MathRun(' ')];
      }

      const safeBase = baseElements.length > 0 ? baseElements : [new MathRun(' ')];

      if (secondArgContent !== null) {
        const subContent = isSuper ? secondArgContent : argContent;
        const superContent = isSuper ? argContent : secondArgContent;
        const subParsed = parseMathChildren(subContent);
        const supParsed = parseMathChildren(superContent);
        elements.push(
          new MathSubSuperScript({
            children: safeBase,
            subScript: subParsed.length > 0 ? subParsed : [new MathRun('')],
            superScript: supParsed.length > 0 ? supParsed : [new MathRun('')],
          })
        );
      } else if (isSuper) {
        const supParsed = parseMathChildren(argContent);
        elements.push(
          new MathSuperScript({
            children: safeBase,
            superScript: supParsed.length > 0 ? supParsed : [new MathRun('')],
          })
        );
      } else {
        const subParsed = parseMathChildren(argContent);
        elements.push(
          new MathSubScript({
            children: safeBase,
            subScript: subParsed.length > 0 ? subParsed : [new MathRun('')],
          })
        );
      }

      i = finalEndIdx;
      continue;
    }

    // Nếu gặp lệnh LaTeX gạch chéo ngược khác chưa xử lý (e.g., \left hoặc \right lẻ, hoặc \ )
    if (str[i] === '\\') {
      // Bỏ qua \left hoặc \right lẻ
      if (str.startsWith('\\left', i)) {
        i += 5;
        continue;
      }
      if (str.startsWith('\\right', i)) {
        i += 6;
        continue;
      }
      // Dấu \ đi liền với khoảng trắng: chuyển thành khoảng trắng đơn
      if (str[i + 1] === ' ') {
        textBuffer += ' ';
        i += 2;
        continue;
      }
    }

    textBuffer += str[i];
    i++;
  }

  flushText();
  return elements;
}

/**
 * Làm sạch và chuyển đổi các TeX accent code, từ dính / lỗi khoảng trắng về Unicode Tiếng Việt chuẩn
 */
export function cleanTexVietnameseAccents(text: string): string {
  if (!text) return text;
  let str = text;

  // Khử triệt để lỗi dấu phẩy số thập phân {,} hoặc \{,\}
  str = str.replace(/\\?\{\s*,\s*\\?\}/g, ',');

  // 1. Loại bỏ các nhãn mã mức độ thừa như [NB_TL], [TH_TL], [VD_TL], [VDC_TL], [NB_TN], [NB],...
  str = str.replace(/\s*\[(NB|TH|VD|VDC|REMEMBER|UNDERSTAND|APPLY|ADVANCED)(_(TL|TN|TF|SA))?\]\s*/gi, ' ');

  // 2. Sửa các lỗi khoảng trắng và từ dính phổ biến
  str = str.replace(/\bth\s+ì\b/gi, 'thì');
  str = str.replace(/\bnh\s*\(/gi, 'nh (');
  str = str.replace(/\b(c|g)\s*\.\s*(g|c)\s*\.\s*(c|g)\b/gi, '$1.$2.$3');

  // 3. Chuyển đổi mã TeX accent / \text{} ký hiệu đặc biệt sang Unicode Tiếng Việt
  str = str.replace(/\\text\{\\dh\}/gi, 'đ');
  str = str.replace(/\\text\{\\DH\}/gi, 'Đ');
  str = str.replace(/\\text\{\\textquoteright\}/gi, "'");
  str = str.replace(/\\text\{\\underline\{u\}\}/gi, 'ư');
  str = str.replace(/\\text\{\\cdot\}/gi, 'ạ');
  str = str.replace(/\\text\{\\hat\{o\}\}/gi, 'ô');
  str = str.replace(/\\text\{\\hat\{e\}\}/gi, 'ê');
  str = str.replace(/\\text\{\\hat\{a\}\}/gi, 'â');

  // Xử lý các cụm từ ghép TeX accent xuất hiện từ AI hoặc export
  str = str.replace(/v\\grave\{?a\}?/gi, 'và');
  str = str.replace(/c\\'o/gi, 'có');
  str = str.replace(/c\\'a/gi, 'cá');
  str = str.replace(/b\\`ang/gi, 'bằng');
  str = str.replace(/b\\`i(?:\\text\{)?\\(?:hat\{e\}|\^e)(?:\})?t/gi, 'biết');
  str = str.replace(/m(?:\\text\{)?\\(?:hat\{o\}|\^o)(?:\})?t/gi, 'một');
  str = str.replace(/c(?:\\text\{)?\\(?:hat\{o\}|\^o)(?:\})?t/gi, 'cột');
  str = str.replace(/T\\'inh/gi, 'Tính');
  str = str.replace(/t\\'inh/gi, 'tính');
  str = str.replace(/Tr\\text\{\\hat\{e\}\}n/gi, 'Trên');
  str = str.replace(/tr\\text\{\\hat\{e\}\}n/gi, 'trên');
  str = str.replace(/C\\`ung/gi, 'Cùng');
  str = str.replace(/c\\`ung/gi, 'cùng');
  str = str.replace(/l\\'uc/gi, 'lúc');
  str = str.replace(/\\text\{\\dh\}\\`o/gi, 'đó');
  str = str.replace(/\\text\{\\dh\}\\text\{\\hat\{o\}\}/gi, 'độ');
  str = str.replace(/d\\`ai/gi, 'dài');
  str = str.replace(/\\text\{\\dh\}\\text\{\\underline\{u\}\}\\text\{\\cdot\}ng/gi, 'đường');
  str = str.replace(/h\\`inh/gi, 'hình');
  str = str.replace(/chi\\text\{\\hat\{e\}\}u/gi, 'chiếu');

  // Chuyển đổi dấu thanh TeX accent đơn lẻ
  str = str.replace(/\\'a/g, 'á').replace(/\\'e/g, 'é').replace(/\\'i/g, 'í').replace(/\\'o/g, 'ó').replace(/\\'u/g, 'ú').replace(/\\'y/g, 'ý');
  str = str.replace(/\\`a/g, 'à').replace(/\\`e/g, 'è').replace(/\\`i/g, 'ì').replace(/\\`o/g, 'ò').replace(/\\`u/g, 'ù');
  str = str.replace(/\\\^a/g, 'â').replace(/\\\^e/g, 'ê').replace(/\\\^o/g, 'ô');

  // 4. Khôi phục các vỡ vụn công thức phân số bị chèn dấu $ ngắt quãng (như \frac{AB}{A$ 'B' $})
  str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\$\s*'([A-Za-z0-9']+)'\s*\$\}/g, '\\frac{$1}{$2\'$3\'}');
  str = str.replace(/\\frac\{([^{}]+)\$\s*'([A-Za-z0-9']+)'\s*\$\}\{([^{}]+)\}/g, '\\frac{$1\'$2\'}{$3}');
  str = str.replace(/\\widehat\{([^{}]+)\$\s*'([A-Za-z0-9']*)\s*\$\}/g, '\\widehat{$1\'$2\'}');
  str = str.replace(/\\widehat\{([^{}]+)\}\s*\$\s*'([A-Za-z0-9']*)\s*\$/g, '\\widehat{$1\'$2\'}');

  // 5. Xử lý khoảng trắng quanh prime quotes trong variables: A 'B' -> A'B', A ' -> A'
  str = str.replace(/([A-Z])\s+'\s*([A-Z])/g, "$1'$2");
  str = str.replace(/([A-Z])\s+'/g, "$1'");

  return str;
}

/**
 * Tách văn bản tiếng Việt ra KHỎI khối công thức $...$ nếu khối đó lỡ bọc cả câu tiếng Việt,
 * tránh để KaTeX render chữ tiếng Việt bị dính chùm lại với nhau.
 */
export function unwrapVietnameseFromMathBlocks(text: string): string {
  if (!text) return text;

  // Pattern nhận diện các từ Tiếng Việt thường gặp (sử dụng word boundary thực sự, không dùng \\b literal)
  const vnWordRegex = /[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]|\b(tam giác|cho|biết|tính|với|có|và|vuông|độ dài|đường cao|hình chiếu|chu vi|diện tích|tỉ số|đồng dạng|trên|cạnh|góc|cùng lúc|một|cột|cọc|mặt đất|bóng|trường hợp|được|sao cho|như|thì)\b/i;

  // Chỉ xử lý các khối $...$ (không đụng vào khối $$...$$ hoặc môi trường \begin)
  return text.replace(/(^|[^\$])\$([^\$]+)\$(?!\$)/g, (fullMatch, prefix, mathContent) => {
    // Nếu khối $...$ chứa dấu xuống dòng hoặc là môi trường nhiều dòng thì giữ nguyên
    if (mathContent.includes('\n') || mathContent.includes('\\begin')) {
      return fullMatch;
    }

    // Tạm thời che (mask) tất cả các khối \text{...}, \mathrm{...}, \mathbf{...}, \mathit{...}, \ce{...}
    const textGroupRegex = /\\(text|mathrm|mathbf|mathit|ce)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    const maskedContent = mathContent.replace(textGroupRegex, '___TEXT_PLACEHOLDER___');

    // Nếu bên ngoài các khối \text{...} KHÔNG chứa chữ tiếng Việt thì đây là công thức chuẩn -> GIỮ NGUYÊN 100%!
    if (!vnWordRegex.test(maskedContent)) {
      return fullMatch;
    }

    // Nếu bên ngoài thực sự chứa từ tiếng Việt: tách rời các biểu thức toán con và đặt tiếng Việt ra ngoài $...$
    const mathTokenRegex = /(\\d?frac\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|\\sqrt(?:\[[^\]]*\])?\{[^{}]*\}|\\widehat\{[^{}]+\}|\\mathbb\{[^{}]+\}|\\vec\{[^{}]+\}|\\xrightleftharpoons(?:\[[^{}]*\])?(?:\{[^{}]*\})*|\\xrightarrow(?:\[[^{}]*\])?(?:\{[^{}]*\})*|\\xleftarrow(?:\[[^{}]*\])?(?:\{[^{}]*\})*|\\text\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|\\Delta\s*[A-Z0-9_\']+|[A-Z0-9_\'\.]+\s*[\=\<\>\+\-\*\/]\s*(?:[A-Za-z0-9_\'\.\^\+\-\*\/\{\}\\\text\^\circ]|\\text\{[^{}]*\}|\\mathrm\{[^{}]*\})+|\b\d+(?:\,\d+)?\s*\\text\{[^{}]*\}|[0-9]+\^\s*\\?circ|[0-9]+\\circ\b|[A-Z][A-Z]|\b[a-z]\s*=\s*\d+(?:\/\d+)?)/g;

    let lastIdx = 0;
    let match: RegExpExecArray | null;
    const tokens: string[] = [];

    while ((match = mathTokenRegex.exec(mathContent)) !== null) {
      if (match.index > lastIdx) {
        const plainBetween = mathContent.substring(lastIdx, match.index);
        if (plainBetween) tokens.push(plainBetween);
      }
      tokens.push(` $${match[0].trim()}$ `);
      lastIdx = mathTokenRegex.lastIndex;
    }

    if (lastIdx < mathContent.length) {
      const remainingPlain = mathContent.substring(lastIdx);
      if (remainingPlain) tokens.push(remainingPlain);
    }

    if (tokens.length > 0) {
      return prefix + tokens.join('');
    }

    return fullMatch;
  });
}

function processPlainPart(plain: string): string {
  if (!plain) return plain;
  let str = plain;

  // Khử triệt để lỗi dấu phẩy số thập phân {,} hoặc \{,\} bị lộ trong văn bản thường
  str = str.replace(/\\?\{\s*,\s*\\?\}/g, ',');

  // 1. Loại bỏ các nhãn mã mức độ thừa như [NB_TL], [TH_TL], [VD_TL], [VDC_TL], [NB_TN], [NB],...
  str = str.replace(/\s*\[(NB|TH|VD|VDC|REMEMBER|UNDERSTAND|APPLY|ADVANCED)(_(TL|TN|TF|SA))?\]\s*/gi, ' ');

  // 1a. Sửa triệt để các lỗi backslash AI sinh trước chữ tiếng Việt và lỗi TeX Greek letter nhầm tiếng Việt
  str = str.replace(/\\Chi\s*ều\b/gi, 'Chiều');
  str = str.replace(/\\chi\s*ều\b/gi, 'chiều');
  str = str.replace(/X\s*ều\b/g, 'Chiều');
  str = str.replace(/\\Di\s*ện\b/gi, 'Diện');
  str = str.replace(/\\di\s*ện\b/gi, 'diện');

  // Chuyển ".\ \" hoặc ".\ \" thành ".\n"
  str = str.replace(/\.[ \t]*\\[ \t]*\\*[ \t]*/g, '.\n');
  str = str.replace(/([?!:;])\s*\\+\s*(?=[A-Za-z0-9àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '$1\n');

  // Chuyển '\\' trước số thứ tự ý con: \\1), \\2), \\a), \\b)... thành \n1), \n2)...
  str = str.replace(/\\+n\s*([a-dA-D0-9]+[.)])/g, '\n$1 ');
  str = str.replace(/\\+([0-9]+[.)])/g, '\n$1 ');
  str = str.replace(/\\+([a-zA-Z][.)])/g, '\n$1 ');
  str = str.replace(/\\+([-*•])/g, '\n$1 ');
  str = str.replace(/(^|[\r\n]|[:;?!.])\s*n([a-dA-D][.)])/g, '$1\n$2 ');
  str = str.replace(/(\d+|[a-zA-Z\)\}\]])\s*n([a-dA-D][.)])/g, '$1\n$2 ');
  str = str.replace(/\\\\+/g, '\n');

  // Dọn dẹp dấu \ trong số lớn (e.g. 40\ 000 -> 40 000, 13\ 920\ 000 -> 13 920 000)
  while (/(\d+)\\\s+(\d+)/.test(str)) {
    str = str.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }
  str = str.replace(/(\d+)\\\s+/g, '$1 ');

  // Loại bỏ dấu '\' thừa dính trước từ tiếng Việt (ví dụ: \Diện tích -> Diện tích, \Chiều rộng -> Chiều rộng)
  str = str.replace(/\\([A-Za-z]*[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ][A-Za-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)/g, '$1');

  // Dọn dẹp dấu '\' đơn độc không đi liền với lệnh LaTeX
  str = str.replace(/(^|\n)\s*\\+(?=\s|[.,;:?!]|$)/g, '$1');
  str = str.replace(/\s*\\+$/g, '');

  // 2. Dọn dẹp dấu $ bị lẻ/mồ côi dán trực tiếp vào lệnh LaTeX (e.g., \cdot$ -> \cdot)
  str = str.replace(/(\\[a-zA-Z]+(\{[^{}]*\})*)\$/g, '$1');

  // 3. Loại bỏ dấu $ lẻ đơn độc không có cặp trong phần plain text
  const dollarMatches = str.match(/\$/g);
  if (dollarMatches && dollarMatches.length % 2 !== 0) {
    str = str.replace(/([^$]*)\$([^$]*)$/, '$1$2');
  }

  // 4. Sửa khoảng trắng dính quanh prime quotes: A 'B' -> A'B', A ' -> A'
  str = str.replace(/([A-Z])\s+'\s*([A-Z])/g, "$1'$2");
  str = str.replace(/([A-Z])\s+'/g, "$1'");

  // 5. Làm sạch \text{ cm} hoặc \text{cm} ở văn bản thường
  str = str.replace(/(\d+)\s*\\text\{\s*cm\s*\}/g, '$1 cm');
  str = str.replace(/\\text\{\s*cm\s*\}/g, 'cm');

  // 6. Tách từ tiếng Việt dính vào biến số toán học (sử dụng a-z chuẩn ASCII, không dùng a-à vì a-à chứa cả dấu ngoặc {})
  str = str.replace(/([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])([A-Z]{1,4}\b)/g, '$1 $2');
  str = str.replace(/([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])(\d+)/g, '$1 $2');
  str = str.replace(/(\d+)\s*cm([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '$1 cm $2');

  // 7a. Chuẩn hóa nhiệt độ độ C trong văn bản: -1{,}8\circC, 4{,}5\circC, 25^\circC, 25 ^\circ C, 25° C, 25^{\circ}C -> -1,8°C
  str = str.replace(/(-?\d+(?:(?:[.,]|\{,\})\d+)?)\s*(?:\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)|\^\s*°\s*C\b|°\s*C\b)/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°C`;
  });

  // 7b. Chuẩn hóa góc độ trong văn bản: 60\circ, 60^{\circ}, 60^\circ, 60° -> 60°
  str = str.replace(/([0-9]+(?:[.,{}]\d+)?)\s*(?:\\\^?\{?circ\}?|\^\s*°|°)(?!\s*[a-zA-Z])/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°`;
  });

  // 7c. Chuyển đổi các mũi tên trong ngữ cảnh tiếng Việt (ví dụ: "Cộng và trừ \rightarrow Nhân và chia" -> "Cộng và trừ → Nhân và chia")
  str = str.replace(/(?<=[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ\s])\\rightarrow(?=[\sàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '→');
  str = str.replace(/(?<=[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ\s])\\Rightarrow(?=[\sàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '⇒');
  str = str.replace(/(?<=[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ\s])\\Leftrightarrow(?=[\sàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '⇔');

  // 8. Tự động bọc $...$ cho các phương trình hóa học, công thức và biểu thức toán/hóa học chưa bọc $...$
  // 8a. Phương trình hóa học chứa mũi tên phản ứng (chỉ bọc khi không chứa từ ngữ tiếng Việt)
  str = str.replace(
    /(?:[A-Za-z0-9_\{\}\(\)\+\-\*\/\=\,\.\:\%\^\circ\s]|\\text\{[^{}]*\}|\\mathrm\{[^{}]*\})*\s*\\(xrightleftharpoons|xrightarrow|xleftarrow|rightleftharpoons)(?:\[[^{}]*\])?(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})*\s*(?:[A-Za-z0-9_\{\}\(\)\+\-\*\/\=\,\.\:\%\^\circ\s\\uparrow\\downarrow]|\\text\{[^{}]*\}|\\mathrm\{[^{}]*\})*/g,
    (match) => {
      const trimmed = match.trim();
      if (!trimmed || trimmed.startsWith('$')) return match;
      if (/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(match)) return match;
      return ` $${trimmed}$ `;
    }
  );

  // 8b. Nhận diện và bọc $...$ cho các công thức chứa lệnh LaTeX: \frac, \sqrt, \vec, \Delta, \alpha, v.v.
  const validMathCommands =
    '(?:d?frac\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}|sqrt(?:\\[[^\\]]*\\])?\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}|(?:vec|overrightarrow|widehat|overline|underline|mathbb|mathbf|mathrm|text|ce)\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}|(?:alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega|sin|cos|tan|cot|ln|log|exp|lim|sum|prod|int|iint|iiint|oint|pm|mp|times|div|cdot|ast|star|circ|bullet|cap|cup|subset|supset|subseteq|supseteq|in|notin|ni|le|ge|leq|geq|neq|approx|equiv|sim|cong|propto|perp|parallel|angle|triangle|degree|infty|partial|nabla|forall|exists|emptyset|varnothing|to|gets|dots|cdots|vdots|ddots|rightarrow|leftarrow|Rightarrow|Leftarrow|Leftrightarrow|leftrightarrow|mapsto)\\b(?![àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]))';

  const cmdRegex = new RegExp(
    '(?:(?<=\\s|^|[([{:;])([a-zA-Z](?:\'|\\d+|\\([a-zA-Z0-9]+\\))?\\s*[\\=\\<\\>\\le\\ge\\neq\\approx\\in]\\s*))?(\\\\' +
      validMathCommands +
      '(?:\\s+(?:[A-Z]\\b|[a-z]\\b|\\d+|\\([A-Za-z0-9_\\^\\+\\-]+\\)))?' +
      ')((?:\\s*[\\+\\-\\*/\\=\\<\\>\\le\\ge\\neq\\approx]\\s*(?:\\\\(?:d?frac\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}|sqrt(?:\\[[^\\]]*\\])?\\{[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}|[a-zA-Z]+(?:\\{[^{}]*\\})*)|[a-zA-Z0-9_\'\\.\\^]+|\\d+(?:\\,\\d+)?))*)',
    'g'
  );

  str = str.replace(cmdRegex, (match, lhs, cmd, rhs) => {
    if (/^\\(begin|end|n|t|r)$/.test(cmd)) return match;
    const strippedTextMacros = match.replace(/\\(text|mathrm|mathbf|mathit|ce)\{[^{}]*\}/g, '');
    if (/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(strippedTextMacros)) {
      return match;
    }
    let formula = (lhs || '') + cmd + (rhs || '');
    let trimmed = formula.trim();
    if (trimmed.startsWith('$')) return match;

    let trailingPunct = '';
    const mPunct = trimmed.match(/([.,;?!]+)$/);
    if (mPunct) {
      trailingPunct = mPunct[1];
      trimmed = trimmed.slice(0, -trailingPunct.length).trim();
    }

    return ` $${trimmed}$ ` + trailingPunct;
  });

  // 8c. Tự động bọc $...$ cho các lệnh \ce{...} chưa bọc $
  str = str.replace(/(^|[^\$])\\ce\{([^{}]+)\}([^\$]|$)/g, '$1 $\\ce{$2}$ $3');

  return str;
}

/**
 * Phục hồi và làm sạch công thức LaTeX (sửa lỗi mất backslash, ASCII control characters \x08, \x0C,...)
 */
export function sanitizeLatexControlChars(text: string): string {
  if (!text) return text;
  let str = repairLatexCorruptions(text);

  // 1. Khôi phục các ký tự điều khiển ASCII do JSON.parse lỡ chuyển đổi từ \b, \f, \t, \r
  str = str.replace(/\x08(egin|ar|eta|ox|ullet|inom|old|box)/g, '\\$1');
  str = str.replace(/\x08([a-zA-Z]+)/g, '\\$1');
  str = str.replace(/\x08/g, ' ');

  str = str.replace(/\x0C(rac|lat|rown|forall)/g, '\\$1');
  str = str.replace(/\x0C([a-zA-Z]+)/g, '\\$1');
  str = str.replace(/\x0C/g, '');

  str = str.replace(/\t(ext|heta|imes|an|au|ilde|riangle)\b/g, '\\$1');
  str = str.replace(/\r(ight|ho|eal|ightarrow)\b/g, '\\$1');

  // 2. Làm sạch TeX accent và chuyển đổi sang Unicode tiếng Việt chuẩn
  str = cleanTexVietnameseAccents(str);

  // 3. Sửa các môi trường LaTeX bị mất dấu \ phía trước
  str = str.replace(/(^|[^\\])\b(begin|end)\{(cases|aligned|array|matrix|pmatrix|bmatrix)\}/g, '$1\\$2{$3}');

  // 4. Sửa các lệnh LaTeX phổ biến bị mất dấu \ phía trước (bao gồm \right và \left)
  str = str.replace(/(^|[^\\a-zA-Z])\b(right|left|mathbb|sqrt|d?frac|widehat|overline|vec|Delta|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|sigma|phi|omega|Omega|angle|triangle|cong|equiv|approx|degree|Leftrightarrow|Rightarrow|rightarrow|forall|exists|notin|xrightleftharpoons|xrightarrow|xleftarrow|rightleftharpoons|uparrow|downarrow)\b/g, '$1\\$2');

  return str;
}

export function fixCasesLatex(rawText: string): string {
  if (!rawText) return rawText;
  let str = sanitizeLatexControlChars(rawText);

  // 1. Chuyển các ký hiệu hệ phương trình gõ dạng { eq1 ; eq2 } hoặc \{ eq1 ; eq2 \} hoặc { eq1 \\ eq2 } thành \begin{cases} eq1 \\ eq2 \end{cases}
  str = str.replace(/\\?\{\s*([^{}]+?)\s*\\?\}/g, (m, inner) => {
    const trimmed = inner.trim();
    if (/^(text|frac|dfrac|sqrt|widehat|hat|vec|mathbb|mathrm|mathbf|mathit)\b/.test(trimmed)) {
      return m;
    }

    const hasEq = /=|>|<|\\le|\\ge|\\neq/.test(trimmed);
    if (!hasEq) return m;

    if (/;|\\\\|\n/.test(trimmed) || (trimmed.split('=').length - 1 >= 2 && /,/.test(trimmed))) {
      let cleanedInner = trimmed;
      cleanedInner = cleanedInner.replace(/\\\\/g, ' \\\\ ');
      cleanedInner = cleanedInner.replace(/[\n\r]+/g, ' \\\\ ');
      cleanedInner = cleanedInner.replace(/;/g, ' \\\\ ');
      if (!cleanedInner.includes('\\\\') && /,/.test(cleanedInner)) {
        cleanedInner = cleanedInner.replace(/,/g, ' \\\\ ');
      }
      return `\\begin{cases} ${cleanedInner} \\end{cases}`;
    }

    return m;
  });

  // 2. Chuẩn hóa môi trường \begin{cases} ... \end{cases}
  str = str.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (match, inner) => {
    let cleanedInner = inner.trim();
    if (!cleanedInner.includes('\\\\')) {
      if (/;/.test(cleanedInner)) {
        cleanedInner = cleanedInner.replace(/;\s*/g, ' \\\\ ');
      }
    }
    const lines = cleanedInner.split(/\\\\/).map((s) => s.trim()).filter(Boolean);
    return `\\begin{cases} ${lines.join(' \\\\ ')} \\end{cases}`;
  });

  return str;
}

export function autoWrapUnwrappedLatex(text: string): string {
  if (!text) return text;

  // 0. Phục hồi và làm sạch các ký tự điều khiển ASCII, TeX accents và backslash bị thiếu
  let cleanedText = sanitizeLatexControlChars(text);

  // 0.1 Chuẩn hóa \[ ... \] thành $$ ... $$ và \( ... \) thành $ ... $
  cleanedText = cleanedText.replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `$$${inner.trim()}$$`);
  cleanedText = cleanedText.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${inner.trim()}$`);

  // 1. Tự động sửa và chuẩn hóa cú pháp hệ phương trình
  cleanedText = fixCasesLatex(cleanedText);

  // 2. Tự động bọc $$...$$ cho các môi trường LaTeX nhiều dòng như \begin{cases} ... \end{cases} chưa bọc $ hoặc $$
  cleanedText = cleanedText.replace(
    /(^|[^\$])((?:\\(?:Leftrightarrow|Rightarrow|Leftarrow)\s*)?\\begin\{(cases|aligned|array|matrix|pmatrix|bmatrix)\}[\s\S]*?\\end\{\3\})([^\$]|$)/g,
    (_, p1, p2, p3, p4) => `${p1} $$${p2}$$ ${p4}`
  );

  // 3. Nếu toàn bộ chuỗi là một công thức toán thuần (ví dụ đáp án ngắn "\frac{1}{2}", "x = 2", "\sqrt{3}", "S = [2; 3]") chưa bọc $
  const trimmed = cleanedText.trim();
  if (!trimmed.startsWith('$') && !trimmed.startsWith('$$')) {
    // Nếu chuỗi bắt đầu bằng tiền tố phương án A. B. C. D.
    const optPrefixMatch = trimmed.match(/^([A-D]\.\s*)(.*)$/);
    if (optPrefixMatch) {
      const optLabel = optPrefixMatch[1];
      const optContent = optPrefixMatch[2].trim();
      const isContentMath =
        /^(\\d?frac|\\sqrt|\\vec|\\widehat|\\mathbb|\\ce|\\Delta|\\alpha|\\beta|\\gamma|\\pi|\\lim|\\int|\\in|\\notin|\\subset|\\supset|\\cap|\\cup)\b/.test(optContent) ||
        (/^[a-zA-Z0-9_\'\^\+\-\*\/\=\(\)\{\}\\\s\.\,\;\:\<\>\le\ge\neq\approx\sqrt\frac\[\]\(\)\|\-∈∉⊂⊃∩∪]+$/.test(optContent) &&
          /[\=\<\>\+\-\*\/\\_\^∈∉⊂⊃∩∪]/.test(optContent) &&
          !/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(optContent));
      if (isContentMath && !optContent.startsWith('$')) {
        return `${optLabel}$${optContent}$`;
      }
    } else {
      const isStandaloneLatex =
        /^(\\d?frac|\\sqrt|\\vec|\\widehat|\\mathbb|\\ce|\\Delta|\\alpha|\\beta|\\gamma|\\pi|\\lim|\\int|\\in|\\notin|\\subset|\\supset|\\cap|\\cup)\b/.test(trimmed) ||
        (/^[a-zA-Z0-9_\'\^\+\-\*\/\=\(\)\{\}\\\s\.\,\;\:\<\>\le\ge\neq\approx\sqrt\frac\[\]\(\)\|\-∈∉⊂⊃∩∪]+$/.test(trimmed) &&
          /[\=\<\>\+\-\*\/\\_\^∈∉⊂⊃∩∪]/.test(trimmed) &&
          !/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(trimmed));

      if (isStandaloneLatex) {
        return `$${trimmed}$`;
      }
    }
  }

  // 4. Tách bóc các từ tiếng Việt ra khỏi những khối $...$ bị bọc nhầm
  cleanedText = unwrapVietnameseFromMathBlocks(cleanedText);

  // 5. Tách text thành các khối đã bọc sẵn ($...$, $$...$$, \(...\), \[...\]) và phần text thường
  const mathBlockRegex = /(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\([^\)]*\\\))/gs;
  const parts: string[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = mathBlockRegex.exec(cleanedText)) !== null) {
    if (match.index > lastIdx) {
      parts.push(processPlainPart(cleanedText.substring(lastIdx, match.index)));
    }
    parts.push(match[0]);
    lastIdx = mathBlockRegex.lastIndex;
  }
  if (lastIdx < cleanedText.length) {
    parts.push(processPlainPart(cleanedText.substring(lastIdx)));
  }

  return parts.join('');
}

/**
 * Tạo danh sách TextRun hỗ trợ định dạng Markdown (**bold**, *italic*) cho văn bản thường
 */
export function createDocxTextRunsWithMarkdown(plainText: string, baseOptions: any = {}): TextRun[] {
  if (!plainText) return [];

  let cleaned = plainText;
  cleaned = cleaned.replace(/\\%/g, '%');
  // Khử triệt để dấu phẩy số thập phân {,} hoặc \{,\}
  cleaned = cleaned.replace(/\\?\{\s*,\s*\\?\}/g, ',');
  // Khử dấu \ giữa các chữ số hàng nghìn trong số lớn (40\ 000 -> 40 000, 13\ 920\ 000 -> 13 920 000)
  while (/(\d+)\\\s+(\d+)/.test(cleaned)) {
    cleaned = cleaned.replace(/(\d+)\\\s+(\d+)/g, '$1 $2');
  }
  cleaned = cleaned.replace(/(\d+)\\\s+/g, '$1 ');
  cleaned = cleaned.replace(/\\\s+/g, ' ');
  cleaned = cleaned.replace(/\\\{/g, '{').replace(/\\\}/g, '}');
  cleaned = cleaned.replace(/\\_/g, '_');
  cleaned = cleaned.replace(/\\&/g, '&');
  cleaned = cleaned.replace(/\\#/g, '#');

  const runs: TextRun[] = [];
  // Tách Markdown bold (**text** or __text__) và italic (*text* or _text_)
  const mdRegex = /(\*\*\*|___)(.*?)\1|(\*\*|__)(.*?)\3|(\*|_)(.*?)\5/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = mdRegex.exec(cleaned)) !== null) {
    if (match.index > lastIdx) {
      const normalStr = cleaned.substring(lastIdx, match.index);
      if (normalStr) {
        runs.push(new TextRun({ font: 'Times New Roman', ...baseOptions, text: normalStr }));
      }
    }

    if (match[1]) {
      runs.push(new TextRun({ font: 'Times New Roman', ...baseOptions, text: match[2], bold: true, italics: true }));
    } else if (match[3]) {
      runs.push(new TextRun({ font: 'Times New Roman', ...baseOptions, text: match[4], bold: true }));
    } else if (match[5]) {
      runs.push(new TextRun({ font: 'Times New Roman', ...baseOptions, text: match[6], italics: true }));
    }

    lastIdx = mdRegex.lastIndex;
  }

  if (lastIdx < cleaned.length) {
    const remain = cleaned.substring(lastIdx);
    if (remain) {
      runs.push(new TextRun({ font: 'Times New Roman', ...baseOptions, text: remain }));
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ font: 'Times New Roman', ...baseOptions, text: cleaned })];
}

/**
 * Phân tách chuỗi văn bản hòa trộn LaTeX ($...$ hoặc $$...$$ hoặc \(...\) hoặc \[...\]) thành các phần tử TextRun và DocxMath chuẩn Word Equation
 */
export function createDocxInlineRuns(text: string, baseOptions: any = {}): (TextRun | DocxMath)[] {
  if (!text) return [new TextRun({ text: '', font: 'Times New Roman', ...baseOptions })];

  // Tiền xử lý: chuẩn hóa xuống dòng \n và dọn dẹp các dòng xuống dòng không hợp lệ trong khối math $...$ hoặc $$...$$
  let cleanInput = normalizeNewlines(text);
  // Khử triệt để dấu phẩy số thập phân {,} hoặc \{,\}
  cleanInput = cleanInput.replace(/\\?\{\s*,\s*\\?\}/g, ',');
  cleanInput = cleanInput.replace(/\$([^$]+)\$/g, (m, p1) => '$' + p1.replace(/[\r\n]+/g, ' ').trim() + '$');
  cleanInput = cleanInput.replace(/\$\$([^$]+)\$\$/g, (m, p1) => '$$' + p1.replace(/[\r\n]+/g, ' ').trim() + '$$');

  // Tự động tìm & bọc $...$ cho các chuỗi / môi trường LaTeX chưa bọc $
  const formattedText = autoWrapUnwrappedLatex(cleanInput);

  const runs: (TextRun | DocxMath)[] = [];
  const mathRegex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$|\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(formattedText)) !== null) {
    if (match.index > lastIndex) {
      const plainText = formattedText.substring(lastIndex, match.index);
      if (plainText) {
        runs.push(...createDocxTextRunsWithMarkdown(plainText, baseOptions));
      }
    }

    const latex = match[1] || match[2] || match[3] || match[4] || '';
    if (latex.trim()) {
      runs.push(
        new DocxMath({
          children: parseMathChildren(latex),
        })
      );
    }

    lastIndex = mathRegex.lastIndex;
  }

  if (lastIndex < formattedText.length) {
    const remaining = formattedText.substring(lastIndex);
    if (remaining) {
      runs.push(...createDocxTextRunsWithMarkdown(remaining, baseOptions));
    }
  }

  return runs.length > 0 ? runs : createDocxTextRunsWithMarkdown(text, baseOptions);
}

/**
 * Chuyển đổi mã SVG thành PNG Uint8Array Buffer cho Word ImageRun
 */
async function svgToPngBuffer(svgStr: string, width = 450, height = 280): Promise<Uint8Array | null> {
  if (!svgStr || svgStr.trim().length < 10) return null;
  return new Promise((resolve) => {
    try {
      let cleanSvg = svgStr.trim();
      if (!cleanSvg.includes('xmlns=')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const img = new Image();
      const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(url);
            resolve(null);
            return;
          }
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
            } else {
              resolve(null);
            }
          }, 'image/png');
        } catch (e) {
          URL.revokeObjectURL(url);
          resolve(null);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };

      img.src = url;
    } catch (e) {
      resolve(null);
    }
  });
}

/**
 * Tạo Bảng Rubric Chấm Điểm Chuẩn Word
 */
function buildDocxRubricTable(rubric: { criteria: string; points: number; description: string }[]): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: '008080' },
          left: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          right: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 60 },
            children: [new TextRun({ text: 'Tiêu chí', bold: true, size: 19, font: 'Times New Roman' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 15, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: '008080' },
          left: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          right: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 60 },
            children: [new TextRun({ text: 'Điểm', bold: true, size: 19, font: 'Times New Roman' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 60, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: '008080' },
          left: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
          right: { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 60, after: 60 },
            children: [new TextRun({ text: 'Mô tả yêu cầu', bold: true, size: 19, font: 'Times New Roman' })],
          }),
        ],
      }),
    ],
  });

  const dataRows = rubric.map((r) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            right: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 50, after: 50 },
              children: createDocxInlineRuns(r.criteria, { bold: true, size: 19, font: 'Times New Roman' }),
            }),
          ],
        }),
        new TableCell({
          width: { size: 15, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            right: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 50, after: 50 },
              children: [new TextRun({ text: `${r.points}đ`, bold: true, size: 19, font: 'Times New Roman' })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 60, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
            right: { style: BorderStyle.SINGLE, size: 4, color: 'E4E7EC' },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 50, after: 50 },
              children: createDocxInlineRuns(r.description, { size: 19, font: 'Times New Roman' }),
            }),
          ],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

/**
 * Loại bỏ mã SVG / XML / markdown code block khỏi nội dung văn bản để tránh lộ mã SVG thô
 */
function stripSvgCode(text: string): string {
  if (!text) return '';
  let clean = text.replace(/```(?:xml|svg|html)?[\s\S]*?```/gi, '');
  clean = clean.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const lines = clean.split('\n').filter((line) => {
    const t = line.trim().toLowerCase();
    if (
      t.startsWith('<svg') ||
      t.startsWith('</svg>') ||
      t.startsWith('<path') ||
      t.startsWith('<circle') ||
      t.startsWith('<rect') ||
      t.startsWith('<g') ||
      t.startsWith('</g>')
    ) {
      return false;
    }
    return true;
  });
  return lines.join('\n');
}

/**
 * Tạo danh sách đoạn văn (Paragraphs) bao gồm công thức Word Equation và Hình vẽ / Đồ thị nếu có
 */
async function buildContentParagraphs(
  text: string,
  prefix: string,
  prefixBold = true,
  baseOptions: any = {},
  svgDiagramStr?: string | null
): Promise<Paragraph[]> {
  const paragraphs: Paragraph[] = [];
  let preparedText = normalizeNewlines(stripSvgCode(text || ''));
  // Khử triệt để lỗi dấu phẩy số thập phân {,} hoặc \{,\}
  preparedText = preparedText.replace(/\\?\{\s*,\s*\\?\}/g, ',');
  // Tự động chuẩn hóa và bọc công thức chưa có dấu $
  preparedText = autoWrapUnwrappedLatex(preparedText);
  // Bảo vệ khối công thức $$...$$ và $...$ không bị ngắt vụn bởi dấu xuống dòng
  preparedText = preparedText.replace(/\$\$([\s\S]*?)\$\$/g, (m, inner) => '$$' + inner.replace(/[\r\n]+/g, ' ').trim() + '$$');
  preparedText = preparedText.replace(/\$([^$]+)\$/g, (m, inner) => '$' + inner.replace(/[\r\n]+/g, ' ').trim() + '$');
  const lines = preparedText.split('\n');

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const children: (TextRun | DocxMath)[] = [];

    if (idx === 0 && prefix) {
      children.push(
        new TextRun({
          text: prefix,
          bold: prefixBold,
          size: baseOptions.size || 22,
          font: 'Times New Roman',
        })
      );
    }

    const inlineRuns = createDocxInlineRuns(line, { size: 22, font: 'Times New Roman', ...baseOptions });
    children.push(...inlineRuns);

    paragraphs.push(
      new Paragraph({
        spacing: { before: idx === 0 ? 100 : 40, after: 40 },
        indent: idx > 0 && prefix ? { left: 400 } : undefined,
        children,
      })
    );
  }

  // Chèn Hình vẽ / Đồ thị dưới câu hỏi hoặc lời giải nếu có
  if (svgDiagramStr) {
    const pngBuf = await svgToPngBuffer(svgDiagramStr);
    if (pngBuf) {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 120 },
          children: [
            new ImageRun({
              data: pngBuf,
              type: 'png',
              transformation: {
                width: 360,
                height: 230,
              },
            }),
          ],
        })
      );
    }
  }

  return paragraphs;
}

/**
 * Tạo Bảng Ma Trận Đề Kiểm Tra chuẩn định dạng Công văn 7991/BGDĐT
 * (19 cột: TT, Chủ đề, Đơn vị kiến thức, 12 cột cho 4 dạng thức Nhiều lựa chọn / Đúng-Sai / Trả lời ngắn / Tự luận theo 3 mức độ Biết-Hiểu-Vận dụng, 3 cột Tổng Biết-Hiểu-VD, Tỷ lệ %)
 */
export function buildMatrixDocxTable(matrix: MatrixRow[], metadata?: ExamMetadata): Table {
  const getCellDisplay = (part: any, field: string): string => {
    if (!part) return '-';
    const val = part[field];
    if (val === undefined || val === null || val === '' || val === 0) return '-';
    return String(val);
  };

  const countQuestionsInCell = (val: string): number => {
    if (!val || val === '-') return 0;
    if (!isNaN(Number(val))) return Number(val);
    const items = val.split(',').map((s) => s.trim()).filter(Boolean);
    return items.length;
  };

  const headerFontSize = 15;
  const contentFontSize = 15;
  const headerFont = 'Times New Roman';

  // Hàng Tiêu Đề 1
  const headerRow1 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'TT', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Chủ đề /', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: 'Mạch nội dung', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Nội dung /', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: 'Đơn vị kiến thức', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableCell({
        columnSpan: 12,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E0EFEF' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Mức độ đánh giá', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tổng số câu', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Tỉ lệ', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: '% điểm', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  });

  // Hàng Tiêu Đề 2: Trắc nghiệm khách quan vs Tự luận
  const headerRow2 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        columnSpan: 9,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D8EEEE' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Trắc nghiệm khách quan', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F4EA' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tự luận', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'F0F4F8' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Biết', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'F0F4F8' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Hiểu', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'F0F4F8' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Vận dụng', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Tiêu Đề 3: 4 Dạng bài (Nhiều lựa chọn, Đúng-Sai, Trả lời ngắn, Tự luận)
  const headerRow3 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Nhiều lựa chọn', bold: true, size: 14, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Đúng – Sai', bold: true, size: 14, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Trả lời ngắn', bold: true, size: 14, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'F0F9F4' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tự luận', bold: true, size: 14, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Tiêu Đề 4: Biết - Hiểu - Vận dụng
  const makeSubHeaderCell = (text: string, fill: string = 'F7FAFA') =>
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill },
      children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 13, font: headerFont })], alignment: AlignmentType.CENTER })],
    });

  const headerRow4 = new TableRow({
    tableHeader: true,
    children: [
      // Nhiều lựa chọn
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('VD'),
      // Đúng - Sai
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('VD'),
      // Trả lời ngắn
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('VD'),
      // Tự luận
      makeSubHeaderCell('Biết', 'F4FAF6'),
      makeSubHeaderCell('Hiểu', 'F4FAF6'),
      makeSubHeaderCell('VD', 'F4FAF6'),
    ],
  });

  // Tích lũy tổng
  let sum_p1_rem = 0, sum_p1_und = 0, sum_p1_app = 0;
  let sum_p2_rem = 0, sum_p2_und = 0, sum_p2_app = 0;
  let sum_p3_rem = 0, sum_p3_und = 0, sum_p3_app = 0;
  let sum_p4_rem = 0, sum_p4_und = 0, sum_p4_app = 0;

  let sum_total_rem = 0, sum_total_und = 0, sum_total_app = 0;
  let totalPercentageSum = 0;

  const dataRows = matrix.map((row) => {
    const p1_rem = getCellDisplay(row.part1, 'remember');
    const p1_und = getCellDisplay(row.part1, 'understand');
    const p1_app = getCellDisplay(row.part1, 'apply') !== '-' ? getCellDisplay(row.part1, 'apply') : getCellDisplay(row.part1, 'advanced');

    const p2_rem = getCellDisplay(row.part2, 'remember');
    const p2_und = getCellDisplay(row.part2, 'understand');
    const p2_app = getCellDisplay(row.part2, 'apply') !== '-' ? getCellDisplay(row.part2, 'apply') : getCellDisplay(row.part2, 'advanced');

    const p3_rem = getCellDisplay(row.part3, 'remember');
    const p3_und = getCellDisplay(row.part3, 'understand');
    const p3_app = getCellDisplay(row.part3, 'apply') !== '-' ? getCellDisplay(row.part3, 'apply') : getCellDisplay(row.part3, 'advanced');

    const p4_rem = getCellDisplay(row.part4, 'remember');
    const p4_und = getCellDisplay(row.part4, 'understand');
    const p4_app = getCellDisplay(row.part4, 'apply') !== '-' ? getCellDisplay(row.part4, 'apply') : getCellDisplay(row.part4, 'advanced');

    sum_p1_rem += countQuestionsInCell(p1_rem);
    sum_p1_und += countQuestionsInCell(p1_und);
    sum_p1_app += countQuestionsInCell(p1_app);

    sum_p2_rem += countQuestionsInCell(p2_rem);
    sum_p2_und += countQuestionsInCell(p2_und);
    sum_p2_app += countQuestionsInCell(p2_app);

    sum_p3_rem += countQuestionsInCell(p3_rem);
    sum_p3_und += countQuestionsInCell(p3_und);
    sum_p3_app += countQuestionsInCell(p3_app);

    sum_p4_rem += countQuestionsInCell(p4_rem);
    sum_p4_und += countQuestionsInCell(p4_und);
    sum_p4_app += countQuestionsInCell(p4_app);

    const row_rem =
      row.totalRemember !== undefined
        ? row.totalRemember
        : countQuestionsInCell(p1_rem) + countQuestionsInCell(p2_rem) + countQuestionsInCell(p3_rem) + countQuestionsInCell(p4_rem);

    const row_und =
      row.totalUnderstand !== undefined
        ? row.totalUnderstand
        : countQuestionsInCell(p1_und) + countQuestionsInCell(p2_und) + countQuestionsInCell(p3_und) + countQuestionsInCell(p4_und);

    const row_app =
      row.totalApply !== undefined
        ? row.totalApply
        : countQuestionsInCell(p1_app) + countQuestionsInCell(p2_app) + countQuestionsInCell(p3_app) + countQuestionsInCell(p4_app);

    sum_total_rem += row_rem;
    sum_total_und += row_und;
    sum_total_app += row_app;
    totalPercentageSum += Number(row.percentage || 0);

    const makeValCell = (valStr: string, isTotal: boolean = false) => {
      const isDash = !valStr || valStr === '-';
      return new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: isTotal ? { fill: 'F9FAFB' } : undefined,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: valStr || '-',
                bold: !isDash,
                size: contentFontSize,
                font: headerFont,
                color: isDash ? '9CA3AF' : '111827',
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      });
    };

    return new TableRow({
      children: [
        // TT
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [new TextRun({ text: row.stt.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
        }),
        // Chủ đề / Mạch nội dung
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: createDocxInlineRuns(row.topic, { size: contentFontSize, font: headerFont }) })],
        }),
        // Nội dung / Đơn vị kiến thức
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: createDocxInlineRuns(row.subTopic, { size: contentFontSize, font: headerFont }) })],
        }),
        // Phần I (Nhiều lựa chọn): Biết, Hiểu, Vận dụng
        makeValCell(p1_rem),
        makeValCell(p1_und),
        makeValCell(p1_app),
        // Phần II (Đúng - Sai): Biết, Hiểu, Vận dụng
        makeValCell(p2_rem),
        makeValCell(p2_und),
        makeValCell(p2_app),
        // Phần III (Trả lời ngắn): Biết, Hiểu, Vận dụng
        makeValCell(p3_rem),
        makeValCell(p3_und),
        makeValCell(p3_app),
        // Phần IV (Tự luận): Biết, Hiểu, Vận dụng
        makeValCell(p4_rem),
        makeValCell(p4_und),
        makeValCell(p4_app),
        // Tổng: Biết, Hiểu, Vận dụng
        makeValCell(row_rem > 0 ? row_rem.toString() : '-', true),
        makeValCell(row_und > 0 ? row_und.toString() : '-', true),
        makeValCell(row_app > 0 ? row_app.toString() : '-', true),
        // Tỷ lệ % điểm
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [new TextRun({ text: `${row.percentage || 0}%`, bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
        }),
      ],
    });
  });

  const totalQuestionsAll = sum_total_rem + sum_total_und + sum_total_app;
  const makeFooterCell = (text: string, bold: boolean = true) =>
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: 'F3F4F6' },
      children: [new Paragraph({ children: [new TextRun({ text, bold, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
    });

  // Hàng Tổng 1: Tổng số câu
  const footerRow1 = new TableRow({
    children: [
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tổng số câu', bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      // P1
      makeFooterCell(sum_p1_rem > 0 ? sum_p1_rem.toString() : '-'),
      makeFooterCell(sum_p1_und > 0 ? sum_p1_und.toString() : '-'),
      makeFooterCell(sum_p1_app > 0 ? sum_p1_app.toString() : '-'),
      // P2
      makeFooterCell(sum_p2_rem > 0 ? sum_p2_rem.toString() : '-'),
      makeFooterCell(sum_p2_und > 0 ? sum_p2_und.toString() : '-'),
      makeFooterCell(sum_p2_app > 0 ? sum_p2_app.toString() : '-'),
      // P3
      makeFooterCell(sum_p3_rem > 0 ? sum_p3_rem.toString() : '-'),
      makeFooterCell(sum_p3_und > 0 ? sum_p3_und.toString() : '-'),
      makeFooterCell(sum_p3_app > 0 ? sum_p3_app.toString() : '-'),
      // P4
      makeFooterCell(sum_p4_rem > 0 ? sum_p4_rem.toString() : '-'),
      makeFooterCell(sum_p4_und > 0 ? sum_p4_und.toString() : '-'),
      makeFooterCell(sum_p4_app > 0 ? sum_p4_app.toString() : '-'),
      // Tổng Biết, Hiểu, Vận dụng
      makeFooterCell(sum_total_rem > 0 ? sum_total_rem.toString() : '-', true),
      makeFooterCell(sum_total_und > 0 ? sum_total_und.toString() : '-', true),
      makeFooterCell(sum_total_app > 0 ? sum_total_app.toString() : '-', true),
      // Tổng số câu toàn đề
      makeFooterCell(`${totalQuestionsAll} câu`, true),
    ],
  });

  // Hàng Tổng 2: Tỉ lệ % điểm
  const remPct = totalQuestionsAll > 0 ? Math.round((sum_total_rem / totalQuestionsAll) * 100) : 40;
  const undPct = totalQuestionsAll > 0 ? Math.round((sum_total_und / totalQuestionsAll) * 100) : 30;
  const appPct = 100 - remPct - undPct;

  const footerRow2 = new TableRow({
    children: [
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tỉ lệ % điểm', bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell('-'),
      makeFooterCell(`${remPct}%`, true),
      makeFooterCell(`${undPct}%`, true),
      makeFooterCell(`${appPct}%`, true),
      makeFooterCell('100%', true),
    ],
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow1, headerRow2, headerRow3, headerRow4, ...dataRows, footerRow1, footerRow2],
  });
}

/**
 * Xây dựng Bảng Đặc Tả Đề Kiểm Tra Định Kì chuẩn Công văn 7991/BGDĐT (16 cột) cho Word (.docx)
 */
function buildCV7991SpecDocxTable(
  specification: SpecRow[],
  metadata: ExamMetadata,
  questions: Question[] = []
): Table {
  const getCellDisplay = (part: any, field: string): string => {
    if (!part) return '-';
    const val = part[field];
    if (val === undefined || val === null || val === '' || val === 0) return '-';
    return String(val);
  };

  const countQuestionsInCell = (val: string): number => {
    if (!val || val === '-') return 0;
    if (!isNaN(Number(val))) return Number(val);
    const items = val.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    return items.length;
  };

  const headerFontSize = 14;
  const contentFontSize = 14;
  const headerFont = 'Times New Roman';

  // Hàng Tiêu Đề 1
  const headerRow1 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'TT', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Chủ đề/Chương', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Nội dung/đơn vị', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: 'kiến thức', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableCell({
        rowSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Yêu cầu cần đạt', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 12,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D8EEEE' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Số câu hỏi ở các mức độ đánh giá', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Tiêu Đề 2: TNKQ vs Tự luận
  const headerRow2 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        columnSpan: 9,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E0EFEF' },
        children: [new Paragraph({ children: [new TextRun({ text: 'TNKQ', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        rowSpan: 2,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F4EA' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tự luận', bold: true, size: headerFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Tiêu Đề 3: Dạng trắc nghiệm
  const headerRow3 = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Nhiều lựa chọn', bold: true, size: 13, font: headerFont, italics: true })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: '“Đúng – Sai”', bold: true, size: 13, font: headerFont, italics: true })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Trả lời ngắn', bold: true, size: 13, font: headerFont, italics: true })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Tiêu Đề 4: Biết - Hiểu - Vận dụng
  const makeSubHeaderCell = (text: string, fill: string = 'F7FAFA') =>
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill },
      children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 13, font: headerFont })], alignment: AlignmentType.CENTER })],
    });

  const headerRow4 = new TableRow({
    tableHeader: true,
    children: [
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('Vận dụng'),
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('Vận dụng'),
      makeSubHeaderCell('Biết'),
      makeSubHeaderCell('Hiểu'),
      makeSubHeaderCell('Vận dụng'),
      makeSubHeaderCell('Biết', 'F4FAF6'),
      makeSubHeaderCell('Hiểu', 'F4FAF6'),
      makeSubHeaderCell('Vận dụng', 'F4FAF6'),
    ],
  });

  // Tích lũy tổng số câu từng cột
  let sum_p1_rem = 0, sum_p1_und = 0, sum_p1_app = 0;
  let sum_p2_rem = 0, sum_p2_und = 0, sum_p2_app = 0;
  let sum_p3_rem = 0, sum_p3_und = 0, sum_p3_app = 0;
  let sum_p4_rem = 0, sum_p4_und = 0, sum_p4_app = 0;

  const makeValCell = (valStr: string) => {
    const isDash = !valStr || valStr === '-';
    return new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: valStr || '-',
              bold: !isDash,
              size: contentFontSize,
              font: headerFont,
              color: isDash ? '9CA3AF' : '111827',
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    });
  };

  const makeCompetencyCell = (
    row: SpecRow,
    rowIdx: number,
    partKey: 'part1' | 'part2' | 'part3' | 'part4',
    levelKey: 'remember' | 'understand' | 'apply'
  ) => {
    const cellQuestions = getSpecCellQuestions(
      row,
      rowIdx,
      specification,
      partKey,
      levelKey,
      questions,
      metadata?.subject
    );

    if (cellQuestions.length === 0) {
      return makeValCell('-');
    }

    const paragraphs = cellQuestions.map(
      (item) =>
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 20, after: 20 },
          children: [
            new TextRun({
              text: `(${item.questionLabel})`,
              bold: true,
              size: 13,
              font: headerFont,
              color: '111827',
            }),
            new TextRun({
              text: `(${item.competencyCode})*`,
              size: 11,
              font: headerFont,
              color: '006666',
              break: 1, // Xuống dòng phía dưới tên câu hỏi!
            }),
          ],
        })
    );

    return new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      children: paragraphs,
    });
  };

  const bodyRows: TableRow[] = [];

  specification.forEach((row, rowIdx) => {
    const p1_rem = getCellDisplay(row.part1, 'remember');
    const p1_und = getCellDisplay(row.part1, 'understand');
    const p1_app = getCellDisplay(row.part1, 'apply') !== '-' ? getCellDisplay(row.part1, 'apply') : getCellDisplay(row.part1, 'advanced');

    const p2_rem = getCellDisplay(row.part2, 'remember');
    const p2_und = getCellDisplay(row.part2, 'understand');
    const p2_app = getCellDisplay(row.part2, 'apply') !== '-' ? getCellDisplay(row.part2, 'apply') : getCellDisplay(row.part2, 'advanced');

    const p3_rem = getCellDisplay(row.part3, 'remember');
    const p3_und = getCellDisplay(row.part3, 'understand');
    const p3_app = getCellDisplay(row.part3, 'apply') !== '-' ? getCellDisplay(row.part3, 'apply') : getCellDisplay(row.part3, 'advanced');

    const p4_rem = getCellDisplay(row.part4, 'remember');
    const p4_und = getCellDisplay(row.part4, 'understand');
    const p4_app = getCellDisplay(row.part4, 'apply') !== '-' ? getCellDisplay(row.part4, 'apply') : getCellDisplay(row.part4, 'advanced');

    sum_p1_rem += countQuestionsInCell(p1_rem);
    sum_p1_und += countQuestionsInCell(p1_und);
    sum_p1_app += countQuestionsInCell(p1_app);

    sum_p2_rem += countQuestionsInCell(p2_rem);
    sum_p2_und += countQuestionsInCell(p2_und);
    sum_p2_app += countQuestionsInCell(p2_app);

    sum_p3_rem += countQuestionsInCell(p3_rem);
    sum_p3_und += countQuestionsInCell(p3_und);
    sum_p3_app += countQuestionsInCell(p3_app);

    sum_p4_rem += countQuestionsInCell(p4_rem);
    sum_p4_und += countQuestionsInCell(p4_und);
    sum_p4_app += countQuestionsInCell(p4_app);

    const levels = parseRequirementsByLevel(row.requirements);

    // Sub-row 1: Biết
    bodyRows.push(
      new TableRow({
        children: [
          new TableCell({
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ children: [new TextRun({ text: row.stt.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ children: createDocxInlineRuns(row.topic, { size: contentFontSize, font: headerFont, bold: true }) })],
          }),
          new TableCell({
            rowSpan: 3,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ children: createDocxInlineRuns(row.subTopic || row.topic, { size: contentFontSize, font: headerFont }) })],
          }),
          new TableCell({
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '- Biết: ', bold: true, size: contentFontSize, font: headerFont, color: '006666' }),
                  ...createDocxInlineRuns(levels.remember || '...', { size: contentFontSize, font: headerFont }),
                ],
              }),
            ],
          }),
          makeCompetencyCell(row, rowIdx, 'part1', 'remember'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part2', 'remember'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part3', 'remember'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part4', 'remember'),
          makeValCell('-'),
          makeValCell('-'),
        ],
      })
    );

    // Sub-row 2: Hiểu
    bodyRows.push(
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '- Hiểu: ', bold: true, size: contentFontSize, font: headerFont, color: 'B45309' }),
                  ...createDocxInlineRuns(levels.understand || '...', { size: contentFontSize, font: headerFont }),
                ],
              }),
            ],
          }),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part1', 'understand'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part2', 'understand'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part3', 'understand'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part4', 'understand'),
          makeValCell('-'),
        ],
      })
    );

    // Sub-row 3: Vận dụng
    bodyRows.push(
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '- VD: ', bold: true, size: contentFontSize, font: headerFont, color: '7E22CE' }),
                  ...createDocxInlineRuns(levels.apply || '...', { size: contentFontSize, font: headerFont }),
                ],
              }),
            ],
          }),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part1', 'apply'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part2', 'apply'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part3', 'apply'),
          makeValCell('-'),
          makeValCell('-'),
          makeCompetencyCell(row, rowIdx, 'part4', 'apply'),
        ],
      })
    );
  });

  // Điểm số và tỉ lệ
  const examScores = calculateExamScores(metadata?.questionCounts || {
    part1_MCQSingle: 12,
    part2_MCQTrueFalse: 2,
    part3_MCQShort: 4,
    part4_Essay: 2,
  });

  const p1Score = examScores.part1Score || 3.0;
  const p2Score = examScores.part2Score || 2.0;
  const p3Score = examScores.part3Score || 2.0;
  const p4Score = examScores.part4Score || 3.0;
  const totalScore = examScores.totalScore || 10.0;

  const p1Pct = Math.round((p1Score / totalScore) * 100);
  const p2Pct = Math.round((p2Score / totalScore) * 100);
  const p3Pct = Math.round((p3Score / totalScore) * 100);
  const p4Pct = 100 - p1Pct - p2Pct - p3Pct;

  const formatScore = (num: number) => num.toFixed(1).replace('.', ',');

  const makeFooterCell = (text: string, isBold: boolean = true, fill: string = 'F9FAFB') =>
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill },
      children: [new Paragraph({ children: [new TextRun({ text, bold: isBold, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
    });

  // Hàng Footer 1: Tổng số câu
  const footerRow1 = new TableRow({
    children: [
      new TableCell({
        columnSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tổng số câu', bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      makeFooterCell(sum_p1_rem > 0 ? sum_p1_rem.toString() : '-'),
      makeFooterCell(sum_p1_und > 0 ? sum_p1_und.toString() : '-'),
      makeFooterCell(sum_p1_app > 0 ? sum_p1_app.toString() : '-'),
      makeFooterCell(sum_p2_rem > 0 ? sum_p2_rem.toString() : '-'),
      makeFooterCell(sum_p2_und > 0 ? sum_p2_und.toString() : '-'),
      makeFooterCell(sum_p2_app > 0 ? sum_p2_app.toString() : '-'),
      makeFooterCell(sum_p3_rem > 0 ? sum_p3_rem.toString() : '-'),
      makeFooterCell(sum_p3_und > 0 ? sum_p3_und.toString() : '-'),
      makeFooterCell(sum_p3_app > 0 ? sum_p3_app.toString() : '-'),
      makeFooterCell(sum_p4_rem > 0 ? sum_p4_rem.toString() : '-'),
      makeFooterCell(sum_p4_und > 0 ? sum_p4_und.toString() : '-'),
      makeFooterCell(sum_p4_app > 0 ? sum_p4_app.toString() : '-'),
    ],
  });

  // Hàng Footer 2: Tổng số điểm (spans 3 cols per part)
  const footerRow2 = new TableRow({
    children: [
      new TableCell({
        columnSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tổng số điểm', bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: formatScore(p1Score), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: formatScore(p2Score), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F7F7' },
        children: [new Paragraph({ children: [new TextRun({ text: formatScore(p3Score), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'E6F4EA' },
        children: [new Paragraph({ children: [new TextRun({ text: formatScore(p4Score), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  // Hàng Footer 3: Tỉ lệ %
  const footerRow3 = new TableRow({
    children: [
      new TableCell({
        columnSpan: 4,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'EBF4F6' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Tỉ lệ %', bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D8EEEE' },
        children: [new Paragraph({ children: [new TextRun({ text: p1Pct.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D8EEEE' },
        children: [new Paragraph({ children: [new TextRun({ text: p2Pct.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D8EEEE' },
        children: [new Paragraph({ children: [new TextRun({ text: p3Pct.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: 'D0E8D7' },
        children: [new Paragraph({ children: [new TextRun({ text: p4Pct.toString(), bold: true, size: contentFontSize, font: headerFont })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow1, headerRow2, headerRow3, headerRow4, ...bodyRows, footerRow1, footerRow2, footerRow3],
  });
}

/**
 * Xây dựng Bảng Đặc Tả Mẫu chi tiết (5 cột) hiện có cho Word (.docx)
 */
function buildClassicSpecDocxTable(
  specification: SpecRow[],
  primaryQuestions: Question[] = []
): Table {
  const specHeaderRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        width: { size: 8, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 19 })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Chủ đề / Đơn vị kiến thức', bold: true, font: 'Times New Roman', size: 19 })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 40, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Yêu cầu cần đạt', bold: true, font: 'Times New Roman', size: 19 })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 18, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Số câu / Dạng câu', bold: true, font: 'Times New Roman', size: 19 })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 9, type: WidthType.PERCENTAGE },
        shading: { fill: 'F2F4F7' },
        children: [new Paragraph({ children: [new TextRun({ text: 'Điểm tổng', bold: true, font: 'Times New Roman', size: 19 })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  const specRows = specification.map((row, rowIdx) => {
    const details = getSpecRowQuestionDetails(row, rowIdx, specification, primaryQuestions);
    const detailParagraphs = details.map(
      (d) =>
        new Paragraph({
          children: [new TextRun({ text: d, font: 'Times New Roman', size: 18 })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 20, after: 20 },
        })
    );

    const rowComps = [
      ...getSpecCellQuestions(row, rowIdx, specification, 'part1', 'remember', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part1', 'understand', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part1', 'apply', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part2', 'remember', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part2', 'understand', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part2', 'apply', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part3', 'remember', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part3', 'understand', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part3', 'apply', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part4', 'remember', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part4', 'understand', primaryQuestions),
      ...getSpecCellQuestions(row, rowIdx, specification, 'part4', 'apply', primaryQuestions),
    ];
    const uniqueComps = Array.from(new Map(rowComps.map((c) => [c.competencyCode, c])).values());
    const compParagraphs = uniqueComps.length > 0
      ? [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 10 },
            children: [
              new TextRun({
                text: uniqueComps.map((c) => `(${c.competencyCode})`).join(' '),
                size: 15,
                font: 'Times New Roman',
                italics: true,
                color: '006666',
              }),
            ],
          }),
        ]
      : [];

    return new TableRow({
      children: [
        new TableCell({
          width: { size: 8, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: row.stt.toString(), font: 'Times New Roman', size: 18 })], alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: createDocxInlineRuns(row.topic, { font: 'Times New Roman', size: 18 }) })],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: createDocxInlineRuns(row.requirements, { font: 'Times New Roman', size: 18 }) })],
        }),
        new TableCell({
          width: { size: 18, type: WidthType.PERCENTAGE },
          children:
            detailParagraphs.length > 0
              ? [...detailParagraphs, ...compParagraphs]
              : [new Paragraph({ children: [new TextRun({ text: '-', font: 'Times New Roman', size: 18 })], alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: { size: 9, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: `${row.totalPoints} đ`, font: 'Times New Roman', bold: true, size: 18 })], alignment: AlignmentType.CENTER })],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [specHeaderRow, ...specRows],
  });
}

export class ExportDocx {
  /**
   * Xuất toàn bộ Gói Đề Thi (Ma trận, Bảng đặc tả, Đề thi các mã, Đáp án, Rubric) ra 1 file Word (.docx)
   */
  static async exportExamPackageToDocx(examPack: ExamPackage): Promise<void> {
    const { metadata, matrix, specification, exams, answerKeys } = examPack;

    const docChildren: any[] = [];

    // --- TRANG PHỦ / TIÊU ĐỀ HÀNH CHÍNH ---
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.departmentName.toUpperCase(),
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.schoolName.toUpperCase(),
            bold: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `BỘ ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991/BGDĐT`,
            bold: true,
            size: 28,
            color: '008080',
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({
            text: `Môn: ${metadata.subject} - Lớp: ${metadata.grade} (${metadata.curriculum})`,
            italics: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      })
    );

    // --- 1. MA TRẬN ĐỀ KIỂM TRA ---
    docChildren.push(
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `I. MA TRẬN ĐỀ KIỂM TRA (${metadata.examTitle.toUpperCase()})`,
            bold: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      }),
      buildMatrixDocxTable(matrix),
      new Paragraph({ text: '', spacing: { after: 300 } })
    );

    // --- 2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ THEO CÔNG VĂN 7991/BGDĐT ---
    docChildren.push(
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (CHUẨN CÔNG VĂN 7991/BGDĐT)`,
            bold: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      }),
      buildCV7991SpecDocxTable(specification, metadata, exams[0]?.questions || []),
      new Paragraph({
        spacing: { before: 60, after: 80 },
        children: [
          new TextRun({
            text: '* Có ở trong một số ô của bản đặc tả, ghi tắt tên của năng lực (đã được quy định trong chương trình môn học/hoạt động giáo dục).',
            italics: true,
            size: 16,
            font: 'Times New Roman',
            color: '666666',
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 40, after: 180 },
        children: [
          new TextRun({
            text: `Ký hiệu các Năng lực đặc thù môn ${metadata.subject} (CT GDPT 2018): ` +
              getSubjectCompetencies(metadata.subject)
                .map((c) => `${c.code}: ${c.name}`)
                .join('; '),
            italics: true,
            size: 16,
            font: 'Times New Roman',
            color: '006666',
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 150, after: 80 },
        children: [
          new TextRun({
            text: `BẢNG PHÂN BỔ SỐ CÂU VÀ DẠNG CÂU CHI TIẾT (YCCĐ):`,
            bold: true,
            size: 20,
            font: 'Times New Roman',
            color: '008080',
          }),
        ],
      }),
      buildClassicSpecDocxTable(specification, exams[0]?.questions || []),
      new Paragraph({ text: '', spacing: { after: 350 } })
    );

    // --- 3. ĐỀ THI CÁC MÃ ĐỀ ---
    docChildren.push(new Paragraph({ children: [new PageBreak()] }));

    for (let idx = 0; idx < exams.length; idx++) {
      const examCodeObj = exams[idx];
      if (idx > 0) {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }

      docChildren.push(...buildDocxHeaderBlock(metadata, examCodeObj.code, false));

      const part1Questions = examCodeObj.questions.filter((q) => q.partType === 'PART1');
      const part2Questions = examCodeObj.questions.filter((q) => q.partType === 'PART2');
      const part3Questions = examCodeObj.questions.filter((q) => q.partType === 'PART3');
      const part4Questions = examCodeObj.questions.filter((q) => q.partType === 'PART4');

      // Part I
      if (part1Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN I. Câu hỏi trắc nghiệm nhiều phương án lựa chọn (Thí sinh chọn 1 đáp án đúng nhất)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part1Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART1');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);

          if (q.options) {
            for (const opt of q.options) {
              const optPars = await buildContentParagraphs(opt.content, `${opt.key}. `, true, { size: 22 });
              docChildren.push(...optPars);
            }
          }
        }
      }

      // Part II
      if (part2Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai (Trong mỗi ý ở mỗi câu, thí sinh chọn Đúng hoặc Sai)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part2Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART2');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);

          if (q.trueFalseStatements) {
            for (const st of q.trueFalseStatements) {
              const stPars = await buildContentParagraphs(st.content, `${st.key}) `, true, { size: 22 });
              docChildren.push(...stPars);
            }
          }
        }
      }

      // Part III
      if (part3Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn (Thí sinh điền kết quả ngắn gọn)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part3Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART3');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);
        }
      }

      // Part IV
      if (part4Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN IV. Tự luận (Thí sinh trình bày chi tiết bài làm)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part4Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART4');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag} (${q.points} điểm): `, true, { size: 22 });
          docChildren.push(...qPars);
        }
      }
    }

    // --- 4. ĐÁP ÁN & HƯỚNG DẪN CHẤM ---
    docChildren.push(new Paragraph({ children: [new PageBreak()] }));

    for (let idx = 0; idx < answerKeys.length; idx++) {
      const ak = answerKeys[idx];
      if (idx > 0) {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }

      docChildren.push(...buildDocxHeaderBlock(metadata, ak.code, true));

      // Bảng đáp án Phần I
      if (ak.part1Answers && ak.part1Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN I. Đáp án Trắc nghiệm Nhiều phương án lựa chọn:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const rowsP1: TableRow[] = [
          new TableRow({
            children: ak.part1Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `C${ans.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
          new TableRow({
            children: ak.part1Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ans.correctOption, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
        ];

        docChildren.push(new Table({ rows: rowsP1 }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Bảng đáp án Phần II (Đúng/Sai)
      if (ak.part2Answers && ak.part2Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 150, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN II. Đáp án Trắc nghiệm Đúng / Sai:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const headerRowP2 = new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Câu hỏi', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý a)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý b)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý c)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý d)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
          ],
        });

        const rowsP2 = ak.part2Answers.map((p2) => {
          const getVal = (k: string) => {
            const st = p2.statements.find((s) => s.key === k);
            return st ? (st.isCorrect ? 'ĐÚNG' : 'SAI') : '-';
          };
          return new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `Câu ${p2.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('a'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('b'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('c'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('d'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            ],
          });
        });

        docChildren.push(new Table({ rows: [headerRowP2, ...rowsP2] }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Bảng đáp án Phần III (Trả lời ngắn)
      if (ak.part3Answers && ak.part3Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 150, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN III. Đáp án Trắc nghiệm Trả lời ngắn:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const rowsP3: TableRow[] = [
          new TableRow({
            children: ak.part3Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `C${ans.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
          new TableRow({
            children: ak.part3Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: createDocxInlineRuns(ans.shortAnswer, { bold: true, size: 18, font: 'Times New Roman' }), alignment: AlignmentType.CENTER })] })),
          }),
        ];

        docChildren.push(new Table({ rows: rowsP3 }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Đáp án & Hướng dẫn giải chi tiết cho tất cả các phần (I, II, III, IV)
      const targetExam = exams.find((e) => e.code === ak.code) || exams[0];
      if (targetExam) {
        const p1WithExp = targetExam.questions.filter((q) => q.partType === 'PART1' && q.explanation);
        const p2WithExp = targetExam.questions.filter((q) => q.partType === 'PART2' && q.explanation);
        const p3WithExp = targetExam.questions.filter((q) => q.partType === 'PART3' && (q.explanation || q.shortAnswer));
        const p4Questions = targetExam.questions.filter((q) => q.partType === 'PART4');

        if (p1WithExp.length > 0 || p2WithExp.length > 0 || p3WithExp.length > 0) {
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({
                  text: 'HƯỚNG DẪN GIẢI CHI TIẾT CÂU HỎI TRẮC NGHIỆM (PHẦN I, II, III):',
                  bold: true,
                  size: 22,
                  font: 'Times New Roman',
                  color: '008080',
                }),
              ],
            })
          );

          if (p1WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 100, after: 60 },
                children: [
                  new TextRun({
                    text: '1. Giải thích chi tiết Phần I (Trắc nghiệm nhiều lựa chọn):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p1WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART1');
              const title = `Câu ${q.number} ${tag} (Đáp án đúng: ${q.correctOption}): `;
              const pars = await buildContentParagraphs(q.explanation || '', title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }

          if (p2WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 120, after: 60 },
                children: [
                  new TextRun({
                    text: '2. Giải thích chi tiết Phần II (Trắc nghiệm Đúng/Sai):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p2WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART2');
              const title = `Câu ${q.number} ${tag}: `;
              const pars = await buildContentParagraphs(q.explanation || '', title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }

          if (p3WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 120, after: 60 },
                children: [
                  new TextRun({
                    text: '3. Giải thích chi tiết Phần III (Trắc nghiệm trả lời ngắn):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p3WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART3');
              const title = `Câu ${q.number} ${tag} (Đáp số: ${q.shortAnswer || ''}): `;
              const solText = q.explanation || `Đáp số chính xác: ${q.shortAnswer || ''}`;
              const pars = await buildContentParagraphs(solText, title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }
        }

        if (p4Questions.length > 0) {
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({
                  text: 'PHẦN IV. Hướng dẫn giải chi tiết Tự luận & Rubric chấm điểm:',
                  bold: true,
                  size: 22,
                  font: 'Times New Roman',
                  color: '008080',
                }),
              ],
            })
          );

          for (const q of p4Questions) {
            const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART4');
            const title = `Câu ${q.number} ${tag} (${q.points} điểm): `;
            const textContent = q.essayAnswerGuide || q.explanation || q.content;
            const solPars = await buildContentParagraphs(textContent, title, true, { size: 21 });
            docChildren.push(...solPars);

            if (q.rubric && q.rubric.length > 0) {
              docChildren.push(
                new Paragraph({
                  spacing: { before: 100, after: 60 },
                  children: [
                    new TextRun({
                      text: 'Bảng Rubric chấm điểm:',
                      bold: true,
                      size: 20,
                      font: 'Times New Roman',
                      color: '008080',
                    }),
                  ],
                }),
                buildDocxRubricTable(q.rubric),
                new Paragraph({ text: '', spacing: { after: 120 } })
              );
            }
          }
        }
      }
    }

    const doc = new Document({
      sections: [createDocxSection(docChildren)],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `De_Thi_Va_Dap_An_${metadata.subject}_${metadata.grade}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  /**
   * Xuất CHỈ phần Đề Thi các mã đề ra file Word riêng
   */
  static async exportExamsOnlyToDocx(examPack: ExamPackage): Promise<void> {
    const { metadata, exams } = examPack;
    const docChildren: any[] = [];

    for (let idx = 0; idx < exams.length; idx++) {
      const examCodeObj = exams[idx];
      if (idx > 0) {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }

      docChildren.push(...buildDocxHeaderBlock(metadata, examCodeObj.code, false));

      const part1Questions = examCodeObj.questions.filter((q) => q.partType === 'PART1');
      const part2Questions = examCodeObj.questions.filter((q) => q.partType === 'PART2');
      const part3Questions = examCodeObj.questions.filter((q) => q.partType === 'PART3');
      const part4Questions = examCodeObj.questions.filter((q) => q.partType === 'PART4');

      if (part1Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN I. Câu hỏi trắc nghiệm nhiều phương án lựa chọn (Thí sinh chọn 1 đáp án đúng nhất)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part1Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART1');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);

          if (q.options) {
            for (const opt of q.options) {
              const optPars = await buildContentParagraphs(opt.content, `${opt.key}. `, true, { size: 22 });
              docChildren.push(...optPars);
            }
          }
        }
      }

      if (part2Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai (Trong mỗi ý ở mỗi câu, thí sinh chọn Đúng hoặc Sai)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part2Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART2');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);

          if (q.trueFalseStatements) {
            for (const st of q.trueFalseStatements) {
              const stPars = await buildContentParagraphs(st.content, `${st.key}) `, true, { size: 22 });
              docChildren.push(...stPars);
            }
          }
        }
      }

      if (part3Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn (Thí sinh điền kết quả ngắn gọn)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part3Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART3');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag}: `, true, { size: 22 });
          docChildren.push(...qPars);
        }
      }

      if (part4Questions.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: 'PHẦN IV. Tự luận (Thí sinh trình bày chi tiết bài làm)',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        for (const q of part4Questions) {
          const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART4');
          const qPars = await buildContentParagraphs(q.content, `Câu ${q.number} ${tag} (${q.points} điểm): `, true, { size: 22 });
          docChildren.push(...qPars);
        }
      }
    }

    const doc = new Document({
      sections: [createDocxSection(docChildren)],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `De_Thi_Cac_Ma_De_${metadata.subject}_${metadata.grade}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  /**
   * Xuất CHỈ phần Đáp Án & HƯỚNG DẪN CHẤM ra file Word riêng
   */
  static async exportAnswerKeysOnlyToDocx(examPack: ExamPackage): Promise<void> {
    const { metadata, answerKeys, exams } = examPack;
    const docChildren: any[] = [];

    for (let idx = 0; idx < answerKeys.length; idx++) {
      const ak = answerKeys[idx];
      if (idx > 0) {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }

      docChildren.push(...buildDocxHeaderBlock(metadata, ak.code, true));

      // Bảng đáp án Phần I
      if (ak.part1Answers && ak.part1Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN I. Đáp án Trắc nghiệm Nhiều phương án lựa chọn:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const rowsP1: TableRow[] = [
          new TableRow({
            children: ak.part1Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `C${ans.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
          new TableRow({
            children: ak.part1Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ans.correctOption, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
        ];

        docChildren.push(new Table({ rows: rowsP1 }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Bảng đáp án Phần II (Đúng/Sai)
      if (ak.part2Answers && ak.part2Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 150, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN II. Đáp án Trắc nghiệm Đúng / Sai:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const headerRowP2 = new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Câu hỏi', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý a)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý b)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý c)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ý d)', bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
          ],
        });

        const rowsP2 = ak.part2Answers.map((p2) => {
          const getVal = (k: string) => {
            const st = p2.statements.find((s) => s.key === k);
            return st ? (st.isCorrect ? 'ĐÚNG' : 'SAI') : '-';
          };
          return new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `Câu ${p2.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('a'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('b'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('c'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getVal('d'), size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] }),
            ],
          });
        });

        docChildren.push(new Table({ rows: [headerRowP2, ...rowsP2] }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Bảng đáp án Phần III (Trả lời ngắn)
      if (ak.part3Answers && ak.part3Answers.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 150, after: 50 },
            children: [
              new TextRun({
                text: 'PHẦN III. Đáp án Trắc nghiệm Trả lời ngắn:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          })
        );

        const rowsP3: TableRow[] = [
          new TableRow({
            children: ak.part3Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `C${ans.questionNumber}`, bold: true, size: 18, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })] })),
          }),
          new TableRow({
            children: ak.part3Answers.map((ans) => new TableCell({ children: [new Paragraph({ children: createDocxInlineRuns(ans.shortAnswer, { bold: true, size: 18, font: 'Times New Roman' }), alignment: AlignmentType.CENTER })] })),
          }),
        ];

        docChildren.push(new Table({ rows: rowsP3 }), new Paragraph({ text: '', spacing: { after: 150 } }));
      }

      // Đáp án & Hướng dẫn giải chi tiết cho tất cả các phần (I, II, III, IV)
      const targetExam = exams.find((e) => e.code === ak.code) || exams[0];
      if (targetExam) {
        const p1WithExp = targetExam.questions.filter((q) => q.partType === 'PART1' && q.explanation);
        const p2WithExp = targetExam.questions.filter((q) => q.partType === 'PART2' && q.explanation);
        const p3WithExp = targetExam.questions.filter((q) => q.partType === 'PART3' && (q.explanation || q.shortAnswer));
        const p4Questions = targetExam.questions.filter((q) => q.partType === 'PART4');

        if (p1WithExp.length > 0 || p2WithExp.length > 0 || p3WithExp.length > 0) {
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({
                  text: 'HƯỚNG DẪN GIẢI CHI TIẾT CÂU HỎI TRẮC NGHIỆM (PHẦN I, II, III):',
                  bold: true,
                  size: 22,
                  font: 'Times New Roman',
                  color: '008080',
                }),
              ],
            })
          );

          if (p1WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 100, after: 60 },
                children: [
                  new TextRun({
                    text: '1. Giải thích chi tiết Phần I (Trắc nghiệm nhiều lựa chọn):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p1WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART1');
              const title = `Câu ${q.number} ${tag} (Đáp án đúng: ${q.correctOption}): `;
              const pars = await buildContentParagraphs(q.explanation || '', title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }

          if (p2WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 120, after: 60 },
                children: [
                  new TextRun({
                    text: '2. Giải thích chi tiết Phần II (Trắc nghiệm Đúng/Sai):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p2WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART2');
              const title = `Câu ${q.number} ${tag}: `;
              const pars = await buildContentParagraphs(q.explanation || '', title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }

          if (p3WithExp.length > 0) {
            docChildren.push(
              new Paragraph({
                spacing: { before: 120, after: 60 },
                children: [
                  new TextRun({
                    text: '3. Giải thích chi tiết Phần III (Trắc nghiệm trả lời ngắn):',
                    bold: true,
                    size: 20,
                    font: 'Times New Roman',
                  }),
                ],
              })
            );
            for (const q of p3WithExp) {
              const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART3');
              const title = `Câu ${q.number} ${tag} (Đáp số: ${q.shortAnswer || ''}): `;
              const solText = q.explanation || `Đáp số chính xác: ${q.shortAnswer || ''}`;
              const pars = await buildContentParagraphs(solText, title, true, { size: 21 });
              docChildren.push(...pars);
            }
          }
        }

        if (p4Questions.length > 0) {
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({
                  text: 'PHẦN IV. Hướng dẫn giải chi tiết Tự luận & Rubric chấm điểm:',
                  bold: true,
                  size: 22,
                  font: 'Times New Roman',
                  color: '008080',
                }),
              ],
            })
          );

          for (const q of p4Questions) {
            const tag = getCognitiveTag(q.cognitiveLevel, q.partType || 'PART4');
            const title = `Câu ${q.number} ${tag} (${q.points} điểm): `;
            const textContent = q.essayAnswerGuide || q.explanation || q.content;
            const solPars = await buildContentParagraphs(textContent, title, true, { size: 21 });
            docChildren.push(...solPars);

            if (q.rubric && q.rubric.length > 0) {
              docChildren.push(
                new Paragraph({
                  spacing: { before: 100, after: 60 },
                  children: [
                    new TextRun({
                      text: 'Bảng Rubric chấm điểm:',
                      bold: true,
                      size: 20,
                      font: 'Times New Roman',
                      color: '008080',
                    }),
                  ],
                }),
                buildDocxRubricTable(q.rubric),
                new Paragraph({ text: '', spacing: { after: 120 } })
              );
            }
          }
        }
      }
    }

    const doc = new Document({
      sections: [createDocxSection(docChildren)],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `Dap_An_Va_Huong_Dan_Cham_${metadata.subject}_${metadata.grade}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  /**
   * Xuất riêng Ma trận Đề kiểm tra ra 1 file Word (.docx)
   */
  static async exportMatrixOnlyToDocx(examPack: ExamPackage): Promise<void> {
    const { metadata, matrix } = examPack;

    const docChildren: any[] = [];

    // Header thông tin hành chính
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.departmentName.toUpperCase(),
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.schoolName.toUpperCase(),
            bold: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 150 },
        children: [
          new TextRun({
            text: `KHUNG MA TRẬN ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991/BGDĐT`,
            bold: true,
            size: 26,
            color: '008080',
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: `Môn: ${metadata.subject} - Lớp: ${metadata.grade} (${metadata.curriculum}) | Thời gian: ${metadata.durationMinutes} phút | Tổng điểm: ${metadata.totalPoints}đ`,
            italics: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );

    docChildren.push(buildMatrixDocxTable(matrix));

    const doc = new Document({
      sections: [createDocxSection(docChildren)],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `Ma_Tran_De_Thi_${metadata.subject}_${metadata.grade}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  /**
   * Xuất riêng Bản Đặc Tả Đề Kiểm Tra ra 1 file Word (.docx)
   * mode = 'cv7991' (Mẫu 16 cột CV 7991) hoặc 'classic' (Mẫu 5 cột chi tiết)
   */
  static async exportSpecOnlyToDocx(examPack: ExamPackage, mode: 'cv7991' | 'classic' = 'cv7991'): Promise<void> {
    const { metadata, specification, exams } = examPack;
    const docChildren: any[] = [];

    // Header hành chính
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.departmentName.toUpperCase(),
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: metadata.schoolName.toUpperCase(),
            bold: true,
            size: 24,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 120 },
        children: [
          new TextRun({
            text: mode === 'cv7991'
              ? `BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (CHƯƠNG TRÌNH GDPT 2018)`
              : `BẢNG ĐẶC TẢ YÊU CẦU CẦN ĐẠT ĐỀ KIỂM TRA`,
            bold: true,
            size: 26,
            color: '008080',
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: `Môn: ${metadata.subject} - Lớp: ${metadata.grade} (${metadata.curriculum}) | ${metadata.examTitle}`,
            italics: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );

    if (mode === 'cv7991') {
      docChildren.push(
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: `2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (CHUẨN CÔNG VĂN 7991/BGDĐT)`,
              bold: true,
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        }),
        buildCV7991SpecDocxTable(specification, metadata, exams[0]?.questions || []),
        new Paragraph({
          spacing: { before: 60, after: 80 },
          children: [
            new TextRun({
              text: '* Có ở trong một số ô của bản đặc tả, ghi tắt tên của năng lực (đã được quy định trong chương trình môn học/hoạt động giáo dục).',
              italics: true,
              size: 16,
              font: 'Times New Roman',
              color: '666666',
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 40, after: 150 },
          children: [
            new TextRun({
              text: `Ký hiệu các Năng lực đặc thù môn ${metadata.subject} (CT GDPT 2018): ` +
                getSubjectCompetencies(metadata.subject)
                  .map((c) => `${c.code}: ${c.name}`)
                  .join('; '),
              italics: true,
              size: 16,
              font: 'Times New Roman',
              color: '006666',
            }),
          ],
        })
      );
    } else {
      docChildren.push(
        buildClassicSpecDocxTable(specification, exams[0]?.questions || [])
      );
    }

    const doc = new Document({
      sections: [createDocxSection(docChildren)],
    });

    const blob = await Packer.toBlob(doc);
    const suffix = mode === 'cv7991' ? 'CV7991' : 'Chi_Tiet';
    const fileName = `Ban_Dac_Ta_${metadata.subject}_${metadata.grade}_${suffix}.docx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  }

  /**
   * Alias method cho exportExamPackageToDocx
   */
  static async exportPackageToWord(examPack: ExamPackage): Promise<void> {
    return this.exportExamPackageToDocx(examPack);
  }
}
