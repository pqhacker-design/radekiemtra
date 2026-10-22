import { AppSettings, ExamPackage, QuestionBankItem } from '../types';
import { repairLatexCorruptions } from '../utils/textUtils';

function repairQuestionItem<T extends { content?: string; options?: any[]; trueFalseStatements?: any[]; shortAnswer?: string; essayAnswerGuide?: string; explanation?: string; rubric?: any[] }>(q: T): T {
  if (!q) return q;
  return {
    ...q,
    content: q.content ? repairLatexCorruptions(q.content) : q.content,
    shortAnswer: q.shortAnswer ? repairLatexCorruptions(q.shortAnswer) : q.shortAnswer,
    essayAnswerGuide: q.essayAnswerGuide ? repairLatexCorruptions(q.essayAnswerGuide) : q.essayAnswerGuide,
    explanation: q.explanation ? repairLatexCorruptions(q.explanation) : q.explanation,
    options: q.options?.map((opt: any) => ({
      ...opt,
      content: opt.content ? repairLatexCorruptions(opt.content) : opt.content,
    })),
    trueFalseStatements: q.trueFalseStatements?.map((tf: any) => ({
      ...tf,
      content: tf.content ? repairLatexCorruptions(tf.content) : tf.content,
    })),
    rubric: q.rubric?.map((r: any) => ({
      ...r,
      criteria: r.criteria ? repairLatexCorruptions(r.criteria) : r.criteria,
      description: r.description ? repairLatexCorruptions(r.description) : r.description,
    })),
  };
}

function repairExamPackageStrings(p: ExamPackage): ExamPackage {
  if (!p) return p;
  return {
    ...p,
    exams: p.exams?.map((e) => ({
      ...e,
      questions: e.questions?.map((q) => repairQuestionItem(q)),
    })),
    answerKeys: p.answerKeys?.map((ak) => ({
      ...ak,
      part3Answers: ak.part3Answers?.map((a) => ({
        ...a,
        shortAnswer: a.shortAnswer ? repairLatexCorruptions(a.shortAnswer) : a.shortAnswer,
      })),
      part4Answers: ak.part4Answers?.map((a) => ({
        ...a,
        essayAnswerGuide: a.essayAnswerGuide ? repairLatexCorruptions(a.essayAnswerGuide) : a.essayAnswerGuide,
        rubric: a.rubric?.map((r: any) => ({
          ...r,
          criteria: r.criteria ? repairLatexCorruptions(r.criteria) : r.criteria,
          description: r.description ? repairLatexCorruptions(r.description) : r.description,
        })),
      })),
    })),
  };
}

const STORAGE_KEYS = {
  SETTINGS: 'aitest_settings_v1',
  EXAM_HISTORY: 'aitest_exam_history_v1',
  QUESTION_BANK: 'aitest_question_bank_v1',
};

export const defaultSettings: AppSettings = {
  defaultSchoolName: 'Trường THCS / THPT',
  defaultDepartmentName: 'Sở Giáo dục và Đào tạo',
  defaultTeacherName: 'Giáo viên',
  selectedModel: 'gemini-3.8-flash',
  theme: 'light',
  saveExamHistory: true,
  autoSaveToBank: true,
};

export type StorageChangeListener = () => void;

export class StorageEngine {
  private static listeners: Set<StorageChangeListener> = new Set();

