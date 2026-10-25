import { ExamMetadata, MatrixRow, Question, SpecRow, calculateExamScores } from '../types';
import { safeJsonParse } from './jsonRepair';
import { normalizeNewlines, parseRequirementsByLevel, combineRequirementsByLevel } from '../utils/textUtils';
import { inferQuestionCompetency } from '../utils/competencyUtils';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  matrix: MatrixRow[];
  specification: SpecRow[];
  questions: Question[];
}

export function cleanQuestionText(text: string): string {
  if (!text) return text;
  let str = normalizeNewlines(text);

  // 1. Loại bỏ các nhãn mã mức độ thừa như [NB_TL], [TH_TL], [VD_TL], [VDC_TL], [NB_TN], [NB],...
  str = str.replace(/\s*\[(NB|TH|VD|VDC|REMEMBER|UNDERSTAND|APPLY|ADVANCED)(_(TL|TN|TF|SA))?\]\s*/gi, ' ');

  // 1a. Sửa lỗi AI dùng TeX Greek letter / backslash trước tiếng Việt (như \Chi ều -> Chiều, \Di ện -> Diện)
  str = str.replace(/\\Chi\s*ều\b/gi, 'Chiều');
  str = str.replace(/\\chi\s*ều\b/gi, 'chiều');
  str = str.replace(/X\s*ều\b/g, 'Chiều');
  str = str.replace(/\\Di\s*ện\b/gi, 'Diện');
  str = str.replace(/\\di\s*ện\b/gi, 'diện');

  // 1b. Dọn dẹp các dấu gạch chéo ngược thừa dính vào trước từ tiếng Việt
  str = str.replace(/\\([A-Za-z]*[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ][A-Za-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)/g, '$1');

  // 2. Chuyển mã TeX accent / \text{} đặc biệt sang Unicode Tiếng Việt chuẩn
  str = str.replace(/\\text\{\\dh\}/gi, 'đ');
  str = str.replace(/\\text\{\\DH\}/gi, 'Đ');
  str = str.replace(/\\text\{\\textquoteright\}/gi, "'");
  str = str.replace(/\\text\{\\underline\{u\}\}/gi, 'ư');
  str = str.replace(/\\text\{\\hat\{o\}\}/gi, 'ô');
  str = str.replace(/\\text\{\\hat\{e\}\}/gi, 'ê');
  str = str.replace(/\\text\{\\hat\{a\}\}/gi, 'â');
  str = str.replace(/v\\grave\{?a\}?/gi, 'và');
  str = str.replace(/c\\'o/gi, 'có');
  str = str.replace(/c\\'a/gi, 'cá');
  str = str.replace(/b\\`ang/gi, 'bằng');

  // 3. Xử lý khoảng trắng quanh dấu phẩy phẩy biến số phẩy (A 'B' -> A'B', A ' -> A')
  str = str.replace(/([A-Z])\s+'\s*([A-Z])/g, "$1'$2");
  str = str.replace(/([A-Z])\s+'/g, "$1'");

  // 4. Làm sạch \text{ cm}, extcm, \text{ kg}, extkg ở văn bản thường
  str = str.replace(/(\d+)\s*(?:\\text\{\s*cm\s*\}|extcm\b)/g, '$1 cm');
  str = str.replace(/\\text\{\s*cm\s*\}/g, 'cm');
  str = str.replace(/(\d+)\s*(?:\\text\{\s*kg\s*\}|extkg\b)/g, '$1 kg');
  str = str.replace(/\\text\{\s*kg\s*\}/g, 'kg');
  str = str.replace(/(\d+)\s*(?:\\text\{\s*m\s*\}|extm\b)/g, '$1 m');
  str = str.replace(/\\text\{\s*m\s*\}/g, 'm');

  // 5. Tách từ tiếng Việt dính vào biến số toán học (sử dụng a-z chuẩn)
  str = str.replace(/([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])([A-Z]{1,4}\b)/g, '$1 $2');
  str = str.replace(/([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])(\d+)/g, '$1 $2');
  str = str.replace(/(\d+)\s*cm([a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])/g, '$1 cm $2');

  // 6a. Chuẩn hóa nhiệt độ độ C: -1{,}8\circC, 25^\circC, 25 ^\circ C, 25° C -> 25°C
  str = str.replace(/(-?\d+(?:(?:[.,]|\{,\})\d+)?)\s*(?:\\?\^?\{?\\?circ\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|C\b)|\^\s*°\s*C\b|°\s*C\b)/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°C`;
  });

  // 6b. Chuẩn hóa góc độ: 60\circ, 50\circ -> 50°
  str = str.replace(/([0-9]+(?:[.,{}]\d+)?)\s*(?:\\\^?\{?circ\}?|\^\s*°|°)(?!\s*[a-zA-Z])/g, (m, num) => {
    const cleanNum = num.replace(/\{,\}/g, ',');
    return `${cleanNum}°`;
  });

  // 7. Chuyển đổi các dấu xuống dòng kiểu LaTeX '\\' còn sót NGOÀI khối công thức toán thành ngắt dòng thực sự '\n'
  const mathBlockRegex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|\\begin\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\}[\s\S]*?\\end\{(?:cases|aligned|array|matrix|pmatrix|bmatrix)\})/g;
  const parts = str.split(mathBlockRegex);
  for (let i = 0; i < parts.length; i += 2) {
    if (!parts[i]) continue;
    let p = parts[i];
    p = p.replace(/\\+([0-9]+[.)])/g, '\n$1');
    p = p.replace(/\\+([a-zA-Z][.)])/g, '\n$1');
    p = p.replace(/\\\\+/g, '\n');
    parts[i] = p;
  }
  str = parts.join('');

  return str.trim();
}

