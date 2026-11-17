import { CurriculumGrade } from './types';
import { GRADE_6_CHAPTERS_1_TO_5 } from './grade6_p1';
import { GRADE_6_CHAPTERS_6_TO_9 } from './grade6_p2';

export const GRADE_6_CURRICULUM: CurriculumGrade = {
  grade: 6,
  labelVi: 'Toán Khối 6',
  labelEn: 'Grade 6 Mathematics',
  sourceDocTitle: 'Tài liệu hướng dẫn triển khai dạy học cấp THCS bằng tiếng Anh – Môn Toán Khối 6 (Bộ GD&ĐT, Hà Nội 2026)',
  chapters: [...GRADE_6_CHAPTERS_1_TO_5, ...GRADE_6_CHAPTERS_6_TO_9],
};
