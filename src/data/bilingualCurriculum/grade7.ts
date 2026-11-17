import { CurriculumGrade } from './types';
import { GRADE_7_CHAPTERS_1_TO_5 } from './grade7_p1';
import { GRADE_7_CHAPTERS_6_TO_10 } from './grade7_p2';

export const GRADE_7_CURRICULUM: CurriculumGrade = {
  grade: 7,
  labelVi: 'Toán Khối 7',
  labelEn: 'Grade 7 Mathematics',
  sourceDocTitle: 'Tài liệu hướng dẫn triển khai dạy học cấp THCS bằng tiếng Anh – Môn Toán Khối 7 (Bộ GD&ĐT, Hà Nội 2026)',
  chapters: [...GRADE_7_CHAPTERS_1_TO_5, ...GRADE_7_CHAPTERS_6_TO_10],
};
