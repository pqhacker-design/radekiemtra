export type GradeLevel = 6 | 7 | 8 | 9;

export interface VocabItem {
  id: string;
  termEn: string;
  partOfSpeech?: string; // n, v, adj, adv, n phr, v phr
  termVi: string;
  explanationEn: string;
  explanationVi: string;
  exampleEn: string;
  exampleVi: string;
}

export interface NotationItem {
  id: string;
  symbolLatex: string;
  readAsEn: string;
  readAsVi: string;
  explanationEn?: string;
  explanationVi?: string;
}

export type ExpressionCategory = 'describe' | 'question' | 'present';

export interface ExpressionItem {
  id: string;
  category: ExpressionCategory;
  phraseEn: string;
  phraseVi: string;
}

export interface ExampleStep {
  labelEn: string;
  labelVi: string;
  contentEn: string;
  contentVi: string;
}

export interface WorkedExample {
  id: string;
  titleEn: string;
  titleVi: string;
  problemEn: string;
  problemVi: string;
  steps: ExampleStep[];
  conclusionEn?: string;
  conclusionVi?: string;
}

export interface CurriculumLesson {
  id: string; // e.g., 'g6-l1'
  grade: GradeLevel;
  chapterNumber: number;
  lessonNumber: number;
  titleEn: string;
  titleVi: string;
  objectivesEn: string[];
  objectivesVi: string[];
  vocabulary: VocabItem[];
  notations: NotationItem[];
  expressions: ExpressionItem[];
  examples: WorkedExample[];
  teachingNotes: string[];
}

export interface CurriculumChapter {
  id: string; // e.g., 'g6-c1'
  grade: GradeLevel;
  chapterNumber: number;
  titleEn: string;
  titleVi: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumGrade {
  grade: GradeLevel;
  labelVi: string;
  labelEn: string;
  sourceDocTitle: string;
  chapters: CurriculumChapter[];
}
