import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  BookOpen,
  Calculator,
  Check,
  CheckCircle,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Key,
  Layers,
  Link2,
  Minus,
  Paperclip,
  Plus,
  RefreshCw,
  RotateCcw,
  History,
  Sliders,
  Sparkles,
  Table,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import { ApiKeyInputModal, QuotaExceededModal } from './ApiModals';
import { StorageEngine } from '../services/storageEngine';
import {
  AppSettings,
  CognitiveRatio,
  CurriculumType,
  ExamMetadata,
  ExamMode,
  MatrixInputMode,
  QuestionCounts,
  SubjectType,
  SubjectConfig,
  calculateExamScores,
} from '../types';
import {
  KNTT_CURRICULUM_NAME,
  KNTT_GRADES,
  getDefaultChapterTitleForGrade,
  getKnttChaptersByGrade,
  getKnttLessonById,
  getKnttTextbooksByGrade,
  normalizeKnttGrade,
} from '../data/knttMathCurriculum';
import {
  KNTT_DEFAULT_DRIVE_LINKS,
  KNTT_DRIVE_LINK_ITEMS,
  normalizeTextbookUrl,
  resolveKnttTextbookDriveUrls,
} from '../config/knttDriveLinks';

interface TestGeneratorViewProps {
  settings: AppSettings;
  onGenerate: (metadata: ExamMetadata) => Promise<void>;
  isGenerating: boolean;
  progressMessage: string;
  onSaveSettings?: (newSettings: AppSettings) => void;
  initialMetadata?: ExamMetadata | null;
}

export const TestGeneratorView: React.FC<TestGeneratorViewProps> = ({
  settings,
  onGenerate,
  isGenerating,
  progressMessage,
  onSaveSettings,
  initialMetadata,
}) => {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [pendingMetadata, setPendingMetadata] = useState<ExamMetadata | null>(null);
  const [restoredToast, setRestoredToast] = useState<string | null>(null);
  const [lastSavedSession, setLastSavedSession] = useState<ExamMetadata | null>(() => StorageEngine.getLastGeneratorState());
  // 1. Thông tin hành chính (Chuyên biệt Môn Toán THCS - SGK Kết nối tri thức với cuộc sống)
  const [schoolName, setSchoolName] = useState(settings.defaultSchoolName || 'Trường THCS Bình San');
  const [departmentName, setDepartmentName] = useState(settings.defaultDepartmentName || 'Sở Giáo dục và Đào tạo');
  const [subject, setSubject] = useState<SubjectType>('Toán');
  const [grade, setGrade] = useState('Khối 6');
  const [className, setClassName] = useState('6A1');
  const [semester, setSemester] = useState('Học kỳ I');
  const [schoolYear, setSchoolYear] = useState('2026 - 2027');
  const [examTitle, setExamTitle] = useState('Kiểm tra Giữa học kỳ I');
  const [chapterTitle, setChapterTitle] = useState('Chương I. Tập hợp các số tự nhiên');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [totalPoints, setTotalPoints] = useState(10);
  const [curriculum, setCurriculum] = useState<CurriculumType>(KNTT_CURRICULUM_NAME);

  // Cấu hình đặc thù Môn Toán KNTT (SGK đính kèm)
  const [subjectConfig, setSubjectConfig] = useState<SubjectConfig>({
    mathDomains: ['so_dai_so', 'hinh_hoc_do_luong', 'thong_ke_xac_suat'],
    selectedKnttLessonIds: [],
    prioritizeGeoGebraDiagrams: true,
    strictKnttTextbookOnly: true,
    hasContextData: true,
  });

  // Trình xem nhanh SGK qua Google Drive & hộp thoại cấu hình link Drive
  const [previewPdf, setPreviewPdf] = useState<{
    volumeId: string;
    title: string;
    previewUrl: string;
    viewUrl: string;
    fileName: string;
    pageCount: number;
  } | null>(null);
  const [showDriveLinksModal, setShowDriveLinksModal] = useState(false);
  const [focusedDriveVolumeId, setFocusedDriveVolumeId] = useState<string | null>(null);
  const [driveLinksDraft, setDriveLinksDraft] = useState<Record<string, string>>(
    () => settings.knttDriveLinks || {}
  );
  const [showAllSemestersInPicker, setShowAllSemestersInPicker] = useState(false);

  useEffect(() => {
    setDriveLinksDraft(settings.knttDriveLinks || {});
  }, [settings.knttDriveLinks]);

  const handleOpenDriveLinksModal = (volumeId?: string) => {
    setDriveLinksDraft(settings.knttDriveLinks || {});
    setFocusedDriveVolumeId(volumeId || null);
    setShowDriveLinksModal(true);
  };

  const handleSaveDriveLinks = () => {
    const cleaned: Record<string, string> = {};
    Object.entries(driveLinksDraft).forEach(([k, v]) => {
      const trimmed = String(v || '').trim();
      if (trimmed) cleaned[k] = trimmed;
    });
    const updatedSettings: AppSettings = {
      ...settings,
      knttDriveLinks: cleaned,
    };
    if (onSaveSettings) {
      onSaveSettings(updatedSettings);
    } else {
      StorageEngine.saveSettings(updatedSettings);
    }
    setShowDriveLinksModal(false);
    setRestoredToast('Đã lưu danh sách link Google Drive SGK Toán KNTT!');
    setTimeout(() => setRestoredToast(null), 3500);
  };

  // 1b. Nguồn tài liệu & Giới hạn kiến thức tham khảo (tùy chọn bổ sung ngoài mục lục SGK)
  const [referenceContext, setReferenceContext] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [showRefHelp, setShowRefHelp] = useState(false);

  // Xử lý tải ảnh / file tài liệu tham khảo
  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            setReferenceImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      } else if (
        file.type === 'text/plain' ||
        file.name.endsWith('.txt') ||
        file.name.endsWith('.md')
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text) {
            setReferenceContext((prev) => (prev ? prev + '\n\n' + text : text));
          }
        };
        reader.readAsText(file);
      } else {
        console.warn(
          'Vui lòng chọn các file định dạng hình ảnh (PNG, JPG, WEBP) hoặc file văn bản (.txt) để tải lên.'
        );
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(files);
    e.target.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          imageFiles.push(blob);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      processFiles(imageFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 1c. Khung Ma trận bộ môn có sẵn (Tùy chọn nâng cao)
  const [matrixInputMode, setMatrixInputMode] = useState<'auto' | 'custom' | 'spec'>('auto');
  const [customMatrixContext, setCustomMatrixContext] = useState('');
  const [customMatrixImages, setCustomMatrixImages] = useState<string[]>([]);
  const [showMatrixHelp, setShowMatrixHelp] = useState(false);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('');

  // 1d. Bảng đặc tả chi tiết bộ môn có sẵn (Mục C - Căn cứ chi tiết chuẩn YCCĐ & Mức độ nhận thức)
  const [customSpecContext, setCustomSpecContext] = useState('');
  const [customSpecImages, setCustomSpecImages] = useState<string[]>([]);
  const [showSpecHelp, setShowSpecHelp] = useState(false);
  const [selectedSpecTemplateKey, setSelectedSpecTemplateKey] = useState<string>('');

  const MATRIX_TEMPLATES: Record<
    string,
    { label: string; text: string; defaultP1?: number; defaultP2?: number; defaultP3?: number; defaultP4?: number; defaultP3Pts?: number; defaultP4Pts?: number }
  > = {
    toan_thcs_18: {
      label: '📐 Toán THCS KNTT (18 câu - 29 ý)',
      text: `### MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN THCS - KNTT (18 CÂU / 29 Ý - CHUẨN 7991)
| TT | Mạch kiến thức / Chủ đề SGK KNTT | Phần I (TN 4 lựa chọn) | Phần II (TN Đúng/Sai - 4 ý) | Phần III (TN Trả lời ngắn) | Phần IV (Tự luận) | Tổng số câu | Điểm |
|---|---|---|---|---|---|---|---|
| 1 | Số & Đại số (Số học / Đa thức / Phương trình) | 5 câu (Câu 1-4: NB; Câu 5: TH) | 1 câu (Câu 13: 4 ý a,b,c,d - 2 NB, 1 TH, 1 VD) | 2 câu (Câu 15a: NB, 15b: VD) | 2 câu (Câu 16: TH+VD; Câu 17: VD) | 10 câu | 5.25đ |
| 2 | Hình học & Đo lường (Hình phẳng / Hình khối) | 5 câu (Câu 6-8: NB; Câu 9-10: TH) | 1 câu (Câu 14: 4 ý a,b,c,d - 2 NB, 1 TH, 1 VD) | 1 câu (Câu 15c: TH) | 1 câu (Câu 18: 2 ý 18.1 TH, 18.2 VD/VDC) | 8 câu | 3.75đ |
| 3 | Thống kê & Xác suất | 2 câu (Câu 11: NB; Câu 12: TH) | 0 | 1 câu (Câu 15d: TH) | 0 | 3 câu | 1.00đ |
| **CỘNG** | | **12 câu (3.0đ)** | **2 câu lớn (2.0đ)** | **4 câu (2.0đ)** | **3 câu (3.0đ)** | **18 câu (29 ý)** | **10.0đ** |

🎯 ĐỊNH HƯỚNG CẤU TRÚC ĐỀ BÁM SÁT SGK TOÁN KNTT:
1. Phần I: 12 câu trắc nghiệm 4 lựa chọn (Câu 1 đến 12 | mỗi câu 0.25đ = 3.0đ).
2. Phần II: 2 câu hỏi Đúng/Sai (Câu 13 và Câu 14, mỗi câu gồm 4 ý a, b, c, d chia đều 0.25đ/ý = 2.0đ).
3. Phần III: 4 câu trả lời ngắn độc lập (15a, 15b, 15c, 15d | mỗi câu 0.5đ = 2.0đ).
4. Phần IV: 3 câu tự luận (Câu 16 gồm 2 ý a, b; Câu 17; Câu 18 gồm 2 ý 18.1, 18.2 | Tổng = 3.0đ).`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
    toan_can_ban: {
      label: '📐 Toán THCS KNTT (20 câu chuẩn 7991)',
      text: `### MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN THCS - KNTT (20 CÂU CHUẨN BGD&ĐT)
| TT | Mạch kiến thức / Chủ đề SGK KNTT | Phần I (TN 4 lựa chọn) | Phần II (TN Đúng/Sai - 4 ý) | Phần III (TN Trả lời ngắn) | Phần IV (Tự luận) | Tổng số câu | Điểm |
|---|---|---|---|---|---|---|---|
| 1 | Mạch Số và Đại số (theo SGK KNTT đang chọn) | 6 câu (4 NB, 2 TH) | 1 câu (2 NB, 1 TH, 1 VD) | 2 câu (1 TH, 1 VD) | 1 câu (VD: 2.0đ) | 10 câu | 5.0đ |
| 2 | Mạch Hình học và Đo lường (theo SGK KNTT đang chọn) | 4 câu (2 NB, 2 TH) | 1 câu (1 NB, 2 TH, 1 VD) | 1 câu (TH: 0.25đ) | 1 câu (VDC: 2.0đ) | 7 câu | 4.25đ |
| 3 | Mạch Thống kê và Xác suất (theo SGK KNTT đang chọn) | 2 câu (1 NB, 1 TH) | 0 | 1 câu (TH: 0.25đ) | 0 | 3 câu | 0.75đ |
| **CỘNG** | | **12 câu (3.0đ)** | **2 câu (2.0đ)** | **4 câu (1.0đ)** | **2 câu (4.0đ)** | **20 câu** | **10.0đ** |
* Tỷ lệ nhận thức: Nhận biết 40% (4.0đ) - Thông hiểu 30% (3.0đ) - Vận dụng 20% (2.0đ) - Vận dụng cao 10% (1.0đ).`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 2,
      defaultP3Pts: 0.25,
      defaultP4Pts: 2.0,
    },
    toan_trac_nghiem: {
      label: '⚡ Toán THCS KNTT (100% Trắc nghiệm • 31 câu)',
      text: `### MA TRẬN ĐỀ KIỂM TRA TRẮC NGHIỆM MÔN TOÁN THCS - KNTT (31 CÂU)
| TT | Mạch kiến thức / Chủ đề SGK KNTT | Phần I (TN 4 lựa chọn) | Phần II (TN Đúng/Sai - 4 ý) | Phần III (TN Trả lời ngắn) | Tổng số câu | Điểm |
|---|---|---|---|---|---|---|
| 1 | Mạch Số và Đại số | 10 câu (6 NB, 4 TH) | 2 câu (4 NB, 2 TH, 2 VD) | 4 câu (2 TH, 2 VD) | 16 câu | 5.5đ |
| 2 | Mạch Hình học và Đo lường | 7 câu (4 NB, 3 TH) | 1 câu (1 NB, 2 TH, 1 VD) | 3 câu (1 TH, 2 VD/VDC) | 11 câu | 3.5đ |
| 3 | Mạch Thống kê và Xác suất | 3 câu (2 NB, 1 TH) | 0 | 1 câu (TH) | 4 câu | 1.0đ |
| **CỘNG** | | **20 câu (5.0đ)** | **3 câu (3.0đ)** | **8 câu (2.0đ)** | **31 câu** | **10.0đ** |`,
      defaultP1: 20,
      defaultP2: 3,
      defaultP3: 8,
      defaultP4: 0,
      defaultP3Pts: 0.25,
    },
    toan_tu_luan: {
      label: '✍️ Toán THCS KNTT (100% Tự luận • 5 câu)',
      text: `### MA TRẬN ĐỀ KIỂM TRA TỰ LUẬN MÔN TOÁN THCS - KNTT (5 CÂU)
| TT | Mạch kiến thức / Chủ đề SGK KNTT | Nhận biết (NB) | Thông hiểu (TH) | Vận dụng (VD) | Vận dụng cao (VDC) | Tổng điểm |
|---|---|---|---|---|---|---|
| 1 | Bài toán Số học / Đại số (Tính hợp lí, rút gọn, tìm x / giải bài toán) | 1 câu (2.0đ) | 1 câu (2.0đ) | 1 câu (2.0đ) | 0 | **6.0 điểm** |
| 2 | Bài toán Hình học phẳng / Thực tiễn (có hình vẽ GeoGebra) & Bất đẳng thức / Cực trị | 0 | 0 | 1 câu (2.0đ) | 1 câu (2.0đ) | **4.0 điểm** |
| **CỘNG** | | **2.0đ** | **2.0đ** | **4.0đ** | **2.0đ** | **10.0 điểm** |`,
      defaultP1: 0,
      defaultP2: 0,
      defaultP3: 0,
      defaultP4: 5,
      defaultP4Pts: 2.0,
    },
  };

  const handleApplyTemplate = (key: string) => {
    const tpl = MATRIX_TEMPLATES[key];
    if (!tpl) return;
    setCustomMatrixContext(tpl.text);
    setMatrixInputMode('custom');
    setSelectedTemplateKey(key);
    if (
      tpl.defaultP1 !== undefined &&
      tpl.defaultP2 !== undefined &&
      tpl.defaultP3 !== undefined &&
      tpl.defaultP4 !== undefined
    ) {
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: tpl.defaultP1!,
        part2_MCQTrueFalse: tpl.defaultP2!,
        part3_MCQShort: tpl.defaultP3!,
        part4_Essay: tpl.defaultP4!,
        part3_PointsPerQuestion: tpl.defaultP3Pts ?? prev.part3_PointsPerQuestion,
        part4_ApplyPoints: tpl.defaultP4Pts ?? prev.part4_ApplyPoints,
        part4_AdvancedPoints: tpl.defaultP4Pts ?? prev.part4_AdvancedPoints,
      }));
    }
  };

  const handleInsertStructurePrompt = (type: 'thcs_18' | 'mcq_only' | 'essay_5') => {
    let snippet = '';
    if (type === 'thcs_18') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS BÁM SÁT MA TRẬN TRÊN (18 CÂU - 29 Ý | TỔNG 10.0 ĐIỂM):
- Phần I (Câu 1 -> 12): Đúng 12 câu trắc nghiệm 4 lựa chọn (8 Biết, 4 Hiểu - mỗi câu 0.25đ = 3.0đ).
- Phần II (Câu 13, 14): Đúng 2 câu lớn Đúng/Sai (Câu 13 gồm 4 ý a,b,c,d; Câu 14 gồm 4 ý a,b,c,d - mỗi câu 1.0đ = 2.0đ).
- Phần III (Câu 15a, 15b, 15c, 15d): Đúng 4 câu trả lời ngắn độc lập (2 Biết, 1 Hiểu, 1 Vận dụng - mỗi câu 0.5đ = 2.0đ).
- Phần IV (Câu 16, 17, 18): Đúng 3 câu tự luận (Câu 16 gồm ý a, b; Câu 17; Câu 18 gồm ý 18.1, 18.2 - Tổng = 3.0đ).
* YÊU CẦU AI: Ra đủ 100% 18 câu hỏi Toán KNTT trên, không gộp và không bỏ sót bất kỳ câu nào!`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 12,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 2,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 4,
        part3_PointsPerQuestion: 0.5,
        part4_Essay: 3,
        part4_ApplyCount: 2,
        part4_ApplyPoints: 1.0,
        part4_AdvancedCount: 1,
        part4_AdvancedPoints: 1.0,
      }));
    } else if (type === 'mcq_only') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS 100% TRẮC NGHIỆM (31 CÂU | TỔNG 10.0 ĐIỂM):
- Phần I: 20 câu trắc nghiệm 4 lựa chọn (Câu 1-20 | 0.25đ/câu = 5.0đ).
- Phần II: 3 câu trắc nghiệm Đúng/Sai (Câu 1-3 | mỗi câu 4 ý a,b,c,d = 3.0đ).
- Phần III: 8 câu trắc nghiệm Trả lời ngắn (Câu 1-8 | 0.25đ/câu = 2.0đ).
* Phần IV: 0 câu Tự luận.`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 20,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 3,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 8,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 0,
      }));
    } else if (type === 'essay_5') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS 100% TỰ LUẬN (5 CÂU | TỔNG 10.0 ĐIỂM):
