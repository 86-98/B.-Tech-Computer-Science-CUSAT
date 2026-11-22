import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ALL_QUESTIONS, OPTION_LETTERS, sortQuestions } from '../data/questions';
import { TOPIC_MAP, TOPICS } from '../data/topics';
import { MCQItem, TopicId } from '../types/mcq';

type DrillPreset =
  | 'critical'
  | 'tricky'
  | 'full'
  | TopicId;

interface TimedPracticeViewProps {
  onRecordAnswer: (questionId: string, optionIndex: number) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function TimedPracticeView({ onRecordAnswer }: TimedPracticeViewProps) {
  const [preset, setPreset] = useState<DrillPreset>('critical');
  const [phase, setPhase] = useState<'setup' | 'running' | 'review'>('setup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, number>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const drillQuestions: MCQItem[] = useMemo(() => {
    let base: MCQItem[];
    if (preset === 'critical') {
      base = ALL_QUESTIONS.filter((q) => q.importance >= 9);
    } else if (preset === 'tricky') {
      base = ALL_QUESTIONS.filter((q) => q.difficulty === 'Exam-Tricky');
    } else if (preset === 'full') {
      base = ALL_QUESTIONS;
    } else {
      base = ALL_QUESTIONS.filter((q) => q.topicId === preset);
    }
    return sortQuestions(base, 'importance-desc');
  }, [preset]);

  useEffect(() => {
    if (phase !== 'running') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const startDrill = () => {
    setDrillAnswers({});
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setPhase('running');
  };

  const handleSelectOption = (questionId: string, idx: number) => {
    setDrillAnswers((prev) => ({ ...prev, [questionId]: idx }));
    onRecordAnswer(questionId, idx);
  };

  const finishDrill = () => {
    setPhase('review');
  };

  if (phase === 'setup') {
    const presets: { id: DrillPreset; title: string; detail: string; count: number }[] = [
      {
        id: 'critical',
        title: 'Critical Must-Know (Importance 9–10)',
        detail: 'Highest-yield exam concepts, formulas, numerical traces, and daemon rules.',
        count: ALL_QUESTIONS.filter((q) => q.importance >= 9).length,
      },
      {
        id: 'tricky',
        title: 'Exam-Tricky Traps Only',
        detail: 'Mean combiner trap, Order Inversion, Secondary NameNode limits, Java signatures.',
        count: ALL_QUESTIONS.filter((q) => q.difficulty === 'Exam-Tricky').length,
      },
      {
        id: 'full',
        title: 'Full 72-Question Comprehensive Mock',
        detail: 'Every question across all 6 syllabus modules, ordered highest to lowest importance.',
        count: ALL_QUESTIONS.length,
      },
      ...TOPICS.map((t) => ({
        id: t.id as DrillPreset,
        title: t.title,
        detail: t.moduleRef,
        count: ALL_QUESTIONS.filter((q) => q.topicId === t.id).length,
      })),
    ];

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-slate-900">
            Timed Exam Practice Drill
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Simulate exam conditions without seeing answers until you submit. Choose a focused high-importance set, a specific module, or the full 72-question mock exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {presets.map((item) => {
            const selected = preset === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPreset(item.id)}
                className={`text-left p-4 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                  selected
                    ? 'border-sky-600 bg-sky-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </span>
                  <span className="font-mono text-xs font-semibold text-sky-700 tabular-nums shrink-0">
                    {item.count} Qs
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {item.detail}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-mono tabular-nums">
            Selected deck: {drillQuestions.length} questions · Recommended pace ~45s/question
          </div>
          <button
            type="button"
            onClick={startDrill}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>Start Drill ({drillQuestions.length} Questions)</span>
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'review') {
    const total = drillQuestions.length;
    const answered = drillQuestions.filter(
      (q) => drillAnswers[q.id] !== undefined
    ).length;
    const correct = drillQuestions.filter(
      (q) => drillAnswers[q.id] === q.correctIndex
    ).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Drill Results & Answer Key Review
            </h2>
            <p className="text-sm text-slate-600">
              Completed in{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {formatDuration(elapsedSeconds)}
              </span>{' '}
              · Answered {answered} of {total} questions
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-500">Final Score</div>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {correct}/{total} ({pct}%)
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>New Drill</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {drillQuestions.map((q, idx) => {
            const picked = drillAnswers[q.id];
            const isCorrect = picked === q.correctIndex;
            const unanswered = picked === undefined;
            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-slate-500">
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {String(idx + 1).padStart(2, '0')} · {q.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-sky-700 font-semibold tabular-nums">
                      Importance {q.importance}/10
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{q.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.subtopic}</span>
                  </div>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {unanswered
                          ? 'Unanswered'
                          : `Picked ${OPTION_LETTERS[picked]} · Correct: ${OPTION_LETTERS[q.correctIndex]}`}
                      </span>
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {q.question}
                </p>
                <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                  <div className="font-semibold text-emerald-800">
                    Correct Answer ({OPTION_LETTERS[q.correctIndex]}):{' '}
                    {q.options[q.correctIndex]}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Running Phase
  const currentQ = drillQuestions[currentIndex];
  const answeredCount = Object.keys(drillAnswers).length;
  const topic = TOPIC_MAP[currentQ.topicId];

  return (
    <div className="space-y-5">
      {/* Top Progress Strip */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono font-bold text-slate-900 tabular-nums">
            Question {currentIndex + 1} / {drillQuestions.length}
          </span>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="text-xs font-mono text-slate-600 tabular-nums">
            {answeredCount} answered
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-slate-800 tabular-nums">
            <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>{formatDuration(elapsedSeconds)}</span>
          </div>
          <button
            type="button"
            onClick={finishDrill}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
          >
            Submit & Grade
          </button>
        </div>
      </div>

      {/* Active Question Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pb-3.5 border-b border-slate-100">
          <span className="font-mono font-semibold text-slate-900">
            {currentQ.id}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono font-semibold text-sky-700 tabular-nums">
            Importance {currentQ.importance}/10
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-slate-700">{currentQ.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span>{topic?.shortTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{currentQ.subtopic}</span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
          {currentQ.question}
        </h3>

        {currentQ.codeSnippet && (
          <pre className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs sm:text-sm text-slate-800 overflow-x-auto">
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = drillAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, idx)}
                className={`w-full min-h-[44px] text-left px-4 py-3 border rounded-lg flex items-start gap-3 transition-colors ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/70 text-slate-900'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span
                  className={`mt-0.5 w-6 h-6 rounded font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="text-sm leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {currentIndex < drillQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.min(drillQuestions.length - 1, i + 1)
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={finishDrill}
              className="px-4 py-2 text-xs font-semibold bg-sky-700 text-white rounded-lg hover:bg-sky-800"
            >
              Finish & View Answer Key
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="text-xs font-medium text-slate-500 mb-2.5">
          Jump to Question
        </div>
        <div className="flex flex-wrap gap-1.5">
          {drillQuestions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isDone = drillAnswers[q.id] !== undefined;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 rounded-md font-mono text-xs font-semibold tabular-nums border transition-colors ${
                  isCurrent
                    ? 'border-sky-600 bg-sky-600 text-white'
                    : isDone
                    ? 'border-slate-300 bg-slate-100 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
