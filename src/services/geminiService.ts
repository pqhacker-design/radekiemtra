import { ExamMetadata, ExamPackage, Question } from '../types';
import { PromptEngine } from './promptEngine';
import { ShuffleEngine } from './shuffleEngine';
import { ValidationEngine, cleanQuestionText } from './validationEngine';
import { StorageEngine } from './storageEngine';
import { callGeminiApi } from './geminiClient';
import { safeJsonParse } from './jsonRepair';

export class GeminiService {
  /**
   * Gọi backend API hoặc Client SDK để sinh Đề kiểm tra, Ma trận, Bảng đặc tả và Đáp án
   */
  static async generateExamPackage(
    metadata: ExamMetadata,
    onProgress?: (message: string) => void
  ): Promise<ExamPackage> {
    if (onProgress) onProgress('Đang tạo Prompt chuẩn Công văn 7991/BGDĐT...');

    // Trích xuất các câu hỏi cũ cùng môn & khối lớp để đưa vào chỉ thị chống trùng lặp
    const existingQuestionsToAvoid: string[] = [];
    try {
      const history = StorageEngine.getExamHistory();
      const sameSubjectExams = history.filter(
        (p) => p.metadata?.subject === metadata.subject && p.metadata?.grade === metadata.grade
      );
      for (const p of sameSubjectExams.slice(0, 3)) {
        if (p.exams && p.exams[0]?.questions) {
          for (const q of p.exams[0].questions) {
            if (q.content && q.content.trim()) {
              existingQuestionsToAvoid.push(q.content.trim().slice(0, 160));
            }
          }
        }
      }
    } catch {}

    const systemInstruction = PromptEngine.getSystemInstruction();
    const prompt = PromptEngine.buildGenerationPrompt(metadata, existingQuestionsToAvoid);
    const settings = StorageEngine.getSettings();
    const customApiKey = settings.customApiKey?.trim() || '';
    const selectedModel = settings.selectedModel || 'gemini-3.8-flash';

    if (onProgress) onProgress(`Đang gửi yêu cầu tới Gemini AI (${selectedModel})...`);

    const combinedImages = [
      ...(metadata.referenceImages || []),
      ...(metadata.customMatrixImages || []),
      ...(metadata.customSpecImages || []),
    ];

    const rawText = await callGeminiApi({
      prompt,
      systemInstruction,
      responseMimeType: 'application/json',
      customApiKey,
      model: selectedModel,
      images: combinedImages,
      temperature: 0.45,
      topP: 0.95,
      onStatusUpdate: onProgress,
    });

    if (!rawText) {
      throw new Error('Gemini API không phản hồi dữ liệu.');
    }

    if (onProgress) onProgress('Đang thẩm định và kiểm tra cấu trúc ma trận, câu hỏi...');

    const validationResult = ValidationEngine.validateAndRepair(rawText, metadata);

    if (!validationResult.isValid) {
      throw new Error(
        `Dữ liệu từ AI chưa chuẩn hóa: ${validationResult.errors.join('; ')}`
      );
    }

    if (onProgress)
      onProgress(`Đang xáo trộn và sinh ${metadata.codeCount || 1} mã đề kiểm tra...`);

    // Xáo trộn và sinh nhiều mã đề (101, 102, 103...)
    const { exams, answerKeys } = ShuffleEngine.generateMultipleExamCodes(
      validationResult.questions,
      metadata.codeCount || 1
    );

    if (onProgress) onProgress('Đã hoàn tất khởi tạo gói đề thi!');

    const examPackage: ExamPackage = {
      id: `exam-pack-${Date.now()}`,
      createdAt: new Date().toISOString(),
      metadata,
      matrix: validationResult.matrix,
      specification: validationResult.specification,
      exams,
      answerKeys,
    };

    return examPackage;
  }

  static async generateExam(
    metadata: ExamMetadata,
    onProgress?: (message: string) => void
  ): Promise<ExamPackage> {
    return this.generateExamPackage(metadata, onProgress);
  }

