import { RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ControlBar } from './components/ControlBar';
import { ExamBlueprintView } from './components/ExamBlueprintView';
import { Header } from './components/Header';
import { MasterAnswerKeysView } from './components/MasterAnswerKeysView';
import { QuestionCard } from './components/QuestionCard';
import { SectionAnswerKey } from './components/SectionAnswerKey';
import { TimedPracticeView } from './components/TimedPracticeView';
import {
  ALL_QUESTIONS,
  buildSections,
  filterQuestions,
} from './data/questions';
import {
  ActiveTab,
  DifficultyLevel,
  GroupByMode,
  SortOrder,
  StudyMode,
  TopicId,
} from './types/mcq';

const STORAGE_ANSWERS_KEY = 'bigdata_mcq_answers_v1';
const STORAGE_FLAGS_KEY = 'bigdata_mcq_flags_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bank');

  // Arrangement & filtering state
  const [groupBy, setGroupBy] = useState<GroupByMode>('importance');
  const [sortOrder, setSortOrder] = useState<SortOrder>('importance-desc');
  const [topicFilter, setTopicFilter] = useState<TopicId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<
    DifficultyLevel | 'all'
  >('all');
  const [minImportance, setMinImportance] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studyMode, setStudyMode] = useState<StudyMode>('interactive');
  const [flaggedOnly, setFlaggedOnly] = useState<boolean>(false);

  // Per-section answer key visibility & per-question reveal in exam-sheet mode
  const [openKeySections, setOpenKeySections] = useState<Record<string, boolean>>({});
  const [showAllKeys, setShowAllKeys] = useState<boolean>(true);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  // Persistent user answers and bookmarked flags
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      return saved ? (JSON.parse(saved) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });

  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FLAGS_KEY);
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(userAnswers));
    } catch {
      // Ignore storage quota errors
    }
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FLAGS_KEY, JSON.stringify([...flaggedIds]));
    } catch {
      // Ignore storage quota errors
    }
  }, [flaggedIds]);

  const filteredQuestions = useMemo(
    () =>
      filterQuestions(ALL_QUESTIONS, {
        topicFilter,
        difficultyFilter,
        minImportance,
        searchQuery,
        flaggedOnly,
        flaggedIds,
      }),
    [
      topicFilter,
      difficultyFilter,
      minImportance,
      searchQuery,
      flaggedOnly,
      flaggedIds,
    ]
  );

  const sections = useMemo(
    () => buildSections(filteredQuestions, groupBy, sortOrder),
    [filteredQuestions, groupBy, sortOrder]
  );

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = useMemo(
    () =>
      ALL_QUESTIONS.filter((q) => userAnswers[q.id] === q.correctIndex).length,
    [userAnswers]
  );
  const accuracyPct =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const hasActiveFilters =
    topicFilter !== 'all' ||
    difficultyFilter !== 'all' ||
    minImportance > 5 ||
    searchQuery.trim().length > 0 ||
    flaggedOnly;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleToggleReveal = (questionId: string) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleToggleAllKeys = () => {
    const nextState = !showAllKeys;
    setShowAllKeys(nextState);
    const updated: Record<string, boolean> = {};
    sections.forEach((s) => {
      updated[s.id] = nextState;
    });
    setOpenKeySections(updated);
  };

  const isSectionKeyOpen = (sectionId: string): boolean => {
    if (sectionId in openKeySections) {
      return openKeySections[sectionId];
    }
    return showAllKeys;
  };

  const handleToggleSectionKey = (sectionId: string) => {
    setOpenKeySections((prev) => ({
      ...prev,
      [sectionId]: !isSectionKeyOpen(sectionId),
    }));
  };

  const handleResetFilters = () => {
    setTopicFilter('all');
    setDifficultyFilter('all');
    setMinImportance(5);
    setSearchQuery('');
    setFlaggedOnly(false);
  };

  const handleResetProgress = () => {
    setUserAnswers({});
    setRevealedQuestions({});
  };

  const handleJumpToTopic = (topicId: TopicId) => {
    setGroupBy('topic');
    setTopicFilter(topicId);
    setDifficultyFilter('all');
    setMinImportance(5);
    setFlaggedOnly(false);
    setActiveTab('bank');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onPrint={handlePrint}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Editorial Workbench Title & Real Session Progress */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-1.5 max-w-3xl">
            <p className="text-xs font-medium text-sky-700">
              Big Data Analytics · MapReduce · HDFS &amp; YARN · Hadoop Ecosystem
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Exhaustive Exam MCQ Bank &amp; Section Answer Keys
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              72 syllabus-verified questions scored by exam importance (1–10), arrangeable by importance score, module topic, or difficulty level, with dedicated answer keys at the end of every section.
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 shrink-0">
            <div className="font-mono tabular-nums">
              <span className="text-slate-400">Attempted </span>
              <span className="font-semibold text-slate-900">
                {totalAnswered}/{ALL_QUESTIONS.length}
              </span>
            </div>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <div className="font-mono tabular-nums">
              <span className="text-slate-400">Accuracy </span>
              <span className="font-semibold text-emerald-700">
                {totalAnswered > 0 ? `${accuracyPct}% (${totalCorrect})` : '—'}
              </span>
            </div>
            {totalAnswered > 0 && (
              <>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear Attempts</span>
                </button>
              </>
            )}
          </div>
        </section>

        {/* TAB 1: QUESTION BANK */}
        {activeTab === 'bank' && (
          <>
            <ControlBar
              groupBy={groupBy}
              onGroupByChange={(mode) => {
                setGroupBy(mode);
                setOpenKeySections({});
              }}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              topicFilter={topicFilter}
              onTopicFilterChange={setTopicFilter}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              minImportance={minImportance}
              onMinImportanceChange={setMinImportance}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              studyMode={studyMode}
              onStudyModeChange={setStudyMode}
              showAllKeys={showAllKeys}
              onToggleAllKeys={handleToggleAllKeys}
              flaggedOnly={flaggedOnly}
              onToggleFlaggedOnly={() => setFlaggedOnly((v) => !v)}
              flaggedCount={flaggedIds.size}
              visibleCount={filteredQuestions.length}
              totalCount={ALL_QUESTIONS.length}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Quick Section Jump Strip */}
            {sections.length > 1 && (
              <nav
                aria-label="Jump to section"
                className="no-print flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 px-1"
              >
                <span className="font-semibold text-slate-500">Jump to:</span>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="hover:text-sky-700 underline decoration-slate-300 underline-offset-4 transition-colors"
                  >
                    {section.title}{' '}
                    <span className="font-mono text-slate-400 tabular-nums">
                      ({section.questions.length})
                    </span>
                  </a>
                ))}
              </nav>
            )}

            {/* Arranged Sections */}
            {sections.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
                <p className="text-base font-semibold text-slate-900">
                  No questions match your current filters
                </p>
                <p className="text-sm text-slate-500">
                  Try lowering the minimum importance slider, clearing your search query, or turning off Flagged Only.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 space-y-4"
                  >
                    {/* Section Heading */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                          {section.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                          {section.subtitle}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-slate-500 tabular-nums whitespace-nowrap shrink-0">
                        {section.questions.length} questions · Avg Importance{' '}
                        <span className="font-semibold text-sky-700">
                          {section.avgImportance}/10
                        </span>
                      </div>
                    </div>

                    {/* Questions in Section */}
                    <div className="space-y-4">
                      {section.questions.map((question, idx) => (
                        <QuestionCard
                          key={question.id}
                          question={question}
                          displayIndex={idx + 1}
                          selectedOption={userAnswers[question.id]}
                          onSelectOption={handleSelectOption}
                          isFlagged={flaggedIds.has(question.id)}
                          onToggleFlag={handleToggleFlag}
                          studyMode={studyMode}
                          isAnswerRevealed={Boolean(revealedQuestions[question.id])}
                          onToggleReveal={handleToggleReveal}
                        />
                      ))}
                    </div>

                    {/* Clear Per-Section Answer Key */}
                    <SectionAnswerKey
                      section={section}
                      isOpen={isSectionKeyOpen(section.id)}
                      onToggleOpen={() => handleToggleSectionKey(section.id)}
                      userAnswers={userAnswers}
                    />
                  </section>
                ))}
              </div>
            )}
          </>
        )}

        {/* TAB 2: MASTER ANSWER KEYS */}
        {activeTab === 'answer-keys' && (
          <MasterAnswerKeysView
            sections={sections}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            userAnswers={userAnswers}
            onPrint={handlePrint}
          />
        )}

        {/* TAB 3: EXAM BLUEPRINT */}
        {activeTab === 'blueprint' && (
          <ExamBlueprintView
            userAnswers={userAnswers}
            onJumpToTopic={handleJumpToTopic}
          />
        )}

        {/* TAB 4: TIMED DRILL */}
        {activeTab === 'practice' && (
          <TimedPracticeView onRecordAnswer={handleSelectOption} />
        )}
      </main>

      <footer className="no-print border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Big Data Analytics &amp; Hadoop Ecosystem Exam Prep · 72 Syllabus-Grounded MCQs
          </span>
          <span className="font-mono tabular-nums">
            Progress saved locally in browser
          </span>
        </div>
      </footer>
    </div>
  );
}
