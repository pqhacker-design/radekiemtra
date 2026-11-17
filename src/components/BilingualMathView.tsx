import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  FilePlus2,
  GraduationCap,
  Languages,
  Lightbulb,
  Loader2,
  MessageSquareQuote,
  Search,
  Sparkles,
  Square,
  Volume2,
  X,
} from 'lucide-react';
import {
  BilingualSectionFilter,
  CURRICULUM_GRADES,
  CurriculumChapter,
  CurriculumLesson,
  ExpressionCategory,
  GradeLevel,
  LessonWithChapter,
  countLessonsByGrade,
  searchBilingualCurriculum,
} from '../data/bilingualCurriculum';
import {
  SpeechAccent,
  SpeechRate,
  SpeechState,
  isSpeechSupported,
  speakSequence,
  speakSingle,
  stopSpeaking,
  subscribeSpeechState,
} from '../services/speechEngine';
import { callGeminiApi } from '../services/geminiClient';
import { safeJsonParse } from '../services/jsonRepair';
import { AppSettings, ExamMetadata } from '../types';
import { MathText } from './MathText';

interface BilingualMathViewProps {
  settings: AppSettings;
  onCreateExamFromTopic: (meta: ExamMetadata) => void;
}

interface AiLessonExtension {
  extraDialogueEn: string;
  extraDialogueVi: string;
  extraExampleTitleEn: string;
  extraExampleTitleVi: string;
  extraProblemEn: string;
  extraProblemVi: string;
  extraSteps: Array<{
    labelEn: string;
    labelVi: string;
    contentEn: string;
    contentVi: string;
  }>;
  pedagogicalTipEn: string;
  pedagogicalTipVi: string;
}

const EXPRESSION_CATEGORY_LABELS: Record<ExpressionCategory, string> = {
  describe: 'Mô tả khái niệm',
  question: 'Câu hỏi gợi mở',
  present: 'Trình bày lời giải',
};

const MATCH_TYPE_LABELS: Record<string, string> = {
  lesson: 'Bài học',
  vocab: 'Từ vựng',
  notation: 'Ký hiệu & Công thức',
  expression: 'Mẫu câu lớp học',
  example: 'Ví dụ minh họa',
  notes: 'Ghi chú sư phạm',
};

const SECTION_TABS: Array<{ id: BilingualSectionFilter; label: string }> = [
  { id: 'all', label: 'Tất cả mục' },
  { id: 'vocab', label: 'Từ vựng' },
  { id: 'notation', label: 'Ký hiệu' },
  { id: 'expression', label: 'Mẫu câu' },
  { id: 'example', label: 'Ví dụ' },
  { id: 'notes', label: 'Sư phạm & AI' },
];