export class ValidationEngine {
  /**
   * Phân tích và kiểm tra tính hợp lệ của JSON do AI trả về
   */
  static validateAndRepair(
    rawText: string,
    metadata: ExamMetadata
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    let parsed: any = null;

    try {
      parsed = safeJsonParse(rawText);
    } catch (e: any) {
      errors.push(e.message || 'Dữ liệu AI trả về không phải định dạng JSON hợp lệ.');
      return {
        isValid: false,
        errors,
        warnings,
        matrix: [],
        specification: [],
        questions: [],
      };
    }

    const rawMatrix = Array.isArray(parsed.matrix) ? parsed.matrix : [];
    const rawSpec = Array.isArray(parsed.specification)
      ? parsed.specification
      : [];
    // Trích xuất linh hoạt mảng rawQuestions từ mọi cấu trúc có thể có từ AI
    let rawQuestions: any[] = [];
    if (Array.isArray(parsed)) {
      rawQuestions = parsed;
    } else if (Array.isArray(parsed.questions)) {
      rawQuestions = parsed.questions;
    } else if (parsed.questions && typeof parsed.questions === 'object') {
      const vals = Object.values(parsed.questions);
      for (const v of vals) {
        if (Array.isArray(v)) {
          rawQuestions.push(...v);
        } else if (v && typeof v === 'object') {
          rawQuestions.push(v);
        }
      }
    } else if (Array.isArray(parsed.part1) || Array.isArray(parsed.part2) || Array.isArray(parsed.part3) || Array.isArray(parsed.part4)) {
      if (Array.isArray(parsed.part1)) rawQuestions.push(...parsed.part1.map((q: any) => ({ ...q, partType: 'PART1' })));
      if (Array.isArray(parsed.part2)) rawQuestions.push(...parsed.part2.map((q: any) => ({ ...q, partType: 'PART2' })));
      if (Array.isArray(parsed.part3)) rawQuestions.push(...parsed.part3.map((q: any) => ({ ...q, partType: 'PART3' })));
      if (Array.isArray(parsed.part4)) rawQuestions.push(...parsed.part4.map((q: any) => ({ ...q, partType: 'PART4' })));
    } else if (Array.isArray(parsed.exam?.questions)) {
      rawQuestions = parsed.exam.questions;
    } else if (Array.isArray(parsed.data?.questions)) {
      rawQuestions = parsed.data.questions;
    } else if (Array.isArray(parsed.test?.questions)) {
      rawQuestions = parsed.test.questions;
    } else if (Array.isArray(parsed.danhSachCauHoi)) {
      rawQuestions = parsed.danhSachCauHoi;
    } else if (Array.isArray(parsed.cauHoi)) {
      rawQuestions = parsed.cauHoi;
    } else if (Array.isArray(parsed.items)) {
      rawQuestions = parsed.items;
    } else if (Array.isArray(parsed.deThi?.questions)) {
      rawQuestions = parsed.deThi.questions;
    } else if (Array.isArray(parsed.deKiemTra?.questions)) {
      rawQuestions = parsed.deKiemTra.questions;
    }

    // 1. Kiểm tra danh sách câu hỏi
    const repairedQuestions: Question[] = [];
    const { part1_MCQSingle, part2_MCQTrueFalse, part3_MCQShort, part4_Essay } =
      metadata.questionCounts;

    const hasCustomMatrix = Boolean(
      (metadata.customMatrixContext && metadata.customMatrixContext.trim()) ||
      (metadata.customMatrixImages && metadata.customMatrixImages.length > 0) ||
      (metadata.customSpecContext && metadata.customSpecContext.trim()) ||
      (metadata.customSpecImages && metadata.customSpecImages.length > 0) ||
      metadata.matrixInputMode === 'spec'
    );

    const part1Questions = rawQuestions.filter((q) => q.partType === 'PART1');
    const part2Questions = rawQuestions.filter((q) => q.partType === 'PART2');
    const part3Questions = rawQuestions.filter((q) => q.partType === 'PART3');
    const part4Questions = rawQuestions.filter((q) => q.partType === 'PART4');

    if (!hasCustomMatrix) {
      if (part1Questions.length !== part1_MCQSingle) {
        warnings.push(
          `Số câu Phần I khác yêu cầu (Cần: ${part1_MCQSingle}, Nhận được: ${part1Questions.length}).`
        );
      }
      if (part2Questions.length !== part2_MCQTrueFalse) {
        warnings.push(
          `Số câu Phần II khác yêu cầu (Cần: ${part2_MCQTrueFalse}, Nhận được: ${part2Questions.length}).`
        );
      }
      if (part3Questions.length !== part3_MCQShort) {
        warnings.push(
          `Số câu Phần III khác yêu cầu (Cần: ${part3_MCQShort}, Nhận được: ${part3Questions.length}).`
        );
      }
      if (part4Questions.length !== part4_Essay) {
        warnings.push(
          `Số câu Phần IV khác yêu cầu (Cần: ${part4_Essay}, Nhận được: ${part4Questions.length}).`
        );
      }
    }

    // Đánh số lại câu hỏi theo từng phần
    let p1Num = 1;
    let p2Num = 1;
    let p3Num = 1;
    let p4Num = 1;

    for (const rawItem of rawQuestions) {
      if (!rawItem) continue;
      let q = rawItem;

      // Hỗ trợ trường hợp AI trả về mảng chuỗi văn bản câu hỏi
      if (typeof q === 'string') {
        const strQ = q.trim();
        const optMatch = strQ.match(/^([\s\S]*?)(?:[\n\r]+|\s{2,})(?:A[\.\)]\s*)([\s\S]*?)(?:[\n\r]+|\s{2,})(?:B[\.\)]\s*)([\s\S]*?)(?:[\n\r]+|\s{2,})(?:C[\.\)]\s*)([\s\S]*?)(?:[\n\r]+|\s{2,})(?:D[\.\)]\s*)([\s\S]*)$/i);
        if (optMatch) {
          q = {
            content: optMatch[1].trim(),
            partType: 'PART1',
            options: [
              { key: 'A', content: optMatch[2].trim() },
              { key: 'B', content: optMatch[3].trim() },
              { key: 'C', content: optMatch[4].trim() },
              { key: 'D', content: optMatch[5].trim() },
            ],
          };
        } else {
          q = { content: strQ };
        }
      } else if (Array.isArray(q)) {
        q = {
          content: q[0],
          options: q.slice(1),
        };
      }

      const partType = q.partType || (
        q.type === 'TF' ? 'PART2' :
        q.type === 'SA' ? 'PART3' :
        q.type === 'ESSAY' ? 'PART4' : 'PART1'
      );

      let num = p1Num++;
      if (partType === 'PART2') num = p2Num++;
      else if (partType === 'PART3') num = p3Num++;
      else if (partType === 'PART4') num = p4Num++;

      let calculatedPoint = 0.25;
      if (hasCustomMatrix && typeof q.points === 'number' && q.points > 0) {
        calculatedPoint = q.points;
      } else if (partType === 'PART1') {
        calculatedPoint = metadata.questionCounts.part1_PointsPerQuestion ?? (typeof q.points === 'number' && q.points > 0 ? q.points : 0.25);
      } else if (partType === 'PART2') {
        calculatedPoint = metadata.questionCounts.part2_PointsPerQuestion ?? (typeof q.points === 'number' && q.points > 0 ? q.points : 1.0);
      } else if (partType === 'PART3') {
        calculatedPoint = metadata.questionCounts.part3_PointsPerQuestion ?? (typeof q.points === 'number' && q.points > 0 ? q.points : 0.5);
      } else if (partType === 'PART4') {
        calculatedPoint = typeof q.points === 'number' && q.points > 0
          ? q.points
          : (q.cognitiveLevel === 'ADVANCED' || q.cognitiveLevel === 'VDC'
              ? metadata.questionCounts.part4_AdvancedPoints ?? 1.0
              : 1.0);
      }

      // Tìm kiếm nội dung câu hỏi từ mọi trường có thể (tránh lỗi lấy số thứ tự 0, 1)
      let resolvedContent = '';
      const candidateContentFields = [
        q.content,
        q.question,
        q.questionText,
        q.prompt,
        q.stem,
        q.text,
        q.cauHoi,
        q.noiDung,
        q.noiDungCauHoi,
        q.deBai,
        q.title,
        q.body,
        q.problem,
        q.statement,
        q.description,
        q.detail,
      ];

      for (const cand of candidateContentFields) {
        if (cand !== undefined && cand !== null) {
          const candStr = String(cand).trim();
          // Bỏ qua nếu rỗng hoặc chỉ là số đơn thuần như "0", "1", "2"
          if (candStr.length > 0 && !/^\d+$/.test(candStr)) {
            resolvedContent = candStr;
            break;
          }
        }
      }

      if (!resolvedContent) {
        if (typeof q.content === 'string' && q.content.trim() && !/^\d+$/.test(q.content.trim())) {
          resolvedContent = q.content.trim();
        } else if (typeof q.explanation === 'string' && q.explanation.trim()) {
          resolvedContent = q.explanation.trim();
        } else {
          resolvedContent = 'Nội dung câu hỏi chưa cập nhật.';
        }
        if (/^\d+$/.test(resolvedContent) || resolvedContent === 'Nội dung câu hỏi chưa cập nhật.') {
          errors.push(`Câu ${num} (${partType}) thiếu nội dung câu hỏi hoặc AI chỉ trả về số thứ tự ("${resolvedContent}").`);
        }
      }

      const validQuestion: Question = {
        id: q.id || `gen-q-${Math.random().toString(36).substring(2, 9)}`,
        partType: partType,
        partTitle:
          q.partTitle ||
          (partType === 'PART1'
            ? 'PHẦN I. Câu hỏi trắc nghiệm nhiều phương án lựa chọn'
            : partType === 'PART2'
            ? 'PHẦN II. Câu hỏi trắc nghiệm Đúng/Sai'
            : partType === 'PART3'
            ? 'PHẦN III. Câu hỏi trắc nghiệm trả lời ngắn'
            : 'PHẦN IV. Tự luận'),
        number: num,
        content: cleanQuestionText(resolvedContent),
        cognitiveLevel: q.cognitiveLevel || 'REMEMBER',
        points: calculatedPoint,
        topic: q.topic || metadata.chapterTitle || 'Kiến thức chung',
        competency: q.competency || inferQuestionCompetency(metadata.subject, partType, q.cognitiveLevel || 'REMEMBER', q.topic || metadata.chapterTitle).name,
        competencyCode: q.competencyCode || inferQuestionCompetency(metadata.subject, partType, q.cognitiveLevel || 'REMEMBER', q.topic || metadata.chapterTitle).code,
        explanation: cleanQuestionText(q.explanation || q.solution || q.guide || q.loiGiai || ''),
        svgDiagram: q.svgDiagram || undefined,
        solutionDiagramSvg: q.solutionDiagramSvg || undefined,
      };

      if (partType === 'PART1') {
        let validOptions: { key: 'A' | 'B' | 'C' | 'D'; content: string }[] = [];
        const rawOpts = q.options || q.choices || q.answers || q.phuongAn || q.dapAn || q.luaChon;

        if (Array.isArray(rawOpts) && rawOpts.length > 0) {
          validOptions = rawOpts.slice(0, 4).map((opt: any, index: number) => {
            const defaultKey = String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D';
            if (typeof opt === 'string') {
              const cleaned = opt.replace(/^[A-Da-d][.)]\s*/, '').trim();
              return { key: defaultKey, content: cleanQuestionText(cleaned || opt) };
            }
            const key = (opt.key || opt.label || opt.option || defaultKey).toUpperCase() as 'A' | 'B' | 'C' | 'D';
            const optContent = opt.content || opt.text || opt.value || opt.noiDung || opt.title || '';
            return {
              key: ['A', 'B', 'C', 'D'].includes(key) ? key : defaultKey,
              content: cleanQuestionText(String(optContent || '')),
            };
          });
        } else if (rawOpts && typeof rawOpts === 'object' && !Array.isArray(rawOpts)) {
          // Đối tượng dạng { "A": "...", "B": "...", "C": "...", "D": "..." }
          const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
          validOptions = keys.map((k) => ({
            key: k,
            content: cleanQuestionText(String(rawOpts[k] || rawOpts[k.toLowerCase()] || '')),
          }));
        }

        // Bổ sung các phương án còn thiếu nếu có ít hơn 4 phương án nhưng không ghi đè các phương án thật đã có
        const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < 4; i++) {
          if (!validOptions[i] || !validOptions[i].content) {
            validOptions[i] = {
              key: letters[i],
              content: validOptions[i]?.content || `Phương án ${letters[i]}`,
            };
          }
        }

        // Kiểm tra xem phương án có bị rỗng hoàn toàn hoặc 100% placeholder không
        const arePlaceholders = validOptions.every((opt) =>
          !opt.content ||
          opt.content.trim() === '' ||
          /^phương án\s+[a-d]$/i.test(opt.content.trim())
        );

        if (arePlaceholders) {
          errors.push(`Câu ${num} (Phần I) thiếu nội dung phương án A, B, C, D (AI không sinh các phương án cụ thể).`);
        }
        validQuestion.options = validOptions;

        const rawCorrect = q.correctOption || q.correctAnswer || q.answer || q.dapAn || q.dapAnDung || 'A';
        const matchedKey = String(rawCorrect).trim().toUpperCase().match(/[A-D]/);
        validQuestion.correctOption = (matchedKey ? matchedKey[0] : 'A') as 'A' | 'B' | 'C' | 'D';
      } else if (partType === 'PART2') {
        const rawTF = q.trueFalseStatements || q.statements || q.yDungSai || q.y || q.items || [];
        if (Array.isArray(rawTF) && rawTF.length >= 1) {
          validQuestion.trueFalseStatements = rawTF.slice(0, 4).map((tf: any, index: number) => {
            const defaultKey = String.fromCharCode(97 + index) as 'a' | 'b' | 'c' | 'd';
            if (typeof tf === 'string') {
              const cleaned = tf.replace(/^[a-da-d][.)]\s*/, '').trim();
              return { key: defaultKey, content: cleanQuestionText(cleaned || tf), isCorrect: true };
            }
            return {
              key: (tf.key || defaultKey).toLowerCase(),
              content: cleanQuestionText(tf.content || tf.text || tf.statement || ''),
              isCorrect: typeof tf.isCorrect === 'boolean' ? tf.isCorrect : true,
            };
          });
        } else {
          errors.push(`Câu ${num} (Phần II) thiếu 4 ý Đúng/Sai.`);
          validQuestion.trueFalseStatements = [
            { key: 'a', content: 'Ý a', isCorrect: true },
            { key: 'b', content: 'Ý b', isCorrect: false },
            { key: 'c', content: 'Ý c', isCorrect: true },
            { key: 'd', content: 'Ý d', isCorrect: false },
          ];
        }
      } else if (partType === 'PART3') {
        const ans = q.shortAnswer || q.answer || q.correctAnswer || q.dapAn || q.dapAnNgan || '1';
        validQuestion.shortAnswer = cleanQuestionText(String(ans));
      } else if (partType === 'PART4') {
        const guide = q.essayAnswerGuide || q.answerGuide || q.explanation || q.solution || q.huongDanCham || 'Hướng dẫn chấm...';
        validQuestion.essayAnswerGuide = cleanQuestionText(String(guide));
        validQuestion.rubric = Array.isArray(q.rubric || q.rubrics || q.thangDiem)
          ? (q.rubric || q.rubrics || q.thangDiem).map((r: any) => ({
              ...r,
              criteria: cleanQuestionText(r.criteria || r.tieuChi || ''),
              description: cleanQuestionText(r.description || r.moTa || ''),
              points: typeof r.points === 'number' ? r.points : Number(r.points) || 0.5,
            }))
          : [];
      }

      repairedQuestions.push(validQuestion);
    }

    if (repairedQuestions.length === 0) {
      errors.push('AI không sinh ra bất kỳ câu hỏi nào trong đề thi.');
    }

    // 1b. ĐẢM BẢO TỔNG ĐIỂM TOÀN ĐỀ THI VÀ PHẦN TỰ LUẬN CHÍNH XÁC 10.0 ĐIỂM
    const part4List = repairedQuestions.filter((q) => q.partType === 'PART4');
    if (part4List.length > 0) {
      const p1Sum = repairedQuestions
        .filter((q) => q.partType === 'PART1')
        .reduce((sum, q) => sum + (q.points || 0), 0);
      const p2Sum = repairedQuestions
        .filter((q) => q.partType === 'PART2')
        .reduce((sum, q) => sum + (q.points || 0), 0);
      const p3Sum = repairedQuestions
        .filter((q) => q.partType === 'PART3')
        .reduce((sum, q) => sum + (q.points || 0), 0);

      const targetP4Total = Math.max(0, Math.round((10.0 - (p1Sum + p2Sum + p3Sum)) * 100) / 100);
      const currentP4Sum = part4List.reduce((sum, q) => sum + (q.points || 0), 0);

      // Nếu tổng điểm phần tự luận bị lệch so với 10.0 điểm, tự động cân bằng chính xác
      if (Math.abs(currentP4Sum - targetP4Total) > 0.01) {
        const examScoreConfig = calculateExamScores(metadata.questionCounts);
        const configuredAdvPoints = metadata.questionCounts.part4_AdvancedPoints ?? examScoreConfig.advPts;
        const configuredApplyPoints = examScoreConfig.applyPts;

        let accumulated = 0;
        part4List.forEach((q, idx) => {
          if (idx === part4List.length - 1) {
            // Câu cuối cùng bù trừ để tổng đạt chính xác targetP4Total
            const finalPts = Math.max(0.25, Math.round((targetP4Total - accumulated) * 100) / 100);
            q.points = finalPts;
          } else {
            const isAdv = q.cognitiveLevel === 'ADVANCED' || (q.cognitiveLevel as any) === 'VDC';
            const defaultPt = isAdv ? configuredAdvPoints : configuredApplyPoints;
            const assignedPt = Math.max(0.25, Math.round((defaultPt || (targetP4Total / part4List.length)) * 100) / 100);
            q.points = assignedPt;
            accumulated += assignedPt;
          }

          // Cân bằng lại rubric của câu tự luận nếu có để khớp với points của câu
          if (Array.isArray(q.rubric) && q.rubric.length > 0) {
            const currentRubricSum = q.rubric.reduce((s, r) => s + (Number(r.points) || 0), 0);
            if (currentRubricSum > 0 && Math.abs(currentRubricSum - q.points) > 0.01) {
              const ratio = q.points / currentRubricSum;
              let rAccum = 0;
              q.rubric.forEach((r, rIdx) => {
                if (rIdx === q.rubric!.length - 1) {
                  r.points = Math.round((q.points! - rAccum) * 100) / 100;
                } else {
                  const p = Math.round((Number(r.points) * ratio) * 100) / 100;
                  r.points = p;
                  rAccum += p;
                }
              });
            }
          }
        });
      }
    }

    // 2. KHỞI TẠO VÀ CHUẨN HÓA CÁC ĐƠN VỊ KIẾN THỨC CHO MA TRẬN & BẢN ĐẶC TẢ
    let processedMatrix: MatrixRow[] = [];
    let processedSpec: SpecRow[] = [];

    // Kiểm tra xem AI có trả về ma trận với nhiều đơn vị kiến thức riêng biệt không
    const hasDifferentiatedMatrix =
      Array.isArray(rawMatrix) &&
      rawMatrix.length > 1 &&
      rawMatrix.some((m: any) => m.subTopic && m.subTopic.trim() !== (rawMatrix[0]?.subTopic || '').trim());

    if (hasDifferentiatedMatrix) {
      processedMatrix = rawMatrix.map((m: any, idx: number) => ({
        stt: m.stt || idx + 1,
        topic: m.topic || metadata.chapterTitle || 'Chủ đề chính',
        subTopic: m.subTopic || `Đơn vị kiến thức ${idx + 1}`,
        part1: m.part1 || { remember: '', understand: '', apply: '', advanced: '' },
        part2: m.part2 || { remember: '', understand: '', apply: '', advanced: '' },
        part3: m.part3 || { remember: '', understand: '', apply: '', advanced: '' },
        part4: m.part4 || { remember: '', understand: '', apply: '', advanced: '' },
        totalQuestions: typeof m.totalQuestions === 'number' ? m.totalQuestions : 0,
        totalPoints: typeof m.totalPoints === 'number' ? m.totalPoints : 0,
        percentage: typeof m.percentage === 'number' ? m.percentage : 0,
      }));
    } else {
      // Phân tách đơn vị kiến thức tự động dựa trên danh sách câu hỏi thực tế hoặc topic câu hỏi
      const topicGroups = new Map<string, Question[]>();
      repairedQuestions.forEach((q) => {
        const top = (q.topic || '').trim() || metadata.chapterTitle || 'Kiến thức trọng tâm';
        if (!topicGroups.has(top)) {
          topicGroups.set(top, []);
        }
        topicGroups.get(top)!.push(q);
      });

      // Nếu chỉ có 1 topic duy nhất nhưng có nhiều câu hỏi (>= 4), tự động phân chia thành các đơn vị kiến thức logic
      if (topicGroups.size <= 1 && repairedQuestions.length >= 4) {
        const chapter = metadata.chapterTitle || 'Chuyên đề học tập';
        const partsCount = Math.min(3, Math.ceil(repairedQuestions.length / 4));
        const chunkSize = Math.ceil(repairedQuestions.length / partsCount);

        const subNames = [
          'Khái niệm, định nghĩa và tính chất cơ bản',
          'Các quy tắc tính toán và biến đổi kiến thức trọng tâm',
          'Ứng dụng giải bài tập và giải quyết tình huống thực tế',
        ];

        processedMatrix = Array.from({ length: partsCount }, (_, idx) => {
          const qsSlice = repairedQuestions.slice(idx * chunkSize, (idx + 1) * chunkSize);
          const p1Remember = qsSlice.filter((q) => q.partType === 'PART1' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p1Understand = qsSlice.filter((q) => q.partType === 'PART1' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p1Apply = qsSlice.filter((q) => q.partType === 'PART1' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const p2Remember = qsSlice.filter((q) => q.partType === 'PART2' && q.cognitiveLevel === 'REMEMBER').map((q) => `${q.number}`).join(', ');
          const p2Understand = qsSlice.filter((q) => q.partType === 'PART2' && q.cognitiveLevel === 'UNDERSTAND').map((q) => `${q.number}`).join(', ');
          const p2Apply = qsSlice.filter((q) => q.partType === 'PART2' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => `${q.number}`).join(', ');

          const p3Remember = qsSlice.filter((q) => q.partType === 'PART3' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p3Understand = qsSlice.filter((q) => q.partType === 'PART3' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p3Apply = qsSlice.filter((q) => q.partType === 'PART3' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const p4Remember = qsSlice.filter((q) => q.partType === 'PART4' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p4Understand = qsSlice.filter((q) => q.partType === 'PART4' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p4Apply = qsSlice.filter((q) => q.partType === 'PART4' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const slicePts = Math.round(qsSlice.reduce((s, q) => s + (q.points || 0), 0) * 100) / 100;

          return {
            stt: idx + 1,
            topic: chapter,
            subTopic: subNames[idx] || `Đơn vị kiến thức ${idx + 1}`,
            part1: { remember: p1Remember, understand: p1Understand, apply: p1Apply },
            part2: { remember: p2Remember, understand: p2Understand, apply: p2Apply },
            part3: { remember: p3Remember, understand: p3Understand, apply: p3Apply },
            part4: { remember: p4Remember, understand: p4Understand, apply: p4Apply },
            totalQuestions: qsSlice.length,
            totalPoints: slicePts,
            percentage: Math.round((slicePts / 10.0) * 100),
          };
        });
      } else {
        let stt = 1;
        topicGroups.forEach((qs, topName) => {
          const p1Remember = qs.filter((q) => q.partType === 'PART1' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p1Understand = qs.filter((q) => q.partType === 'PART1' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p1Apply = qs.filter((q) => q.partType === 'PART1' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const p2Remember = qs.filter((q) => q.partType === 'PART2' && q.cognitiveLevel === 'REMEMBER').map((q) => `${q.number}`).join(', ');
          const p2Understand = qs.filter((q) => q.partType === 'PART2' && q.cognitiveLevel === 'UNDERSTAND').map((q) => `${q.number}`).join(', ');
          const p2Apply = qs.filter((q) => q.partType === 'PART2' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => `${q.number}`).join(', ');

          const p3Remember = qs.filter((q) => q.partType === 'PART3' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p3Understand = qs.filter((q) => q.partType === 'PART3' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p3Apply = qs.filter((q) => q.partType === 'PART3' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const p4Remember = qs.filter((q) => q.partType === 'PART4' && q.cognitiveLevel === 'REMEMBER').map((q) => q.number).join(', ');
          const p4Understand = qs.filter((q) => q.partType === 'PART4' && q.cognitiveLevel === 'UNDERSTAND').map((q) => q.number).join(', ');
          const p4Apply = qs.filter((q) => q.partType === 'PART4' && (q.cognitiveLevel === 'APPLY' || q.cognitiveLevel === 'ADVANCED')).map((q) => q.number).join(', ');

          const pts = Math.round(qs.reduce((s, q) => s + (q.points || 0), 0) * 100) / 100;

          processedMatrix.push({
            stt: stt++,
            topic: metadata.chapterTitle || 'Chủ đề chính',
            subTopic: topName,
            part1: { remember: p1Remember, understand: p1Understand, apply: p1Apply },
            part2: { remember: p2Remember, understand: p2Understand, apply: p2Apply },
            part3: { remember: p3Remember, understand: p3Understand, apply: p3Apply },
            part4: { remember: p4Remember, understand: p4Understand, apply: p4Apply },
            totalQuestions: qs.length,
            totalPoints: pts,
            percentage: Math.round((pts / 10.0) * 100),
          });
        });
      }
    }

    // Xây dựng Bản Đặc Tả (Specification) khớp chính xác với từng đơn vị kiến thức của Ma Trận
    // và nêu đầy đủ các Yêu cầu cần đạt ở các mức độ theo đúng Công văn 7991/BGDĐT
    processedSpec = processedMatrix.map((mRow, idx) => {
      const matchedRawSpec = rawSpec.find(
        (s: any) =>
          (s.subTopic && s.subTopic.trim().toLowerCase() === mRow.subTopic.trim().toLowerCase()) ||
          s.stt === mRow.stt
      ) || rawSpec[idx];

      const rawReqText = cleanQuestionText(matchedRawSpec?.requirements || '');
      const parsedReq = parseRequirementsByLevel(rawReqText);

      const subName = mRow.subTopic || `Đơn vị kiến thức ${mRow.stt}`;
      const rememberText = parsedReq.remember.trim() || `Nhận biết và phát biểu được các khái niệm, quy tắc, định nghĩa cơ bản về ${subName}.`;
      const understandText = parsedReq.understand.trim() || `Thông hiểu bản chất, giải thích được ý nghĩa và áp dụng trực tiếp các kiến thức về ${subName}.`;
      const applyText = parsedReq.apply.trim() || `Vận dụng linh hoạt các phương pháp, công thức về ${subName} để tính toán, giải quyết bài toán và liên hệ tình huống thực tế.`;

      const formattedReq = combineRequirementsByLevel({
        remember: rememberText,
        understand: understandText,
        apply: applyText,
      });

      return {
        stt: mRow.stt,
        topic: mRow.topic,
        subTopic: mRow.subTopic,
        requirements: formattedReq,
        part1: matchedRawSpec?.part1 || mRow.part1,
        part2: matchedRawSpec?.part2 || mRow.part2,
        part3: matchedRawSpec?.part3 || mRow.part3,
        part4: matchedRawSpec?.part4 || mRow.part4,
        totalPoints: mRow.totalPoints,
      };
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      matrix: processedMatrix,
      specification: processedSpec,
      questions: repairedQuestions,
    };
  }
}
