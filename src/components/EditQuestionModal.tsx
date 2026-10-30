import React, { useState } from 'react';
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Eye,
  FileEdit,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import { Question, CognitiveLevel, PartType, MCQOption, TrueFalseStatement } from '../types';
import { MathText } from './MathText';

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

  // Helper to insert LaTeX formula snippet into content textarea
  const insertSnippet = (snippet: string) => {
    setContent((prev) => (prev ? `${prev} ${snippet}` : snippet));
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
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold flex items-center space-x-1 text-teal-700 dark:text-teal-400">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Thanh công cụ chèn nhanh ký hiệu & công thức Toán / Khoa học:</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Nhấp để chèn vào nội dung</span>
                </div>

                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\begin{cases} 2x - y = 3 \\\\ x + 3y = 5 \\end{cases}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800 rounded-md font-bold cursor-pointer"
                    title="Chèn mẫu hệ phương trình chuẩn \begin{cases} ... \end{cases}"
                  >
                    Hệ PT {'{...}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\frac{a}{b}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    \frac{'{a}'}{'{b}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\sqrt{x}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    \sqrt{'{x}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('x^2')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    x^2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('x_1')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    x_1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\widehat{ABC}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    Góc \widehat{'{ABC}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\vec{u}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    \vec{'{u}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('90^\\circ')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    90°
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('25^\\circ\\text{C}')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    25°C
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\le')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ≤
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\ge')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ≥
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\neq')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ≠
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\pm')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ±
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\pi')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    π
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\in')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ∈
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\Delta')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    Δ
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('\\Leftrightarrow')}
                    className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md font-mono cursor-pointer"
                  >
                    ⇔
                  </button>
                </div>
              </div>

              {/* Question Textarea */}
              <div>
                <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block mb-1.5">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (formError) setFormError('');
                  }}
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