export const BilingualMathView: React.FC<BilingualMathViewProps> = ({
  settings,
  onCreateExamFromTopic,
}) => {
  const [gradeFilter, setGradeFilter] = useState<GradeLevel | 'all'>('all');
  const [sectionFilter, setSectionFilter] = useState<BilingualSectionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    CURRICULUM_GRADES[0].chapters[0].lessons[0].id
  );
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [CURRICULUM_GRADES[0].chapters[0].id]: true,
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Speech state & preferences
  const [accent, setAccent] = useState<SpeechAccent>('en-US');
  const [speechRate, setSpeechRate] = useState<SpeechRate>(1.0);
  const [speechState, setSpeechState] = useState<SpeechState>({
    isPlaying: false,
    activeId: null,
    lang: null,
  });
  const speechSupported = useMemo(() => isSpeechSupported(), []);

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Optional AI extension state per lesson
  const [aiExtensions, setAiExtensions] = useState<Record<string, AiLessonExtension>>({});
  const [aiLoadingLessonId, setAiLoadingLessonId] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeSpeechState((st) => setSpeechState(st));
    return () => {
      unsub();
      stopSpeaking();
    };
  }, []);

  // Grade counts (computed once)
  const gradeCounts = useMemo(
    () => ({
      all: countLessonsByGrade('all'),
      6: countLessonsByGrade(6),
      7: countLessonsByGrade(7),
      8: countLessonsByGrade(8),
      9: countLessonsByGrade(9),
    }),
    []
  );

  // Filtered grades for the sidebar tree
  const visibleGrades = useMemo(
    () =>
      gradeFilter === 'all'
        ? CURRICULUM_GRADES
        : CURRICULUM_GRADES.filter((g) => g.grade === gradeFilter),
    [gradeFilter]
  );

  // Resolve currently active lesson + chapter + grade metadata
  const activeContext = useMemo<{
    gradeObj: (typeof CURRICULUM_GRADES)[number];
    chapter: CurriculumChapter;
    lesson: CurriculumLesson;
  }>(() => {
    for (const g of CURRICULUM_GRADES) {
      for (const ch of g.chapters) {
        const found = ch.lessons.find((l) => l.id === selectedLessonId);
        if (found) {
          return { gradeObj: g, chapter: ch, lesson: found };
        }
      }
    }
    const g0 = CURRICULUM_GRADES[0];
    const ch0 = g0.chapters[0];
    return { gradeObj: g0, chapter: ch0, lesson: ch0.lessons[0] };
  }, [selectedLessonId]);

  const { gradeObj: activeGradeObj, chapter: activeChapter, lesson: activeLesson } = activeContext;

  // When switching grade filter manually, jump to first lesson of that grade if current lesson isn't in it
  const handleSelectGradeFilter = (nextGrade: GradeLevel | 'all') => {
    setGradeFilter(nextGrade);
    if (nextGrade !== 'all' && activeLesson.grade !== nextGrade) {
      const targetGrade = CURRICULUM_GRADES.find((g) => g.grade === nextGrade);
      if (targetGrade && targetGrade.chapters[0]?.lessons[0]) {
        const firstCh = targetGrade.chapters[0];
        const firstLesson = firstCh.lessons[0];
        setSelectedLessonId(firstLesson.id);
        setExpandedChapters((prev) => ({ ...prev, [firstCh.id]: true }));
      }
    }
  };

  // Search hits
  const searchHits = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchBilingualCurriculum(searchQuery, gradeFilter, sectionFilter, 60);
  }, [searchQuery, gradeFilter, sectionFilter]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const openLessonFromRef = (
    ref: LessonWithChapter,
    targetSection?: BilingualSectionFilter
  ) => {
    setSelectedLessonId(ref.lesson.id);
    setExpandedChapters((prev) => ({ ...prev, [ref.chapter.id]: true }));
    if (targetSection && targetSection !== 'all') {
      setSectionFilter(targetSection);
    }
    setMobileNavOpen(false);
    setAiError(null);
  };

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    } catch {
      // Fallback ignored if clipboard permissions restricted
    }
  };

  const handleSpeakBilingual = (enText: string, viText: string, activeId: string) => {
    if (speechState.isPlaying && speechState.activeId === activeId) {
      stopSpeaking();
      return;
    }
    speakSequence(
      [
        { text: enText, lang: accent, rate: speechRate, isMath: true },
        { text: viText, lang: 'vi-VN', rate: speechRate, isMath: true },
      ],
      activeId
    );
  };

  const handleSpeakNotationBilingual = (readAsEn: string, readAsVi: string, activeId: string) => {
    if (speechState.isPlaying && speechState.activeId === activeId) {
      stopSpeaking();
      return;
    }
    speakSequence(
      [
        { text: readAsEn, lang: accent, rate: speechRate, isMath: false },
        { text: readAsVi, lang: 'vi-VN', rate: speechRate, isMath: false },
      ],
      activeId
    );
  };

  const handleSpeakLessonSummary = () => {
    const id = `lesson-summary-${activeLesson.id}`;
    if (speechState.isPlaying && speechState.activeId === id) {
      stopSpeaking();
      return;
    }
    const objectivesEnText = activeLesson.objectivesEn.join('. ');
    const objectivesViText = activeLesson.objectivesVi.join('. ');
    speakSequence(
      [
        {
          text: `Grade ${activeLesson.grade}, Lesson ${activeLesson.lessonNumber}: ${activeLesson.titleEn}. ${objectivesEnText}`,
          lang: accent,
          rate: speechRate,
          isMath: true,
        },
        {
          text: `Toán ${activeLesson.grade}, Bài ${activeLesson.lessonNumber}: ${activeLesson.titleVi}. ${objectivesViText}`,
          lang: 'vi-VN',
          rate: speechRate,
          isMath: true,
        },
      ],
      id
    );
  };

  const handleSpeakExample = (
    exampleId: string,
    problemEn: string,
    problemVi: string,
    steps: Array<{ labelEn: string; labelVi: string; contentEn: string; contentVi: string }>,
    conclusionEn?: string,
    conclusionVi?: string,
    mode: 'en' | 'bilingual' = 'en'
  ) => {
    const fullId = `${exampleId}-${mode}`;
    if (speechState.isPlaying && speechState.activeId === fullId) {
      stopSpeaking();
      return;
    }

    if (mode === 'en') {
      const items = [
        { text: problemEn, lang: accent as SpeechAccent, rate: speechRate, isMath: true },
        ...steps.map((st) => ({
          text: `${st.labelEn}: ${st.contentEn}`,
          lang: accent as SpeechAccent,
          rate: speechRate,
          isMath: true,
        })),
      ];
      if (conclusionEn) {
        items.push({ text: conclusionEn, lang: accent, rate: speechRate, isMath: true });
      }
      speakSequence(items, fullId);
    } else {
      const items = [
        { text: problemEn, lang: accent as SpeechAccent, rate: speechRate, isMath: true },
        { text: problemVi, lang: 'vi-VN' as const, rate: speechRate, isMath: true },
        ...steps.flatMap((st) => [
          {
            text: `${st.labelEn}: ${st.contentEn}`,
            lang: accent as SpeechAccent,
            rate: speechRate,
            isMath: true,
          },
          {
            text: `${st.labelVi}: ${st.contentVi}`,
            lang: 'vi-VN' as const,
            rate: speechRate,
            isMath: true,
          },
        ]),
      ];
      if (conclusionEn && conclusionVi) {
        items.push({ text: conclusionEn, lang: accent, rate: speechRate, isMath: true });
        items.push({ text: conclusionVi, lang: 'vi-VN', rate: speechRate, isMath: true });
      }
      speakSequence(items, fullId);
    }
  };

  const handleCreateExamForLesson = () => {
    const vocabSummary = activeLesson.vocabulary
      .slice(0, 8)
      .map((v) => `${v.termVi} (${v.termEn})`)
      .join(', ');
    const notationSummary = activeLesson.notations
      .slice(0, 5)
      .map((n) => `${n.symbolLatex} [${n.readAsVi}]`)
      .join('; ');

    const referenceContext = [
      `Chương trình Toán ${activeLesson.grade} (${activeGradeObj.sourceDocTitle})`,
      `Chương ${activeChapter.chapterNumber}: ${activeChapter.titleVi} (${activeChapter.titleEn})`,
      `Bài ${activeLesson.lessonNumber}: ${activeLesson.titleVi} (${activeLesson.titleEn})`,
      `Yêu cầu cần đạt:\n- ${activeLesson.objectivesVi.join('\n- ')}`,
      vocabSummary ? `Thuật ngữ trọng tâm: ${vocabSummary}` : '',
      notationSummary ? `Ký hiệu & công thức: ${notationSummary}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const metadata: ExamMetadata = {
      schoolName: settings.defaultSchoolName || 'Trường THCS Bình San',
      departmentName: settings.defaultDepartmentName || 'Sở Giáo dục và Đào tạo',
      subject: 'Toán',
      grade: `Khối ${activeLesson.grade}`,
      className: `${activeLesson.grade}A1`,
      semester: activeChapter.chapterNumber <= 5 ? 'Học kỳ I' : 'Học kỳ II',
      schoolYear: '2026 - 2027',
      examTitle: `Kiểm tra: ${activeLesson.titleVi}`,
      chapterTitle: `Chương ${activeChapter.chapterNumber}: ${activeChapter.titleVi} — Bài ${activeLesson.lessonNumber}: ${activeLesson.titleVi}`,
      durationMinutes: 45,
      totalPoints: 10,
      curriculum: 'Bộ SGK thống nhất 2026',
      examMode: 'MCQ_ESSAY',
      matrixInputMode: 'auto',
      questionCounts: {
        part1_MCQSingle: 12,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 2,
        part2_PointsPerQuestion: 1.0,
        part2_TFStatementsPerQuestion: 4,
        part3_MCQShort: 4,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 2,
        part4_ApplyCount: 1,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 1,
        part4_AdvancedPoints: 2.0,
      },
      cognitiveRatio: {
        remember: 40,
        understand: 30,
        apply: 20,
        advanced: 10,
      },
      codeCount: 4,
      matrixOutputFormat: 'cv7991',
      referenceContext,
    };

    onCreateExamFromTopic(metadata);
  };

  const handleGenerateAiExtension = async () => {
    const lessonId = activeLesson.id;
    setAiLoadingLessonId(lessonId);
    setAiError(null);

    const vocabList = activeLesson.vocabulary.map((v) => `${v.termEn} (${v.termVi})`).join(', ');
    const prompt = `Bạn là chuyên gia sư phạm Toán THCS song ngữ Anh – Việt của Bộ GD&ĐT Việt Nam.
Hãy mở rộng thêm 1 đoạn lời thoại giảng dạy trên lớp và 1 ví dụ minh họa mới (khác với ví dụ có sẵn) cho bài học sau:
- Khối lớp: Toán ${activeLesson.grade}
- Chương ${activeChapter.chapterNumber}: ${activeChapter.titleVi} (${activeChapter.titleEn})
- Bài ${activeLesson.lessonNumber}: ${activeLesson.titleVi} (${activeLesson.titleEn})
- Mục tiêu: ${activeLesson.objectivesVi.join('; ')}
- Thuật ngữ: ${vocabList}

Yêu cầu trả về JSON hợp lệ đúng cấu trúc sau (sử dụng cú pháp LaTeX bọc trong $...$ cho biểu thức toán học, ví dụ $\\\\frac{a}{b}$, thoát đúng \\\\ trong JSON):
{
  "extraDialogueEn": "Lời giảng tiếng Anh tự nhiên của giáo viên khi dẫn dắt học sinh trên lớp (2-3 câu).",
  "extraDialogueVi": "Nghĩa tiếng Việt chuẩn sư phạm tương ứng.",
  "extraExampleTitleEn": "Worked Example (Extended): ...",
  "extraExampleTitleVi": "Ví dụ mở rộng: ...",
  "extraProblemEn": "Đề bài bằng tiếng Anh rõ ràng, phù hợp học sinh lớp ${activeLesson.grade}.",
  "extraProblemVi": "Đề bài bằng tiếng Việt chính xác.",
  "extraSteps": [
    {
      "labelEn": "Step 1",
      "labelVi": "Bước 1",
      "contentEn": "Lời giải tiếng Anh bước 1 kèm công thức $...$",
      "contentVi": "Lời giải tiếng Việt bước 1 kèm công thức $...$"
    },
    {
      "labelEn": "Step 2",
      "labelVi": "Bước 2",
      "contentEn": "Lời giải tiếng Anh bước 2 kèm kết luận",
      "contentVi": "Lời giải tiếng Việt bước 2 kèm kết luận"
    }
  ],
  "pedagogicalTipEn": "One concise English teaching note highlighting common student mistakes.",
  "pedagogicalTipVi": "Một lưu ý sư phạm ngắn gọn bằng tiếng Việt về sai lầm học sinh thường gặp."
}`;

    try {
      const responseText = await callGeminiApi({
        prompt,
        responseMimeType: 'application/json',
        customApiKey: settings.customApiKey,
        model: settings.selectedModel,
        temperature: 0.4,
      });

      const parsed = safeJsonParse<AiLessonExtension>(responseText);
      if (!parsed || !parsed.extraProblemEn || !Array.isArray(parsed.extraSteps)) {
        throw new Error('Phản hồi từ AI không đầy đủ cấu trúc ví dụ song ngữ.');
      }

      setAiExtensions((prev) => ({ ...prev, [lessonId]: parsed }));
    } catch (err: any) {
      const msg = err?.message || 'Không thể kết nối AI để mở rộng nội dung.';
      if (msg.includes('NO_API_KEY')) {
        setAiError('Chưa cấu hình API Key Gemini. Vui lòng thêm khóa API trong mục Cài đặt hệ thống để sử dụng tính năng mở rộng AI (tra cứu toàn bộ 151 bài học vẫn hoạt động bình thường không cần API Key).');
      } else {
        setAiError(msg);
      }
    } finally {
      setAiLoadingLessonId(null);
    }
  };

  const showSection = (target: Exclude<BilingualSectionFilter, 'all'>) =>
    sectionFilter === 'all' || sectionFilter === target;

  const activeAiExtension = aiExtensions[activeLesson.id];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Toolbar: Grade selector, Search, Section filter, Speech controls */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Languages className="w-4 h-4 shrink-0" />
              <span>Tài liệu BGD&ĐT (2026) · Toàn bộ chương trình Toán THCS Lớp 6–9</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Tra Cứu & Luyện Đọc Toán Song Ngữ Anh – Việt
            </h2>
          </div>

          {/* Speech Voice & Rate Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
              role="group"
              aria-label="Chọn giọng tiếng Anh"
            >
              <button
                type="button"
                onClick={() => setAccent('en-US')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  accent === 'en-US'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Giọng US
              </button>
              <button
                type="button"
                onClick={() => setAccent('en-GB')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  accent === 'en-GB'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Giọng UK
              </button>
            </div>

            <div
              className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
              role="group"
              aria-label="Chọn tốc độ đọc"
            >
              <button
                type="button"
                onClick={() => setSpeechRate(0.75)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                  speechRate === 0.75
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                0.75x Chậm
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                  speechRate === 1.0
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1.0x Chuẩn
              </button>
            </div>

            {speechState.isPlaying && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Dừng đọc</span>
              </button>
            )}
          </div>
        </div>

        {!speechSupported && (
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl px-3.5 py-2">
            Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Thầy/cô vẫn có thể tra cứu toàn bộ từ vựng, ký hiệu, mẫu câu và ví dụ bình thường.
          </p>
        )}

        {/* Grade Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `Tất cả (${gradeCounts.all})` },
              { id: 6, label: `Toán 6 (${gradeCounts[6]})` },
              { id: 7, label: `Toán 7 (${gradeCounts[7]})` },
              { id: 8, label: `Toán 8 (${gradeCounts[8]})` },
              { id: 9, label: `Toán 9 (${gradeCounts[9]})` },
            ] as Array<{ id: GradeLevel | 'all'; label: string }>
          ).map((g) => {
            const active = gradeFilter === g.id;
            return (
              <button
                key={String(g.id)}
                type="button"
                onClick={() => handleSelectGradeFilter(g.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer border ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Search Input + Section Filter Tabs */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu thuật ngữ, ký hiệu, mẫu câu, ví dụ (VD: phân số, pythagore, quadratic, tam giác)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {SECTION_TABS.map((sec) => {
              const active = sectionFilter === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSectionFilter(sec.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    active
                      ? 'bg-slate-900 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border-slate-900 dark:border-emerald-500/40'
                      : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Results Overlay Panel */}
      {searchQuery.trim().length > 0 && (
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
              Kết quả tra cứu cho &ldquo;{searchQuery.trim()}&rdquo; · {searchHits.length} mục khớp
            </h3>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              Đóng kết quả tìm kiếm
            </button>
          </div>

          {searchHits.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
              Không tìm thấy mục phù hợp. Thầy/cô thử từ khóa ngắn hơn (tiếng Việt có dấu, không dấu hoặc tiếng Anh).
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {searchHits.map((hit, idx) => {
                const hitId = `search-${hit.lessonRef.lesson.id}-${hit.itemId || idx}`;
                const isNotation = hit.matchType === 'notation';
                const targetSection: BilingualSectionFilter =
                  hit.matchType === 'lesson' ? 'all' : hit.matchType;

                return (
                  <div
                    key={`${hitId}-${idx}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-3.5 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                        {MATCH_TYPE_LABELS[hit.matchType] || hit.matchType} · Toán {hit.lessonRef.grade} · Bài {hit.lessonRef.lesson.lessonNumber}
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        <MathText content={hit.primaryText} />
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <MathText content={hit.secondaryText} />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-800/70">
                      <div className="flex items-center gap-1.5">
                        {hit.speakEn && speechSupported && (
                          <button
                            type="button"
                            onClick={() =>
                              isNotation
                                ? speakSequence(
                                    [{ text: hit.speakEn!, lang: accent, rate: speechRate, isMath: false }],
                                    `${hitId}-en`
                                  )
                                : speakSingle(hit.speakEn!, `${hitId}-en`, accent, speechRate)
                            }
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              speechState.isPlaying && speechState.activeId === `${hitId}-en`
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe EN</span>
                          </button>
                        )}
                        {hit.speakVi && speechSupported && (
                          <button
                            type="button"
                            onClick={() =>
                              isNotation
                                ? speakSequence(
                                    [{ text: hit.speakVi!, lang: 'vi-VN', rate: speechRate, isMath: false }],
                                    `${hitId}-vi`
                                  )
                                : speakSingle(hit.speakVi!, `${hitId}-vi`, 'vi-VN', speechRate)
                            }
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              speechState.isPlaying && speechState.activeId === `${hitId}-vi`
                                ? 'bg-cyan-600 text-white border-cyan-600'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe VI</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => openLessonFromRef(hit.lessonRef, targetSection)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Mở bài học
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Main 2-Column Master-Detail Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigator: Chapters & 151 Lessons */}
        <aside className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs lg:sticky lg:top-6">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Mục lục Chương & Bài học
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {visibleGrades.reduce((sum, g) => sum + g.chapters.length, 0)} chương ·{' '}
                {visibleGrades.reduce(
                  (sum, g) => sum + g.chapters.reduce((s, ch) => s + ch.lessons.length, 0),
                  0
                )}{' '}
                bài
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((o) => !o)}
              className="lg:hidden px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              {mobileNavOpen ? 'Thu gọn' : 'Chọn bài'}
            </button>
          </div>

          <div
            className={`${
              mobileNavOpen ? 'block' : 'hidden lg:block'
            } max-h-[68vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80`}
          >
            {visibleGrades.map((gradeItem) => (
              <div key={gradeItem.grade} className="p-3 space-y-2">
                {gradeFilter === 'all' && (
                  <div className="px-2 pt-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 tabular-nums">
                    Toán Lớp {gradeItem.grade} · {gradeItem.chapters.length} chương
                  </div>
                )}

                {gradeItem.chapters.map((chapter) => {
                  const isOpen =
                    Boolean(expandedChapters[chapter.id]) ||
                    chapter.id === activeChapter.id;

                  return (
                    <div
                      key={chapter.id}
                      className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/70 flex items-start justify-between gap-2 text-left transition-colors cursor-pointer"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug tabular-nums">
                            Chương {chapter.chapterNumber}: {chapter.titleVi}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {chapter.titleEn}
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                          {chapter.lessons.map((lessonItem) => {
                            const isSelected = lessonItem.id === activeLesson.id;
                            return (
                              <button
                                key={lessonItem.id}
                                type="button"
                                onClick={() => {
                                  setSelectedLessonId(lessonItem.id);
                                  setMobileNavOpen(false);
                                  setAiError(null);
                                }}
                                className={`w-full px-3 py-2.5 text-left transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <div className="text-xs font-bold leading-snug tabular-nums">
                                  Bài {lessonItem.lessonNumber}: {lessonItem.titleVi}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                  {lessonItem.titleEn}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Right Detail Workspace: Active Bilingual Lesson */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Header & Objectives */}
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-7 shadow-xs space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                Toán {activeLesson.grade} · Chương {activeChapter.chapterNumber}: {activeChapter.titleVi} · Bài {activeLesson.lessonNumber} · {activeGradeObj.sourceDocTitle}
              </p>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {activeLesson.titleVi}
              </h2>
              <p className="text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-400 leading-snug">
                {activeLesson.titleEn}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {speechSupported && (
                <button
                  type="button"
                  onClick={handleSpeakLessonSummary}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    speechState.isPlaying && speechState.activeId === `lesson-summary-${activeLesson.id}`
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe tên bài & mục tiêu (Song ngữ)</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCreateExamForLesson}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <FilePlus2 className="w-4 h-4" />
                <span>Tạo đề cho bài này</span>
              </button>
            </div>

            {/* Bilingual Learning Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Mục tiêu bài học (Tiếng Việt)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc pl-4">
                  {activeLesson.objectivesVi.map((obj, i) => (
                    <li key={i}>
                      <MathText content={obj} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Learning Objectives (English)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc pl-4">
                  {activeLesson.objectivesEn.map((obj, i) => (
                    <li key={i}>
                      <MathText content={obj} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 1: Key Vocabulary */}
          {showSection('vocab') && (
            <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    1. Từ vựng trọng tâm · Key Vocabulary
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    {activeLesson.vocabulary.length} thuật ngữ kèm giải thích song ngữ & câu ví dụ
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeLesson.vocabulary.map((vocab) => {
                  const enId = `${vocab.id}-en`;
                  const biId = `${vocab.id}-bi`;
                  const copyId = `${vocab.id}-copy`;

                  return (
                    <article
                      key={vocab.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="text-base font-black text-slate-900 dark:text-white">
                              {vocab.termEn}
                            </span>
                            {vocab.partOfSpeech && (
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 italic">
                                ({vocab.partOfSpeech})
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                            {vocab.termVi}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                          {speechSupported && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  speakSingle(`${vocab.termEn}. ${vocab.exampleEn}`, enId, accent, speechRate)
                                }
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                  speechState.isPlaying && speechState.activeId === enId
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Nghe EN</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSpeakBilingual(
                                    `${vocab.termEn}. ${vocab.explanationEn}`,
                                    `${vocab.termVi}. ${vocab.explanationVi}`,
                                    biId
                                  )
                                }
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                  speechState.isPlaying && speechState.activeId === biId
                                    ? 'bg-cyan-600 text-white border-cyan-600'
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Song ngữ</span>
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyText(
                                `${vocab.termEn} (${vocab.termVi})\nEN: ${vocab.explanationEn}\nVI: ${vocab.explanationVi}\nExample: ${vocab.exampleEn} — ${vocab.exampleVi}`,
                                copyId
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                            title="Sao chép thuật ngữ"
                          >
                            {copiedId === copyId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedId === copyId ? 'Đã chép' : 'Sao chép'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Bilingual Explanation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                        <div className="text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-slate-900 dark:text-slate-100">EN: </span>
                          <MathText content={vocab.explanationEn} />
                        </div>
                        <div className="text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-slate-900 dark:text-slate-100">VI: </span>
                          <MathText content={vocab.explanationVi} />
                        </div>
                      </div>

                      {/* Contextual Sentence */}
                      <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                        <div className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-cyan-700 dark:text-cyan-400">Câu mẫu EN: </span>
                          <MathText content={vocab.exampleEn} />
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">Nghĩa VI: </span>
                          <MathText content={vocab.exampleVi} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section 2: Formula & Notation Reading */}
          {showSection('notation') && (
            <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  2. Cách đọc ký hiệu & Công thức · Formula & Notation Reading
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {activeLesson.notations.length} ký hiệu toán học chuẩn đọc trên lớp bằng tiếng Anh và tiếng Việt
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <th className="py-2.5 pr-4">Ký hiệu</th>
                      <th className="py-2.5 pr-4">Đọc bằng tiếng Anh (Read aloud EN)</th>
                      <th className="py-2.5 pr-4">Đọc bằng tiếng Việt (VI)</th>
                      <th className="py-2.5 text-right">Nghe đọc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                    {activeLesson.notations.map((item) => {
                      const enId = `${item.id}-en`;
                      const biId = `${item.id}-bi`;

                      return (
                        <tr key={item.id} className="align-top">
                          <td className="py-3.5 pr-4 font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                            <MathText content={`$${item.symbolLatex}$`} />
                          </td>
                          <td className="py-3.5 pr-4 space-y-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              <MathText content={item.readAsEn} />
                            </div>
                            {item.explanationEn && (
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                <MathText content={item.explanationEn} />
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 space-y-1">
                            <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                              <MathText content={item.readAsVi} />
                            </div>
                            {item.explanationVi && (
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                <MathText content={item.explanationVi} />
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 text-right">
                            {speechSupported && (
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    speechState.isPlaying && speechState.activeId === enId
                                      ? stopSpeaking()
                                      : speakSequence(
                                          [
                                            {
                                              text: item.readAsEn,
                                              lang: accent,
                                              rate: speechRate,
                                              isMath: false,
                                            },
                                          ],
                                          enId
                                        )
                                  }
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    speechState.isPlaying && speechState.activeId === enId
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                                  }`}
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>EN</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSpeakNotationBilingual(item.readAsEn, item.readAsVi, biId)
                                  }
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    speechState.isPlaying && speechState.activeId === biId
                                      ? 'bg-cyan-600 text-white border-cyan-600'
                                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                                  }`}
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>EN+VI</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 3: Classroom Expressions */}
          {showSection('expression') && (
            <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>3. Mẫu câu giảng dạy trên lớp · Classroom Expressions</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {activeLesson.expressions.length} câu giao tiếp chuyên môn dành cho giáo viên trên lớp
                </p>
              </div>

              <div className="space-y-3">
                {activeLesson.expressions.map((expr) => {
                  const enId = `${expr.id}-en`;
                  const biId = `${expr.id}-bi`;
                  const copyId = `${expr.id}-copy`;

                  return (
                    <div
                      key={expr.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {EXPRESSION_CATEGORY_LABELS[expr.category]}
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          <MathText content={expr.phraseEn} />
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                          <MathText content={expr.phraseVi} />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        {speechSupported && (
                          <>
                            <button
                              type="button"
                              onClick={() => speakSingle(expr.phraseEn, enId, accent, speechRate)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                speechState.isPlaying && speechState.activeId === enId
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe EN</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleSpeakBilingual(expr.phraseEn, expr.phraseVi, biId)
                              }
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                speechState.isPlaying && speechState.activeId === biId
                                  ? 'bg-cyan-600 text-white border-cyan-600'
                                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Song ngữ</span>
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(`${expr.phraseEn}\n${expr.phraseVi}`, copyId)
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {copiedId === copyId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === copyId ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section 4: Worked Examples */}
          {showSection('example') && (
            <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  4. Ví dụ minh họa từng bước · Worked Examples
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {activeLesson.examples.length} bài mẫu đối chiếu song ngữ từng bước giải
                </p>
              </div>

              <div className="space-y-5">
                {activeLesson.examples.map((exItem) => (
                  <article
                    key={exItem.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 p-4 md:p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          {exItem.titleVi}
                        </h4>
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {exItem.titleEn}
                        </p>
                      </div>

                      {speechSupported && (
                        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleSpeakExample(
                                exItem.id,
                                exItem.problemEn,
                                exItem.problemVi,
                                exItem.steps,
                                exItem.conclusionEn,
                                exItem.conclusionVi,
                                'en'
                              )
                            }
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              speechState.isPlaying && speechState.activeId === `${exItem.id}-en`
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe toàn bài (EN)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSpeakExample(
                                exItem.id,
                                exItem.problemEn,
                                exItem.problemVi,
                                exItem.steps,
                                exItem.conclusionEn,
                                exItem.conclusionVi,
                                'bilingual'
                              )
                            }
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              speechState.isPlaying &&
                              speechState.activeId === `${exItem.id}-bilingual`
                                ? 'bg-cyan-600 text-white border-cyan-600'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe song ngữ</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Problem Statement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 text-xs leading-relaxed">
                      <div>
                        <div className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                          Problem (EN)
                        </div>
                        <div className="text-slate-800 dark:text-slate-200">
                          <MathText content={exItem.problemEn} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                          Đề bài (VI)
                        </div>
                        <div className="text-slate-800 dark:text-slate-200">
                          <MathText content={exItem.problemVi} />
                        </div>
                      </div>
                    </div>

                    {/* Step-by-step Solution */}
                    <div className="space-y-2">
                      {exItem.steps.map((step, sIdx) => {
                        const stepId = `${exItem.id}-step-${sIdx}`;
                        return (
                          <div
                            key={sIdx}
                            className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 tabular-nums">
                                Bước {sIdx + 1} · {step.labelEn} / {step.labelVi}
                              </span>
                              {speechSupported && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSpeakBilingual(
                                      `${step.labelEn}: ${step.contentEn}`,
                                      `${step.labelVi}: ${step.contentVi}`,
                                      stepId
                                    )
                                  }
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    speechState.isPlaying && speechState.activeId === stepId
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>Nghe bước này</span>
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                              <div>
                                <MathText content={step.contentEn} />
                              </div>
                              <div>
                                <MathText content={step.contentVi} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {(exItem.conclusionEn || exItem.conclusionVi) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-3 text-xs leading-relaxed">
                        <div className="text-slate-800 dark:text-slate-200 font-semibold">
                          <span className="text-emerald-800 dark:text-emerald-300">Answer: </span>
                          <MathText content={exItem.conclusionEn || ''} />
                        </div>
                        <div className="text-slate-800 dark:text-slate-200 font-semibold">
                          <span className="text-emerald-800 dark:text-emerald-300">Kết luận: </span>
                          <MathText content={exItem.conclusionVi || ''} />
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Pedagogical Notes & Optional AI Expansion */}
          {showSection('notes') && (
            <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>5. Ghi chú sư phạm & Mở rộng với AI</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lưu ý giảng dạy chuẩn Bộ GD&ĐT và tùy chọn tạo thêm ví dụ song ngữ bằng Gemini
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAiExtension}
                  disabled={aiLoadingLessonId === activeLesson.id}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {aiLoadingLessonId === activeLesson.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Mở rộng thêm ví dụ & lời thoại (AI)</span>
                </button>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc pl-5">
                {activeLesson.teachingNotes.map((note, idx) => (
                  <li key={idx}>
                    <MathText content={note} />
                  </li>
                ))}
              </ul>

              {aiError && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800/70 bg-amber-50 dark:bg-amber-950/40 p-3.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {aiError}
                </div>
              )}

              {activeAiExtension && (
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-black text-emerald-800 dark:text-emerald-300">
                      Nội dung mở rộng bởi AI cho Bài {activeLesson.lessonNumber}
                    </div>
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeakBilingual(
                            activeAiExtension.extraDialogueEn,
                            activeAiExtension.extraDialogueVi,
                            `ai-dialogue-${activeLesson.id}`
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe lời thoại giảng bài</span>
                      </button>
                    )}
                  </div>

                  {/* Classroom Dialogue */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                        Teacher Dialogue (EN)
                      </div>
                      <div className="text-slate-800 dark:text-slate-200">
                        <MathText content={activeAiExtension.extraDialogueEn} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                        Lời giảng gợi ý (VI)
                      </div>
                      <div className="text-slate-800 dark:text-slate-200">
                        <MathText content={activeAiExtension.extraDialogueVi} />
                      </div>
                    </div>
                  </div>

                  {/* Extra Worked Example */}
                  <div className="space-y-2.5 bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {activeAiExtension.extraExampleTitleVi}
                        </div>
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {activeAiExtension.extraExampleTitleEn}
                        </div>
                      </div>
                      {speechSupported && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSpeakExample(
                              `ai-ex-${activeLesson.id}`,
                              activeAiExtension.extraProblemEn,
                              activeAiExtension.extraProblemVi,
                              activeAiExtension.extraSteps,
                              undefined,
                              undefined,
                              'bilingual'
                            )
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe ví dụ mở rộng</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold text-cyan-700 dark:text-cyan-400">EN: </span>
                        <MathText content={activeAiExtension.extraProblemEn} />
                      </div>
                      <div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">VI: </span>
                        <MathText content={activeAiExtension.extraProblemVi} />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {activeAiExtension.extraSteps.map((st, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300"
                        >
                          <div>
                            <span className="font-bold">{st.labelEn}: </span>
                            <MathText content={st.contentEn} />
                          </div>
                          <div>
                            <span className="font-bold">{st.labelVi}: </span>
                            <MathText content={st.contentVi} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extra Tip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Tip (EN): </span>
                      <MathText content={activeAiExtension.pedagogicalTipEn} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Lưu ý (VI): </span>
                      <MathText content={activeAiExtension.pedagogicalTipVi} />
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