  /**
   * Tạo lại riêng 1 câu hỏi cụ thể bằng AI dựa trên yêu cầu/góp ý của giáo viên
   */
  static async regenerateSingleQuestion(params: {
    originalQuestion: Question;
    metadata: ExamMetadata;
    teacherPrompt?: string;
    existingQuestions?: Question[];
    onProgress?: (message: string) => void;
  }): Promise<Question> {
    const { originalQuestion, metadata, teacherPrompt, existingQuestions = [], onProgress } = params;

    if (onProgress) onProgress('Đang chuẩn bị yêu cầu tái tạo câu hỏi chuẩn Công văn 7991...');

    const systemInstruction = PromptEngine.getSystemInstruction();
    const prompt = PromptEngine.buildRegenerateQuestionPrompt(
      originalQuestion,
      metadata,
      teacherPrompt,
      existingQuestions
    );

    const settings = StorageEngine.getSettings();
    const customApiKey = settings.customApiKey?.trim() || '';
    const selectedModel = settings.selectedModel || 'gemini-3.8-flash';

    if (onProgress) onProgress(`Đang gửi yêu cầu tới AI (${selectedModel})...`);

    const rawText = await callGeminiApi({
      prompt,
      systemInstruction,
      responseMimeType: 'application/json',
      customApiKey,
      model: selectedModel,
      temperature: 0.65,
      topP: 0.95,
      onStatusUpdate: onProgress,
    });

    if (!rawText) {
      throw new Error('Gemini API không phản hồi dữ liệu câu hỏi.');
    }

    if (onProgress) onProgress('Đang chuẩn hóa và kiểm tra cấu trúc câu hỏi mới...');

    const parsed = safeJsonParse(rawText);

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Dữ liệu câu hỏi mới từ AI không đúng cấu trúc JSON hợp lệ.');
    }

    const cleanContent = cleanQuestionText(
      typeof parsed.content === 'string' ? parsed.content.trim() : originalQuestion.content
    );

    const q: Question = {
      id: originalQuestion.id,
      baseQuestionId: originalQuestion.baseQuestionId || originalQuestion.id,
      partType: originalQuestion.partType,
      partTitle: originalQuestion.partTitle || (originalQuestion.partType === 'PART1' ? 'PHẦN I' : originalQuestion.partType === 'PART2' ? 'PHẦN II' : originalQuestion.partType === 'PART3' ? 'PHẦN III' : 'PHẦN IV'),
      number: originalQuestion.number,
      content: cleanContent,
      cognitiveLevel: parsed.cognitiveLevel || originalQuestion.cognitiveLevel,
      points: typeof parsed.points === 'number' ? parsed.points : originalQuestion.points,
      topic: typeof parsed.topic === 'string' && parsed.topic.trim() ? parsed.topic.trim() : (originalQuestion.topic || metadata.chapterTitle),
      competency: typeof parsed.competency === 'string' ? parsed.competency.trim() : originalQuestion.competency,
      competencyCode: typeof parsed.competencyCode === 'string' ? parsed.competencyCode.trim() : originalQuestion.competencyCode,
      explanation: typeof parsed.explanation === 'string' ? cleanQuestionText(parsed.explanation.trim()) : undefined,
      svgDiagram: typeof parsed.svgDiagram === 'string' && parsed.svgDiagram.includes('<svg') ? parsed.svgDiagram.trim() : undefined,
    };

    if (originalQuestion.partType === 'PART1') {
      const rawOpts = Array.isArray(parsed.options) ? parsed.options : [];
      const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      const normalizedOpts = keys.map((k, idx) => {
        const item = rawOpts.find((o: any) => String(o.key).toUpperCase() === k) || rawOpts[idx];
        return {
          key: k,
          content: item && item.content ? cleanQuestionText(String(item.content).trim()) : '',
        };
      });
      q.options = normalizedOpts;
      const parsedOpt = parsed.correctOption ? String(parsed.correctOption).toUpperCase().trim() : '';
      q.correctOption = ['A', 'B', 'C', 'D'].includes(parsedOpt) ? (parsedOpt as any) : 'A';
    } else if (originalQuestion.partType === 'PART2') {
      const rawStmts = Array.isArray(parsed.trueFalseStatements) ? parsed.trueFalseStatements : [];
      const keys: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
      const normalizedStmts = keys.map((k, idx) => {
        const item = rawStmts.find((s: any) => String(s.key).toLowerCase() === k) || rawStmts[idx];
        return {
          key: k,
          content: item && item.content ? cleanQuestionText(String(item.content).trim()) : '',
          isCorrect: item ? Boolean(item.isCorrect) : false,
        };
      });
      q.trueFalseStatements = normalizedStmts;
    } else if (originalQuestion.partType === 'PART3') {
      q.shortAnswer = typeof parsed.shortAnswer === 'string' ? cleanQuestionText(parsed.shortAnswer.trim()) : '';
    } else if (originalQuestion.partType === 'PART4') {
      q.essayAnswerGuide = typeof parsed.essayAnswerGuide === 'string' ? cleanQuestionText(parsed.essayAnswerGuide.trim()) : '';
      if (Array.isArray(parsed.rubric)) {
        q.rubric = parsed.rubric.map((r: any) => ({
          criteria: typeof r.criteria === 'string' ? cleanQuestionText(r.criteria) : '',
          points: typeof r.points === 'number' ? r.points : 0.5,
          description: typeof r.description === 'string' ? cleanQuestionText(r.description) : '',
        }));
      }
    }

    if (onProgress) onProgress('Đã hoàn tất tạo câu hỏi mới!');

    return q;
  }
}

