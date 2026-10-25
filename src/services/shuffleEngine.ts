import { CodeExam, ExamAnswerKey, ExamPackage, Question } from '../types';

/**
 * Fisher-Yates Shuffle helper
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Lấy ID gốc của câu hỏi để ánh xạ đồng nhất giữa các mã đề xáo trộn (101, 102, 103...)
 */
export function getBaseQuestionId(q: Question): string {
  if (q.baseQuestionId) return q.baseQuestionId;
  const match = q.id.match(/^(.*?)-c\d+-q\d+$/);
  if (match && match[1]) return match[1];
  return q.id;
}

export class ShuffleEngine {
  /**
   * Tạo bảng đáp án chuẩn cho một mã đề cụ thể
   */
  static buildAnswerKeyForExam(codeExam: CodeExam): ExamAnswerKey {
    const part1List = codeExam.questions.filter((q) => q.partType === 'PART1');
    const part2List = codeExam.questions.filter((q) => q.partType === 'PART2');
    const part3List = codeExam.questions.filter((q) => q.partType === 'PART3');
    const part4List = codeExam.questions.filter((q) => q.partType === 'PART4');

    return {
      code: codeExam.code,
      part1Answers: part1List.map((q) => ({
        questionNumber: q.number,
        correctOption: q.correctOption || 'A',
        points: q.points || 0.25,
      })),
      part2Answers: part2List.map((q) => ({
        questionNumber: q.number,
        statements: (q.trueFalseStatements || []).map((s) => ({
          key: s.key,
          isCorrect: s.isCorrect,
        })),
        points: q.points || 1.0,
      })),
      part3Answers: part3List.map((q) => ({
        questionNumber: q.number,
        shortAnswer: q.shortAnswer || '',
        points: q.points || 0.25,
      })),
      part4Answers: part4List.map((q) => ({
        questionNumber: q.number,
        essayAnswerGuide: q.essayAnswerGuide || '',
        points: typeof q.points === 'number' ? q.points : 1.0,
        rubric: q.rubric,
      })),
    };
  }

