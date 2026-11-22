import { Check, ChevronDown, ChevronUp, Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { OPTION_LETTERS } from '../data/questions';
import { QuestionSection } from '../types/mcq';

interface SectionAnswerKeyProps {
  section: QuestionSection;
  isOpen: boolean;
  onToggleOpen: () => void;
  userAnswers: Record<string, number>;
}

export function SectionAnswerKey({
  section,
  isOpen,
  onToggleOpen,
  userAnswers,
}: SectionAnswerKeyProps) {
  const [showRationales, setShowRationales] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyKey = async () => {
    const lines = [
      `ANSWER KEY — ${section.title}`,
      ...section.questions.map((q, idx) => {
        const letter = OPTION_LETTERS[q.correctIndex];
        return `${String(idx + 1).padStart(2, '0')}. [${q.id}] (${q.importance}/10, ${q.difficulty}) -> ${letter}: ${q.options[q.correctIndex]}`;
      }),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback not required
    }
  };

  const answeredInSection = section.questions.filter(
    (q) => userAnswers[q.id] !== undefined
  ).length;
  const correctInSection = section.questions.filter(
    (q) => userAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="print-break-avoid mt-6 bg-slate-100/70 border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-white border-b border-slate-200">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded"
        >
          <KeyRound className="w-4 h-4 text-sky-700 shrink-0" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
            Section Answer Key
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            ({section.questions.length} items)
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
          )}
        </button>

        <div className="no-print flex items-center gap-3 text-xs">
          {answeredInSection > 0 && (
            <span className="font-mono text-slate-600 tabular-nums">
              Scored {correctInSection}/{answeredInSection} attempted
            </span>
          )}
          {isOpen && (
            <>
              <button
                type="button"
                onClick={() => setShowRationales((v) => !v)}
                className="font-medium text-sky-700 hover:text-sky-800 whitespace-nowrap"
              >
                {showRationales ? 'Compact Grid Only' : 'Show Full Rationales'}
              </button>
              <button
                type="button"
                onClick={handleCopyKey}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-md font-medium text-slate-700 transition-colors whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-5 space-y-5">
          {/* Quick-Scan Compact Key Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {section.questions.map((q, idx) => {
              const letter = OPTION_LETTERS[q.correctIndex];
              const picked = userAnswers[q.id];
              const isRight = picked !== undefined && picked === q.correctIndex;
              const isWrong = picked !== undefined && picked !== q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`px-3 py-2 rounded-lg border bg-white flex items-center justify-between gap-2 text-xs font-mono tabular-nums ${
                    isRight
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : isWrong
                      ? 'border-rose-300 bg-rose-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <span className="text-slate-500">
                    {String(idx + 1).padStart(2, '0')} · {q.id}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {letter}
                    {isWrong && (
                      <span className="text-rose-600 font-normal ml-1">
                        ({OPTION_LETTERS[picked]})
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Rationale Table */}
          {showRationales && (
            <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
              {section.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 text-xs sm:text-sm space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}. {q.id}
                    </span>
                    <span className="text-slate-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">
                      Answer: {OPTION_LETTERS[q.correctIndex]}
                    </span>
                    <span className="text-slate-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-slate-600 font-medium">{q.subtopic}</span>
                    <span className="text-slate-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono text-sky-700 tabular-nums">
                      {q.importance}/10
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
