import {
  DifficultyLevel,
  GroupByMode,
  MCQItem,
  QuestionSection,
  SortOrder,
  TopicId,
} from '../types/mcq';
import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { TOPIC_MAP, TOPICS } from './topics';

export const ALL_QUESTIONS: MCQItem[] = [...QUESTIONS_PART_1, ...QUESTIONS_PART_2];

export const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const DIFFICULTY_RANK: Record<DifficultyLevel, number> = {
  Foundational: 1,
  Applied: 2,
  'Exam-Tricky': 3,
};

export function getImportanceTierLabel(score: number): string {
  if (score >= 9) return 'Critical Must-Know';
  if (score >= 7) return 'High-Yield Core';
  return 'Standard Syllabus';
}

export function sortQuestions(questions: MCQItem[], sortOrder: SortOrder): MCQItem[] {
  const copy = [...questions];
  copy.sort((a, b) => {
    switch (sortOrder) {
      case 'importance-desc':
        return (
          b.importance - a.importance ||
          DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty] ||
          a.number - b.number
        );
      case 'importance-asc':
        return a.importance - b.importance || a.number - b.number;
      case 'difficulty-asc':
        return (
          DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty] ||
          b.importance - a.importance ||
          a.number - b.number
        );
      case 'difficulty-desc':
        return (
          DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty] ||
          b.importance - a.importance ||
          a.number - b.number
        );
      case 'id-asc':
      default:
        return a.number - b.number;
    }
  });
  return copy;
}

export function filterQuestions(
  questions: MCQItem[],
  opts: {
    topicFilter: TopicId | 'all';
    difficultyFilter: DifficultyLevel | 'all';
    minImportance: number;
    searchQuery: string;
    flaggedOnly: boolean;
    flaggedIds: Set<string>;
  }
): MCQItem[] {
  const q = opts.searchQuery.trim().toLowerCase();
  return questions.filter((item) => {
    if (opts.topicFilter !== 'all' && item.topicId !== opts.topicFilter) {
      return false;
    }
    if (opts.difficultyFilter !== 'all' && item.difficulty !== opts.difficultyFilter) {
      return false;
    }
    if (item.importance < opts.minImportance) {
      return false;
    }
    if (opts.flaggedOnly && !opts.flaggedIds.has(item.id)) {
      return false;
    }
    if (q.length > 0) {
      const topicTitle = TOPIC_MAP[item.topicId]?.title ?? '';
      const searchable = [
        item.id,
        item.question,
        item.subtopic,
        item.explanation,
        item.codeSnippet ?? '',
        topicTitle,
        ...item.options,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });
}

function calcAvgImportance(list: MCQItem[]): number {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, item) => sum + item.importance, 0);
  return Math.round((total / list.length) * 10) / 10;
}

export function buildSections(
  filteredQuestions: MCQItem[],
  groupBy: GroupByMode,
  sortOrder: SortOrder
): QuestionSection[] {
  if (groupBy === 'importance') {
    const tiers = [
      {
        id: 'tier-critical',
        title: 'Section I. Critical Must-Know (Importance 9–10)',
        subtitle:
          'Highest-probability exam concepts, formulas, numerical traces, and core architectural traps.',
        predicate: (q: MCQItem) => q.importance >= 9,
      },
      {
        id: 'tier-high',
        title: 'Section II. High-Yield Core (Importance 7–8)',
        subtitle:
          'Frequently tested comparisons, design patterns, lifecycle rules, and ecosystem trade-offs.',
        predicate: (q: MCQItem) => q.importance >= 7 && q.importance <= 8,
      },
      {
        id: 'tier-standard',
        title: 'Section III. Standard Syllabus Coverage (Importance 5–6)',
        subtitle:
          'Foundational context, historical milestones, and supporting definitions for complete exam mastery.',
        predicate: (q: MCQItem) => q.importance <= 6,
      },
    ];

    return tiers
      .map((tier) => {
        const list = sortQuestions(filteredQuestions.filter(tier.predicate), sortOrder);
        return {
          id: tier.id,
          title: tier.title,
          subtitle: tier.subtitle,
          questions: list,
          avgImportance: calcAvgImportance(list),
        };
      })
      .filter((s) => s.questions.length > 0);
  }

  if (groupBy === 'topic') {
    return TOPICS.map((topic) => {
      const list = sortQuestions(
        filteredQuestions.filter((q) => q.topicId === topic.id),
        sortOrder
      );
      return {
        id: `topic-${topic.id}`,
        title: topic.title,
        subtitle: `${topic.moduleRef} — ${topic.summary}`,
        questions: list,
        avgImportance: calcAvgImportance(list),
      };
    }).filter((s) => s.questions.length > 0);
  }

  // groupBy === 'difficulty'
  const diffGroups: {
    id: string;
    level: DifficultyLevel;
    title: string;
    subtitle: string;
  }[] = [
    {
      id: 'diff-foundational',
      level: 'Foundational',
      title: 'Section I. Foundational Level (Core Concepts & Definitions)',
      subtitle:
        'Direct recall of definitions, daemons, defaults, ecosystem tools, and textbook distinctions.',
    },
    {
      id: 'diff-applied',
      level: 'Applied',
      title: 'Section II. Applied Level (Architecture, Commands & Calculations)',
      subtitle:
        'Scenario-based architecture choices, HDFS CLI syntax, join selection, and formula calculations.',
    },
    {
      id: 'diff-tricky',
      level: 'Exam-Tricky',
      title: 'Section III. Exam-Tricky Level (Edge Cases, Traps & Code Traces)',
      subtitle:
        'Classic exam pitfalls including the Mean combiner trap, Order Inversion, Secondary Sort comparators, Secondary NameNode limits, and Java MapReduce signatures.',
    },
  ];

  return diffGroups
    .map((group) => {
      const list = sortQuestions(
        filteredQuestions.filter((q) => q.difficulty === group.level),
        sortOrder
      );
      return {
        id: group.id,
        title: group.title,
        subtitle: group.subtitle,
        questions: list,
        avgImportance: calcAvgImportance(list),
      };
    })
    .filter((s) => s.questions.length > 0);
}