  /**
   * Sinh danh sách các mã đề và bảng đáp án tương ứng từ đề gốc (Mã 101)
   */
  static generateMultipleExamCodes(
    baseQuestions: Question[],
    codeCount: number = 1
  ): { exams: CodeExam[]; answerKeys: ExamAnswerKey[] } {
    const exams: CodeExam[] = [];

    // Phân loại các phần
    const part1List = baseQuestions.filter((q) => q.partType === 'PART1');
    const part2List = baseQuestions.filter((q) => q.partType === 'PART2');
    const part3List = baseQuestions.filter((q) => q.partType === 'PART3');
    const part4List = baseQuestions.filter((q) => q.partType === 'PART4');

    for (let index = 0; index < codeCount; index++) {
      // Mã đề: 101, 102, 103, ...
      const codeNumber = 101 + index;
      const examCodeStr = codeNumber.toString();

      let currentPart1 = [...part1List];
      let currentPart2 = [...part2List];
      let currentPart3 = [...part3List];
      let currentPart4 = [...part4List];

      // Đề gốc 101 giữ nguyên order, từ mã 102 trở đi thực hiện đảo
      if (index > 0) {
        currentPart1 = shuffleArray(currentPart1);
        currentPart2 = shuffleArray(currentPart2);
        currentPart3 = shuffleArray(currentPart3);
        currentPart4 = shuffleArray(currentPart4);
      }

      const finalQuestionsForCode: Question[] = [];

      // 1. Xử lý PHẦN I: Trắc nghiệm 4 phương án
      const processedPart1 = currentPart1.map((origQ, qIdx) => {
        const questionNumber = qIdx + 1;
        const rootId = origQ.baseQuestionId || origQ.id;
        let newOptions = origQ.options ? [...origQ.options] : [];
        let newCorrectOption = origQ.correctOption || 'A';

        if (index > 0 && newOptions.length === 4) {
          // Lấy nội dung phương án đúng cũ
          const oldCorrectContent = newOptions.find(
            (o) => o.key === origQ.correctOption
          )?.content;

          // Xáo trộn phương án
          const shuffledContents = shuffleArray(newOptions.map((o) => o.content));
          const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

          newOptions = keys.map((k, i) => ({
            key: k,
            content: shuffledContents[i],
          }));

          // Xác định key mới của phương án đúng
          if (oldCorrectContent) {
            const foundNew = newOptions.find((o) => o.content === oldCorrectContent);
            if (foundNew) {
              newCorrectOption = foundNew.key;
            }
          }
        }

        return {
          ...origQ,
          id: `${rootId}-c${examCodeStr}-q${questionNumber}`,
          baseQuestionId: rootId,
          number: questionNumber,
          options: newOptions,
          correctOption: newCorrectOption,
        };
      });
      finalQuestionsForCode.push(...processedPart1);

      // 2. Xử lý PHẦN II: Trắc nghiệm Đúng/Sai
      const processedPart2 = currentPart2.map((origQ, qIdx) => {
        const questionNumber = qIdx + 1;
        const rootId = origQ.baseQuestionId || origQ.id;
        let newStatements = origQ.trueFalseStatements
          ? [...origQ.trueFalseStatements]
          : [];

        if (index > 0 && newStatements.length === 4) {
          const shuffledItems = shuffleArray(newStatements);
          const keys: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
          newStatements = keys.map((k, i) => ({
            key: k,
            content: shuffledItems[i].content,
            isCorrect: shuffledItems[i].isCorrect,
          }));
        }

        return {
          ...origQ,
          id: `${rootId}-c${examCodeStr}-q${questionNumber}`,
          baseQuestionId: rootId,
          number: questionNumber,
          trueFalseStatements: newStatements,
        };
      });
      finalQuestionsForCode.push(...processedPart2);

      // 3. Xử lý PHẦN III: Trắc nghiệm Trả lời ngắn
      const processedPart3 = currentPart3.map((origQ, qIdx) => {
        const questionNumber = qIdx + 1;
        const rootId = origQ.baseQuestionId || origQ.id;
        return {
          ...origQ,
          id: `${rootId}-c${examCodeStr}-q${questionNumber}`,
          baseQuestionId: rootId,
          number: questionNumber,
        };
      });
      finalQuestionsForCode.push(...processedPart3);

      // 4. Xử lý PHẦN IV: Tự luận
      const processedPart4 = currentPart4.map((origQ, qIdx) => {
        const questionNumber = qIdx + 1;
        const rootId = origQ.baseQuestionId || origQ.id;
        return {
          ...origQ,
          id: `${rootId}-c${examCodeStr}-q${questionNumber}`,
          baseQuestionId: rootId,
          number: questionNumber,
        };
      });
      finalQuestionsForCode.push(...processedPart4);

      exams.push({
        code: examCodeStr,
        questions: finalQuestionsForCode,
      });
    }

    const answerKeys = exams.map((ex) => ShuffleEngine.buildAnswerKeyForExam(ex));

    return { exams, answerKeys };
  }

