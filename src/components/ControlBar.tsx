import {
  Bookmark,
  Eye,
  EyeOff,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { TOPICS } from '../data/topics';
import {
  DifficultyLevel,
  GroupByMode,
  SortOrder,
  StudyMode,
  TopicId,
} from '../types/mcq';

interface ControlBarProps {
  groupBy: GroupByMode;
  onGroupByChange: (mode: GroupByMode) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  topicFilter: TopicId | 'all';
  onTopicFilterChange: (topic: TopicId | 'all') => void;
  difficultyFilter: DifficultyLevel | 'all';
  onDifficultyFilterChange: (diff: DifficultyLevel | 'all') => void;
  minImportance: number;
  onMinImportanceChange: (val: number) => void;
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
  studyMode: StudyMode;
  onStudyModeChange: (mode: StudyMode) => void;
  showAllKeys: boolean;
  onToggleAllKeys: () => void;
  flaggedOnly: boolean;
  onToggleFlaggedOnly: () => void;
  flaggedCount: number;
  visibleCount: number;
  totalCount: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const GROUP_OPTIONS: { id: GroupByMode; label: string }[] = [
  { id: 'importance', label: 'Importance Score' },
  { id: 'topic', label: 'Topic' },
  { id: 'difficulty', label: 'Difficulty Level' },
];

const DIFFICULTY_OPTIONS: { id: DifficultyLevel | 'all'; label: string }[] = [
  { id: 'all', label: 'All Levels' },
  { id: 'Foundational', label: 'Foundational' },
  { id: 'Applied', label: 'Applied' },
  { id: 'Exam-Tricky', label: 'Exam-Tricky' },
];

export function ControlBar({
  groupBy,
  onGroupByChange,
  sortOrder,
  onSortOrderChange,
  topicFilter,
  onTopicFilterChange,
  difficultyFilter,
  onDifficultyFilterChange,
  minImportance,
  onMinImportanceChange,
  searchQuery,
  onSearchQueryChange,
  studyMode,
  onStudyModeChange,
  showAllKeys,
  onToggleAllKeys,
  flaggedOnly,
  onToggleFlaggedOnly,
  flaggedCount,
  visibleCount,
  totalCount,
  onResetFilters,
  hasActiveFilters,
}: ControlBarProps) {
  return (
    <section
      aria-label="Question arrangement and filter controls"
      className="no-print bg-white border border-slate-200 rounded-xl p-5 space-y-5"
    >
      {/* Row 1: Primary Arrangement Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
            Arrange Sections By
          </span>
          <div
            role="group"
            aria-label="Arrange sections by"
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg w-fit"
          >
            {GROUP_OPTIONS.map((opt) => {
              const active = groupBy === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onGroupByChange(opt.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Order & Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-order-select"
              className="text-xs font-semibold text-slate-500 whitespace-nowrap"
            >
              Sort Inside Section
            </label>
            <select
              id="sort-order-select"
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
              className="h-10 px-3 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
            >
              <option value="importance-desc">Importance: High to Low</option>
              <option value="importance-asc">Importance: Low to High</option>
              <option value="difficulty-desc">Difficulty: Hard to Easy</option>
              <option value="difficulty-asc">Difficulty: Easy to Hard</option>
              <option value="id-asc">Question Number (Q01–Q72)</option>
            </select>
          </div>

          <div
            role="group"
            aria-label="Study mode"
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg"
          >
            <button
              type="button"
              onClick={() => onStudyModeChange('interactive')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                studyMode === 'interactive'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Check
            </button>
            <button
              type="button"
              onClick={() => onStudyModeChange('exam-sheet')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                studyMode === 'exam-sheet'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exam Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Filters (Topic, Difficulty, Importance Slider, Search) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 items-end">
        {/* Search */}
        <div className="xl:col-span-4 space-y-1.5">
          <label
            htmlFor="mcq-search"
            className="block text-xs font-medium text-slate-600"
          >
            Search concepts, formulas, or commands
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="mcq-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="e.g. Combiner, HashPartitioner, FsImage, Znode..."
              className="w-full h-10 pl-9 pr-8 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Topic Dropdown */}
        <div className="xl:col-span-3 space-y-1.5">
          <label
            htmlFor="topic-filter-select"
            className="block text-xs font-medium text-slate-600"
          >
            Filter by Syllabus Topic
          </label>
          <select
            id="topic-filter-select"
            value={topicFilter}
            onChange={(e) =>
              onTopicFilterChange(e.target.value as TopicId | 'all')
            }
            className="w-full h-10 px-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
          >
            <option value="all">All 6 Topics (72 Questions)</option>
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.order}. {t.shortTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="xl:col-span-3 space-y-1.5">
          <span className="block text-xs font-medium text-slate-600">
            Difficulty Filter
          </span>
          <div className="grid grid-cols-4 p-1 bg-slate-100 rounded-lg gap-0.5">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const active = difficultyFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onDifficultyFilterChange(opt.id)}
                  className={`py-1.5 px-1.5 text-xs font-medium rounded-md transition-colors truncate ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={opt.label}
                >
                  {opt.id === 'all'
                    ? 'All'
                    : opt.id === 'Foundational'
                    ? 'Basic'
                    : opt.id === 'Applied'
                    ? 'Applied'
                    : 'Tricky'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Min Importance Slider */}
        <div className="xl:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label
              htmlFor="min-importance-slider"
              className="font-medium text-slate-600"
            >
              Min Importance
            </label>
            <span className="font-mono font-semibold text-sky-700 tabular-nums">
              {minImportance}/10
            </span>
          </div>
          <input
            id="min-importance-slider"
            type="range"
            min={5}
            max={10}
            step={1}
            value={minImportance}
            onChange={(e) => onMinImportanceChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 tabular-nums px-0.5">
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Row 3: Quick Actions & Result Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-mono font-semibold text-slate-900 tabular-nums">
            Showing {visibleCount} of {totalCount} questions
          </span>
          {hasActiveFilters && (
            <>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 font-medium text-sky-700 hover:text-sky-800 underline underline-offset-2"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset filters
              </button>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleFlaggedOnly}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
              flaggedOnly
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            Flagged Only ({flaggedCount})
          </button>

          <button
            type="button"
            onClick={onToggleAllKeys}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap ${
              showAllKeys
                ? 'bg-sky-50 border-sky-300 text-sky-900'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            {showAllKeys ? (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {showAllKeys ? 'Hide Section Answer Keys' : 'Show All Section Answer Keys'}
          </button>
        </div>
      </div>
    </section>
  );
}
