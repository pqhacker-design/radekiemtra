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
 * Danh mục Năng lực đặc thù các môn học theo Chương trình GDPT 2018 (Công văn 7991/BGDĐT)
 */
export const SUBJECT_COMPETENCIES: Record<string, SubjectCompetency[]> = {
  Toán: [
    { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học', shortName: 'Tư duy & lập luận' },
    { code: 'NL MHH', name: 'Năng lực mô hình hoá toán học', shortName: 'Mô hình hoá' },
    { code: 'NL GQVĐ', name: 'Năng lực giải quyết vấn đề toán học', shortName: 'Giải quyết vấn đề' },
    { code: 'NL GTTH', name: 'Năng lực giao tiếp toán học', shortName: 'Giao tiếp toán học' },
    { code: 'NL CCTH', name: 'Năng lực sử dụng công cụ, phương tiện học toán', shortName: 'Công cụ & phương tiện' },
  ],
  'Ngữ văn': [
    { code: 'NL Đọc', name: 'Năng lực đọc hiểu văn bản', shortName: 'Đọc hiểu' },
    { code: 'NL Viết', name: 'Năng lực tạo lập văn bản (viết)', shortName: 'Viết' },
    { code: 'NL Nói-Nghe', name: 'Năng lực nói và nghe', shortName: 'Nói & nghe' },
    { code: 'NL Ngôn ngữ', name: 'Năng lực ngôn ngữ (tiếng Việt)', shortName: 'Ngôn ngữ' },
    { code: 'NL Văn học', name: 'Năng lực văn học (cảm thụ văn học)', shortName: 'Văn học' },
  ],
  'Vật lí': [
    { code: 'NL NTVL', name: 'Nhận thức vật lí', shortName: 'Nhận thức VL' },
    { code: 'NL THVL', name: 'Tìm hiểu thế giới tự nhiên dưới góc độ vật lí', shortName: 'Tìm hiểu VL' },
    { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng VL' },
  ],
  'Hóa học': [
    { code: 'NL NTHH', name: 'Nhận thức hoá học', shortName: 'Nhận thức HH' },
    { code: 'NL THHH', name: 'Tìm hiểu thế giới tự nhiên dưới góc độ hoá học', shortName: 'Tìm hiểu HH' },
    { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng HH' },
  ],
  'Sinh học': [
    { code: 'NL NTSH', name: 'Nhận thức sinh học', shortName: 'Nhận thức SH' },
    { code: 'NL THTS', name: 'Tìm hiểu thế giới sống', shortName: 'Tìm hiểu SH' },
    { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng SH' },
  ],
  KHTN: [
    { code: 'NL NTKHTN', name: 'Nhận thức khoa học tự nhiên', shortName: 'Nhận thức KHTN' },
    { code: 'NL THTN', name: 'Tìm hiểu tự nhiên', shortName: 'Tìm hiểu KHTN' },
    { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng KHTN' },
  ],
  'Lịch sử': [
    { code: 'NL NTLSU', name: 'Nhận thức khoa học lịch sử', shortName: 'Nhận thức LS' },
    { code: 'NL THLSU', name: 'Tìm hiểu lịch sử', shortName: 'Tìm hiểu LS' },
    { code: 'NL VDLSU', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng LS' },
  ],
  'Địa lí': [
    { code: 'NL NTDLI', name: 'Nhận thức khoa học địa lí', shortName: 'Nhận thức ĐL' },
    { code: 'NL THDLI', name: 'Tìm hiểu địa lí', shortName: 'Tìm hiểu ĐL' },
    { code: 'NL VDDLI', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng ĐL' },
  ],
  'Lịch sử và Địa lí': [
    { code: 'NL NTLSDLI', name: 'Nhận thức khoa học lịch sử và địa lí', shortName: 'Nhận thức LS-ĐL' },
    { code: 'NL THLSDLI', name: 'Tìm hiểu lịch sử và địa lí', shortName: 'Tìm hiểu LS-ĐL' },
    { code: 'NL VDLSDLI', name: 'Vận dụng kiến thức, kĩ năng đã học', shortName: 'Vận dụng LS-ĐL' },
  ],
  'Tin học': [
    { code: 'NLa', name: 'Sử dụng và quản lí các phương tiện CNTT', shortName: 'Phương tiện CNTT' },
    { code: 'NLb', name: 'Ứng xử phù hợp trong môi trường số', shortName: 'Môi trường số' },
    { code: 'NLc', name: 'Học tập và tự học với sự hỗ trợ của CNTT', shortName: 'Tự học với CNTT' },
    { code: 'NLd', name: 'Giải quyết vấn đề với sự hỗ trợ của CNTT', shortName: 'Giải quyết vấn đề' },
    { code: 'NLe', name: 'Hợp tác trong môi trường số', shortName: 'Hợp tác số' },
  ],
  'Tiếng Anh': [
    { code: 'NL Đọc', name: 'Năng lực đọc hiểu tiếng Anh (Reading)', shortName: 'Đọc hiểu' },
    { code: 'NL Viết', name: 'Năng lực viết tiếng Anh (Writing)', shortName: 'Viết' },
    { code: 'NL Ngôn ngữ', name: 'Năng lực ngôn ngữ & ngữ pháp (Language focus)', shortName: 'Ngôn ngữ' },
    { code: 'NL Giao tiếp', name: 'Năng lực giao tiếp tiếng Anh (Communication)', shortName: 'Giao tiếp' },
  ],
  'GDCD / GDKT&PL': [
    { code: 'NL ĐCHV', name: 'Năng lực điều chỉnh hành vi', shortName: 'Điều chỉnh hành vi' },
    { code: 'NL PTBT', name: 'Năng lực phát triển bản thân', shortName: 'Phát triển bản thân' },
    { code: 'NL THTG', name: 'Năng lực tìm hiểu và tham gia các hoạt động kinh tế - xã hội', shortName: 'Tham gia KT-XH' },
  ],
  'Công nghệ': [
    { code: 'NL NTCN', name: 'Nhận thức công nghệ', shortName: 'Nhận thức CN' },
    { code: 'NL GTCN', name: 'Giao tiếp công nghệ', shortName: 'Giao tiếp CN' },
    { code: 'NL SDCN', name: 'Sử dụng công nghệ', shortName: 'Sử dụng CN' },
    { code: 'NL DGCN', name: 'Đánh giá công nghệ', shortName: 'Đánh giá CN' },
    { code: 'NL TKKT', name: 'Thiết kế kĩ thuật', shortName: 'Thiết kế KT' },
  ],
};

const DEFAULT_COMPETENCIES: SubjectCompetency[] = [
  { code: 'NL NT', name: 'Năng lực nhận thức kiến thức', shortName: 'Nhận thức' },
  { code: 'NL TH', name: 'Năng lực tìm hiểu và nghiên cứu', shortName: 'Tìm hiểu' },
  { code: 'NL VD', name: 'Năng lực vận dụng kiến thức, kĩ năng', shortName: 'Vận dụng' },
  { code: 'NL GQVĐ', name: 'Năng lực giải quyết vấn đề và sáng tạo', shortName: 'GQVĐ & sáng tạo' },
];

/**
 * Lấy danh sách năng lực đặc thù theo môn học
 */
export function getSubjectCompetencies(subject?: string): SubjectCompetency[] {
  if (!subject) return DEFAULT_COMPETENCIES;
  const found = Object.keys(SUBJECT_COMPETENCIES).find(
    (k) => subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(subject.toLowerCase())
  );
  return found ? SUBJECT_COMPETENCIES[found] : DEFAULT_COMPETENCIES;
}

/**
 * Tự động suy luận năng lực đặc thù phù hợp cho câu hỏi dựa trên môn học, dạng bài và mức độ nhận thức
 */
export function inferQuestionCompetency(
  subject?: string,
  partType?: string,
  cognitiveLevel?: string,
  topic?: string
): { code: string; name: string } {
  const comps = getSubjectCompetencies(subject);
  const s = (subject || '').toLowerCase();
  const c = (cognitiveLevel || '').toUpperCase();
  const t = (topic || '').toLowerCase();

  // Môn Toán
  if (s.includes('toán')) {
    if (c === 'REMEMBER' || c === 'NB') {
      return { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học' };
    }
    if (c === 'UNDERSTAND' || c === 'TH') {
      if (t.includes('giao tiếp') || t.includes('ngôn ngữ') || t.includes('kí hiệu')) {
        return { code: 'NL GTTH', name: 'Năng lực giao tiếp toán học' };
      }
      return { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận toán học' };
    }
    // APPLY hoặc ADVANCED
    if (
      t.includes('thực tế') ||
      t.includes('thực tiễn') ||
      t.includes('hình học') ||
      t.includes('diện tích') ||
      t.includes('thể tích') ||
      t.includes('mô hình') ||
      t.includes('lãi suất') ||
      t.includes('chuyển động')
    ) {
      return { code: 'NL MHH', name: 'Năng lực mô hình hoá toán học' };
    }
    return { code: 'NL GQVĐ', name: 'Năng lực giải quyết vấn đề toán học' };
  }

  // Môn Ngữ văn
  if (s.includes('văn')) {
    if (partType === 'PART4' || t.includes('viết') || t.includes('tạo lập') || t.includes('đoạn văn') || t.includes('bài văn')) {
      return { code: 'NL Viết', name: 'Năng lực tạo lập văn bản (viết)' };
    }
    if (t.includes('tiếng việt') || t.includes('ngữ pháp') || t.includes('từ ngữ') || t.includes('tu từ')) {
      return { code: 'NL Ngôn ngữ', name: 'Năng lực ngôn ngữ (tiếng Việt)' };
    }
    if (t.includes('cảm thụ') || t.includes('hình tượng') || t.includes('nhân vật') || t.includes('thông điệp')) {
      return { code: 'NL Văn học', name: 'Năng lực văn học (cảm thụ văn học)' };
    }
    return { code: 'NL Đọc', name: 'Năng lực đọc hiểu văn bản' };
  }

  // Môn Tiếng Anh
  if (s.includes('anh') || s.includes('english')) {
    if (partType === 'PART4' || t.includes('writing') || t.includes('viết')) {
      return { code: 'NL Viết', name: 'Năng lực viết tiếng Anh (Writing)' };
    }
    if (t.includes('phonetic') || t.includes('stress') || t.includes('grammar') || t.includes('ngữ pháp')) {
      return { code: 'NL Ngôn ngữ', name: 'Năng lực ngôn ngữ & ngữ pháp (Language focus)' };
    }
    return { code: 'NL Đọc', name: 'Năng lực đọc hiểu tiếng Anh (Reading)' };
  }

  // Môn Vật lí
  if (s.includes('lí') || s.includes('vật lý') || s.includes('vật lí')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTVL', name: 'Nhận thức vật lí' };
    if (c === 'UNDERSTAND' || c === 'TH') {
      return t.includes('thí nghiệm') || t.includes('hiện tượng')
        ? { code: 'NL THVL', name: 'Tìm hiểu thế giới tự nhiên dưới góc độ vật lí' }
        : { code: 'NL NTVL', name: 'Nhận thức vật lí' };
    }
    return { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn Hóa học
  if (s.includes('hóa') || s.includes('hoá')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTHH', name: 'Nhận thức hoá học' };
    if (c === 'UNDERSTAND' || c === 'TH') {
      return t.includes('thí nghiệm') || t.includes('phản ứng')
        ? { code: 'NL THHH', name: 'Tìm hiểu thế giới tự nhiên dưới góc độ hoá học' }
        : { code: 'NL NTHH', name: 'Nhận thức hoá học' };
    }
    return { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn Sinh học
  if (s.includes('sinh')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTSH', name: 'Nhận thức sinh học' };
    if (c === 'UNDERSTAND' || c === 'TH') {
      return t.includes('thế giới sống') || t.includes('tế bào')
        ? { code: 'NL THTS', name: 'Tìm hiểu thế giới sống' }
        : { code: 'NL NTSH', name: 'Nhận thức sinh học' };
    }
    return { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn KHTN
  if (s.includes('khtn') || s.includes('khoa học tự nhiên')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTKHTN', name: 'Nhận thức khoa học tự nhiên' };
    if (c === 'UNDERSTAND' || c === 'TH') return { code: 'NL THTN', name: 'Tìm hiểu tự nhiên' };
    return { code: 'NL VDKN', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn Lịch sử
  if (s.includes('sử') || s.includes('lịch sử')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTLSU', name: 'Nhận thức khoa học lịch sử' };
    if (c === 'UNDERSTAND' || c === 'TH') return { code: 'NL THLSU', name: 'Tìm hiểu lịch sử' };
    return { code: 'NL VDLSU', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn Địa lí
  if (s.includes('địa')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NL NTDLI', name: 'Nhận thức khoa học địa lí' };
    if (c === 'UNDERSTAND' || c === 'TH') return { code: 'NL THDLI', name: 'Tìm hiểu địa lí' };
    return { code: 'NL VDDLI', name: 'Vận dụng kiến thức, kĩ năng đã học' };
  }

  // Môn Tin học
  if (s.includes('tin')) {
    if (c === 'REMEMBER' || c === 'NB') return { code: 'NLa', name: 'Sử dụng và quản lí các phương tiện CNTT' };
    if (c === 'UNDERSTAND' || c === 'TH') return { code: 'NLc', name: 'Học tập và tự học với sự hỗ trợ của CNTT' };
    return { code: 'NLd', name: 'Giải quyết vấn đề với sự hỗ trợ của CNTT' };
  }

  // Mặc định chung
  if (comps.length > 0) {
    if (c === 'REMEMBER' || c === 'NB') return { code: comps[0].code, name: comps[0].name };
    if (c === 'UNDERSTAND' || c === 'TH') {
      const idx = Math.min(1, comps.length - 1);
      return { code: comps[idx].code, name: comps[idx].name };
    }
    const lastIdx = Math.min(2, comps.length - 1);
    return { code: comps[lastIdx].code, name: comps[lastIdx].name };
  }

  return { code: 'NL TDLL', name: 'Năng lực tư duy và lập luận' };
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