  /**
   * Cập nhật một câu hỏi vừa được AI tạo lại đồng thời vào tất cả các mã đề đảo (101, 102, 103...)
   * Đảm bảo:
   * - Giữ nguyên thứ tự câu hỏi và số thứ tự riêng của từng mã đề
   * - Tự động xáo trộn phương án A,B,C,D (Phần I) hoặc ý a,b,c,d (Phần II) cho các mã đề 102 trở đi
   * - Đồng bộ cập nhật toàn bộ bảng đáp án (Answer Keys) cho mọi mã đề
   */
  static updateRegeneratedQuestionInExamPackage(
    examPackage: ExamPackage,
    originalQuestion: Question,
    newQuestion: Question
  ): ExamPackage {
    const targetBaseId = getBaseQuestionId(originalQuestion);
    const rootId = targetBaseId || newQuestion.id || `q_${Date.now()}`;

    // Cập nhật từng mã đề
    const updatedExams: CodeExam[] = examPackage.exams.map((exam, examIdx) => {
      // Tìm vị trí câu hỏi tương ứng trong mã đề này
      const qIndex = exam.questions.findIndex((q) => {
        if (q.baseQuestionId && targetBaseId && q.baseQuestionId === targetBaseId) {
          return true;
        }
        if (getBaseQuestionId(q) === targetBaseId) {
          return true;
        }
        if (q.id === originalQuestion.id) {
          return true;
        }
        if (examIdx === 0 && q.partType === originalQuestion.partType && q.number === originalQuestion.number) {
          return true;
        }
        return false;
      });

      if (qIndex === -1) {
        return exam;
      }

      const existingQ = exam.questions[qIndex];

      // Với đề gốc 101 (examIdx === 0): Giữ nguyên thứ tự các phương án như AI sinh
      if (examIdx === 0) {
        const updatedBaseQ: Question = {
          ...newQuestion,
          id: existingQ.id,
          baseQuestionId: rootId,
          number: existingQ.number,
          partType: existingQ.partType,
          partTitle: existingQ.partTitle,
          points: newQuestion.points ?? existingQ.points,
        };

        const newQuestions = [...exam.questions];
        newQuestions[qIndex] = updatedBaseQ;
        return {
          ...exam,
          questions: newQuestions,
        };
      }

      // Với các mã đề đảo khác (Mã 102, 103...):
      // Đảo phương án A, B, C, D (Phần I) hoặc ý a, b, c, d (Phần II) để đảm bảo tính độc lập chống gian lận
      let newOptions = newQuestion.options ? [...newQuestion.options] : undefined;
      let newCorrectOption = newQuestion.correctOption || 'A';

      if (newQuestion.partType === 'PART1' && newOptions && newOptions.length === 4) {
        const oldCorrectContent = newOptions.find((o) => o.key === newQuestion.correctOption)?.content;
        const shuffledContents = shuffleArray(newOptions.map((o) => o.content));
        const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

        newOptions = keys.map((k, i) => ({
          key: k,
          content: shuffledContents[i],
        }));

        if (oldCorrectContent) {
          const found = newOptions.find((o) => o.content === oldCorrectContent);
          if (found) {
            newCorrectOption = found.key;
          }
        }
      }

      let newStatements = newQuestion.trueFalseStatements
        ? [...newQuestion.trueFalseStatements]
        : undefined;

      if (newQuestion.partType === 'PART2' && newStatements && newStatements.length === 4) {
        const shuffledItems = shuffleArray(newStatements);
        const keys: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
        newStatements = keys.map((k, i) => ({
          key: k,
          content: shuffledItems[i].content,
          isCorrect: shuffledItems[i].isCorrect,
        }));
      }

      const updatedShuffledQ: Question = {
        ...newQuestion,
        id: existingQ.id,
        baseQuestionId: rootId,
        number: existingQ.number,
        partType: existingQ.partType,
        partTitle: existingQ.partTitle,
        points: newQuestion.points ?? existingQ.points,
        options: newOptions,
        correctOption: newCorrectOption,
        trueFalseStatements: newStatements,
        shortAnswer: newQuestion.shortAnswer,
        essayAnswerGuide: newQuestion.essayAnswerGuide,
        rubric: newQuestion.rubric,
      };

      const newQuestions = [...exam.questions];
      newQuestions[qIndex] = updatedShuffledQ;
      return {
        ...exam,
        questions: newQuestions,
      };
    });

    // Làm mới đồng bộ toàn bộ bảng đáp án cho mọi mã đề
    const updatedAnswerKeys = updatedExams.map((ex) => ShuffleEngine.buildAnswerKeyForExam(ex));

    return {
      ...examPackage,
      exams: updatedExams,
      answerKeys: updatedAnswerKeys,
    };
  }
}

