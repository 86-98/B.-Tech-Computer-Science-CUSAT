export type TopicId =
  | 'foundations'
  | 'mapreduce-core'
  | 'aggregation-patterns'
  | 'pairs-stripes-joins'
  | 'hdfs-yarn-rdbms'
  | 'hadoop-ecosystem';

export type DifficultyLevel = 'Foundational' | 'Applied' | 'Exam-Tricky';

export type GroupByMode = 'importance' | 'topic' | 'difficulty';

export type SortOrder =
  | 'importance-desc'
  | 'importance-asc'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'id-asc';

export type StudyMode = 'interactive' | 'exam-sheet';

export type ActiveTab = 'bank' | 'answer-keys' | 'blueprint' | 'practice';

export interface TopicMeta {
  id: TopicId;
  order: number;
  shortTitle: string;
  title: string;
  moduleRef: string;
  summary: string;
  examFocus: string[];
}

export interface MCQItem {
  id: string;
  number: number;
  topicId: TopicId;
  subtopic: string;
  importance: number; // 1 to 10 scale
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface QuestionSection {
  id: string;
  title: string;
  subtitle: string;
  questions: MCQItem[];
  avgImportance: number;
}
