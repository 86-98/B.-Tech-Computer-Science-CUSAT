import {
  Bookmark,
  CheckCircle2,
  Eye,
  EyeOff,
  XCircle,
} from 'lucide-react';
import { getImportanceTierLabel, OPTION_LETTERS } from '../data/questions';
import { TOPIC_MAP } from '../data/topics';
import { MCQItem, StudyMode } from '../types/mcq';

interface QuestionCardProps {
  question: MCQItem;
  displayIndex: number;
  selectedOption: number | undefined;
  onSelectOption: (questionId: string, optionIndex: number) => void;
  isFlagged: boolean;
  onToggleFlag: (questionId: string) => void;
  studyMode: StudyMode;
  isAnswerRevealed: boolean;
  onToggleReveal: (questionId: string) => void;
}

export function QuestionCard({
  question,
  displayIndex,
  selectedOption,
  onSelectOption,
  isFlagged,
  onToggleFlag,
  studyMode,
  isAnswerRevealed,
  onToggleReveal,
}: QuestionCardProps) {
  const topic = TOPIC_MAP[question.topicId];
  const hasAnswered = selectedOption !== undefined;
  const shouldShowResult =
    (studyMode === 'interactive' && hasAnswered) || isAnswerRevealed;
  const isCorrect = selectedOption === question.correctIndex;

  const importanceFillPercent = Math.min(100, Math.max(10, question.importance * 10));

  return (
    <article className="print-break-avoid bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-colors">
      {/* Clean unboxed metadata header line (Zero-Pill Discipline) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
          <span className="font-mono font-semibold text-slate-900 tabular-nums">
            {question.id}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-2 font-medium text-slate-700">
            <span className="font-mono font-semibold text-sky-700 tabular-nums">
              Importance {question.importance}/10
            </span>
            <span
              className="hidden sm:inline-block w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden align-middle"
              aria-hidden="true"
            >
              <span
                className={`block h-full rounded-full ${
                  question.importance >= 9
                    ? 'bg-sky-600'
                    : question.importance >= 7
                    ? 'bg-slate-600'
                    : 'bg-slate-400'
                }`}
                style={{ width: `${importanceFillPercent}%` }}
              />
            </span>
            <span className="text-slate-500">
              ({getImportanceTierLabel(question.importance)})
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <span
            className={`font-medium ${
              question.difficulty === 'Exam-Tricky'
                ? 'text-amber-700'
                : question.difficulty === 'Applied'
                ? 'text-slate-700'
                : 'text-slate-600'
            }`}
          >
            {question.difficulty}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500">{topic?.shortTitle}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-600">{question.subtopic}</span>
        </div>

        <div className="no-print flex items-center gap-2 shrink-0">
          {studyMode === 'exam-sheet' && (
            <button
              type="button"
              onClick={() => onToggleReveal(question.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap"
            >
              {isAnswerRevealed ? (
                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {isAnswerRevealed ? 'Hide Answer' : 'Reveal Answer'}
            </button>
          )}
          <button
            type="button"
            onClick={() => onToggleFlag(question.id)}
            aria-pressed={isFlagged}
            aria-label={isFlagged ? `Unflag ${question.id}` : `Flag ${question.id} for review`}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              isFlagged
                ? 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : ''}`}
              aria-hidden="true"
            />
            <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed mb-4">
        <span className="font-mono text-slate-400 mr-2 tabular-nums">
          {String(displayIndex).padStart(2, '0')}.
        </span>
        {question.question}
      </h3>

      {/* Optional Formula / Code Block */}
      {question.codeSnippet && (
        <pre className="mb-4 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs sm:text-[13px] text-slate-800 overflow-x-auto leading-relaxed">
          <code>{question.codeSnippet}</code>
        </pre>
      )}

      {/* Options List */}
      <div className="space-y-2.5" role="radiogroup" aria-label={`Options for ${question.id}`}>
        {question.options.map((optText, idx) => {
          const isSelected = selectedOption === idx;
          const isOptionCorrect = idx === question.correctIndex;

          let containerStyle =
            'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/70';
          let letterStyle = 'bg-slate-100 text-slate-700';

          if (shouldShowResult) {
            if (isOptionCorrect) {
              containerStyle =
                'bg-emerald-50/80 border-emerald-400 text-slate-900';
              letterStyle = 'bg-emerald-600 text-white';
            } else if (isSelected && !isOptionCorrect) {
              containerStyle = 'bg-rose-50/80 border-rose-400 text-slate-900';
              letterStyle = 'bg-rose-600 text-white';
            } else {
              containerStyle = 'bg-white border-slate-200 text-slate-500';
              letterStyle = 'bg-slate-100 text-slate-400';
            }
          } else if (isSelected) {
            containerStyle = 'bg-sky-50/80 border-sky-500 text-slate-900';
            letterStyle = 'bg-sky-600 text-white';
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(question.id, idx)}
              className={`w-full min-h-[44px] text-left px-3.5 py-2.5 border rounded-lg flex items-start gap-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${containerStyle}`}
            >
              <span
                className={`mt-0.5 w-6 h-6 rounded font-mono text-xs font-semibold flex items-center justify-center shrink-0 transition-colors ${letterStyle}`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="text-sm leading-relaxed flex-1">{optText}</span>

              {shouldShowResult && isOptionCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0 mt-0.5 whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Correct</span>
                </span>
              )}
              {shouldShowResult && isSelected && !isOptionCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 shrink-0 mt-0.5 whitespace-nowrap">
                  <XCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Your pick</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Contextual Explanation Panel (No thick left accent border — clean all-around hairline border) */}
      {shouldShowResult && (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-700">
          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-semibold">
            <span className="font-mono text-slate-900">
              Answer Key: Option {OPTION_LETTERS[question.correctIndex]}
            </span>
            {hasAnswered && (
              <>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span
                  className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}
                >
                  {isCorrect
                    ? 'Correct response recorded'
                    : `Selected ${OPTION_LETTERS[selectedOption!]} — review rationale below`}
                </span>
              </>
            )}
          </div>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
}