- Phần I, II, III: 0 câu trắc nghiệm.
- Phần IV (Tự luận): 5 câu (Câu 1-3: Số học / Đại số; Câu 4: Hình học có hình vẽ; Câu 5: Vận dụng thực tế / Nâng cao | mỗi câu 2.0đ = 10.0đ).`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 0,
        part2_MCQTrueFalse: 0,
        part3_MCQShort: 0,
        part4_Essay: 5,
        part4_ApplyCount: 3,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 2,
        part4_AdvancedPoints: 2.0,
      }));
    }

    setCustomMatrixContext((prev) => (prev ? prev.trim() + snippet : snippet.trim()));
    setMatrixInputMode('custom');
  };

  const handleClearMatrix = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCustomMatrixContext('');
    setCustomMatrixImages([]);
    setSelectedTemplateKey('');
  };

  const isCustomMatrixActive =
    matrixInputMode === 'custom' &&
    (Boolean(customMatrixContext.trim()) || customMatrixImages.length > 0);

  // Xử lý tải ảnh / file khung ma trận có sẵn
  const processMatrixFiles = (files: FileList | File[]) => {
    setMatrixInputMode('custom');
    Array.from(files).forEach((file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            setCustomMatrixImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      } else if (
        file.type === 'text/plain' ||
        file.name.endsWith('.txt') ||
        file.name.endsWith('.md') ||
        file.name.endsWith('.csv')
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text) {
            setCustomMatrixContext((prev) => (prev ? prev + '\n\n' + text : text));
          }
        };
        reader.readAsText(file);
      } else {
        console.warn(
          'Vui lòng chọn các file định dạng hình ảnh (PNG, JPG, WEBP) hoặc file văn bản (.txt, .csv) để tải lên.'
        );
      }
    });
  };

  const handleMatrixFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processMatrixFiles(files);
    e.target.value = '';
  };

  const handleMatrixPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          imageFiles.push(blob);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      processMatrixFiles(imageFiles);
    }
  };

  const handleMatrixDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processMatrixFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveMatrixImage = (index: number) => {
    setCustomMatrixImages((prev) => prev.filter((_, i) => i !== index));
  };

  // CÁC MẪU BẢNG ĐẶC TẢ CHI TIẾT MÔN TOÁN THCS - KNTT CHUẨN CÔNG VĂN 7991/BGDĐT (MỤC C)
  const SPEC_TEMPLATES: Record<
    string,
    { label: string; text: string; defaultP1?: number; defaultP2?: number; defaultP3?: number; defaultP4?: number; defaultP3Pts?: number; defaultP4Pts?: number }
  > = {
    spec_toan_thcs_18: {
      label: '📐 Đặc tả Toán THCS KNTT (18 câu/29 ý - Chuẩn 7991)',
      text: `### BẢNG ĐẶC TẢ ĐỀ KIỂM TRA MÔN TOÁN THCS - KNTT (CHUẨN CÔNG VĂN 7991/BGDĐT - 18 CÂU / 29 Ý)
| TT | Chủ đề / Mạch kiến thức | Đơn vị kiến thức (SGK KNTT) | Mức độ nhận thức | Yêu cầu cần đạt (YCCĐ) chi tiết | Số câu & Dạng thức theo 4 phần | Điểm số |
|---|---|---|---|---|---|---|
| 1 | Số & Đại số | Khái niệm, kí hiệu & tính chất cơ bản trong bài học đã chọn | **Nhận biết (NB)** | - Nhận biết được các khái niệm, kí hiệu toán học đúng quy ước SGK Toán KNTT.<br>- Thực hiện được các phép tính đơn giản một bước. | 5 câu Phần I (Câu 1 - 5)<br>2 ý Phần II (Câu 13a, 13b) | 1.75đ |
| 1 | Số & Đại số | Quy tắc biến đổi, tìm thành phần chưa biết | **Thông hiểu (TH)** | - Thực hiện được các phép biến đổi, tính giá trị biểu thức hợp lí.<br>- Giải thích được quy tắc tính toán, dấu hiệu chia hết hoặc lập tỉ số. | 2 câu Phần I (Câu 6, 7)<br>1 ý Phần II (Câu 13c)<br>1 câu Phần III (Câu 15a) | 1.25đ |
| 1 | Số & Đại số | Vận dụng giải bài toán thực tiễn đời sống | **Vận dụng (VD)** | - Vận dụng kiến thức số học / đại số để giải quyết các tình huống mua bán, đo đạc, tính chi phí trong thực tiễn. | 1 ý Phần II (Câu 13d)<br>1 câu Phần III (Câu 15b)<br>2 câu Phần IV (Câu 16: 2 ý a,b; Câu 17) | 2.75đ |
| 2 | Hình học & Đo lường | Hình phẳng trực quan / Hình học phẳng & Hình khối | **Nhận biết & Thông hiểu** | - Nhận biết được đỉnh, cạnh, góc, đường chéo, trục/tâm đối xứng (theo lớp).<br>- Tính được chu vi, diện tích, thể tích hoặc số đo góc cơ bản. | 5 câu Phần I (Câu 8 - 12)<br>3 ý Phần II (Câu 14a, 14b, 14c)<br>2 câu Phần III (Câu 15c, 15d) | 3.00đ |
| 2 | Hình học & Đo lường | Chứng minh hình học & Bài toán đo đạc thực tiễn | **Vận dụng & VDC** | - Vận dụng tính chất hình học chứng minh quan hệ song song, vuông góc, bằng nhau/đồng dạng.<br>- Vận dụng cao: Bài toán thực tế hoặc cực trị hình học / số học. | 1 ý Phần II (Câu 14d)<br>1 câu Phần IV (Câu 18: gồm ý 18.1, 18.2) | 1.25đ |
| **CỘNG** | | | | **Bám sát 100% YCCĐ SGK Toán KNTT theo 4 mức độ: NB 40% - TH 30% - VD 20% - VDC 10%** | **18 câu lớn (29 ý)** | **10.0đ** |`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
    spec_toan6_hk1: {
      label: '📘 Đặc tả Toán 6 KNTT (Số tự nhiên - Số nguyên - Hình phẳng)',
      text: `### BẢNG ĐẶC TẢ ĐỀ KIỂM TRA TOÁN 6 - SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
| TT | Chủ đề (SGK Toán 6 Tập Một) | Đơn vị kiến thức | Mức độ | Yêu cầu cần đạt (YCCĐ) chuẩn SGK Toán 6 KNTT | Số câu & Dạng thức | Điểm số |
|---|---|---|---|---|---|---|
| 1 | Chương I. Tập hợp các số tự nhiên | Tập hợp, thứ tự thực hiện phép tính, lũy thừa với số mũ tự nhiên | **NB & TH** | - Sử dụng đúng kí hiệu $\\in, \\notin$, viết tập hợp bằng dấu chấm phẩy (;).<br>- Thực hiện phép cộng, trừ, nhân, chia, nâng lên lũy thừa và thứ tự thực hiện phép tính. | 4 câu Phần I + 2 ý Phần II + 1 câu Phần III + 1 câu Phần IV | 3.0đ |
| 2 | Chương II. Tính chia hết | Dấu hiệu chia hết 2,3,5,9; Số nguyên tố; ƯCLN, BCNN | **NB, TH & VD** | - Nhận biết số nguyên tố, hợp số; phân tích ra thừa số nguyên tố.<br>- Vận dụng ƯCLN, BCNN giải bài toán chia nhóm, lịch trực thực tế. | 3 câu Phần I + 2 ý Phần II + 1 câu Phần III + 1 câu Phần IV | 3.0đ |
| 3 | Chương III. Số nguyên | Số nguyên âm, cộng trừ nhân chia số nguyên, quy tắc dấu ngoặc | **NB, TH & VDC** | - Biểu diễn số nguyên trên trục số; so sánh, tìm số đối.<br>- Vận dụng tính chất chia hết trong $\\mathbb{Z}$ hoặc tính hợp lí dãy số có quy luật. | 2 câu Phần I + 2 ý Phần II + 1 câu Phần III | 1.75đ |
| 4 | Chương IV. Hình phẳng trực quan | Tam giác đều, hình vuông, lục giác đều, HCN, hình thoi, HBH, hình thang cân | **NB, TH & VD** | - Mô tả cạnh, góc, đường chéo; tính chu vi, diện tích ghép hình thực tiễn (lát gạch, làm hàng rào). | 3 câu Phần I + 2 ý Phần II + 1 câu Phần III + 1 câu Phần IV | 2.25đ |
| **CỘNG** | | | | **100% đúng phạm vi SGK Toán 6 KNTT Tập Một (Không vượt cấp Toán 7)** | **18 câu (29 ý)** | **10.0đ** |`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
    spec_toan7_hk1: {
      label: '📗 Đặc tả Toán 7 KNTT (Số hữu tỉ - Số thực - Tam giác bằng nhau)',
      text: `### BẢNG ĐẶC TẢ ĐỀ KIỂM TRA TOÁN 7 - SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
| TT | Chủ đề (SGK Toán 7 Tập Một) | Đơn vị kiến thức | Mức độ | Yêu cầu cần đạt (YCCĐ) chuẩn SGK Toán 7 KNTT | Số câu & Dạng thức | Điểm số |
|---|---|---|---|---|---|---|
| 1 | Chương I & II. Số hữu tỉ & Số thực | Phép tính $\\mathbb{Q}$, căn bậc hai số học, số vô tỉ, làm tròn số | **NB, TH & VD** | - Nhận biết số hữu tỉ, số vô tỉ, căn bậc hai số học, giá trị tuyệt đối.<br>- Thực hiện phép tính lũy thừa, làm tròn số với độ chính xác cho trước. | 6 câu Phần I + 1 câu Phần II + 2 câu Phần III + 1 câu Phần IV | 4.5đ |
| 2 | Chương III & IV. Góc, đường thẳng // & Tam giác bằng nhau | Góc kề bù, đối đỉnh, Tiên đề Euclid; c.c.c, c.g.c, g.c.g, tam giác cân | **NB, TH & VD** | - Tính số đo góc tạo bởi 1 đường thẳng cắt 2 đường thẳng song song.<br>- Chứng minh hai tam giác bằng nhau, hai đoạn thẳng/góc bằng nhau, tam giác cân. | 4 câu Phần I + 1 câu Phần II + 1 câu Phần III + 2 câu Phần IV | 4.5đ |
| 3 | Chương V. Thu thập và biểu diễn dữ liệu | Biểu đồ hình quạt tròn, biểu đồ đoạn thẳng | **NB & TH** | - Đọc và phân tích số liệu từ biểu đồ quạt tròn, biểu đồ đoạn thẳng. | 2 câu Phần I + 1 câu Phần III | 1.0đ |
| **CỘNG** | | | | **100% đúng phạm vi SGK Toán 7 KNTT Tập Một (Không dùng Thalès/Pythagore)** | **18 câu (29 ý)** | **10.0đ** |`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
    spec_toan8_hk1: {
      label: '📙 Đặc tả Toán 8 KNTT (Đa thức - HĐT - Tứ giác & Thalès)',
      text: `### BẢNG ĐẶC TẢ ĐỀ KIỂM TRA TOÁN 8 - SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
