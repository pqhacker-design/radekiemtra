import { CurriculumGrade } from './types';
import { GRADE_8_CHAPTERS_1_TO_5 } from './grade8_p1';
import { GRADE_8_CHAPTERS_6_TO_10 } from './grade8_p2';

export const GRADE_8_CURRICULUM: CurriculumGrade = {
  grade: 8,
  labelVi: 'Toán Khối 8',
  labelEn: 'Grade 8 Mathematics',
  sourceDocTitle: 'Tài liệu hướng dẫn triển khai dạy học cấp THCS bằng tiếng Anh – Môn Toán Khối 8 (Bộ GD&ĐT, Hà Nội 2026)',
  chapters: [...GRADE_8_CHAPTERS_1_TO_5, ...GRADE_8_CHAPTERS_6_TO_10],
};