  static subscribe(listener: StorageChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Lỗi listener StorageEngine:', err);
      }
    });
  }

  // --- SETTINGS ---
  static getSettings(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!raw) return defaultSettings;
      return { ...defaultSettings, ...JSON.parse(raw) };
    } catch {
      return defaultSettings;
    }
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi lưu cài đặt:', e);
    }
  }

  // --- EXAM PACKAGES (LỊCH SỬ ĐỀ THI ĐÃ TẠO) ---
  static getExamHistory(): ExamPackage[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
      if (!raw) return [];
      const list: ExamPackage[] = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list
        .filter((p) => {
          if (!p || !p.id) return false;
          // Bỏ qua các đề bị lỗi hỏng do AI chỉ sinh số "0", "1" và "Phương án A"
          const firstExam = p.exams?.[0];
          if (firstExam && Array.isArray(firstExam.questions) && firstExam.questions.length > 0) {
            const isCorrupted = firstExam.questions.some((q) => {
              const c = String(q.content || '').trim();
              const isSingleDigit = c === '0' || c === '1' || c === '2';
              const hasDummyOpt = q.options?.some((opt) => opt.content === 'Phương án A');
              return isSingleDigit || hasDummyOpt;
            });
            if (isCorrupted) return false;
          }
          return true;
        })
        .map(repairExamPackageStrings);
    } catch {
      return [];
    }
  }

  static saveExamPackage(examPackage: ExamPackage): void {
    try {
      const current = this.getExamHistory();
      const filtered = current.filter((item) => item.id !== examPackage.id);
      const updated = [examPackage, ...filtered];
      localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));

      // Tự động lưu câu hỏi vào Ngân hàng câu hỏi nếu cài đặt bật
      const settings = this.getSettings();
      if (settings.autoSaveToBank !== false && examPackage.exams?.[0]?.questions) {
        this.addQuestionsToBankFromExam(examPackage);
      }

      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi lưu đề thi:', e);
    }
  }

  static deleteExamPackage(id: string): void {
    try {
      const current = this.getExamHistory();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi xóa đề thi:', e);
    }
  }

  static clearExamHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi xóa lịch sử đề thi:', e);
    }
  }

  // --- QUESTION BANK (NGÂN HÀNG CÂU HỎI) ---
  static getQuestionBank(): QuestionBankItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QUESTION_BANK);
      if (!raw) return [];
      const list: QuestionBankItem[] = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      return list.filter((q) => q && q.id).map((q) => repairQuestionItem(q));
    } catch {
      return [];
    }
  }

  static saveQuestionBank(bank: QuestionBankItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTION_BANK, JSON.stringify(bank));
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi lưu ngân hàng câu hỏi:', e);
    }
  }

  static addQuestionToBank(question: QuestionBankItem): void {
    try {
      const current = this.getQuestionBank();
      const exists = current.some((q) => q.id === question.id);
      const updated = exists
        ? current.map((q) => (q.id === question.id ? question : q))
        : [question, ...current];
      this.saveQuestionBank(updated);
    } catch (e) {
      console.error('Lỗi thêm câu hỏi vào ngân hàng:', e);
    }
  }

  static deleteQuestionFromBank(id: string): void {
    try {
      const current = this.getQuestionBank();
      const updated = current.filter((q) => q.id !== id);
      this.saveQuestionBank(updated);
    } catch (e) {
      console.error('Lỗi xóa câu hỏi khỏi ngân hàng:', e);
    }
  }

  static deleteMultipleQuestionsFromBank(ids: string[]): void {
    try {
      const idSet = new Set(ids);
      const current = this.getQuestionBank();
      const updated = current.filter((q) => !idSet.has(q.id));
      this.saveQuestionBank(updated);
    } catch (e) {
      console.error('Lỗi xóa nhiều câu hỏi:', e);
    }
  }

  static clearQuestionBank(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUESTION_BANK);
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi xóa ngân hàng câu hỏi:', e);
    }
  }

  private static addQuestionsToBankFromExam(pkg: ExamPackage): void {
    try {
      const primaryExam = pkg.exams?.[0];
      if (!primaryExam || !Array.isArray(primaryExam.questions)) return;

      const currentBank = this.getQuestionBank();
      const bankIds = new Set(currentBank.map((q) => q.id));
      const newItems: QuestionBankItem[] = [];

      primaryExam.questions.forEach((q) => {
        if (!q || !q.content) return;
        const qId = q.id || `qb-${pkg.id}-${q.number}-${Date.now()}`;
        if (!bankIds.has(qId)) {
          newItems.push({
            ...q,
            id: qId,
            subject: pkg.metadata.subject,
            grade: pkg.metadata.grade,
            chapter: pkg.metadata.chapterTitle || 'Chung',
            curriculum: pkg.metadata.curriculum,
            createdDate: pkg.createdAt || new Date().toISOString(),
            sourceExamId: pkg.id,
            sourceExamTitle: pkg.metadata.examTitle,
            examTitle: pkg.metadata.examTitle,
          });
          bankIds.add(qId);
        }
      });

      if (newItems.length > 0) {
        this.saveQuestionBank([...newItems, ...currentBank]);
      }
    } catch (e) {
      console.error('Lỗi auto-save ngân hàng câu hỏi:', e);
    }
  }

  // --- RESET ALL LOCAL DATA ---
  static clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
      localStorage.removeItem(STORAGE_KEYS.QUESTION_BANK);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      this.notifyListeners();
    } catch (e) {
      console.error('Lỗi xóa sạch dữ liệu:', e);
    }
  }
}