| TT | Chủ đề (SGK Toán 8 Tập Một) | Đơn vị kiến thức | Mức độ | Yêu cầu cần đạt (YCCĐ) chuẩn SGK Toán 8 KNTT | Số câu & Dạng thức | Điểm số |
|---|---|---|---|---|---|---|
| 1 | Chương I & II. Đa thức & Hằng đẳng thức đáng nhớ | Đơn thức, đa thức nhiều biến, 7 HĐT, phân tích đa thức thành nhân tử | **NB, TH, VD & VDC** | - Thu gọn đơn/đa thức; khai triển và áp dụng 7 hằng đẳng thức đáng nhớ.<br>- Phân tích đa thức thành nhân tử và tìm GTLN/GTNN. | 6 câu Phần I + 1 câu Phần II + 2 câu Phần III + 2 câu Phần IV | 5.25đ |
| 2 | Chương III & IV. Tứ giác & Định lí Thalès | Hình thang cân, HBH, HCN, hình thoi, hình vuông; Thalès, đường TB, phân giác | **NB, TH & VD** | - Chứng minh tứ giác đặc biệt; vận dụng định lí Thalès, đường trung bình và phân giác tính độ dài thực tế. | 4 câu Phần I + 1 câu Phần II + 1 câu Phần III + 1 câu Phần IV | 3.75đ |
| 3 | Chương V. Dữ liệu và biểu đồ | Phân loại dữ liệu, lựa chọn và phân tích biểu đồ cột/đoạn thẳng/quạt | **NB & TH** | - Nhận biết dữ liệu hợp lí và phân tích xu hướng từ biểu đồ. | 2 câu Phần I + 1 câu Phần III | 1.0đ |
| **CỘNG** | | | | **100% đúng phạm vi SGK Toán 8 KNTT (Không dùng sin/cos, PT bậc hai)** | **18 câu (29 ý)** | **10.0đ** |`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
    spec_toan9_hk1: {
      label: '📕 Đặc tả Toán 9 KNTT (Hệ PT - Căn thức - Lượng giác & Đường tròn)',
      text: `### BẢNG ĐẶC TẢ ĐỀ KIỂM TRA TOÁN 9 - SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
| TT | Chủ đề (SGK Toán 9 Tập Một) | Đơn vị kiến thức | Mức độ | Yêu cầu cần đạt (YCCĐ) chuẩn SGK Toán 9 KNTT | Số câu & Dạng thức | Điểm số |
|---|---|---|---|---|---|---|
| 1 | Chương I & II. Hệ PT bậc nhất hai ẩn & BPT bậc nhất một ẩn | Giải hệ PT bằng thế/cộng đại số; giải bài toán lập hệ PT; BĐT và BPT | **NB, TH & VD** | - Giải được hệ phương trình bậc nhất hai ẩn và bất phương trình bậc nhất một ẩn.<br>- Lập hệ phương trình giải bài toán năng suất, chuyển động, phần trăm. | 5 câu Phần I + 1 câu Phần II + 2 câu Phần III + 1 câu Phần IV | 4.25đ |
| 2 | Chương III. Căn bậc hai và căn bậc ba | Khai căn bậc hai/ba, trục căn thức ở mẫu, rút gọn biểu thức chứa căn | **NB, TH & VDC** | - Tìm điều kiện xác định của căn thức; rút gọn biểu thức và tìm giá trị nguyên/GTLN/GTNN. | 3 câu Phần I + 1 câu Phần III + 1 câu Phần IV | 2.25đ |
| 3 | Chương IV & V. Tỉ số lượng giác & Đường tròn | $\\sin, \\cos, \\tan, \\cot$, giải tam giác vuông; dây, tiếp tuyến, độ dài cung, quạt tròn | **NB, TH & VD** | - Tính chiều cao, khoảng cách thực tế bằng tỉ số lượng giác.<br>- Chứng minh tiếp tuyến, tính chất hai tiếp tuyến cắt nhau, độ dài cung, diện tích quạt tròn. | 4 câu Phần I + 1 câu Phần II + 1 câu Phần III + 1 câu Phần IV | 3.50đ |
| **CỘNG** | | | | **100% đúng phạm vi SGK Toán 9 KNTT Tập Một (Không đưa kiến thức THPT)** | **18 câu (29 ý)** | **10.0đ** |`,
      defaultP1: 12,
      defaultP2: 2,
      defaultP3: 4,
      defaultP4: 3,
      defaultP3Pts: 0.5,
      defaultP4Pts: 1.0,
    },
  };

  const handleApplySpecTemplate = (key: string) => {
    const tpl = SPEC_TEMPLATES[key];
    if (!tpl) return;
    setCustomSpecContext(tpl.text);
    setMatrixInputMode('spec');
    setSelectedSpecTemplateKey(key);
    if (
      tpl.defaultP1 !== undefined &&
      tpl.defaultP2 !== undefined &&
      tpl.defaultP3 !== undefined &&
      tpl.defaultP4 !== undefined
    ) {
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: tpl.defaultP1!,
        part2_MCQTrueFalse: tpl.defaultP2!,
        part3_MCQShort: tpl.defaultP3!,
        part4_Essay: tpl.defaultP4!,
        part3_PointsPerQuestion: tpl.defaultP3Pts ?? prev.part3_PointsPerQuestion,
        part4_ApplyPoints: tpl.defaultP4Pts ?? prev.part4_ApplyPoints,
        part4_AdvancedPoints: tpl.defaultP4Pts ?? prev.part4_AdvancedPoints,
      }));
    }
  };

  const handleInsertSpecStructurePrompt = (type: 'thcs_18' | 'mcq_only' | 'essay_5') => {
    let snippet = '';
    if (type === 'thcs_18') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS BÁM SÁT BẢNG ĐẶC TẢ TRÊN (18 CÂU - 29 Ý | TỔNG 10.0 ĐIỂM):
- Phần I (Câu 1 -> 12): Đúng 12 câu trắc nghiệm 4 lựa chọn (8 Biết, 4 Hiểu - mỗi câu 0.25đ = 3.0đ).
- Phần II (Câu 13, 14): Đúng 2 câu lớn Đúng/Sai (Câu 13 gồm 4 ý a,b,c,d; Câu 14 gồm 4 ý a,b,c,d - mỗi câu 1.0đ = 2.0đ).
- Phần III (Câu 15a, 15b, 15c, 15d): Đúng 4 câu trả lời ngắn độc lập (2 Biết, 1 Hiểu, 1 Vận dụng - mỗi câu 0.5đ = 2.0đ).
- Phần IV (Câu 16, 17, 18): Đúng 3 câu tự luận (Câu 16 gồm ý a, b; Câu 17; Câu 18 gồm ý 18.1, 18.2 - Tổng = 3.0đ).
* YÊU CẦU AI: Ra đủ 100% 18 câu hỏi Toán KNTT trên khớp với từng Yêu cầu cần đạt (YCCĐ) trong Bảng đặc tả, không gộp và không bỏ sót!`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 12,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 2,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 4,
        part3_PointsPerQuestion: 0.5,
        part4_Essay: 3,
        part4_ApplyCount: 2,
        part4_ApplyPoints: 1.0,
        part4_AdvancedCount: 1,
        part4_AdvancedPoints: 1.0,
      }));
    } else if (type === 'mcq_only') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS 100% TRẮC NGHIỆM BÁM SÁT BẢNG ĐẶC TẢ (31 CÂU | TỔNG 10.0 ĐIỂM):
- Phần I: 20 câu trắc nghiệm 4 lựa chọn (Câu 1-20 | 0.25đ/câu = 5.0đ).
- Phần II: 3 câu trắc nghiệm Đúng/Sai (Câu 1-3 | mỗi câu 4 ý a,b,c,d = 3.0đ).
- Phần III: 8 câu trắc nghiệm Trả lời ngắn (Câu 1-8 | 0.25đ/câu = 2.0đ).
* Phần IV: 0 câu Tự luận.
* YÊU CẦU AI: Mỗi câu hỏi đo lường chính xác 1 Yêu cầu cần đạt trong Bảng đặc tả SGK Toán KNTT.`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 20,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 3,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 8,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 0,
      }));
    } else if (type === 'essay_5') {
      snippet = `\n\n### CẤU TRÚC ĐỀ TOÁN THCS 100% TỰ LUẬN BÁM SÁT BẢNG ĐẶC TẢ (5 CÂU | TỔNG 10.0 ĐIỂM):
