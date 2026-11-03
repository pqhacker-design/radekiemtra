import React, { useState, useRef } from 'react';
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Eye,
  FileEdit,
  Pencil,
  Save,
  X,
  Target,
} from 'lucide-react';
import { Question, CognitiveLevel, PartType, MCQOption, TrueFalseStatement } from '../types';
import { MathText } from './MathText';

interface MathSnippet {
  label: string;
  snippet: string;
  title: string;
  category: 'all' | 'algebra' | 'geometry' | 'sets' | 'calculus' | 'science';
  isCommon?: boolean;
}

const MATH_SNIPPETS: MathSnippet[] = [
  // Cú pháp bao bọc & Hệ phương trình phổ biến
  { label: '$...$', snippet: '$...$', title: 'Bọc công thức toán học nội dòng ($...$)', category: 'all', isCommon: true },
  { label: '$$...$$', snippet: '$$...$$', title: 'Bọc khối công thức toán trưng bày riêng ($$...$$)', category: 'all', isCommon: true },
  {
    label: 'Hệ 2 ẩn',
    snippet: '\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}',
    title: 'Hệ phương trình bậc nhất 2 ẩn chuẩn \\begin{cases} ... \\end{cases}',
    category: 'all',
    isCommon: true,
  },
  {
    label: 'Hệ 3 ẩn',
    snippet: '\\begin{cases} a_1x + b_1y + c_1z = d_1 \\\\ a_2x + b_2y + c_2z = d_2 \\\\ a_3x + b_3y + c_3z = d_3 \\end{cases}',
    title: 'Hệ phương trình bậc nhất 3 ẩn',
    category: 'algebra',
    isCommon: true,
  },

  // 1. ĐẠI SỐ & SỐ HỌC (THCS & THPT)
  { label: 'a/b', snippet: '\\frac{a}{b}', title: 'Phân số thường: \\frac{a}{b}', category: 'algebra', isCommon: true },
  { label: 'dfrac', snippet: '\\dfrac{a}{b}', title: 'Phân số kích thước lớn: \\dfrac{a}{b}', category: 'algebra' },
  { label: '√x', snippet: '\\sqrt{x}', title: 'Căn bậc hai: \\sqrt{x}', category: 'algebra', isCommon: true },
  { label: 'ⁿ√x', snippet: '\\sqrt[n]{x}', title: 'Căn bậc n: \\sqrt[n]{x}', category: 'algebra', isCommon: true },
  { label: '³√x', snippet: '\\sqrt[3]{x}', title: 'Căn bậc ba: \\sqrt[3]{x}', category: 'algebra' },
  { label: 'x²', snippet: 'x^2', title: 'Bình phương: x^2', category: 'algebra', isCommon: true },
  { label: 'xⁿ', snippet: 'x^n', title: 'Lũy thừa bậc n: x^n', category: 'algebra', isCommon: true },
  { label: 'x₁', snippet: 'x_1', title: 'Chỉ số dưới 1: x_1', category: 'algebra', isCommon: true },
  { label: 'x₂', snippet: 'x_2', title: 'Chỉ số dưới 2: x_2', category: 'algebra' },
  { label: 'xₙ', snippet: 'x_n', title: 'Chỉ số dưới n: x_n', category: 'algebra' },
  { label: 'uₙ', snippet: 'u_n', title: 'Số hạng dãy số: u_n', category: 'algebra' },
  { label: '|x|', snippet: '|x|', title: 'Giá trị tuyệt đối: |x|', category: 'algebra', isCommon: true },
  { label: '±', snippet: '\\pm', title: 'Cộng trừ: \\pm', category: 'algebra', isCommon: true },
  { label: '∓', snippet: '\\mp', title: 'Trừ cộng: \\mp', category: 'algebra' },
  { label: '·', snippet: '\\cdot', title: 'Dấu nhân chấm: \\cdot', category: 'algebra', isCommon: true },
  { label: '×', snippet: '\\times', title: 'Dấu nhân chéo: \\times', category: 'algebra', isCommon: true },
  { label: '÷', snippet: '\\div', title: 'Dấu chia: \\div', category: 'algebra' },
  { label: '≤', snippet: '\\le', title: 'Nhỏ hơn hoặc bằng: \\le', category: 'algebra', isCommon: true },
  { label: '≥', snippet: '\\ge', title: 'Lớn hơn hoặc bằng: \\ge', category: 'algebra', isCommon: true },
  { label: '≠', snippet: '\\ne', title: 'Khác: \\ne', category: 'algebra', isCommon: true },
  { label: '≈', snippet: '\\approx', title: 'Xấp xỉ: \\approx', category: 'algebra', isCommon: true },
  { label: '≡', snippet: '\\equiv', title: 'Đồng dư / Tương đương: \\equiv', category: 'algebra' },
  { label: 'Δ', snippet: '\\Delta', title: 'Biệt thức Delta: \\Delta', category: 'algebra', isCommon: true },
  { label: "Δ'", snippet: "\\Delta'", title: "Biệt thức Delta phẩy: \\Delta'", category: 'algebra' },
  { label: '+∞', snippet: '+\\infty', title: 'Dương vô cực: +\\infty', category: 'algebra', isCommon: true },
  { label: '-∞', snippet: '-\\infty', title: 'Âm vô cực: -\\infty', category: 'algebra' },

  // 2. HÌNH HỌC & VÉCTƠ
  { label: 'Góc ABC', snippet: '\\widehat{ABC}', title: 'Ký hiệu góc ABC: \\widehat{ABC}', category: 'geometry', isCommon: true },
  { label: '∠A', snippet: '\\angle A', title: 'Ký hiệu góc A: \\angle A', category: 'geometry' },
  { label: '90°', snippet: '90^\\circ', title: '90 độ: 90^\\circ', category: 'geometry', isCommon: true },
  { label: '180°', snippet: '180^\\circ', title: '180 độ: 180^\\circ', category: 'geometry' },
  { label: '° (độ)', snippet: '^\\circ', title: 'Ký hiệu độ: ^\\circ', category: 'geometry' },
  { label: '△ABC', snippet: '\\Delta ABC', title: 'Tam giác ABC: \\Delta ABC', category: 'geometry', isCommon: true },
  { label: 'u⃗', snippet: '\\vec{u}', title: 'Véctơ u: \\vec{u}', category: 'geometry', isCommon: true },
  { label: 'v⃗', snippet: '\\vec{v}', title: 'Véctơ v: \\vec{v}', category: 'geometry' },
  { label: 'AB⃗', snippet: '\\vec{AB}', title: 'Véctơ AB: \\vec{AB}', category: 'geometry', isCommon: true },
  { label: '0⃗', snippet: '\\vec{0}', title: 'Véctơ không: \\vec{0}', category: 'geometry' },
  { label: '|u⃗|', snippet: '|\\vec{u}|', title: 'Độ dài véctơ: |\\vec{u}|', category: 'geometry' },
  { label: 'u⃗·v⃗', snippet: '\\vec{u} \\cdot \\vec{v}', title: 'Tích vô hướng: \\vec{u} \\cdot \\vec{v}', category: 'geometry' },
  { label: '∥', snippet: '\\parallel', title: 'Song song: \\parallel', category: 'geometry', isCommon: true },
  { label: '⊥', snippet: '\\perp', title: 'Vuông góc: \\perp', category: 'geometry', isCommon: true },
  { label: '∼', snippet: '\\sim', title: 'Đồng dạng: \\sim', category: 'geometry', isCommon: true },
  { label: '≅', snippet: '\\cong', title: 'Tam giác bằng nhau: \\cong', category: 'geometry' },
  { label: 'α', snippet: '\\alpha', title: 'Góc alpha: \\alpha', category: 'geometry', isCommon: true },
  { label: 'β', snippet: '\\beta', title: 'Góc beta: \\beta', category: 'geometry', isCommon: true },
  { label: 'γ', snippet: '\\gamma', title: 'Góc gamma: \\gamma', category: 'geometry' },
  { label: 'θ', snippet: '\\theta', title: 'Góc theta: \\theta', category: 'geometry' },
  { label: 'φ', snippet: '\\varphi', title: 'Góc phi: \\varphi', category: 'geometry' },
  { label: 'π', snippet: '\\pi', title: 'Số pi: \\pi', category: 'geometry', isCommon: true },

  // 3. TẬP HỢP & LOGIC
  { label: '∈', snippet: '\\in', title: 'Thuộc: \\in', category: 'sets', isCommon: true },
  { label: '∉', snippet: '\\notin', title: 'Không thuộc: \\notin', category: 'sets', isCommon: true },
  { label: '⊂', snippet: '\\subset', title: 'Tập con: \\subset', category: 'sets', isCommon: true },
  { label: '⊄', snippet: '\\not\\subset', title: 'Không là tập con: \\not\\subset', category: 'sets' },
  { label: '∪', snippet: '\\cup', title: 'Phép hợp: \\cup', category: 'sets', isCommon: true },
  { label: '∩', snippet: '\\cap', title: 'Phép giao: \\cap', category: 'sets', isCommon: true },
  { label: '\\ (hiệu)', snippet: '\\setminus', title: 'Hiệu tập hợp: \\setminus', category: 'sets', isCommon: true },
  { label: '∅', snippet: '\\emptyset', title: 'Tập rỗng: \\emptyset', category: 'sets', isCommon: true },
  { label: 'ℝ', snippet: '\\mathbb{R}', title: 'Tập số thực ℝ: \\mathbb{R}', category: 'sets', isCommon: true },
  { label: 'ℕ', snippet: '\\mathbb{N}', title: 'Tập số tự nhiên ℕ: \\mathbb{N}', category: 'sets' },
  { label: 'ℤ', snippet: '\\mathbb{Z}', title: 'Tập số nguyên ℤ: \\mathbb{Z}', category: 'sets' },
  { label: 'ℚ', snippet: '\\mathbb{Q}', title: 'Tập số hữu tỉ ℚ: \\mathbb{Q}', category: 'sets' },
  { label: '(a; b)', snippet: '(a; b)', title: 'Khoảng (a; b)', category: 'sets' },
  { label: '[a; b]', snippet: '[a; b]', title: 'Đoạn [a; b]', category: 'sets' },
  { label: '[a; b)', snippet: '[a; b)', title: 'Nửa khoảng [a; b)', category: 'sets' },
  { label: '(a; b]', snippet: '(a; b]', title: 'Nửa khoảng (a; b]', category: 'sets' },
  { label: '∀', snippet: '\\forall', title: 'Với mọi: \\forall', category: 'sets', isCommon: true },
  { label: '∃', snippet: '\\exists', title: 'Tồn tại: \\exists', category: 'sets', isCommon: true },
  { label: '⇒', snippet: '\\Rightarrow', title: 'Suy ra / Kéo theo: \\Rightarrow', category: 'sets', isCommon: true },
  { label: '⇔', snippet: '\\Leftrightarrow', title: 'Tương đương: \\Leftrightarrow', category: 'sets', isCommon: true },

  // 4. GIẢI TÍCH & LƯỢNG GIÁC
  { label: 'sin x', snippet: '\\sin x', title: 'Hàm sin: \\sin x', category: 'calculus', isCommon: true },
  { label: 'cos x', snippet: '\\cos x', title: 'Hàm cos: \\cos x', category: 'calculus', isCommon: true },
  { label: 'tan x', snippet: '\\tan x', title: 'Hàm tan: \\tan x', category: 'calculus', isCommon: true },
  { label: 'cot x', snippet: '\\cot x', title: 'Hàm cot: \\cot x', category: 'calculus', isCommon: true },
  { label: 'sin² x', snippet: '\\sin^2 x', title: 'sin bình phương: \\sin^2 x', category: 'calculus' },
  { label: 'cos² x', snippet: '\\cos^2 x', title: 'cos bình phương: \\cos^2 x', category: 'calculus' },
  { label: 'lim x→x₀', snippet: '\\lim_{x \\to x_0}', title: 'Giới hạn hàm số: \\lim_{x \\to x_0}', category: 'calculus', isCommon: true },
  { label: 'lim x→+∞', snippet: '\\lim_{x \\to +\\infty}', title: 'Giới hạn tại vô cực: \\lim_{x \\to +\\infty}', category: 'calculus' },
  { label: "f'(x)", snippet: "f'(x)", title: "Đạo hàm cấp một: f'(x)", category: 'calculus', isCommon: true },
  { label: "y'", snippet: "y'", title: "Đạo hàm y'", category: 'calculus' },
  { label: "f''(x)", snippet: "f''(x)", title: "Đạo hàm cấp hai: f''(x)", category: 'calculus' },
  { label: '∫ f(x)dx', snippet: '\\int f(x)\\,dx', title: 'Nguyên hàm / Tích phân bất định', category: 'calculus', isCommon: true },
  { label: '∫ₐᵇ f(x)dx', snippet: '\\int_{a}^{b} f(x)\\,dx', title: 'Tích phân xác định từ a đến b', category: 'calculus' },
  { label: 'logₐ b', snippet: '\\log_a b', title: 'Logarit cơ số a: \\log_a b', category: 'calculus', isCommon: true },
  { label: 'ln x', snippet: '\\ln x', title: 'Logarit tự nhiên: \\ln x', category: 'calculus', isCommon: true },
  { label: 'Cₙᵏ', snippet: 'C_n^k', title: 'Tổ hợp chập k của n: C_n^k', category: 'calculus', isCommon: true },
  { label: 'Aₙᵏ', snippet: 'A_n^k', title: 'Chỉnh hợp chập k của n: A_n^k', category: 'calculus' },
  { label: 'n!', snippet: 'n!', title: 'Giai thừa: n!', category: 'calculus' },
  { label: 'P(A)', snippet: 'P(A)', title: 'Xác suất biến cố A: P(A)', category: 'calculus' },

  // 5. HÓA HỌC & KHTN
  { label: '25°C', snippet: '25^\\circ\\text{C}', title: 'Nhiệt độ 25°C: 25^\\circ\\text{C}', category: 'science', isCommon: true },
  { label: '°C', snippet: '^\\circ\\text{C}', title: 'Ký hiệu độ C: ^\\circ\\text{C}', category: 'science' },
  { label: '→', snippet: '\\rightarrow', title: 'Mũi tên phản ứng một chiều: \\rightarrow', category: 'science', isCommon: true },
  { label: '⇌', snippet: '\\rightleftharpoons', title: 'Mũi tên phản ứng thuận nghịch: \\rightleftharpoons', category: 'science', isCommon: true },
  { label: '→(t°)', snippet: '\\xrightarrow{t^\\circ}', title: 'Phản ứng có xúc tác nhiệt độ', category: 'science' },
  { label: '↓', snippet: '\\downarrow', title: 'Ký hiệu chất kết tủa: \\downarrow', category: 'science', isCommon: true },
  { label: '↑', snippet: '\\uparrow', title: 'Ký hiệu chất khí bay hơi: \\uparrow', category: 'science', isCommon: true },
  { label: 'H₂O', snippet: 'H_2O', title: 'Công thức nước: H_2O', category: 'science' },
  { label: 'CO₂', snippet: 'CO_2', title: 'Khí cacbonic: CO_2', category: 'science' },
  { label: 'H₂SO₄', snippet: 'H_2SO_4', title: 'Axit sunfuric: H_2SO_4', category: 'science' },
];

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  examCode?: string;
  totalCodes?: number;
  onSave: (originalQuestion: Question, updatedQuestion: Question) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  examCode = '101',
  totalCodes = 1,
  onSave,
}) => {
  if (!isOpen) return null;

  // Local form state
  const [content, setContent] = useState(question.content || '');
  const [partType, setPartType] = useState<PartType>(question.partType || 'PART1');
  const [cognitiveLevel, setCognitiveLevel] = useState<CognitiveLevel>(question.cognitiveLevel || 'REMEMBER');
  const [points, setPoints] = useState<number>(question.points ?? 0.25);
  const [explanation, setExplanation] = useState(question.explanation || '');

  // Part 1 state (Options A, B, C, D & correctOption)
  const initialOptions: MCQOption[] = [
    { key: 'A', content: question.options?.find((o) => o.key === 'A')?.content || '' },
    { key: 'B', content: question.options?.find((o) => o.key === 'B')?.content || '' },
    { key: 'C', content: question.options?.find((o) => o.key === 'C')?.content || '' },
    { key: 'D', content: question.options?.find((o) => o.key === 'D')?.content || '' },
  ];
  const [options, setOptions] = useState<MCQOption[]>(initialOptions);
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>(
    (question.correctOption as 'A' | 'B' | 'C' | 'D') || 'A'
  );

  // Part 2 state (True / False statements a, b, c, d)
  const getInitialStmtContent = (k: 'a' | 'b' | 'c' | 'd') => {
    const found: any = question.trueFalseStatements?.find((s) => s.key === k);
    return found?.content || found?.statement || '';
  };
  const getInitialStmtIsCorrect = (k: 'a' | 'b' | 'c' | 'd', defaultVal: boolean) => {
    const found = question.trueFalseStatements?.find((s) => s.key === k);
    return found ? Boolean(found.isCorrect) : defaultVal;
  };

  const initialTfStatements: TrueFalseStatement[] = [
    { key: 'a', content: getInitialStmtContent('a'), isCorrect: getInitialStmtIsCorrect('a', true) },
    { key: 'b', content: getInitialStmtContent('b'), isCorrect: getInitialStmtIsCorrect('b', false) },
    { key: 'c', content: getInitialStmtContent('c'), isCorrect: getInitialStmtIsCorrect('c', true) },
    { key: 'd', content: getInitialStmtContent('d'), isCorrect: getInitialStmtIsCorrect('d', false) },
  ];
  const [trueFalseStatements, setTrueFalseStatements] = useState<TrueFalseStatement[]>(initialTfStatements);

  // Part 3 state (Short answer)
  const [shortAnswer, setShortAnswer] = useState(question.shortAnswer || '');

  // Part 4 state (Essay answer guide)
  const [essayAnswerGuide, setEssayAnswerGuide] = useState(question.essayAnswerGuide || '');

  // Active tab for preview
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formError, setFormError] = useState('');

  // Snippet toolbar state
  const [snippetCategory, setSnippetCategory] = useState<
    'all' | 'algebra' | 'geometry' | 'sets' | 'calculus' | 'science'
  >('all');

  // Caret tracking & active element ref
  interface ActiveTarget {
    element: HTMLTextAreaElement | HTMLInputElement;
    field: 'content' | 'explanation' | 'shortAnswer' | 'essayAnswerGuide' | 'option' | 'tf';
    index?: number;
    start: number;
    end: number;
  }
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const activeTargetRef = useRef<ActiveTarget | null>(null);
  const [activeTargetName, setActiveTargetName] = useState<string>('Nội dung câu hỏi');

  const handleTrackTarget = (
    e: React.SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: 'content' | 'explanation' | 'shortAnswer' | 'essayAnswerGuide' | 'option' | 'tf',
    index?: number
  ) => {
    const el = e.currentTarget;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    activeTargetRef.current = {
      element: el,
      field,
      index,
      start,
      end,
    };
    if (field === 'content') setActiveTargetName('Nội dung câu hỏi');
    else if (field === 'explanation') setActiveTargetName('Lời giải chi tiết');
    else if (field === 'shortAnswer') setActiveTargetName('Đáp án ngắn');
    else if (field === 'essayAnswerGuide') setActiveTargetName('Hướng dẫn chấm tự luận');
    else if (field === 'option') setActiveTargetName(`Phương án ${options[index ?? 0]?.key || ''}`);
    else if (field === 'tf') setActiveTargetName(`Ý (${trueFalseStatements[index ?? 0]?.key || ''})`);
  };

  // Chèn ký hiệu / công thức toán học CHÍNH XÁC VÀO VỊ TRÍ CON TRỎ (Caret Position)
  const insertSnippet = (snippet: string) => {
    const target = activeTargetRef.current;
    const el = target?.element || contentRef.current;
    const field = target?.field || 'content';
    const index = target?.index;

    if (!el) {
      setContent((prev) => (prev ? `${prev} ${snippet}` : snippet));
      return;
    }

    const currentVal = el.value || '';
    const start = el.selectionStart ?? target?.start ?? currentVal.length;
    const end = el.selectionEnd ?? target?.end ?? currentVal.length;
    const selectedText = currentVal.substring(start, end);

    let textToInsert = snippet;
    if (selectedText) {
      if (snippet === '$...$') {
        textToInsert = `$${selectedText}$`;
      } else if (snippet.includes('{a}') && snippet.includes('{b}')) {
        textToInsert = snippet.replace('{a}', `{${selectedText}}`);
      } else if (snippet.includes('{x}')) {
        textToInsert = snippet.replace('{x}', `{${selectedText}}`);
      } else if (snippet.includes('{ABC}')) {
        textToInsert = snippet.replace('{ABC}', `{${selectedText}}`);
      }
    } else {
      if (snippet === '$...$') {
        textToInsert = '$ $';
      }
    }

    const newVal = currentVal.substring(0, start) + textToInsert + currentVal.substring(end);
    const newCursorPos = snippet === '$...$' && !selectedText ? start + 1 : start + textToInsert.length;

    if (field === 'content') {
      setContent(newVal);
    } else if (field === 'explanation') {
      setExplanation(newVal);
    } else if (field === 'shortAnswer') {
      setShortAnswer(newVal);
    } else if (field === 'essayAnswerGuide') {
      setEssayAnswerGuide(newVal);
    } else if (field === 'option' && typeof index === 'number') {
      setOptions((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], content: newVal };
        return next;
      });
    } else if (field === 'tf' && typeof index === 'number') {
      setTrueFalseStatements((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], content: newVal };
        return next;
      });
    }

    // Đưa con trỏ văn bản về ngay sau chuỗi vừa chèn và giữ focus cho ô nhập
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(newCursorPos, newCursorPos);
      activeTargetRef.current = {
        element: el,
        field,
        index,
        start: newCursorPos,
        end: newCursorPos,
      };
    }, 0);
  };

  const handleSave = () => {
    if (!content.trim()) {
      setFormError('Nội dung câu hỏi không được để trống.');
      return;
    }

    if (partType === 'PART1') {
      const emptyOpt = options.find((o) => !o.content.trim());
      if (emptyOpt) {
        setFormError(`Phương án ${emptyOpt.key} chưa có nội dung.`);
        return;
      }
    } else if (partType === 'PART2') {
      const emptyStmt = trueFalseStatements.find((s) => !s.content.trim());
      if (emptyStmt) {
        setFormError(`Ý (${emptyStmt.key}) chưa có nội dung nhận định.`);
        return;
      }
    } else if (partType === 'PART3') {
      if (!shortAnswer.trim()) {
        setFormError('Vui lòng điền đáp án ngắn cho câu hỏi Phần III.');
        return;
      }
    }

    const updatedQuestion: Question = {
      ...question,
      content: content.trim(),
      cognitiveLevel,
      points: Number(points) || 0.25,
      explanation: explanation.trim(),
      ...(partType === 'PART1'
        ? {
            options: options.map((o) => ({ key: o.key, content: o.content.trim() })),
            correctOption,
          }
        : {}),
      ...(partType === 'PART2'
        ? {
            trueFalseStatements: trueFalseStatements.map((s) => ({
              key: s.key,
              content: s.content.trim(),
              isCorrect: Boolean(s.isCorrect),
            })),
          }
        : {}),
      ...(partType === 'PART3'
        ? {
            shortAnswer: shortAnswer.trim(),
          }
        : {}),
      ...(partType === 'PART4'
        ? {
            essayAnswerGuide: essayAnswerGuide.trim(),
          }
        : {}),
    };

    onSave(question, updatedQuestion);
    onClose();
  };

  const getCognitiveBadgeText = (level: CognitiveLevel) => {
    switch (level) {
      case 'REMEMBER':
        return 'NB - Nhận biết';
      case 'UNDERSTAND':
        return 'TH - Thông hiểu';
      case 'APPLY':
        return 'VD - Vận dụng';
      case 'ADVANCED':
        return 'VDC - Vận dụng cao';
      default:
        return 'Nhận biết';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center font-black">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Chỉnh Sửa Thủ Công Câu {question.number || 1}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Mã đề {examCode}
                </span>
                {totalCodes > 1 && (
                  <span className="text-[11px] text-slate-500 font-medium">
                    (Tự động đồng bộ {totalCodes} mã đề)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Chỉnh sửa trực tiếp nội dung, đáp án và lời giải ngay tức thì mà không cần chờ AI
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Tab switch edit / preview */}
            <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === 'edit'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Soạn thảo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {formError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded-xl flex items-center space-x-2 text-xs font-bold text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {activeTab === 'preview' ? (
            /* Live Full Preview */
            <div className="p-5 rounded-2xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-slate-950 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-black text-base text-teal-700 dark:text-teal-400">
                  Xem Trước: Câu {question.number || 1}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {getCognitiveBadgeText(cognitiveLevel)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {points} điểm
                  </span>
                </div>
              </div>

              {/* Question Content */}
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <MathText content={content} />
              </div>

              {/* Part 1 Options */}
              {partType === 'PART1' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {options.map((opt) => {
                    const isCorrect = opt.key === correctOption;
                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <div className="text-xs md:text-sm">
                          <MathText content={opt.content} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Part 2 Statements */}
              {partType === 'PART2' && (
                <div className="space-y-2">
                  {trueFalseStatements.map((stmt) => (
                    <div
                      key={stmt.key}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs md:text-sm"
                    >
                      <div className="flex items-start space-x-2">
                        <span className="font-black text-teal-600 dark:text-teal-400">
                          {stmt.key})
                        </span>
                        <div>
                          <MathText content={stmt.content} />
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-black ${
                          stmt.isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                        }`}
                      >
                        {stmt.isCorrect ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Part 3 Short Answer */}
              {partType === 'PART3' && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center space-x-3 text-xs md:text-sm">
                  <span className="font-bold text-slate-500">Đáp án ngắn:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    <MathText content={shortAnswer} />
                  </span>
                </div>
              )}

              {/* Part 4 Essay Guide */}
              {partType === 'PART4' && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs md:text-sm">
                  <div className="font-bold text-slate-500">Hướng dẫn chấm tự luận:</div>
                  <div className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                    <MathText content={essayAnswerGuide} />
                  </div>
                </div>
              )}

              {/* Explanation */}
              {explanation && (
                <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-1 text-xs md:text-sm">
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    Lời giải chi tiết:
                  </span>
                  <div className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    <MathText content={explanation} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Edit Form */
            <div className="space-y-5">
              {/* Question Metadata Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Loại phần thi
                  </label>
                  <select
                    value={partType}
                    onChange={(e) => setPartType(e.target.value as PartType)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white"
                  >
                    <option value="PART1">Phần I: Trắc nghiệm 4 lựa chọn</option>
                    <option value="PART2">Phần II: Trắc nghiệm Đúng / Sai</option>
                    <option value="PART3">Phần III: Trả lời ngắn</option>
                    <option value="PART4">Phần IV: Tự luận</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Mức độ nhận thức
                  </label>
                  <select
                    value={cognitiveLevel}
                    onChange={(e) => setCognitiveLevel(e.target.value as CognitiveLevel)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white"
                  >
                    <option value="REMEMBER">Nhận biết (NB)</option>
                    <option value="UNDERSTAND">Thông hiểu (TH)</option>
                    <option value="APPLY">Vận dụng (VD)</option>
                    <option value="ADVANCED">Vận dụng cao (VDC)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Điểm số
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="10"
                    value={points}
                    onChange={(e) => setPoints(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Math Toolbar Quick Snippets */}
              <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-teal-700 dark:text-teal-400">
                    <Calculator className="w-4 h-4 shrink-0" />
                    <span>Thanh công cụ chèn ký hiệu Toán - KHTN:</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] text-slate-500">Đang trỏ vào:</span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                      {activeTargetName}
                    </span>
                  </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'algebra', label: 'Đại số & Hệ PT' },
                    { id: 'geometry', label: 'Hình học & Vector' },
                    { id: 'sets', label: 'Tập hợp & Logic' },
                    { id: 'calculus', label: 'Giải tích & Lượng giác' },
                    { id: 'science', label: 'Vật lý & Hóa học' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setSnippetCategory(cat.id as any)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        snippetCategory === cat.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Quick high-priority snippets: wrap $...$, 2-var system, 3-var system */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertSnippet('$...$')}
                    className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rounded-lg text-xs font-bold cursor-pointer transition-all"
                    title="Bao bọc công thức bằng $...$"
                  >
                    $ ... $ (Toán)
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertSnippet('\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}')}
                    className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700 rounded-lg text-xs font-bold cursor-pointer transition-all"
                    title="Chèn Hệ 2 phương trình chuẩn \begin{cases} ... \end{cases}"
                  >
                    {'{ '}Hệ 2 ẩn
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertSnippet('\\begin{cases} a_1x + b_1y + c_1z = d_1 \\\\ a_2x + b_2y + c_2z = d_2 \\\\ a_3x + b_3y + c_3z = d_3 \\end{cases}')}
                    className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700 rounded-lg text-xs font-bold cursor-pointer transition-all"
                    title="Chèn Hệ 3 phương trình chuẩn"
                  >
                    {'{ '}Hệ 3 ẩn
                  </button>
                </div>

                {/* Filtered Snippet Buttons */}
                <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1">
                  {MATH_SNIPPETS.filter(
                    (s) => snippetCategory === 'all' || s.category === snippetCategory
                  ).map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => insertSnippet(s.snippet)}
                      className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:border-teal-300 dark:hover:border-teal-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-slate-800 dark:text-slate-200 cursor-pointer transition-colors shadow-2xs"
                      title={`${s.label}: ${s.snippet}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Textarea */}
              <div>
                <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block mb-1.5">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  ref={contentRef}
                  rows={4}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (formError) setFormError('');
                  }}
                  onFocus={(e) => handleTrackTarget(e, 'content')}
                  onClick={(e) => handleTrackTarget(e, 'content')}
                  onKeyUp={(e) => handleTrackTarget(e, 'content')}
                  onSelect={(e) => handleTrackTarget(e, 'content')}
                  placeholder="Nhập nội dung câu hỏi tại đây. Sử dụng công thức toán như $x^2 + 1 = 0$ hoặc \begin{cases} ... \end{cases}"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500 font-sans leading-relaxed text-slate-900 dark:text-slate-100"
                />
                {content && (
                  <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      Hiển thị trực tiếp câu hỏi:
                    </span>
                    <MathText content={content} />
                  </div>
                )}
              </div>

              {/* PART 1: 4 Options Editor */}
              {partType === 'PART1' && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-xs text-slate-800 dark:text-slate-200">
                      Các phương án lựa chọn (Chọn dấu tích xanh cho đáp án đúng):
                    </label>
                    <span className="text-[11px] text-teal-600 dark:text-teal-400 font-bold">
                      Đáp án đúng hiện tại: {correctOption}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map((opt, idx) => {
                      const isCorrect = opt.key === correctOption;
                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border transition-all ${
                            isCorrect
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/20'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-black text-xs text-slate-700 dark:text-slate-300">
                              Phương án {opt.key}
                            </span>
                            <button
                              type="button"
                              onClick={() => setCorrectOption(opt.key)}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isCorrect ? 'Đáp án ĐÚNG' : 'Chọn làm ĐÚNG'}</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={opt.content}
                            onChange={(e) => {
                              const newOpts = [...options];
                              newOpts[idx] = { ...newOpts[idx], content: e.target.value };
                              setOptions(newOpts);
                            }}
                            onFocus={(e) => handleTrackTarget(e, 'option', idx)}
                            onClick={(e) => handleTrackTarget(e, 'option', idx)}
                            onKeyUp={(e) => handleTrackTarget(e, 'option', idx)}
                            onSelect={(e) => handleTrackTarget(e, 'option', idx)}
                            placeholder={`Nội dung phương án ${opt.key}`}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                          />
                          {opt.content && (
                            <div className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                              <MathText content={opt.content} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PART 2: True / False Statements Editor */}
              {partType === 'PART2' && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="font-black text-xs text-slate-800 dark:text-slate-200 block">
                    Nội dung 4 ý nhận định và tính Đúng / Sai:
                  </label>

                  <div className="space-y-2.5">
                    {trueFalseStatements.map((stmt, idx) => (
                      <div
                        key={stmt.key}
                        className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-teal-600 dark:text-teal-400">
                            Ý ({stmt.key})
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const newStmts = [...trueFalseStatements];
                                newStmts[idx] = { ...newStmts[idx], isCorrect: true };
                                setTrueFalseStatements(newStmts);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                stmt.isCorrect
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              ĐÚNG
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newStmts = [...trueFalseStatements];
                                newStmts[idx] = { ...newStmts[idx], isCorrect: false };
                                setTrueFalseStatements(newStmts);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                !stmt.isCorrect
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              SAI
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={stmt.content}
                          onChange={(e) => {
                            const newStmts = [...trueFalseStatements];
                            newStmts[idx] = { ...newStmts[idx], content: e.target.value };
                            setTrueFalseStatements(newStmts);
                          }}
                          onFocus={(e) => handleTrackTarget(e, 'tf', idx)}
                          onClick={(e) => handleTrackTarget(e, 'tf', idx)}
                          onKeyUp={(e) => handleTrackTarget(e, 'tf', idx)}
                          onSelect={(e) => handleTrackTarget(e, 'tf', idx)}
                          placeholder={`Nhập nhận định cho ý (${stmt.key})`}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                        />
                        {stmt.content && (
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            <MathText content={stmt.content} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PART 3: Short Answer Editor */}
              {partType === 'PART3' && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="font-black text-xs text-slate-800 dark:text-slate-200 block">
                    Đáp án ngắn (Kết quả tính toán / con số / biểu thức):
                  </label>
                  <input
                    type="text"
                    value={shortAnswer}
                    onChange={(e) => setShortAnswer(e.target.value)}
                    onFocus={(e) => handleTrackTarget(e, 'shortAnswer')}
                    onClick={(e) => handleTrackTarget(e, 'shortAnswer')}
                    onKeyUp={(e) => handleTrackTarget(e, 'shortAnswer')}
                    onSelect={(e) => handleTrackTarget(e, 'shortAnswer')}
                    placeholder="Ví dụ: 5 hoặc 1/2 hoặc -3"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 focus:ring-2 focus:ring-teal-500"
                  />
                  {shortAnswer && (
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Hiển thị đáp án: <MathText content={shortAnswer} />
                    </div>
                  )}
                </div>
              )}

              {/* PART 4: Essay Answer Guide Editor */}
              {partType === 'PART4' && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="font-black text-xs text-slate-800 dark:text-slate-200 block">
                    Hướng dẫn chấm và biểu điểm tự luận:
                  </label>
                  <textarea
                    rows={4}
                    value={essayAnswerGuide}
                    onChange={(e) => setEssayAnswerGuide(e.target.value)}
                    onFocus={(e) => handleTrackTarget(e, 'essayAnswerGuide')}
                    onClick={(e) => handleTrackTarget(e, 'essayAnswerGuide')}
                    onKeyUp={(e) => handleTrackTarget(e, 'essayAnswerGuide')}
                    onSelect={(e) => handleTrackTarget(e, 'essayAnswerGuide')}
                    placeholder="Trình bày các bước chấm và điểm tương ứng cho từng bước"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 leading-relaxed"
                  />
                </div>
              )}

              {/* Explanation Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block">
                  Lời giải chi tiết:
                </label>
                <textarea
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  onFocus={(e) => handleTrackTarget(e, 'explanation')}
                  onClick={(e) => handleTrackTarget(e, 'explanation')}
                  onKeyUp={(e) => handleTrackTarget(e, 'explanation')}
                  onSelect={(e) => handleTrackTarget(e, 'explanation')}
                  placeholder="Nhập lời giải chi tiết giúp học sinh hiểu cách giải"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
                {explanation && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      Hiển thị lời giải:
                    </span>
                    <MathText content={explanation} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Mẹo: Dùng tab <strong>Xem trước</strong> ở trên để kiểm tra công thức trước khi lưu.
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 flex items-center space-x-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Lưu thay đổi câu hỏi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
