import { Question, SpecRow, PartType, CognitiveLevel } from '../types';

export interface SubjectCompetency {
  code: string;       // Ký hiệu viết tắt (e.g. "NL TDLL", "NL MHH")
  name: string;       // Tên năng lực đầy đủ (e.g. "Năng lực tư duy và lập luận toán học")
  shortName: string;  // Tên ngắn gọn (e.g. "Tư duy & lập luận")
  description?: string;
}

export interface CellQuestionItem {
  questionNumber: number;
  questionLabel: string;   // e.g. "1", "13a", "C1"
  competencyCode: string;  // e.g. "NL TDLL"
  competencyName: string;  // e.g. "Năng lực tư duy và lập luận toán học"
}

/**
 * Danh mục Năng lực đặc thù Môn Toán theo Chương trình GDPT 2018 (Công văn 7991/BGDĐT)
 */
export const SUBJECT_COMPETENCIES: Record<string, SubjectCompetency[]> = {
  Toán: [
    { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học', shortName: 'Tư duy & lập luận' },
    { code: 'NL MHH', name: 'Năng lực mô hình hoá toán học', shortName: 'Mô hình hoá' },
    { code: 'NL GQVĐ', name: 'Năng lực giải quyết vấn đề toán học', shortName: 'Giải quyết vấn đề' },
    { code: 'NL GTTH', name: 'Năng lực giao tiếp toán học', shortName: 'Giao tiếp toán học' },
    { code: 'NL CCTH', name: 'Năng lực sử dụng công cụ, phương tiện học toán', shortName: 'Công cụ & phương tiện' },
  ],
};

const DEFAULT_COMPETENCIES: SubjectCompetency[] = SUBJECT_COMPETENCIES.Toán;

/**
 * Lấy danh sách năng lực đặc thù Môn Toán
 */
export function getSubjectCompetencies(_subject?: string): SubjectCompetency[] {
  return SUBJECT_COMPETENCIES.Toán;
}

/**
 * Tự động suy luận năng lực đặc thù Môn Toán phù hợp cho câu hỏi dựa trên dạng bài, mức độ nhận thức và chủ đề
 */
export function inferQuestionCompetency(
  _subject?: string,
  partType?: string,
  cognitiveLevel?: string,
  topic?: string
): { code: string; name: string } {
  const c = (cognitiveLevel || '').toUpperCase();
  const t = (topic || '').toLowerCase();

  if (
    t.includes('vẽ') ||
    t.includes('geogebra') ||
    t.includes('đồ thị') ||
    t.includes('biểu đồ') ||
    t.includes('thước') ||
    t.includes('compa') ||
    t.includes('bảng thống kê')
  ) {
    if (c === 'REMEMBER' || c === 'NB' || c === 'UNDERSTAND' || c === 'TH') {
      return { code: 'NL CCTH', name: 'Năng lực sử dụng công cụ, phương tiện học toán' };
    }
  }

  if (c === 'REMEMBER' || c === 'NB') {
    if (t.includes('tập hợp') || t.includes('kí hiệu') || t.includes('biểu diễn') || t.includes('đọc')) {
      return { code: 'NL GTTH', name: 'Năng lực giao tiếp toán học' };
    }
    return { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học' };
  }

  if (c === 'UNDERSTAND' || c === 'TH') {
    if (t.includes('giao tiếp') || t.includes('ngôn ngữ') || t.includes('kí hiệu') || t.includes('biểu đồ')) {
      return { code: 'NL GTTH', name: 'Năng lực giao tiếp toán học' };
    }
    return { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học' };
  }

  if (
    partType === 'PART4' ||
    t.includes('thực tế') ||
    t.includes('thực tiễn') ||
    t.includes('hình học') ||
    t.includes('diện tích') ||
    t.includes('thể tích') ||
    t.includes('chu vi') ||
    t.includes('mô hình') ||
    t.includes('lãi suất') ||
    t.includes('chuyển động') ||
    t.includes('xác suất') ||
    t.includes('hệ phương trình')
  ) {
    return { code: 'NL MHH', name: 'Năng lực mô hình hoá toán học' };
  }

  return { code: 'NL GQVĐ', name: 'Năng lực giải quyết vấn đề toán học' };
}

/**
 * Trích xuất danh sách các câu hỏi gắn với từng ô của Bản đặc tả CV 7991
 * Kèm thông tin tên/số thứ tự câu hỏi và năng lực đặc thù
 */
export function getSpecCellQuestions(
  row: SpecRow,
  rowIdx: number,
  allRows: SpecRow[],
  partKey: 'part1' | 'part2' | 'part3' | 'part4',
  levelKey: 'remember' | 'understand' | 'apply',
  questions: Question[] = [],
  subject?: string
): CellQuestionItem[] {
  const partMap: Record<string, PartType> = {
    part1: 'PART1',
    part2: 'PART2',
    part3: 'PART3',
    part4: 'PART4',
  };

  const targetPartType = partMap[partKey];
  const cognitiveData = row[partKey];
  if (!cognitiveData) return [];

  const rawVal = cognitiveData[levelKey];
  if (rawVal === undefined || rawVal === null || rawVal === '' || rawVal === 0 || rawVal === '-') {
    return [];
  }

  const partQuestions = questions.filter((q) => q.partType === targetPartType);
  const items: CellQuestionItem[] = [];

  // Parse raw value (có thể là "1, 2" hoặc "13a, 13b" hoặc số lượng như 1, 2)
  const strVal = String(rawVal).trim();
  const tokens = strVal.split(/[,;\s]+/).map((s) => s.trim().replace(/[()]/g, '')).filter(Boolean);

  // Kiểm tra xem tokens có chứa số thứ tự câu hỏi rõ ràng (ví dụ: "1", "2", "13a")
  const hasQuestionNumbers = tokens.some((t) => /\d+/.test(t));

  if (hasQuestionNumbers && !/^\d+$/.test(strVal) || (tokens.length > 1)) {
    // Có các nhãn câu hỏi cụ thể (ví dụ "1, 2" hoặc "13a, 13b")
    tokens.forEach((token) => {
      const matchNum = token.match(/\d+/);
      const qNum = matchNum ? parseInt(matchNum[0], 10) : 0;
      const matchedQ = partQuestions.find((q) => q.number === qNum);

      let compCode = matchedQ?.competencyCode;
      let compName = matchedQ?.competency;

      if (!compCode || !compName) {
        const inferred = inferQuestionCompetency(
          subject,
          targetPartType,
          levelKey === 'remember' ? 'REMEMBER' : levelKey === 'understand' ? 'UNDERSTAND' : 'APPLY',
          matchedQ?.topic || row.subTopic || row.topic
        );
        compCode = compCode || inferred.code;
        compName = compName || inferred.name;
      }

      items.push({
        questionNumber: qNum,
        questionLabel: token,
        competencyCode: compCode,
        competencyName: compName,
      });
    });
  } else {
    // Giá trị là số đếm lượng câu hỏi (ví dụ 1, 2) hoặc 1 nhãn đơn lẻ
    const count = !isNaN(Number(strVal)) ? Number(strVal) : tokens.length > 0 ? 1 : 0;
    if (count <= 0) return [];

    // Tìm câu hỏi tương ứng trong bài thi
    // 1. Khớp theo topic và mức nhận thức
    const cogLevelUpper = levelKey === 'remember' ? 'REMEMBER' : levelKey === 'understand' ? 'UNDERSTAND' : 'APPLY';
    const rowTopicClean = (row.topic || '').trim().toLowerCase();
    const rowSubClean = (row.subTopic || '').trim().toLowerCase();

    let matched = partQuestions.filter((q) => {
      const qCog = (q.cognitiveLevel || '').toUpperCase();
      const levelMatches =
        cogLevelUpper === 'APPLY'
          ? qCog === 'APPLY' || qCog === 'ADVANCED' || qCog === 'VD' || qCog === 'VDC'
          : qCog === cogLevelUpper || (cogLevelUpper === 'REMEMBER' && qCog === 'NB') || (cogLevelUpper === 'UNDERSTAND' && qCog === 'TH');

      if (!levelMatches) return false;

      if (!rowTopicClean && !rowSubClean) return true;
      const qTopicClean = (q.topic || '').trim().toLowerCase();
      return (
        (rowTopicClean && (qTopicClean.includes(rowTopicClean) || rowTopicClean.includes(qTopicClean))) ||
        (rowSubClean && (qTopicClean.includes(rowSubClean) || rowSubClean.includes(qTopicClean)))
      );
    });

    // 2. Nếu không lọc được theo topic, phân bổ theo thứ tự tuần tự của mức nhận thức này
    if (matched.length === 0) {
      let offset = 0;
      for (let i = 0; i < rowIdx; i++) {
        const prevRowVal = allRows[i]?.[partKey]?.[levelKey];
        if (prevRowVal && prevRowVal !== '-') {
          const prevCount = !isNaN(Number(prevRowVal)) ? Number(prevRowVal) : 1;
          offset += prevCount;
        }
      }

      const sameLevelQuestions = partQuestions.filter((q) => {
        const qCog = (q.cognitiveLevel || '').toUpperCase();
        return cogLevelUpper === 'APPLY'
          ? qCog === 'APPLY' || qCog === 'ADVANCED' || qCog === 'VD' || qCog === 'VDC'
          : qCog === cogLevelUpper || (cogLevelUpper === 'REMEMBER' && qCog === 'NB') || (cogLevelUpper === 'UNDERSTAND' && qCog === 'TH');
      });

      if (sameLevelQuestions.length >= offset + count) {
        matched = sameLevelQuestions.slice(offset, offset + count);
      } else {
        matched = sameLevelQuestions.slice(0, count);
      }
    }

    if (matched.length > 0) {
      matched.slice(0, count).forEach((q) => {
        let compCode = q.competencyCode;
        let compName = q.competency;

        if (!compCode || !compName) {
          const inferred = inferQuestionCompetency(
            subject,
            targetPartType,
            cogLevelUpper,
            q.topic || row.subTopic || row.topic
          );
          compCode = compCode || inferred.code;
          compName = compName || inferred.name;
        }

        items.push({
          questionNumber: q.number,
          questionLabel: q.number.toString(),
          competencyCode: compCode,
          competencyName: compName,
        });
      });
    } else {
      // Fallback nếu danh sách câu hỏi chưa được nạp
      for (let i = 0; i < count; i++) {
        const inferred = inferQuestionCompetency(
          subject,
          targetPartType,
          cogLevelUpper,
          row.subTopic || row.topic
        );
        items.push({
          questionNumber: i + 1,
          questionLabel: (i + 1).toString(),
          competencyCode: inferred.code,
          competencyName: inferred.name,
        });
      }
    }
  }

  return items;
}