- Phần I, II, III: 0 câu trắc nghiệm.
- Phần IV (Tự luận): 5 câu (Câu 1-3: Số học / Đại số; Câu 4: Hình học có hình vẽ; Câu 5: Vận dụng thực tế / Nâng cao | mỗi câu 2.0đ = 10.0đ).`;
      setQuestionCounts((prev) => ({
        ...prev,
        part1_MCQSingle: 0,
        part2_MCQTrueFalse: 0,
        part3_MCQShort: 0,
        part4_Essay: 5,
        part4_ApplyCount: 3,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 2,
        part4_AdvancedPoints: 2.0,
      }));
    }

    setCustomSpecContext((prev) => (prev ? prev.trim() + snippet : snippet.trim()));
    setMatrixInputMode('spec');
  };

  const handleClearSpec = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCustomSpecContext('');
    setCustomSpecImages([]);
    setSelectedSpecTemplateKey('');
  };

  // Xử lý tải ảnh / file bảng đặc tả có sẵn
  const processSpecFiles = (files: FileList | File[]) => {
    setMatrixInputMode('spec');
    Array.from(files).forEach((file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            setCustomSpecImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      } else if (
        file.type === 'text/plain' ||
        file.name.endsWith('.txt') ||
        file.name.endsWith('.md') ||
        file.name.endsWith('.csv')
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text) {
            setCustomSpecContext((prev) => (prev ? prev + '\n\n' + text : text));
          }
        };
        reader.readAsText(file);
      } else {
        console.warn(
          'Vui lòng chọn các file định dạng hình ảnh (PNG, JPG, WEBP) hoặc file văn bản (.txt, .csv) để tải lên.'
        );
      }
    });
  };

  const handleSpecFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processSpecFiles(files);
    e.target.value = '';
  };

  const handleSpecPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          imageFiles.push(blob);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      processSpecFiles(imageFiles);
    }
  };

  const handleSpecDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSpecFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveSpecImage = (index: number) => {
    setCustomSpecImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 2. Chế độ đề (3 lựa chọn)
  const [examMode, setExamMode] = useState<ExamMode>('MCQ_ESSAY');

  // 3. Số lượng câu hỏi & điểm số
  const [questionCounts, setQuestionCounts] = useState<QuestionCounts>({
    part1_MCQSingle: 12,
    part1_PointsPerQuestion: 0.25,
    part2_MCQTrueFalse: 2,
    part2_PointsPerQuestion: 1.0,
    part2_TFStatementsPerQuestion: 4,
    part3_MCQShort: 4,
    part3_PointsPerQuestion: 0.25,
    part4_Essay: 2,
    part4_ApplyCount: 1,
    part4_AdvancedCount: 1,
    part4_AdvancedPoints: 1.0,
  });

  // 4. Tỷ lệ mức độ nhận thức (%)
  const [cognitiveRatio, setCognitiveRatio] = useState<CognitiveRatio>({
    remember: 40,
    understand: 30,
    apply: 20,
    advanced: 10,
  });

  // 5. Số mã đề
  const [codeCount, setCodeCount] = useState(4);
  // 6. Tùy chọn định dạng ma trận xuất ra (Mặc định: 'cv7991' - Công văn 7991/BGDĐT là chính)
  const [matrixOutputFormat, setMatrixOutputFormat] = useState<'cv7991' | 'classic' | 'both'>('cv7991');
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm thay đổi bộ đếm (+)(-) cho Phần 1, 2, 3
  const updateCount = (key: keyof QuestionCounts, delta: number) => {
    setQuestionCounts((prev) => {
      const val = Math.max(0, (prev[key] as number) + delta);
      return { ...prev, [key]: val };
    });
  };

  // Thay đổi số câu Tự luận tổng (Phần IV)
  const updateEssayCount = (delta: number) => {
    setQuestionCounts((prev) => {
      const newEssay = Math.max(0, prev.part4_Essay + delta);
      let apply = prev.part4_ApplyCount ?? Math.ceil(prev.part4_Essay / 2);
      let adv = prev.part4_AdvancedCount ?? Math.floor(prev.part4_Essay / 2);

      if (delta > 0) {
        apply += 1;
      } else if (delta < 0) {
        if (apply + adv > newEssay) {
          if (adv > 0) adv -= 1;
          else if (apply > 0) apply -= 1;
        }
      }

      return {
        ...prev,
        part4_Essay: newEssay,
        part4_ApplyCount: apply,
        part4_AdvancedCount: adv,
      };
    });
  };

  // Thay đổi số câu Vận dụng (VD) hoặc Vận dụng cao (VDC) trong Phần IV
  const updateEssaySubCount = (type: 'apply' | 'adv', delta: number) => {
    setQuestionCounts((prev) => {
      const total = prev.part4_Essay;
      if (total <= 0) return prev;

      const currentApply = prev.part4_ApplyCount ?? Math.ceil(total / 2);
      const currentAdv = prev.part4_AdvancedCount ?? Math.floor(total / 2);

      if (type === 'apply') {
        const newApply = Math.max(0, Math.min(total, currentApply + delta));
        const newAdv = total - newApply;
        return {
          ...prev,
          part4_ApplyCount: newApply,
          part4_AdvancedCount: newAdv,
        };
      } else {
        const newAdv = Math.max(0, Math.min(total, currentAdv + delta));
        const newApply = total - newAdv;
        return {
          ...prev,
          part4_ApplyCount: newApply,
          part4_AdvancedCount: newAdv,
        };
      }
    });
  };

  // Nạp toàn bộ thông số từ ExamMetadata (phiên trước đó hoặc cấu hình đề hiện có)
  const applyMetadata = (meta: ExamMetadata) => {
    if (!meta) return;
    if (meta.schoolName) setSchoolName(meta.schoolName);
    if (meta.departmentName) setDepartmentName(meta.departmentName);
    const normalizedGrade = normalizeKnttGrade(meta.grade);
    setSubject('Toán');
    setGrade(normalizedGrade);
    setCurriculum(KNTT_CURRICULUM_NAME);
    if (meta.className) {
      setClassName(meta.className);
    } else {
      setClassName(`${normalizedGrade.replace('Khối ', '')}A1`);
    }
    if (meta.semester) setSemester(meta.semester);
    if (meta.schoolYear) setSchoolYear(meta.schoolYear);
    if (meta.examTitle) setExamTitle(meta.examTitle);
    setChapterTitle(meta.chapterTitle || getDefaultChapterTitleForGrade(normalizedGrade));
    if (typeof meta.durationMinutes === 'number') setDurationMinutes(meta.durationMinutes);
    if (typeof meta.totalPoints === 'number') setTotalPoints(meta.totalPoints);
    setSubjectConfig({
      mathDomains: meta.subjectConfig?.mathDomains?.length
        ? meta.subjectConfig.mathDomains
        : ['so_dai_so', 'hinh_hoc_do_luong', 'thong_ke_xac_suat'],
      selectedKnttLessonIds: Array.isArray(meta.subjectConfig?.selectedKnttLessonIds)
        ? meta.subjectConfig!.selectedKnttLessonIds
        : [],
      prioritizeGeoGebraDiagrams: meta.subjectConfig?.prioritizeGeoGebraDiagrams ?? true,
      strictKnttTextbookOnly: true,
      hasContextData: meta.subjectConfig?.hasContextData ?? true,
    });
    if (meta.referenceContext !== undefined) setReferenceContext(meta.referenceContext || '');
    if (Array.isArray(meta.referenceImages)) setReferenceImages(meta.referenceImages);
    
    const targetMode = meta.examMode || 'MCQ_ESSAY';
    setExamMode(targetMode);

    // Xử lý và làm sạch cấu hình ma trận / bảng đặc tả nếu không có nội dung thực tế
    const hasValidMatrix = Boolean(
      (meta.customMatrixContext && meta.customMatrixContext.trim().length >= 20) ||
      (Array.isArray(meta.customMatrixImages) && meta.customMatrixImages.length > 0)
    );
    const hasValidSpec = Boolean(
      (meta.customSpecContext && meta.customSpecContext.trim().length >= 20) ||
      (Array.isArray(meta.customSpecImages) && meta.customSpecImages.length > 0)
    );

    let resolvedMode: MatrixInputMode = meta.matrixInputMode || 'auto';
    if (resolvedMode === 'custom' && !hasValidMatrix) {
      resolvedMode = 'auto';
    } else if (resolvedMode === 'spec' && !hasValidSpec) {
      resolvedMode = 'auto';
    }
    setMatrixInputMode(resolvedMode);

    setCustomMatrixContext(meta.customMatrixContext || '');
    setCustomMatrixImages(Array.isArray(meta.customMatrixImages) ? meta.customMatrixImages : []);
    setCustomSpecContext(meta.customSpecContext || '');
    setCustomSpecImages(Array.isArray(meta.customSpecImages) ? meta.customSpecImages : []);

    // Khắc phục triệt để lỗi "mỗi phần chỉ có 1 câu hỏi khi tạo theo cấu hình trước":
    // Kiểm tra và tự động khôi phục cấu hình câu hỏi chuẩn nếu cấu hình lưu bị lỗi (mỗi phần chỉ có 1 câu hoặc tổng số câu <= 4)
    if (meta.questionCounts) {
      let qc = { ...meta.questionCounts };
      const totalQ =
        (qc.part1_MCQSingle || 0) +
        (qc.part2_MCQTrueFalse || 0) +
        (qc.part3_MCQShort || 0) +
        (qc.part4_Essay || 0);

      // Nếu là chế độ trắc nghiệm + tự luận mà tổng câu <= 4 hoặc cả Phần 1 và Phần 2 đều <= 1 câu
      if (
        targetMode === 'MCQ_ESSAY' &&
        (totalQ <= 4 || (qc.part1_MCQSingle <= 1 && qc.part2_MCQTrueFalse <= 1))
      ) {
        qc = {
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
        };
      } else if (targetMode === 'MCQ_ONLY' && totalQ <= 4) {
        qc = {
          part1_MCQSingle: 20,
          part1_PointsPerQuestion: 0.25,
          part2_MCQTrueFalse: 3,
          part2_PointsPerQuestion: 1.0,
          part2_TFStatementsPerQuestion: 4,
          part3_MCQShort: 8,
          part3_PointsPerQuestion: 0.25,
          part4_Essay: 0,
          part4_ApplyCount: 0,
          part4_ApplyPoints: 0,
          part4_AdvancedCount: 0,
          part4_AdvancedPoints: 0,
        };
      } else if (targetMode === 'ESSAY_ONLY' && (qc.part4_Essay || 0) <= 1) {
        qc = {
          part1_MCQSingle: 0,
          part1_PointsPerQuestion: 0.25,
          part2_MCQTrueFalse: 0,
          part2_PointsPerQuestion: 1.0,
          part2_TFStatementsPerQuestion: 4,
          part3_MCQShort: 0,
          part3_PointsPerQuestion: 0.25,
          part4_Essay: 5,
          part4_ApplyCount: 3,
          part4_ApplyPoints: 2.0,
          part4_AdvancedCount: 2,
          part4_AdvancedPoints: 2.0,
        };
      }
      setQuestionCounts(qc);
    }

    if (meta.cognitiveRatio) setCognitiveRatio(meta.cognitiveRatio);
    if (typeof meta.codeCount === 'number') setCodeCount(meta.codeCount);
    if (meta.matrixOutputFormat) setMatrixOutputFormat(meta.matrixOutputFormat);
  };

  useEffect(() => {
    if (initialMetadata) {
      applyMetadata(initialMetadata);
      setRestoredToast(`Đã nạp toàn bộ cấu hình từ đề: ${initialMetadata.examTitle} (${initialMetadata.subject})`);
      const timer = setTimeout(() => setRestoredToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [initialMetadata]);

  // Lấy cấu hình phiên trước đó (từ bản nháp hoặc từ đề thi gần nhất)
  const getPreviousSessionMetadata = (): ExamMetadata | null => {
    if (lastSavedSession) return lastSavedSession;
    const stored = StorageEngine.getLastGeneratorState();
    if (stored) return stored;
    const history = StorageEngine.getExamHistory();
    if (history && history.length > 0 && history[0].metadata) {
      return history[0].metadata;
    }
    return null;
  };

  // 1. Tạo đề mới hoàn toàn: Thiết lập lại toàn bộ thông số về mặc định chuẩn
  const handleResetToNewExam = () => {
    // Lưu tạm cấu hình hiện tại trước khi reset để có thể khôi phục lại nếu muốn
    handleSaveCurrentSessionDraft(false);

    setSchoolName(settings.defaultSchoolName || 'Trường THCS Bình San');
    setDepartmentName(settings.defaultDepartmentName || 'Sở Giáo dục và Đào tạo');
    setSubject('Toán');
    setGrade('Khối 6');
    setClassName('6A1');
    setSemester('Học kỳ I');
    setSchoolYear('2026 - 2027');
    setExamTitle('Kiểm tra Giữa học kỳ I');
    setChapterTitle('Chương I. Tập hợp các số tự nhiên');
    setDurationMinutes(45);
    setTotalPoints(10);
    setCurriculum(KNTT_CURRICULUM_NAME);
    setSubjectConfig({
      mathDomains: ['so_dai_so', 'hinh_hoc_do_luong', 'thong_ke_xac_suat'],
      selectedKnttLessonIds: [],
      prioritizeGeoGebraDiagrams: true,
      strictKnttTextbookOnly: true,
      hasContextData: true,
    });
    setReferenceContext('');
    setReferenceImages([]);
    setMatrixInputMode('auto');
    setCustomMatrixContext('');
    setCustomMatrixImages([]);
    setSelectedTemplateKey('');
    setCustomSpecContext('');
    setCustomSpecImages([]);
    setSelectedSpecTemplateKey('');
    setExamMode('MCQ_ESSAY');
    setQuestionCounts({
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
    });
    setCognitiveRatio({
      remember: 40,
      understand: 30,
      apply: 20,
      advanced: 10,
    });
    setCodeCount(4);
    setMatrixOutputFormat('cv7991');
    setErrorMsg('');
    setRestoredToast('Đã làm mới thông số — Sẵn sàng soạn đề mới hoàn toàn!');
    const timer = setTimeout(() => setRestoredToast(null), 3500);
  };

  // 2. Tạo đề theo cấu hình trước đó: Nạp lại toàn bộ thông số từ phiên trước hoặc đề gần nhất
  const handleLoadPreviousConfig = () => {
    const prev = getPreviousSessionMetadata();
    if (prev) {
      applyMetadata(prev);
      setLastSavedSession(prev);
      setRestoredToast(
        `Đã nạp lại cấu hình trước đó: ${prev.examTitle || 'Đề kiểm tra'} • Môn ${prev.subject} (${prev.grade})`
      );
      const timer = setTimeout(() => setRestoredToast(null), 3500);
    } else {
      setRestoredToast('Chưa có cấu hình phiên trước nào được lưu trong hệ thống.');
      const timer = setTimeout(() => setRestoredToast(null), 3000);
    }
  };

  // 3. Lưu nháp thông số hiện tại
  const handleSaveCurrentSessionDraft = (showToast = true) => {
    const hasValidMatrix = Boolean(
      (customMatrixContext && customMatrixContext.trim().length >= 20) ||
      (customMatrixImages && customMatrixImages.length > 0)
    );
    const hasValidSpec = Boolean(
      (customSpecContext && customSpecContext.trim().length >= 20) ||
      (customSpecImages && customSpecImages.length > 0)
    );

    let resolvedMatrixInputMode: MatrixInputMode = matrixInputMode;
    if (resolvedMatrixInputMode === 'custom' && !hasValidMatrix) {
      resolvedMatrixInputMode = 'auto';
    } else if (resolvedMatrixInputMode === 'spec' && !hasValidSpec) {
      resolvedMatrixInputMode = 'auto';
    }

    const currentMeta: ExamMetadata = {
      schoolName,
      departmentName,
      subject,
      grade,
      className,
      semester,
      schoolYear,
      examTitle,
      chapterTitle,
      durationMinutes,
      totalPoints,
      curriculum,
      examMode,
      questionCounts,
      cognitiveRatio,
      codeCount,
      subjectConfig,
      referenceContext,
      referenceImages,
      matrixInputMode: resolvedMatrixInputMode,
      customMatrixContext: hasValidMatrix ? customMatrixContext.trim() : undefined,
      customMatrixImages: customMatrixImages.length > 0 ? customMatrixImages : undefined,
      customSpecContext: hasValidSpec ? customSpecContext.trim() : undefined,
      customSpecImages: customSpecImages.length > 0 ? customSpecImages : undefined,
      matrixOutputFormat,
    };
    StorageEngine.saveLastGeneratorState(currentMeta);
    setLastSavedSession(currentMeta);
    if (showToast) {
      setRestoredToast('Đã lưu cấu hình hiện tại vào bộ nhớ!');
      const timer = setTimeout(() => setRestoredToast(null), 3000);
    }
  };

  // Tính toán tổng điểm hiện tại
  const currentScores = calculateExamScores(questionCounts);

  // Tự động cân bằng tổng điểm các phần về tròn 10.0 điểm
  const handleAutoBalance = () => {
    setQuestionCounts((prev) => {
      const p1Count = prev.part1_MCQSingle || 0;
      const p2Count = prev.part2_MCQTrueFalse || 0;
      const p3Count = prev.part3_MCQShort || 0;
      const p4Count = prev.part4_Essay || 0;

      const p1Pts = 0.25;
      const p2Pts = 1.0;
      const p3Pts = 0.25;

      const mcqScore = p1Count * p1Pts + p2Count * p2Pts + p3Count * p3Pts;

      if (p4Count > 0) {
        let remainingP4 = 10.0 - mcqScore;
        if (remainingP4 < 0) remainingP4 = 2.0;

        let applyCount = prev.part4_ApplyCount ?? Math.ceil(p4Count / 2);
        let advCount = p4Count - applyCount;
        if (applyCount < 0 || advCount < 0) {
          advCount = Math.floor(p4Count / 2);
          applyCount = p4Count - advCount;
        }

        let advPts = prev.part4_AdvancedPoints ?? 1.0;
        if (advCount * advPts >= remainingP4 && advCount > 0) {
          advPts = 1.0;
        }

        return {
          ...prev,
          part1_PointsPerQuestion: p1Pts,
          part2_PointsPerQuestion: p2Pts,
          part3_PointsPerQuestion: p3Pts,
          part4_ApplyCount: applyCount,
          part4_AdvancedCount: advCount,
          part4_AdvancedPoints: advPts,
        };
      } else {
        return {
          ...prev,
          part1_PointsPerQuestion: 0.25,
          part2_PointsPerQuestion: 1.0,
          part3_PointsPerQuestion: 0.25,
        };
      }
    });
  };

  // Hàm cập nhật tỷ lệ %
  const updateRatio = (key: keyof CognitiveRatio, val: number) => {
    const newVal = Math.max(0, Math.min(100, val));
    setCognitiveRatio((prev) => ({ ...prev, [key]: newVal }));
  };

  const totalPercentage =
    cognitiveRatio.remember +
    cognitiveRatio.understand +
    cognitiveRatio.apply +
    cognitiveRatio.advanced;

  const handleModeChange = (mode: ExamMode) => {
    setExamMode(mode);
    if (mode === 'MCQ_ESSAY') {
      setQuestionCounts({
        part1_MCQSingle: 12,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 2,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 4,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 2,
        part4_ApplyCount: 1,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 1,
        part4_AdvancedPoints: 2.0,
      });
    } else if (mode === 'MCQ_ONLY') {
      setQuestionCounts({
        part1_MCQSingle: 20,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 3,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 8,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 0,
        part4_ApplyCount: 0,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 0,
        part4_AdvancedPoints: 2.0,
      });
    } else if (mode === 'ESSAY_ONLY') {
      setQuestionCounts({
        part1_MCQSingle: 0,
        part1_PointsPerQuestion: 0.25,
        part2_MCQTrueFalse: 0,
        part2_PointsPerQuestion: 1.0,
        part3_MCQShort: 0,
        part3_PointsPerQuestion: 0.25,
        part4_Essay: 5,
        part4_ApplyCount: 3,
        part4_ApplyPoints: 2.0,
        part4_AdvancedCount: 2,
        part4_AdvancedPoints: 2.0,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedGrade = normalizeKnttGrade(grade);

    if (!settings.customApiKey || !settings.customApiKey.trim()) {
      setPendingMetadata({
        schoolName,
        departmentName,
        subject: 'Toán',
        grade: normalizedGrade,
        className,
        semester,
        schoolYear,
        examTitle,
        chapterTitle,
        durationMinutes,
        totalPoints,
        curriculum: KNTT_CURRICULUM_NAME,
        examMode,
        questionCounts,
        cognitiveRatio,
        codeCount,
        subjectConfig: { ...subjectConfig, strictKnttTextbookOnly: true },
        referenceContext,
        referenceImages,
        matrixInputMode,
        customMatrixContext: customMatrixContext.trim() || undefined,
        customMatrixImages: customMatrixImages.length > 0 ? customMatrixImages : undefined,
        customSpecContext: customSpecContext.trim() || undefined,
        customSpecImages: customSpecImages.length > 0 ? customSpecImages : undefined,
        matrixOutputFormat,
      });
      setShowApiKeyModal(true);
      return;
    }

    const hasCustomSpec = Boolean(
      (customSpecContext && customSpecContext.trim().length >= 20) ||
      (customSpecImages && customSpecImages.length > 0)
    );

    const hasCustomMatrix = Boolean(
      (customMatrixContext && customMatrixContext.trim().length >= 20) ||
      (customMatrixImages && customMatrixImages.length > 0)
    );

    const hasCustomMatrixOrSpec = hasCustomMatrix || hasCustomSpec;

    let resolvedMatrixInputMode: MatrixInputMode = matrixInputMode;
    if (resolvedMatrixInputMode === 'custom' && !hasCustomMatrix) {
      resolvedMatrixInputMode = 'auto';
    } else if (resolvedMatrixInputMode === 'spec' && !hasCustomSpec) {
      resolvedMatrixInputMode = 'auto';
    }

    if (!hasCustomMatrixOrSpec) {
      if (totalPercentage !== 100) {
        setErrorMsg('Tổng tỷ lệ mức độ nhận thức phải bằng đúng 100% (Hiện tại: ' + totalPercentage + '%).');
        return;
      }

      const totalQuestionsSum =
        questionCounts.part1_MCQSingle +
        questionCounts.part2_MCQTrueFalse +
        questionCounts.part3_MCQShort +
        questionCounts.part4_Essay;

      if (totalQuestionsSum <= 0) {
        setErrorMsg('Tổng số câu hỏi phải lớn hơn 0.');
        return;
      }

      if (Math.abs(currentScores.totalScore - 10.0) > 0.01) {
        setErrorMsg(
          `Tổng điểm các phần hiện tại là ${currentScores.totalScore} điểm. Yêu cầu cấu hình các phần sao cho tổng điểm phải đúng 10.0 điểm! (Vui lòng bấm nút "Tự động cân bằng 10 điểm" để tự điều chỉnh).`
        );
        return;
      }
    }

    const metadata: ExamMetadata = {
      schoolName,
      departmentName,
      subject: 'Toán',
      grade: normalizedGrade,
      className,
      semester,
      schoolYear,
      examTitle,
      chapterTitle,
      durationMinutes,
      totalPoints,
      curriculum: KNTT_CURRICULUM_NAME,
      examMode,
      questionCounts,
      cognitiveRatio,
      codeCount,
      subjectConfig: { ...subjectConfig, strictKnttTextbookOnly: true },
      referenceContext,
      referenceImages,
      matrixInputMode: resolvedMatrixInputMode,
      customMatrixContext: hasCustomMatrix ? customMatrixContext.trim() : undefined,
      customMatrixImages: customMatrixImages.length > 0 ? customMatrixImages : undefined,
      customSpecContext: hasCustomSpec ? customSpecContext.trim() : undefined,
      customSpecImages: customSpecImages.length > 0 ? customSpecImages : undefined,
      matrixOutputFormat,
    };

    // Tự động lưu cấu hình phiên ra đề này để người dùng có thể nạp lại bất cứ lúc nào
    StorageEngine.saveLastGeneratorState(metadata);
    setLastSavedSession(metadata);

    try {
      setPendingMetadata(metadata);
      await onGenerate(metadata);
    } catch (err: any) {
      const msg = String(err?.message || err);
      if (msg.includes('[NO_API_KEY]') || msg.includes('Chưa cấu hình') || msg.includes('[INVALID_API_KEY]')) {
        setShowApiKeyModal(true);
      } else if (msg.includes('[QUOTA_EXHAUSTED]') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429') || msg.includes('Quota exceeded')) {
        setShowQuotaModal(true);
      } else {
        setErrorMsg(msg || 'Đã xảy ra lỗi khi tạo đề kiểm tra.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Khởi Tạo Đề Kiểm Tra (7991)
            </h1>
            <p className="text-teal-100/80 text-sm mt-1 max-w-2xl">
              Hệ thống AI tự động sinh Ma trận đề, Bảng đặc tả, Đề thi, Đáp án chi tiết và Rubric chấm bài.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetToNewExam}
              className="px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700/80 text-teal-100 hover:text-white font-semibold text-xs rounded-xl border border-teal-500/40 shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Làm mới form về mặc định ban đầu để bắt đầu soạn đề mới hoàn toàn"
            >
              <Plus className="w-3.5 h-3.5 text-teal-300" />
              <span>Tạo đề mới hoàn toàn</span>
            </button>

            <button
              type="button"
              onClick={handleLoadPreviousConfig}
              className={`px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700/80 text-teal-100 hover:text-white font-semibold text-xs rounded-xl border border-teal-500/40 shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer ${
                !getPreviousSessionMetadata() ? 'opacity-70' : ''
              }`}
              title={
                getPreviousSessionMetadata()
                  ? `Nạp lại cấu hình: ${getPreviousSessionMetadata()?.examTitle || 'Đề kiểm tra'} - Môn ${getPreviousSessionMetadata()?.subject} (${getPreviousSessionMetadata()?.grade})`
                  : 'Nạp lại cấu hình phiên tạo đề trước đó'
              }
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Tạo theo cấu hình trước</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveCurrentSessionDraft(true)}
              className="px-3.5 py-2 bg-teal-800/80 hover:bg-teal-700/80 text-teal-100 hover:text-white font-semibold text-xs rounded-xl border border-teal-500/40 shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Lưu các thông số hiện tại trên form để có thể nạp lại sau"
            >
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lưu nháp thông số</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast thông báo nhanh (Khôi phục / Lưu nháp / Làm mới) */}
      {restoredToast && (
        <div className="p-3.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center justify-between shadow-lg animate-fade-in border border-emerald-400/40">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-100" />
            <span>{restoredToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setRestoredToast(null)}
            className="p-1 hover:bg-white/20 rounded-lg cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {!settings.customApiKey && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-700 rounded-2xl text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="font-medium">
              <span className="font-bold">⚠️ Chưa cấu hình API Key:</span> Ứng dụng yêu cầu bắt buộc nhập Gemini API Key cá nhân để khởi tạo đề thi với AI.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowApiKeyModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>Nhập API Key Ngay</span>
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 flex items-start space-x-3 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Thông tin chung */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1. Thông Tin Hành Chính & Môn Học
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên Cơ quan chủ quản
              </label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="VD: Sở Giáo dục và Đào tạo Hà Nội"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên Trường
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="VD: THCS Bình San"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Môn Học (Chuyên biệt)
              </label>
              <div className="w-full px-3 py-2 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 text-sm font-bold flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Calculator className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Toán học (THCS)</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-teal-600 text-white">
                  KNTT
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Khối Lớp (SGK Toán KNTT 6–9)
              </label>
              <select
                value={grade}
                onChange={(e) => {
                  const newGrade = normalizeKnttGrade(e.target.value);
                  setGrade(newGrade);
                  setClassName(`${newGrade.replace('Khối ', '')}A1`);
                  setChapterTitle(getDefaultChapterTitleForGrade(newGrade));
                  setSubjectConfig((prev) => ({
                    ...prev,
                    selectedKnttLessonIds: [],
                  }));
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none font-medium"
              >
                {KNTT_GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g} (Toán KNTT Tập 1 &amp; 2)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nguồn Sách Giáo Khoa Duy Nhất
              </label>
              <div className="w-full px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-sm font-bold truncate" title="Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam) • Xem SGK qua Google Drive">
                Kết nối tri thức với cuộc sống (Google Drive)
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên Bài Kiểm Tra
              </label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="VD: Kiểm tra Giữa học kỳ I"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên Bài / Tên Chương / Mạch Nội Dung Kiến Thức SGK KNTT (Hoặc tích chọn nhanh các bài học ở khung SGK bên dưới)
              </label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="VD: Chương I. Tập hợp các số tự nhiên"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                required
              />
            </div>

            {/* KHO NGUỒN SGK TOÁN KNTT & XEM SGK QUA GOOGLE DRIVE */}
            <div className="md:col-span-2 lg:col-span-3 bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2 text-teal-900 dark:text-teal-200 font-bold text-xs uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>
                    Kho SGK Toán {grade.replace('Khối ', '')} — Kết nối tri thức với cuộc sống (Xem SGK qua Google Drive)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenDriveLinksModal()}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 flex items-center space-x-1 transition-colors cursor-pointer"
                    title="Gắn hoặc cập nhật đường dẫn Google Drive cho 8 cuốn SGK Toán 6–9"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Gắn link Google Drive</span>
                  </button>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                    Không dùng bộ sách khác
                  </span>
                </div>
              </div>

              {/* 2 cuốn SGK Google Drive của khối đang chọn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getKnttTextbooksByGrade(grade).map((vol) => {
                  const resolved = resolveKnttTextbookDriveUrls(
                    vol.id,
                    settings.knttDriveLinks,
                    vol.pdfUrl
                  );
                  return (
                    <div
                      key={vol.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200/80 dark:border-teal-800/60 shadow-2xs"
                    >
                      <div className="flex items-start space-x-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-teal-600/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                            {vol.title}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span>
                              {vol.semester} • {vol.pageCount} trang
                            </span>
                            {resolved.isConfigured ? (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                                Đã gắn Google Drive
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                                Chưa gắn link Drive
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (resolved.isConfigured) {
                            setPreviewPdf({
                              volumeId: vol.id,
                              title: vol.title,
                              previewUrl: resolved.previewUrl,
                              viewUrl: resolved.viewUrl,
                              fileName: vol.fileName,
                              pageCount: vol.pageCount,
                            });
                          } else {
                            handleOpenDriveLinksModal(vol.id);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 shrink-0 cursor-pointer transition-colors ${
                          resolved.isConfigured
                            ? 'bg-teal-600 hover:bg-teal-700 text-white'
                            : 'bg-amber-500 hover:bg-amber-600 text-white'
                        }`}
                      >
                        {resolved.isConfigured ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Xem SGK</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Gắn Drive</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Chọn bài học trực tiếp từ mục lục SGK KNTT */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Chọn Bài Học Cụ Thể Từ SGK Toán {grade.replace('Khối ', '')} KNTT
                    {(subjectConfig.selectedKnttLessonIds?.length || 0) > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-md bg-teal-600 text-white text-[11px] font-bold">
                        Đã chọn {subjectConfig.selectedKnttLessonIds?.length} bài
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAllSemestersInPicker((prev) => !prev)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-teal-500 cursor-pointer"
                    >
                      {showAllSemestersInPicker ? `Chỉ hiện ${semester}` : 'Hiện cả 2 tập (HK1 & HK2)'}
                    </button>
                    {(subjectConfig.selectedKnttLessonIds?.length || 0) > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSubjectConfig((prev) => ({ ...prev, selectedKnttLessonIds: [] }));
                          setChapterTitle(getDefaultChapterTitleForGrade(grade));
                        }}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 cursor-pointer"
                      >
                        Bỏ chọn bài
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto pr-1 space-y-2.5">
                  {getKnttChaptersByGrade(grade, showAllSemestersInPicker ? 'Cả năm' : semester).map((ch) => (
                    <div
                      key={ch.id}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                        <span className="text-xs font-extrabold text-teal-800 dark:text-teal-300">
                          {ch.title}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                          {ch.volumeLabel} ({ch.semester})
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {ch.lessons.map((lesson) => {
                          const currentIds = subjectConfig.selectedKnttLessonIds || [];
                          const isChecked = currentIds.includes(lesson.id);
                          return (
                            <label
                              key={lesson.id}
                              title={lesson.yccd}
                              className={`flex items-start space-x-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-100 font-semibold'
                                  : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const nextIds = e.target.checked
                                    ? [...currentIds, lesson.id]
                                    : currentIds.filter((id) => id !== lesson.id);
                                  setSubjectConfig((prev) => ({
                                    ...prev,
                                    selectedKnttLessonIds: nextIds,
                                  }));
                                  if (nextIds.length > 0) {
                                    const titles = nextIds
                                      .map((id) => getKnttLessonById(id))
                                      .filter(Boolean)
                                      .map((found) => `${found!.lesson.lessonNumber}. ${found!.lesson.title}`);
                                    if (titles.length > 0) {
                                      setChapterTitle(titles.join(', '));
                                    }
                                  } else {
                                    setChapterTitle(getDefaultChapterTitleForGrade(grade));
                                  }
                                }}
                                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 shrink-0"
                              />
                              <div className="min-w-0 leading-snug">
                                <div className="text-[11px]">
                                  <span className="font-bold">{lesson.lessonNumber}:</span> {lesson.title}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                  {lesson.domain}
                                  {lesson.hasGeometryOrGraph ? ' • Có hình vẽ' : ''}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mạch kiến thức & Tùy chọn GeoGebra / Bài toán thực tiễn */}
              <div className="pt-2 border-t border-teal-200/80 dark:border-teal-800/60 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Mạch kiến thức Toán GDPT 2018 tham gia trong đề:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'so_dai_so', label: 'Số và Đại số' },
                      { id: 'hinh_hoc_do_luong', label: 'Hình học và Đo lường' },
                      { id: 'thong_ke_xac_suat', label: 'Thống kê và Xác suất' },
                    ].map((domain) => {
                      const activeDomains = subjectConfig.mathDomains || [];
                      const checked = activeDomains.includes(domain.id as any);
                      return (
                        <label
                          key={domain.id}
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                            checked
                              ? 'bg-teal-600/10 border-teal-500 text-teal-900 dark:text-teal-200 font-semibold'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...activeDomains, domain.id as any]
                                : activeDomains.filter((d) => d !== domain.id);
                              setSubjectConfig((prev) => ({
                                ...prev,
                                mathDomains: next.length > 0 ? next : ['so_dai_so'],
                              }));
                            }}
                            className="rounded text-teal-600 focus:ring-teal-500"
                          />
                          <span>{domain.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col justify-end space-y-1.5">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={subjectConfig.prioritizeGeoGebraDiagrams ?? true}
                      onChange={(e) =>
                        setSubjectConfig((prev) => ({
                          ...prev,
                          prioritizeGeoGebraDiagrams: e.target.checked,
                        }))
                      }
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Tự động sinh hình vẽ trực quan (SVG/GeoGebra) cho câu Hình học</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={subjectConfig.hasContextData ?? true}
                      onChange={(e) =>
                        setSubjectConfig((prev) => ({
                          ...prev,
                          hasContextData: e.target.checked,
                        }))
                      }
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>Ưu tiên bài toán thực tiễn gắn với đời sống theo tinh thần SGK KNTT</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Khối bổ sung Nguồn Tài Liệu Tham Khảo & Giới Hạn Kiến Thức */}
            <div
              onPaste={handlePaste}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="md:col-span-2 lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-teal-200 dark:border-teal-900/50 space-y-3 transition-colors hover:border-teal-400 dark:hover:border-teal-700"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    Nguồn Tài Liệu Tham Khảo & Giới Hạn Kiến Thức (Tùy Chọn)
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/70 text-teal-800 dark:text-teal-200 font-semibold">
                    Đảm bảo AI không sinh lệch bài
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRefHelp(!showRefHelp)}
                  className="text-slate-500 hover:text-teal-600 text-xs flex items-center space-x-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showRefHelp ? 'Ẩn hướng dẫn' : 'Hướng dẫn sử dụng'}</span>
                </button>
              </div>

              {showRefHelp && (
                <div className="text-xs text-slate-600 dark:text-slate-300 bg-teal-50/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1.5 leading-relaxed">
                  <p className="font-bold text-teal-800 dark:text-teal-300">💡 Tại sao nên bổ sung nguồn tài liệu / giới hạn kiến thức?</p>
                  <p>• <b>Ví dụ điển hình:</b> Với đề Toán 8 (Chương 1 sách Kết nối tri thức) nội dung chỉ bao gồm <i>Đơn thức & Đa thức</i> và <b>chưa học Hằng đẳng thức</b> (Hằng đẳng thức thuộc Chương 2). Nếu chỉ chọn "Chương 1" mà không giới hạn, AI có thể tự ý đưa bài toán Hằng đẳng thức vào đề.</p>
                  <p>• <b>Giải pháp:</b> Bạn có thể ghi rõ giới hạn vào ô văn bản bên dưới (ví dụ: <i>"Chỉ kiểm tra đơn thức, đa thức. KHÔNG BAO GỒM hằng đẳng thức"</i>) hoặc bấm <b>"Tải ảnh/Tài liệu lên"</b> hoặc <b>chụp màn hình rồi nhấn Ctrl+V</b> để dán ảnh trực tiếp vào đây. AI sẽ đọc và tuân thủ 100% giới hạn này.</p>
                </div>
              )}

              <div>
                <textarea
                  rows={3}
                  value={referenceContext}
                  onChange={(e) => setReferenceContext(e.target.value)}
                  placeholder="Nhập hoặc dán nội dung bài học, yêu cầu cần đạt hoặc ghi chú giới hạn (có thể chụp màn hình và nhấn Ctrl+V để dán ảnh trực tiếp vào đây)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* Tải ảnh / tài liệu đính kèm */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-teal-600" />
                      <span>Đính kèm ảnh trang SGK / Ảnh mục lục / Bảng YCCĐ:</span>
                    </label>
                    <span className="text-[11px] font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800/60">
                      💡 Chụp màn hình &amp; nhấn <b>Ctrl+V</b> để dán trực tiếp
                    </span>
                  </div>

                  <label className="cursor-pointer inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95">
                    <UploadCloud className="w-4 h-4" />
                    <span>Tải ảnh tài liệu/SGK lên</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Danh sách hình ảnh đã tải lên */}
                {referenceImages.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                        <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                        <span>Đã tải lên {referenceImages.length} ảnh tài liệu đính kèm:</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setReferenceImages([]);
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa tất cả</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {referenceImages.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 aspect-square shadow-xs"
                        >
                          <img
                            src={imgSrc}
                            alt={`Tài liệu ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md transition-transform hover:scale-110 cursor-pointer"
                              title="Xóa ảnh này"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Thời Gian Làm Bài (phút)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={15}
                  max={180}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none font-bold"
                  required
                />
                <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Thang Điểm Tổng
              </label>
              <input
                type="number"
                value={totalPoints}
                onChange={(e) => setTotalPoints(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Học Kỳ / Năm Học
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="Học kỳ I">Học kỳ I</option>
                  <option value="Học kỳ II">Học kỳ II</option>
                  <option value="Cả năm">Cả năm</option>
                </select>
                <input
                  type="text"
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  placeholder="2026-2027"
                  className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Khung Ma Trận & Bảng Đặc Tả Bộ Môn Có Sẵn */}
        <div
          className={`rounded-2xl p-6 shadow-xs border transition-all space-y-4 ${
            customSpecContext.trim() || customSpecImages.length > 0 || matrixInputMode === 'spec'
              ? 'bg-indigo-50/50 dark:bg-indigo-950/25 border-indigo-300 dark:border-indigo-800 ring-1 ring-indigo-500/25'
              : customMatrixContext.trim() || customMatrixImages.length > 0 || matrixInputMode === 'custom'
              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2.5">
              <Table className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    2. Ra Đề Dựa Trên Ma Trận &amp; Bảng Đặc Tả Có Sẵn (Tùy Chọn)
                  </h3>
                  {(customSpecContext.trim() || customSpecImages.length > 0) ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 flex items-center space-x-1 animate-fade-in shadow-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>🎯 Đã nạp Bảng đặc tả chi tiết ({customSpecContext.trim() ? 'Văn bản' : ''}{customSpecContext.trim() && customSpecImages.length ? ' + ' : ''}{customSpecImages.length ? `${customSpecImages.length} ảnh chụp` : ''}) - Chuẩn YCCĐ</span>
                    </span>
                  ) : (customMatrixContext.trim() || customMatrixImages.length > 0) ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 flex items-center space-x-1 animate-fade-in">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Đã nạp Ma trận ({customMatrixContext.trim() ? 'Văn bản' : ''}{customMatrixContext.trim() && customMatrixImages.length ? ' + ' : ''}{customMatrixImages.length ? `${customMatrixImages.length} ảnh chụp` : ''})</span>
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Khi tổ chuyên môn đã có Ma trận hoặc Bảng đặc tả chi tiết (chuẩn YCCĐ) được duyệt, nạp vào đây để AI sinh đề bám sát tuyệt đối từng câu hỏi và mức độ.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  if (matrixInputMode === 'spec') {
                    setShowSpecHelp(!showSpecHelp);
                  } else {
                    setShowMatrixHelp(!showMatrixHelp);
                  }
                }}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-medium flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>
                  {matrixInputMode === 'spec'
                    ? showSpecHelp
                      ? 'Ẩn hướng dẫn Bảng đặc tả'
                      : 'Cách nhập Bảng đặc tả'
                    : showMatrixHelp
                    ? 'Ẩn hướng dẫn Ma trận'
                    : 'Cách nhập ma trận'}
                </span>
              </button>
            </div>
          </div>

          {/* Lựa chọn 3 chế độ: A, B, C */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Chế độ A */}
            <button
              type="button"
              onClick={() => {
                setMatrixInputMode('auto');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                matrixInputMode === 'auto' && !customMatrixContext.trim() && customMatrixImages.length === 0 && !customSpecContext.trim() && customSpecImages.length === 0
                  ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-950 dark:text-teal-100 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>A. AI Tự Động Xây Dựng (Mặc định)</span>
                </span>
                {matrixInputMode === 'auto' && !customMatrixContext.trim() && customMatrixImages.length === 0 && !customSpecContext.trim() && customSpecImages.length === 0 && (
                  <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                AI phân tích chủ đề, chương bài và tự phân bổ số câu, mức độ nhận thức (NB, TH, VD, VDC) chuẩn Công văn 7991.
              </p>
            </button>

            {/* Chế độ B */}
            <button
              type="button"
              onClick={() => {
                setMatrixInputMode('custom');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                matrixInputMode === 'custom' || customMatrixContext.trim() || customMatrixImages.length > 0
                  ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center space-x-1.5">
                  <Table className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>B. Ra Đề Bám Sát Khung Ma Trận Có Sẵn</span>
                </span>
                {(matrixInputMode === 'custom' || customMatrixContext.trim() || customMatrixImages.length > 0) && (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Dán bảng ma trận Word/Excel hoặc tải ảnh chụp ma trận. AI bám sát phân bổ số câu, các dạng thức I/II/III/IV và điểm số.
              </p>
            </button>

            {/* Chế độ C - Bổ sung theo yêu cầu người dùng */}
            <button
              type="button"
              onClick={() => {
                setMatrixInputMode('spec');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                matrixInputMode === 'spec' || customSpecContext.trim() || customSpecImages.length > 0
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-100 shadow-md ring-1 ring-indigo-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>C. Ra Đề Bám Sát Bảng Đặc Tả Chi Tiết</span>
                </span>
                {(matrixInputMode === 'spec' || customSpecContext.trim() || customSpecImages.length > 0) ? (
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    Khuyên dùng
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Căn cứ chi tiết nhất để ra đề với số câu hỏi và sát với <b>yêu cầu cần đạt (YCCĐ)</b>, nội dung kiến thức, mức độ nhận thức, số câu và điểm tương ứng, tránh hỏi sai trọng tâm hoặc sai mức độ.
              </p>
            </button>
          </div>

          {/* Hướng dẫn chi tiết Ma trận (khi đang ở chế độ B) */}
          {showMatrixHelp && matrixInputMode !== 'spec' && (
            <div className="text-xs text-slate-700 dark:text-slate-300 bg-teal-50/80 dark:bg-slate-800/90 p-4 rounded-xl border border-teal-200 dark:border-teal-800 space-y-2 leading-relaxed animate-fade-in">
              <p className="font-bold text-teal-800 dark:text-teal-300 flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Cách thức hoạt động &amp; Lợi ích khi ra đề theo ma trận bộ môn:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[12px]">
                <li><b>Sao chép từ Word / Excel:</b> Bạn có thể chọn toàn bộ bảng ma trận trong Word hoặc Excel, nhấn <b>Ctrl+C</b> rồi <b>Ctrl+V</b> vào ô văn bản dưới đây. AI sẽ tự động hiểu các cột mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) và số câu từng phần.</li>
                <li><b>Chụp ảnh màn hình:</b> Nếu bạn có file PDF hoặc ảnh chụp ma trận do nhà trường ban hành, chỉ cần chụp màn hình rồi nhấn <b>Ctrl+V</b> để dán ảnh trực tiếp vào đây hoặc bấm <b>"Tải ảnh ma trận lên"</b>.</li>
                <li><b>Bảo toàn chuẩn 10 điểm:</b> AI sẽ tạo ra đề thi có câu hỏi khớp chính xác với từng dòng ma trận của bạn, đồng thời xuất bảng Ma trận và Bản đặc tả tương ứng.</li>
              </ul>
            </div>
          )}

          {/* Hướng dẫn chi tiết Bảng đặc tả (khi đang ở chế độ C) */}
          {showSpecHelp && matrixInputMode === 'spec' && (
            <div className="text-xs text-indigo-950 dark:text-indigo-200 bg-indigo-50/90 dark:bg-slate-800/95 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2.5 leading-relaxed animate-fade-in">
              <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center space-x-2 text-sm">
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Vì sao Bảng đặc tả là căn cứ chi tiết và chuẩn mực nhất để ra đề kiểm tra?</span>
              </div>
              <p className="text-[12px] leading-relaxed">
                Theo Công văn 7991/BGDĐT và chương trình GDPT 2018, trong khi <i>Khung Ma trận</i> chỉ quy định số câu và tỉ lệ điểm tổng quát, thì <b>BẢNG ĐẶC TẢ ĐỀ KIỂM TRA</b> là văn bản pháp lí &amp; sư phạm trực tiếp quy định:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[12px]">
                <li><b>Chuẩn hóa Yêu cầu cần đạt (YCCĐ):</b> Từng dòng ghi rõ học sinh cần đạt được năng lực, thao tác hay kiến thức gì (nhận biết được khái niệm, giải thích được hiện tượng, tính toán được đại lượng, vận dụng giải bài toán thực tiễn...). AI sẽ đối chiếu từng câu hỏi đúng với YCCĐ này.</li>
                <li><b>Tránh hỏi sai trọng tâm &amp; lạc đề:</b> Đề thi sẽ chỉ tập trung vào đúng nội dung kiến thức được đặc tả, không bao giờ hỏi những phần giảm tải hoặc chưa học.</li>
                <li><b>Tránh hỏi sai mức độ:</b> Yêu cầu nhận biết thì ra câu hỏi nhận biết trực tiếp; yêu cầu vận dụng thì ra câu hỏi giải quyết tình huống, không đánh đố học sinh.</li>
                <li><b>Chuẩn số câu và dạng thức:</b> Xác định rõ câu nào là Trắc nghiệm 4 lựa chọn (Phần I), câu nào là Đúng/Sai (Phần II), câu nào là Trả lời ngắn (Phần III) và Tự luận (Phần IV).</li>
              </ul>
            </div>
          )}

          {/* ==================== VÙNG LÀM VIỆC MỤC C: BẢNG ĐẶC TẢ CHI TIẾT ==================== */}
          {(matrixInputMode === 'spec' || customSpecContext.trim() || customSpecImages.length > 0) && (
            <div className="space-y-4 pt-1 animate-fade-in border-t border-indigo-200 dark:border-indigo-900/60 pt-4">
              {/* Presets nạp mẫu Bảng đặc tả nhanh */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/80 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-indigo-950 dark:text-indigo-200 flex items-center space-x-1.5 mr-1">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Nạp mẫu Bảng đặc tả chuẩn bộ môn (Gợi ý):</span>
                    </span>
                  </div>

                  {(customSpecContext.trim() || customSpecImages.length > 0) && (
                    <button
                      type="button"
                      onClick={handleClearSpec}
                      className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-semibold flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Bảng đặc tả</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Object.entries(SPEC_TEMPLATES).map(([key, tpl]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleApplySpecTemplate(key)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                        selectedSpecTemplateKey === key && customSpecContext.includes(tpl.label.slice(2, 6))
                          ? 'bg-indigo-600 text-white shadow-xs font-bold ring-2 ring-indigo-400'
                          : 'bg-white dark:bg-slate-700 border border-indigo-200 dark:border-indigo-700/60 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hộp gợi ý cấu trúc đề bám sát Bảng đặc tả */}
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/20 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Gợi ý chèn cấu trúc đề khớp Bảng đặc tả (Tự động cân bằng 10.0 điểm):</span>
                  </div>
                </div>
                <p className="text-[11px] text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
                  Nhấn vào các nút bên dưới để chèn định hướng số câu Phần I, II, III, IV và cân bằng điểm tự động theo chuẩn Công văn 7991:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleInsertSpecStructurePrompt('thcs_18')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>📐 Chèn cấu trúc 18 câu - 29 ý (Toán 6, 7, 8, 9)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertSpecStructurePrompt('mcq_only')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-950 dark:text-indigo-200 font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>⚡ Chèn cấu trúc 100% Trắc nghiệm Toán (31 câu)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertSpecStructurePrompt('essay_5')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-950 dark:text-indigo-200 font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>✍️ Chèn cấu trúc 100% Tự luận Toán (5 câu)</span>
                  </button>
                </div>
              </div>

              {/* Textarea nhập / dán Bảng đặc tả */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Nội dung chi tiết Bảng đặc tả:</span>
                    {customSpecContext.trim() && (
                      <span className="text-[11px] font-normal text-slate-500">
                        ({customSpecContext.trim().split(/\s+/).length} từ)
                      </span>
                    )}
                  </label>
                  {(customSpecContext.trim() || customSpecImages.length > 0) && (
                    <button
                      type="button"
                      onClick={(e) => handleClearSpec(e)}
                      className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-semibold flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Xóa toàn bộ nội dung bảng đặc tả và ảnh đính kèm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Bảng đặc tả</span>
                    </button>
                  )}
                </div>
                <div
                  onPaste={handleSpecPaste}
                  onDragOver={handleSpecDrop}
                  className="relative"
                >
                <textarea
                  rows={7}
                  value={customSpecContext}
                  onChange={(e) => {
                    setCustomSpecContext(e.target.value);
                    if (e.target.value.trim() && matrixInputMode !== 'spec') {
                      setMatrixInputMode('spec');
                    }
                  }}
                  placeholder="Dán (Ctrl+V) bảng đặc tả sao chép từ Word, Excel hoặc nhập văn bản mô tả Bảng đặc tả chi tiết (bao gồm: Mạch kiến thức, Đơn vị kiến thức, Yêu cầu cần đạt YCCĐ, Mức độ nhận thức, Số câu và Điểm số tương ứng)... Có thể chụp màn hình và nhấn Ctrl+V để dán trực tiếp ảnh Bảng đặc tả!"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 pointer-events-none">
                  <span>Dán bảng Word/Excel hoặc nhấn <b>Ctrl+V</b> để dán ảnh Bảng đặc tả</span>
                </div>
              </div>
            </div>

              {/* Nút tải ảnh / tệp Bảng đặc tả */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95">
                    <UploadCloud className="w-4 h-4" />
                    <span>Tải ảnh / file Bảng đặc tả lên</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.txt,.md,.csv"
                      onChange={handleSpecFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    (Hỗ trợ ảnh chụp .png, .jpg hoặc tệp văn bản .txt, .csv)
                  </span>
                </div>

                {customSpecImages.length > 0 && (
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center space-x-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Đã đính kèm {customSpecImages.length} ảnh Bảng đặc tả</span>
                  </span>
                )}
              </div>

              {/* Danh sách ảnh Bảng đặc tả đã tải lên */}
              {customSpecImages.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Ảnh chụp Bảng đặc tả chi tiết ({customSpecImages.length} ảnh):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomSpecImages([])}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa hết ảnh</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {customSpecImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 aspect-square shadow-xs"
                      >
                        <img
                          src={imgSrc}
                          alt={`Bảng đặc tả ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecImage(idx)}
                            className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md transition-transform hover:scale-110 cursor-pointer"
                            title="Xóa ảnh này"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== VÙNG LÀM VIỆC MỤC B: KHUNG MA TRẬN CÓ SẴN ==================== */}
          {(matrixInputMode === 'custom' || customMatrixContext.trim() || customMatrixImages.length > 0) && matrixInputMode !== 'spec' && (
            <div className="space-y-3 pt-1 animate-fade-in border-t border-emerald-200 dark:border-emerald-900/60 pt-4">
              {/* Presets nạp mẫu nhanh */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1 mr-1">
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    <span>Nạp mẫu ma trận gợi ý:</span>
                  </span>
                  {Object.entries(MATRIX_TEMPLATES).map(([key, tpl]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleApplyTemplate(key)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        selectedTemplateKey === key && customMatrixContext.includes(tpl.label.slice(2, 6))
                          ? 'bg-teal-600 text-white shadow-xs font-bold'
                          : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-300'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>

                {(customMatrixContext.trim() || customMatrixImages.length > 0) && (
                  <button
                    type="button"
                    onClick={handleClearMatrix}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-semibold flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-auto cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa ma trận</span>
                  </button>
                )}
              </div>

              {/* Hộp gợi ý cấu trúc đề bám sát ma trận */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Gợi ý chèn cấu trúc đề chính xác (Giúp AI ra đề chuẩn 100% khớp ma trận):</span>
                  </div>
                </div>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  Nếu ma trận của thầy/cô có đánh số theo từng ý (như <b>13a-d</b>, <b>15a-d</b>, <b>16a-b</b>), hãy nhấn nút dưới đây để hệ thống tự động bổ sung hướng dẫn chi tiết số câu lớn - số ý con và tự cân bằng điểm cho AI:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleInsertStructurePrompt('thcs_18')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>📐 Chèn cấu trúc 18 câu - 29 ý (Toán 6, 7, 8, 9)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertStructurePrompt('mcq_only')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-950 dark:text-amber-200 font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>⚡ Chèn cấu trúc 100% Trắc nghiệm Toán (31 câu)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertStructurePrompt('essay_5')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-950 dark:text-amber-200 font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>✍️ Chèn cấu trúc 100% Tự luận Toán (5 câu)</span>
                  </button>
                </div>
              </div>

              {/* Textarea nhập / dán ma trận */}
              <div
                onPaste={handleMatrixPaste}
                onDragOver={handleMatrixDrop}
                className="relative"
              >
                <textarea
                  rows={6}
                  value={customMatrixContext}
                  onChange={(e) => {
                    setCustomMatrixContext(e.target.value);
                    if (e.target.value.trim() && matrixInputMode !== 'custom') {
                      setMatrixInputMode('custom');
                    }
                  }}
                  placeholder="Dán (Ctrl+V) bảng ma trận sao chép từ Word, Excel hoặc nhập văn bản mô tả ma trận bộ môn vào đây (Có thể chụp ảnh màn hình và nhấn Ctrl+V để dán trực tiếp)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-teal-500 outline-none leading-relaxed"
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 pointer-events-none">
                  <span>Dán bảng Word/Excel hoặc nhấn <b>Ctrl+V</b> để dán ảnh</span>
                </div>
              </div>

              {/* Nút tải ảnh / tệp ma trận */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95">
                    <UploadCloud className="w-4 h-4" />
                    <span>Tải ảnh / file ma trận lên</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.txt,.md,.csv"
                      onChange={handleMatrixFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    (Hỗ trợ ảnh chụp .png, .jpg hoặc tệp văn bản .txt, .csv)
                  </span>
                </div>

                {customMatrixImages.length > 0 && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Đã đính kèm {customMatrixImages.length} ảnh ma trận</span>
                  </span>
                )}
              </div>

              {/* Danh sách ảnh ma trận đã tải lên */}
              {customMatrixImages.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                      <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                      <span>Ảnh chụp khung ma trận bộ môn ({customMatrixImages.length} ảnh):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomMatrixImages([])}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa hết ảnh</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {customMatrixImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 aspect-square shadow-xs"
                      >
                        <img
                          src={imgSrc}
                          alt={`Ma trận ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveMatrixImage(idx)}
                            className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md transition-transform hover:scale-110 cursor-pointer"
                            title="Xóa ảnh này"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Định Dạng Ma Trận & Bản Đặc Tả Xuất Ra */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Table className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>3. Định Dạng Ma Trận &amp; Bản Đặc Tả Xuất Ra</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    Mới
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tùy chọn xuất theo ma trận 7791 hoặc ma trận truyền thống.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Lựa chọn 1: Chuẩn Công văn 7991 (Khuyên dùng - Mặc định) */}
            <button
              type="button"
              onClick={() => setMatrixOutputFormat('cv7991')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                matrixOutputFormat === 'cv7991'
                  ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-950 dark:text-teal-100 shadow-sm ring-1 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ① Chuẩn Công văn 7991/BGDĐT
                  </span>
                  {matrixOutputFormat === 'cv7991' && (
                    <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  )}
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60">
                    ★ Khuyên dùng
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Xuất <strong>duy nhất 1 Ma trận &amp; Bản đặc tả 16 cột</strong> chuẩn Công văn 7991 (gồm 4 dạng: TN Nhiều lựa chọn, Đúng-Sai, Trả lời ngắn, Tự luận). Đồng bộ và tối ưu tốc độ sinh.
                </p>
              </div>
            </button>

            {/* Lựa chọn 2: Mẫu truyền thống 5 cột YCCĐ */}
            <button
              type="button"
              onClick={() => setMatrixOutputFormat('classic')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                matrixOutputFormat === 'classic'
                  ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-950 dark:text-teal-100 shadow-sm ring-1 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ② Mẫu truyền thống (5 cột YCCĐ)
                  </span>
                  {matrixOutputFormat === 'classic' && (
                    <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  )}
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    Bảng phân bổ chi tiết
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Xuất <strong>duy nhất bảng đặc tả truyền thống</strong> 5 cột gắn liền trực tiếp với từng Yêu cầu cần đạt (Chủ đề, YCCĐ, Số câu Biết/Hiểu/VD, Điểm số).
                </p>
              </div>
            </button>

            {/* Lựa chọn 3: Xuất cả 2 định dạng */}
            <button
              type="button"
              onClick={() => setMatrixOutputFormat('both')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                matrixOutputFormat === 'both'
                  ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-950 dark:text-teal-100 shadow-sm ring-1 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ③ Xuất cả 2 định dạng ma trận
                  </span>
                  {matrixOutputFormat === 'both' && (
                    <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  )}
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    Kết hợp 2 bảng
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tài liệu xuất ra sẽ gồm cả <strong>Bản đặc tả 16 cột CV 7991</strong> và <strong>Bảng đặc tả 5 cột YCCĐ</strong> truyền thống.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* 4. Chọn loại đề */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4. Chọn Chế Độ Đề Kiểm Tra (3 Loại)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleModeChange('MCQ_ESSAY')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                examMode === 'MCQ_ESSAY'
                  ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-100 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between">
                <span>① Trắc nghiệm + Tự luận</span>
                {examMode === 'MCQ_ESSAY' && <CheckCircle className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Đầy đủ Phần I (TN 4 Lựa chọn), Phần II (Đúng/Sai), Phần III (Trả lời ngắn) & Phần IV (Tự luận).
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('MCQ_ONLY')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                examMode === 'MCQ_ONLY'
                  ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-100 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between">
                <span>② Trắc nghiệm 100%</span>
                {examMode === 'MCQ_ONLY' && <CheckCircle className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Chỉ chứa các phần Trắc nghiệm (Phần I, II, III). Không bao gồm câu hỏi tự luận.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('ESSAY_ONLY')}
              className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                examMode === 'ESSAY_ONLY'
                  ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-100 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-between">
                <span>③ Tự luận 100%</span>
                {examMode === 'ESSAY_ONLY' && <CheckCircle className="w-4 h-4 text-teal-600" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Chỉ chứa các câu hỏi Tự luận (Phần IV) kèm theo Rubric và Thang điểm chi tiết.
              </p>
            </button>
          </div>
        </div>

        {/* 5. Cấu trúc số lượng câu hỏi & Tùy chọn điểm số */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                5. Cấu Trúc / Số Lượng Câu Hỏi & Thang Điểm (Yêu cầu đúng 10 điểm)
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700">
                Tổng câu: {questionCounts.part1_MCQSingle + questionCounts.part2_MCQTrueFalse + questionCounts.part3_MCQShort + questionCounts.part4_Essay} câu
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                  Math.abs(currentScores.totalScore - 10.0) < 0.01
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800 animate-pulse'
                }`}
              >
                {Math.abs(currentScores.totalScore - 10.0) < 0.01
                  ? '✓ Tổng điểm: 10/10 đ (Đạt chuẩn)'
                  : `⚠️ Tổng điểm: ${currentScores.totalScore}/10 đ`}
              </span>
            </div>
          </div>

          {/* Banner thông báo Bỏ qua mục này nếu đang ra đề theo Ma trận */}
          {isCustomMatrixActive && (
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 flex items-start space-x-2.5 text-xs text-teal-900 dark:text-teal-200">
              <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-teal-950 dark:text-teal-100">
                  ⚡ Đang ở chế độ Ra đề theo Ma trận bộ môn:
                </p>
                <p className="text-teal-800 dark:text-teal-300 leading-relaxed">
                  AI sẽ <strong>BỎ QUA</strong> cấu trúc số câu ở mục này và chỉ dựa duy nhất vào nội dung Ma trận (Mục 2) của bạn để ra đúng và đủ số lượng câu hỏi theo từng phần.
                </p>
              </div>
            </div>
          )}

          {/* Banner thông báo nếu chưa đủ hoặc vượt quá 10 điểm + Nút Tự động cân bằng */}
          {!isCustomMatrixActive && Math.abs(currentScores.totalScore - 10.0) >= 0.01 && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  Tổng điểm hiện tại: <strong>{currentScores.totalScore} điểm</strong>. Quy định yêu cầu tổng điểm tất cả các phần phải bằng đúng <strong>10.0 điểm</strong>!
                </span>
              </div>
              <button
                type="button"
                onClick={handleAutoBalance}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold rounded-lg shadow-xs transition-all shrink-0 flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tự động cân bằng 10 điểm</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phần I */}
            {examMode !== 'ESSAY_ONLY' && (
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 tracking-wider uppercase">
                      Phần I
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                      Tổng {currentScores.part1Score}đ
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Trắc nghiệm 4 lựa chọn
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      4 phương án A, B, C, D
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700/70 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Điểm / câu:</span>
                      <select
                        value={questionCounts.part1_PointsPerQuestion ?? 0.25}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({
                            ...prev,
                            part1_PointsPerQuestion: Number(e.target.value),
                          }))
                        }
                        className="px-2 py-1 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-2xs focus:outline-none cursor-pointer"
                      >
                        <option value={0.1}>0.10 đ</option>
                        <option value={0.2}>0.20 đ</option>
                        <option value={0.25}>0.25 đ</option>
                        <option value={0.5}>0.50 đ</option>
                        <option value={1.0}>1.00 đ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => updateCount('part1_MCQSingle', -1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-black text-slate-900 dark:text-white min-w-[3.5rem] text-center">
                    {questionCounts.part1_MCQSingle} câu
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount('part1_MCQSingle', 1)}
                    className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all shadow-xs shadow-teal-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Phần II */}
            {examMode !== 'ESSAY_ONLY' && (
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 tracking-wider uppercase">
                      Phần II
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                      Tổng {currentScores.part2Score}đ
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Trắc nghiệm Đúng / Sai
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Xét tính Đúng/Sai từng ý
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700/70 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Số ý / câu:</span>
                      <select
                        value={questionCounts.part2_TFStatementsPerQuestion ?? 4}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({
                            ...prev,
                            part2_TFStatementsPerQuestion: Number(e.target.value),
                          }))
                        }
                        className="px-2 py-1 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-2xs focus:outline-none cursor-pointer"
                      >
                        <option value={2}>2 ý (a, b)</option>
                        <option value={3}>3 ý (a, b, c)</option>
                        <option value={4}>4 ý (a, b, c, d)</option>
                        <option value={5}>5 ý (a-e)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Điểm / câu:</span>
                      <select
                        value={questionCounts.part2_PointsPerQuestion ?? 1.0}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({
                            ...prev,
                            part2_PointsPerQuestion: Number(e.target.value),
                          }))
                        }
                        className="px-2 py-1 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-2xs focus:outline-none cursor-pointer"
                      >
                        <option value={0.25}>0.25 đ</option>
                        <option value={0.5}>0.50 đ</option>
                        <option value={0.75}>0.75 đ</option>
                        <option value={1.0}>1.00 đ</option>
                        <option value={1.5}>1.50 đ</option>
                        <option value={2.0}>2.00 đ</option>
                      </select>
                    </div>

                    <div className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold text-right pt-0.5 border-t border-slate-200/50 dark:border-slate-800">
                      Mỗi ý đúng: {((questionCounts.part2_PointsPerQuestion ?? 1.0) / (questionCounts.part2_TFStatementsPerQuestion ?? 4)).toFixed(2)}đ (chia đều)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => updateCount('part2_MCQTrueFalse', -1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-black text-slate-900 dark:text-white min-w-[3.5rem] text-center">
                    {questionCounts.part2_MCQTrueFalse} câu
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount('part2_MCQTrueFalse', 1)}
                    className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all shadow-xs shadow-teal-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Phần III */}
            {examMode !== 'ESSAY_ONLY' && (
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 tracking-wider uppercase">
                      Phần III
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                      Tổng {currentScores.part3Score}đ
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Trắc nghiệm Trả lời ngắn
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Điền câu trả lời ngắn
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700/70 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Điểm / câu:</span>
                      <select
                        value={questionCounts.part3_PointsPerQuestion ?? 0.25}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({
                            ...prev,
                            part3_PointsPerQuestion: Number(e.target.value),
                          }))
                        }
                        className="px-2 py-1 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-2xs focus:outline-none cursor-pointer"
                      >
                        <option value={0.25}>0.25 đ</option>
                        <option value={0.5}>0.50 đ</option>
                        <option value={0.75}>0.75 đ</option>
                        <option value={1.0}>1.00 đ</option>
                        <option value={1.5}>1.50 đ</option>
                        <option value={2.0}>2.00 đ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => updateCount('part3_MCQShort', -1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-black text-slate-900 dark:text-white min-w-[3.5rem] text-center">
                    {questionCounts.part3_MCQShort} câu
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount('part3_MCQShort', 1)}
                    className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all shadow-xs shadow-teal-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Phần IV */}
            {examMode !== 'MCQ_ONLY' && (
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 tracking-wider uppercase">
                      Phần IV
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                      Tổng {currentScores.part4Score}đ
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Câu hỏi Tự luận
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kèm Rubric chấm chi tiết
                    </p>
                  </div>

                  {questionCounts.part4_Essay > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700/70 text-xs space-y-2">
                      {/* Vận dụng (VD) */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium text-slate-700 dark:text-slate-300 shrink-0">
                          câu VD:
                        </span>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateEssaySubCount('apply', -1)}
                            className="w-5 h-5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-teal-700 dark:text-teal-400 w-3.5 text-center">
                            {currentScores.applyCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateEssaySubCount('apply', 1)}
                            className="w-5 h-5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-[10px] border border-teal-200/80 dark:border-teal-800 shrink-0">
                          {currentScores.applyCount > 0
                            ? `Quỹ: ${currentScores.remainingForApply}đ`
                            : '0đ'}
                        </span>
                      </div>

                      {/* Vận dụng cao (VDC) */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium text-slate-700 dark:text-slate-300 shrink-0">
                          câu VDC:
                        </span>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateEssaySubCount('adv', -1)}
                            className="w-5 h-5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-teal-700 dark:text-teal-400 w-3.5 text-center">
                            {currentScores.advCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateEssaySubCount('adv', 1)}
                            className="w-5 h-5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        <select
                          value={questionCounts.part4_AdvancedPoints ?? 2.0}
                          onChange={(e) =>
                            setQuestionCounts((prev) => ({
                              ...prev,
                              part4_AdvancedPoints: Number(e.target.value),
                            }))
                          }
                          className="px-1.5 py-0.5 rounded border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-[11px] font-bold focus:outline-none cursor-pointer"
                        >
                          <option value={0.5}>0.50đ/câu</option>
                          <option value={1.0}>1.00đ/câu</option>
                          <option value={1.5}>1.50đ/câu</option>
                          <option value={2.0}>2.00đ/câu</option>
                          <option value={2.5}>2.50đ/câu</option>
                          <option value={3.0}>3.00đ/câu</option>
                          <option value={3.5}>3.50đ/câu</option>
                          <option value={4.0}>4.00đ/câu</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => updateEssayCount(-1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-black text-slate-900 dark:text-white min-w-[3.5rem] text-center">
                    {questionCounts.part4_Essay} câu
                  </span>
                  <button
                    type="button"
                    onClick={() => updateEssayCount(1)}
                    className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all shadow-xs shadow-teal-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6. Mức độ nhận thức (Thanh kéo %) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                6. Tỷ Lệ Mức Độ Nhận Thức (Thanh Kéo / Số %)
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                totalPercentage === 100
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
              }`}
            >
              Tổng: {totalPercentage}% {totalPercentage === 100 ? '✓ Khớp' : '!= 100%'}
            </span>
          </div>

          {/* Banner thông báo Bỏ qua mục này nếu đang ra đề theo Ma trận */}
          {isCustomMatrixActive && (
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 flex items-start space-x-2.5 text-xs text-teal-900 dark:text-teal-200">
              <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-teal-950 dark:text-teal-100">
                  ⚡ Đang ở chế độ Ra đề theo Ma trận bộ môn:
                </p>
                <p className="text-teal-800 dark:text-teal-300 leading-relaxed">
                  AI sẽ <strong>BỎ QUA</strong> thanh kéo tỷ lệ % ở mục này. Tỷ lệ nhận thức (Nhận biết, Thông hiểu, Vận dụng) sẽ được AI tính toán tự động dựa trên số câu thực tế trong khung ma trận của bạn.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nhận biết */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Nhận biết</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{cognitiveRatio.remember}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={cognitiveRatio.remember}
                onChange={(e) => updateRatio('remember', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Thông hiểu */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Thông hiểu</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{cognitiveRatio.understand}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={cognitiveRatio.understand}
                onChange={(e) => updateRatio('understand', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Vận dụng */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Vận dụng</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{cognitiveRatio.apply}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={cognitiveRatio.apply}
                onChange={(e) => updateRatio('apply', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Vận dụng cao */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Vận dụng cao</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{cognitiveRatio.advanced}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={cognitiveRatio.advanced}
                onChange={(e) => updateRatio('advanced', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 7. Chọn số mã đề */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Copy className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7. Số Lượng Mã Đề Cần Sinh (Đảo Câu Hỏi & Đáp Án)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 4, 6, 8, 10, 20, 50, 100].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCodeCount(num)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  codeCount === num
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {num} Mã đề
              </button>
            ))}

            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-xs font-medium text-slate-500">Tùy chỉnh:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={codeCount}
                onChange={(e) => setCodeCount(Math.max(1, Number(e.target.value)))}
                className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold text-center"
              />
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToNewExam}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Làm mới form về mặc định ban đầu để bắt đầu soạn đề mới hoàn toàn"
            >
              <Plus className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Tạo đề mới hoàn toàn</span>
            </button>
            <button
              type="button"
              onClick={handleLoadPreviousConfig}
              className={`px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                !getPreviousSessionMetadata() ? 'opacity-60' : ''
              }`}
              title="Nạp lại cấu hình phiên tạo đề trước đó"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Cấu hình trước đó</span>
            </button>
            <button
              type="button"
              onClick={() => handleSaveCurrentSessionDraft(true)}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Lưu nháp các thông số hiện tại"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Lưu nháp</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-glow-emerald text-white font-black text-sm md:text-base shadow-2xl transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-white" />
                <span>{progressMessage || 'Đang khởi tạo Đề thi & Ma trận...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>Sinh Đề Thi & Ma Trận Ngay (Gemini AI)</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* API Key Modal */}
      <ApiKeyInputModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={async (newApiKey: string) => {
          setShowApiKeyModal(false);
          if (newApiKey && onSaveSettings) {
            onSaveSettings({ ...settings, customApiKey: newApiKey });
          }
          if (pendingMetadata) {
            try {
              await onGenerate(pendingMetadata);
            } catch (err: any) {
              const msg = String(err?.message || err);
              if (msg.includes('[QUOTA_EXHAUSTED]') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
                setShowQuotaModal(true);
              } else if (msg.includes('[NO_API_KEY]') || msg.includes('[INVALID_API_KEY]')) {
                setShowApiKeyModal(true);
              } else {
                setErrorMsg(msg);
              }
            }
          }
        }}
      />

      {/* Quota Exceeded Modal */}
      <QuotaExceededModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        onSaveNewKeyAndRetry={async (newApiKey: string) => {
          setShowQuotaModal(false);
          if (newApiKey && onSaveSettings) {
            onSaveSettings({ ...settings, customApiKey: newApiKey });
          }
          if (pendingMetadata) {
            try {
              await onGenerate(pendingMetadata);
            } catch (err: any) {
              const msg = String(err?.message || err);
              if (msg.includes('[QUOTA_EXHAUSTED]') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
                setShowQuotaModal(true);
              } else if (msg.includes('[NO_API_KEY]') || msg.includes('[INVALID_API_KEY]')) {
                setShowApiKeyModal(true);
              } else {
                setErrorMsg(msg);
              }
            }
          }
        }}
      />

      {/* In-App SGK Google Drive Viewer Modal (Full-Screen) */}
      {previewPdf &&
        createPortal(
          <div className="fixed inset-0 z-[100000] bg-slate-950 flex flex-col w-screen h-screen">
            <div className="bg-white dark:bg-slate-900 w-full h-full flex flex-col overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 shrink-0">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {previewPdf.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Nguồn Google Drive • {previewPdf.pageCount} trang • NXB Giáo dục Việt Nam
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={previewPdf.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold flex items-center space-x-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở trên Drive</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewPdf(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-200 hover:text-rose-700 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Đóng</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative min-h-0">
                <iframe
                  src={previewPdf.previewUrl}
                  title={previewPdf.title}
                  allow="autoplay"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Modal Cấu Hình Link Google Drive cho 8 cuốn SGK Toán KNTT */}
      {showDriveLinksModal &&
        createPortal(
          <div className="fixed inset-0 z-[100000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Cấu Hình Link Google Drive — 8 Cuốn SGK Toán KNTT (Lớp 6–9)
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Xem SGK trực tiếp từ Google Drive mà không cần tải file PDF nặng lên Vercel
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDriveLinksModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 space-y-4">
                <div className="p-3 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1 leading-relaxed">
                  <div className="font-bold">Hướng dẫn lấy link Google Drive (chỉ cần dán link chia sẻ gốc):</div>
                  <div>
                    1. Tải file PDF lên Google Drive → chuột phải chọn <b>Chia sẻ</b> → chuyển quyền truy cập thành <b>Bất kỳ ai có đường liên kết (Người xem)</b>.
                  </div>
                  <div>
                    2. Sao chép đường liên kết (dạng <code className="px-1 py-0.5 rounded bg-white/80 dark:bg-slate-900 font-mono text-[11px]">https://drive.google.com/file/d/.../view</code>) rồi dán vào ô tương ứng. Ứng dụng sẽ tự động chuyển sang chế độ xem nhúng mượt mà.
                  </div>
                </div>

                <div className="space-y-2.5">
                  {KNTT_DRIVE_LINK_ITEMS.map((item) => {
                    const currentVal = driveLinksDraft[item.id] ?? '';
                    const defaultVal = KNTT_DEFAULT_DRIVE_LINKS[item.id] || '';
                    const parsed = normalizeTextbookUrl(currentVal);
                    const isFocused = focusedDriveVolumeId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isFocused
                            ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 ring-2 ring-amber-400/40'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.label}
                          </label>
                          {currentVal.trim() ? (
                            parsed.isConfigured ? (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                                {parsed.isGoogleDrive ? '✓ Link Google Drive tùy chỉnh' : '✓ Đường dẫn hợp lệ'}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                                ⚠ Link chưa hợp lệ
                              </span>
                            )
                          ) : defaultVal ? (
                            <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400">
                              ✓ Đã gắn sẵn link Google Drive mặc định
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.envKey}
                            </span>
                          )}
                        </div>
                        <input
                          type="url"
                          value={currentVal}
                          onChange={(e) =>
                            setDriveLinksDraft((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          placeholder={defaultVal || `Dán link Google Drive cho ${item.fileNameHint}...`}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDriveLinksModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleSaveDriveLinks}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-md flex items-center space-x-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Link Google Drive</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
