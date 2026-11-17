import { GRADE_6_CURRICULUM } from './grade6';
import { GRADE_7_CURRICULUM } from './grade7';
import { GRADE_8_CURRICULUM } from './grade8';
import { GRADE_9_CURRICULUM } from './grade9';
import { CurriculumChapter, CurriculumGrade, CurriculumLesson, GradeLevel } from './types';

export * from './types';

export const CURRICULUM_GRADES: CurriculumGrade[] = [
  GRADE_6_CURRICULUM,
  GRADE_7_CURRICULUM,
  GRADE_8_CURRICULUM,
  GRADE_9_CURRICULUM,
];

export type BilingualSectionFilter = 'all' | 'vocab' | 'notation' | 'expression' | 'example' | 'notes';

export interface LessonWithChapter {
  grade: GradeLevel;
  chapter: CurriculumChapter;
  lesson: CurriculumLesson;
}

export interface SearchHit {
  lessonRef: LessonWithChapter;
  matchType: 'lesson' | 'vocab' | 'notation' | 'expression' | 'example' | 'notes';
  itemId?: string;
  primaryText: string;
  secondaryText: string;
  speakEn?: string;
  speakVi?: string;
  score: number;
}

export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[$\\{}^_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getGradeCurriculum(grade: GradeLevel): CurriculumGrade {
  return CURRICULUM_GRADES.find((g) => g.grade === grade) || GRADE_6_CURRICULUM;
}

export function getAllLessons(gradeFilter: GradeLevel | 'all' = 'all'): LessonWithChapter[] {
  const list: LessonWithChapter[] = [];
  for (const gradeObj of CURRICULUM_GRADES) {
    if (gradeFilter !== 'all' && gradeObj.grade !== gradeFilter) continue;
    for (const ch of gradeObj.chapters) {
      for (const l of ch.lessons) {
        list.push({ grade: gradeObj.grade, chapter: ch, lesson: l });
      }
    }
  }
  return list;
}

export function countLessonsByGrade(gradeFilter: GradeLevel | 'all' = 'all'): number {
  return getAllLessons(gradeFilter).length;
}

export function searchBilingualCurriculum(
  rawQuery: string,
  gradeFilter: GradeLevel | 'all' = 'all',
  sectionFilter: BilingualSectionFilter = 'all',
  maxResults = 60
): SearchHit[] {
  const normQuery = normalizeSearchText(rawQuery);
  if (!normQuery) return [];

  const tokens = normQuery.split(' ').filter(Boolean);
  const matchesAllTokens = (haystack: string): number => {
    const norm = normalizeSearchText(haystack);
    if (!norm) return 0;
    let score = 0;
    for (const token of tokens) {
      if (!norm.includes(token)) return 0;
      score += norm === token ? 12 : norm.startsWith(token) ? 8 : 4;
    }
    if (norm.includes(normQuery)) score += 6;
    return score;
  };

  const hits: SearchHit[] = [];
  const all = getAllLessons(gradeFilter);

  for (const ref of all) {
    const { lesson, chapter } = ref;

    // 1. Lesson & chapter title/objectives match
    if (sectionFilter === 'all') {
      const lessonHaystack = `${lesson.titleEn} ${lesson.titleVi} ${chapter.titleEn} ${chapter.titleVi} ${lesson.objectivesEn.join(' ')} ${lesson.objectivesVi.join(' ')}`;
      const score = matchesAllTokens(lessonHaystack);
      if (score > 0) {
        hits.push({
          lessonRef: ref,
          matchType: 'lesson',
          primaryText: lesson.titleEn,
          secondaryText: lesson.titleVi,
          speakEn: lesson.titleEn,
          speakVi: lesson.titleVi,
          score: score + 5,
        });
      }
    }

    // 2. Vocabulary items
    if (sectionFilter === 'all' || sectionFilter === 'vocab') {
      for (const item of lesson.vocabulary) {
        const hay = `${item.termEn} ${item.termVi} ${item.explanationEn} ${item.explanationVi} ${item.exampleEn} ${item.exampleVi}`;
        const score = matchesAllTokens(hay);
        if (score > 0) {
          hits.push({
            lessonRef: ref,
            matchType: 'vocab',
            itemId: item.id,
            primaryText: `${item.termEn} — ${item.termVi}`,
            secondaryText: `${item.explanationVi}`,
            speakEn: `${item.termEn}. ${item.exampleEn}`,
            speakVi: `${item.termVi}. ${item.exampleVi}`,
            score: score + 4,
          });
        }
      }
    }

    // 3. Notation items
    if (sectionFilter === 'all' || sectionFilter === 'notation') {
      for (const item of lesson.notations) {
        const hay = `${item.symbolLatex} ${item.readAsEn} ${item.readAsVi} ${item.explanationEn || ''} ${item.explanationVi || ''}`;
        const score = matchesAllTokens(hay);
        if (score > 0) {
          hits.push({
            lessonRef: ref,
            matchType: 'notation',
            itemId: item.id,
            primaryText: item.readAsEn,
            secondaryText: item.readAsVi,
            speakEn: item.readAsEn,
            speakVi: item.readAsVi,
            score: score + 3,
          });
        }
      }
    }

    // 4. Classroom expressions
    if (sectionFilter === 'all' || sectionFilter === 'expression') {
      for (const item of lesson.expressions) {
        const hay = `${item.phraseEn} ${item.phraseVi}`;
        const score = matchesAllTokens(hay);
        if (score > 0) {
          hits.push({
            lessonRef: ref,
            matchType: 'expression',
            itemId: item.id,
            primaryText: item.phraseEn,
            secondaryText: item.phraseVi,
            speakEn: item.phraseEn,
            speakVi: item.phraseVi,
            score: score + 2,
          });
        }
      }
    }

    // 5. Worked examples
    if (sectionFilter === 'all' || sectionFilter === 'example') {
      for (const item of lesson.examples) {
        const stepsText = item.steps.map((s) => `${s.labelEn} ${s.labelVi} ${s.contentEn} ${s.contentVi}`).join(' ');
        const hay = `${item.titleEn} ${item.titleVi} ${item.problemEn} ${item.problemVi} ${stepsText} ${item.conclusionEn || ''} ${item.conclusionVi || ''}`;
        const score = matchesAllTokens(hay);
        if (score > 0) {
          hits.push({
            lessonRef: ref,
            matchType: 'example',
            itemId: item.id,
            primaryText: `${item.titleEn} — ${item.titleVi}`,
            secondaryText: item.problemEn,
            speakEn: `${item.problemEn}. ${item.steps.map((s) => `${s.labelEn}: ${s.contentEn}`).join('. ')}`,
            speakVi: `${item.problemVi}. ${item.steps.map((s) => `${s.labelVi}: ${s.contentVi}`).join('. ')}`,
            score: score + 2,
          });
        }
      }
    }

    // 6. Pedagogical notes
    if (sectionFilter === 'all' || sectionFilter === 'notes') {
      for (let i = 0; i < lesson.teachingNotes.length; i++) {
        const note = lesson.teachingNotes[i];
        const score = matchesAllTokens(note);
        if (score > 0) {
          hits.push({
            lessonRef: ref,
            matchType: 'notes',
            itemId: `${lesson.id}-note-${i}`,
            primaryText: lesson.titleVi,
            secondaryText: note,
            speakVi: note,
            score: score + 1,
          });
        }
      }
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, maxResults);
}
