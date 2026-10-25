import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Lightbulb,
  Loader2,
  RefreshCw,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react';
import { ExamMetadata, Question, getCognitiveLabel, getCognitiveTag } from '../types';
import { MathText } from './MathText';
import { GeminiService } from '../services/geminiService';

interface RegenerateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  examCode?: string;
  totalCodes?: number;
  metadata: ExamMetadata;
  allQuestionsInExam?: Question[];
  onApplyNewQuestion: (originalQuestion: Question, newQuestion: Question) => void;
}

export const RegenerateQuestionModal: React.FC<RegenerateQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  examCode = '101',
  totalCodes = 1,
  metadata,
  allQuestionsInExam = [],
  onApplyNewQuestion,
}) => {
  const [teacherPrompt, setTeacherPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !question) return null;

  const cognitiveTag = getCognitiveTag(question.cognitiveLevel, question.partType);
  const cognitiveLabel = getCognitiveLabel(question.cognitiveLevel);

  const quickPrompts = [
    { label: '🔄 Tạo mới hoàn toàn', prompt: 'Tạo câu hỏi mới hoàn toàn khác, giữ nguyên mạch kiến thức, yêu cầu cần đạt và mức độ nhận thức.' },
    { label: '🌍 Bối cảnh thực tiễn', prompt: 'Gắn câu hỏi với bối cảnh thực tế đời sống sinh động, gần gũi với học sinh.' },
    { label: '⚡ Số liệu đẹp, dễ tính', prompt: 'Đơn giản hóa số liệu tính toán, ưu tiên các số nguyên tròn trịa, giảm tải phép tính cồng kềnh.' },
    { label: '🎯 Bám sát YCCĐ', prompt: 'Bám sát trọng tâm yêu cầu cần đạt theo chuẩn GDPT 2018, câu từ chuẩn mực sư phạm.' },
    { label: '📈 Tăng tính phân hóa', prompt: 'Tăng chiều sâu tư duy, đòi hỏi học sinh phải hiểu bản chất và có khả năng liên hệ vận dụng.' },
    { label: '🎨 Kèm hình vẽ/đồ thị', prompt: 'Thiết kế bài toán có hình vẽ minh họa hoặc sơ đồ hình học trực quan đẹp mắt.' },
  ];

  const handleStartGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProgressMsg('Khởi động trợ lý AI tái tạo câu hỏi...');

    try {
      const newQ = await GeminiService.regenerateSingleQuestion({
        originalQuestion: question,
        metadata,
        teacherPrompt: teacherPrompt.trim(),
        existingQuestions: allQuestionsInExam,
        onProgress: (msg) => setProgressMsg(msg),
      });

      setGeneratedQuestion(newQ);
    } catch (err: any) {
      console.error('Lỗi tái tạo câu hỏi:', err);
      setError(err?.message || 'Không thể tạo lại câu hỏi lúc này. Vui lòng thử lại.');
    } finally {
      setIsGenerating(false);
      setProgressMsg('');
    }
  };

  const handleConfirmApply = () => {
    if (!generatedQuestion) return;
    onApplyNewQuestion(question, generatedQuestion);
    onClose();
  };

  const handleResetModal = () => {
    setGeneratedQuestion(null);
    setError(null);
    setTeacherPrompt('');
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 text-left space-y-5 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  Yêu Cầu AI Tạo Lại Riêng Câu Hỏi Này
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                  Câu {question.number} (Mã đề {examCode})
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1">
                <span>Môn {metadata.subject} ({metadata.grade})</span>
                <span>•</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  Tự động cập nhật đồng bộ {totalCodes} mã đề đảo
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Thông tin câu hỏi hiện tại */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Nội dung câu hỏi hiện tại:
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {cognitiveTag} - {cognitiveLabel}
                </span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                  {question.points} điểm
                </span>
              </div>
              {question.topic && (
                <span className="text-[11px] text-slate-500 font-medium truncate max-w-xs">
                  {question.topic}
                </span>
              )}
            </div>

            <div className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              <MathText content={question.content} />
            </div>

            {/* Part 1 options snippet */}
            {question.partType === 'PART1' && question.options && (
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs">
                {question.options.map((opt) => (
                  <div
                    key={opt.key}
                    className={`p-1.5 rounded-lg border flex items-center space-x-1.5 ${
                      opt.key === question.correctOption
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-bold">{opt.key}.</span>
                    <span className="truncate"><MathText content={opt.content} /></span>
                    {opt.key === question.correctOption && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teacher guidance input */}
          {!generatedQuestion && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Yêu cầu / Góp ý riêng cho AI khi tạo lại câu này (Tùy chọn):</span>
                </label>
                {teacherPrompt && (
                  <button
                    type="button"
                    onClick={() => setTeacherPrompt('')}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  >
                    Xóa gợi ý
                  </button>
                )}
              </div>

              <textarea
                rows={3}
                value={teacherPrompt}
                onChange={(e) => setTeacherPrompt(e.target.value)}
                placeholder="Ví dụ: Đổi ngữ cảnh sang bài toán thực tế; Thay đổi số liệu toán học cho đẹp; Giảm độ khó tính toán; Hỏi sâu hơn vào YCCĐ..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
                disabled={isGenerating}
              />

              {/* Quick Prompt Suggestions */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500">
                  Gợi ý yêu cầu nhanh:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTeacherPrompt(qp.prompt)}
                      disabled={isGenerating}
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300 transition-all cursor-pointer font-medium"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading status */}
          {isGenerating && (
            <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-3 animate-pulse">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs md:text-sm font-bold text-amber-900 dark:text-amber-200">
                {progressMsg || 'Đang tạo câu hỏi mới...'}
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                AI đang biên soạn nội dung mới, tính toán đáp án và lời giải chi tiết theo chuẩn Công văn 7991/BGDĐT.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 flex items-start space-x-3 text-rose-900 dark:text-rose-200">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Không thể tái tạo câu hỏi:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Preview Newly Generated Question */}
          {generatedQuestion && !isGenerating && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-500 shadow-md space-y-3 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 dark:border-emerald-800 pb-2">
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Câu hỏi mới vừa tạo (Xem trước kết quả):</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-300">
                  {getCognitiveTag(generatedQuestion.cognitiveLevel, generatedQuestion.partType)} - {getCognitiveLabel(generatedQuestion.cognitiveLevel)}
                </span>
              </div>

              {/* New Question Content */}
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <MathText content={generatedQuestion.content} />
              </div>

              {/* Part 1 Options Preview */}
              {generatedQuestion.partType === 'PART1' && generatedQuestion.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {generatedQuestion.options.map((opt) => {
                    const isCorrect = opt.key === generatedQuestion.correctOption;
                    return (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-xl border flex items-start space-x-2 ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="font-black text-emerald-700 dark:text-emerald-400">{opt.key}.</span>
                        <div className="flex-1"><MathText content={opt.content} /></div>
                        {isCorrect && (
                          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-200 dark:bg-emerald-800 px-1.5 py-0.5 rounded shrink-0">
                            Đáp án đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Part 2 True/False Preview */}
              {generatedQuestion.partType === 'PART2' && generatedQuestion.trueFalseStatements && (
                <div className="space-y-1.5 text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {generatedQuestion.trueFalseStatements.map((tf) => (
                    <div key={tf.key} className="flex items-start justify-between space-x-2 py-1 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div className="flex items-start space-x-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{tf.key})</span>
                        <span><MathText content={tf.content} /></span>
                      </div>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded shrink-0 ${
                        tf.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                      }`}>
                        {tf.isCorrect ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Part 3 Short Answer Preview */}
              {generatedQuestion.partType === 'PART3' && generatedQuestion.shortAnswer && (
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                  <span>Đáp án ngắn:</span>
                  <span className="font-mono text-sm bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400">
                    <MathText content={generatedQuestion.shortAnswer} />
                  </span>
                </div>
              )}

              {/* Part 4 Essay Guide Preview */}
              {generatedQuestion.partType === 'PART4' && generatedQuestion.essayAnswerGuide && (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">Hướng dẫn chấm & Lời giải:</span>
                  <div className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    <MathText content={generatedQuestion.essayAnswerGuide} />
                  </div>
                </div>
              )}

              {/* Detailed Explanation */}
              {generatedQuestion.explanation && (
                <div className="text-xs text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Giải thích chi tiết: </span>
                  <MathText content={generatedQuestion.explanation} />
                </div>
              )}

              {/* Synchronization Warning/Notice */}
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start space-x-2 text-indigo-950 dark:text-indigo-200">
                <Shuffle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <b>Đồng bộ tự động:</b> Khi bạn nhấn nút "Xác nhận & Cập nhật", câu hỏi này sẽ được tự động thay thế trên toàn bộ <b>{totalCodes} mã đề</b> (101, 102...) với các phương án được xáo trộn ngẫu nhiên riêng cho từng mã đề và cập nhật lại toàn bộ bảng đáp án tương ứng.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            Đóng
          </button>

          <div className="flex items-center space-x-2 ml-auto">
            {!generatedQuestion ? (
              <button
                type="button"
                onClick={handleStartGenerate}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang Tạo Câu Hỏi...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AI Tạo Lại Câu Hỏi Này</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleStartGenerate}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl border border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tạo Phương Án Khác</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmApply}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Xác Nhận & Cập Nhật Tất Cả Mã Đề</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
