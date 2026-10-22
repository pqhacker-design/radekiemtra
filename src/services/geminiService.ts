import { ExamMetadata, ExamPackage } from '../types';
import { PromptEngine } from './promptEngine';
import { ShuffleEngine } from './shuffleEngine';
import { ValidationEngine } from './validationEngine';
import { StorageEngine } from './storageEngine';
import { callGeminiApi } from './geminiClient';

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
}
