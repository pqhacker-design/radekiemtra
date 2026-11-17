import {
  CurriculumChapter,
  CurriculumLesson,
  ExampleStep,
  ExpressionCategory,
  ExpressionItem,
  GradeLevel,
  NotationItem,
  VocabItem,
  WorkedExample,
} from './types';

export function v(
  id: string,
  termEn: string,
  partOfSpeech: string,
  termVi: string,
  explanationEn: string,
  explanationVi: string,
  exampleEn: string,
  exampleVi: string
): VocabItem {
  return { id, termEn, partOfSpeech, termVi, explanationEn, explanationVi, exampleEn, exampleVi };
}

export function n(
  id: string,
  symbolLatex: string,
  readAsEn: string,
  readAsVi: string,
  explanationEn?: string,
  explanationVi?: string
): NotationItem {
  return { id, symbolLatex, readAsEn, readAsVi, explanationEn, explanationVi };
}

export function e(
  id: string,
  category: ExpressionCategory,
  phraseEn: string,
  phraseVi: string
): ExpressionItem {
  return { id, category, phraseEn, phraseVi };
}

export function s(
  labelEn: string,
  labelVi: string,
  contentEn: string,
  contentVi: string
): ExampleStep {
  return { labelEn, labelVi, contentEn, contentVi };
}

export function ex(
  id: string,
  titleEn: string,
  titleVi: string,
  problemEn: string,
  problemVi: string,
  steps: ExampleStep[],
  conclusionEn?: string,
  conclusionVi?: string
): WorkedExample {
  return { id, titleEn, titleVi, problemEn, problemVi, steps, conclusionEn, conclusionVi };
}

export function lesson(
  grade: GradeLevel,
  chapterNumber: number,
  lessonNumber: number,
  titleEn: string,
  titleVi: string,
  objectivesEn: string[],
  objectivesVi: string[],
  vocabulary: VocabItem[],
  notations: NotationItem[],
  expressions: ExpressionItem[],
  examples: WorkedExample[],
  teachingNotes: string[]
): CurriculumLesson {
  return {
    id: `g${grade}-l${lessonNumber}`,
    grade,
    chapterNumber,
    lessonNumber,
    titleEn,
    titleVi,
    objectivesEn,
    objectivesVi,
    vocabulary,
    notations,
    expressions,
    examples,
    teachingNotes,
  };
}

export function chapter(
  grade: GradeLevel,
  chapterNumber: number,
  titleEn: string,
  titleVi: string,
  lessons: CurriculumLesson[]
): CurriculumChapter {
  return {
    id: `g${grade}-c${chapterNumber}`,
    grade,
    chapterNumber,
    titleEn,
    titleVi,
    lessons,
  };
}
