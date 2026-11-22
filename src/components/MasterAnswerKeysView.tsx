import { Check, Copy, Printer } from 'lucide-react';
import { useState } from 'react';
import { OPTION_LETTERS } from '../data/questions';
import { TOPIC_MAP } from '../data/topics';
import { GroupByMode, QuestionSection } from '../types/mcq';

interface MasterAnswerKeysViewProps {
  sections: QuestionSection[];
  groupBy: GroupByMode;
  onGroupByChange: (mode: GroupByMode) => void;
  userAnswers: Record<string, number>;
  onPrint: () => void;
}

const GROUP_OPTIONS: { id: GroupByMode; label: string }[] = [
  { id: 'importance', label: 'Importance Score' },
  { id: 'topic', label: 'Topic' },
  { id: 'difficulty', label: 'Difficulty Level' },
];

export function MasterAnswerKeysView({
  sections,
  groupBy,
  onGroupByChange,
  userAnswers,
  onPrint,
}: MasterAnswerKeysViewProps) {
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    const blocks = sections.map((section) => {
      const header = `=== ${section.title} (${section.questions.length} Questions, Avg Importance ${section.avgImportance}/10) ===`;
      const rows = section.questions.map((q, idx) => {
        const letter = OPTION_LETTERS[q.correctIndex];
        const base = `${String(idx + 1).padStart(2, '0')}. [${q.id}] Answer: ${letter} | Imp: ${q.importance}/10 | ${q.difficulty} | ${q.subtopic}`;
        return includeExplanations ? `${base}\n    Rationale: ${q.explanation}` : base;
      });
      return [header, ...rows].join('\n');
    });

    try {
      await navigator.clipboard.writeText(blocks.join('\n\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Organize Answer Keys By
          </span>
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
            {GROUP_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onGroupByChange(opt.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  groupBy === opt.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIncludeExplanations((v) => !v)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            {includeExplanations ? 'Hide Rationales (Compact)' : 'Show Rationales'}
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>Copied All Keys</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy All Keys</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Print Keys</span>
          </button>
        </div>
      </div>

      {/* Section-by-Section Answer Key Tables */}
      {sections.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
          No questions match the current filters. Reset filters on the Question Bank tab to view all answer keys.
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {section.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{section.subtitle}</p>
                </div>
                <div className="text-xs font-mono text-slate-600 tabular-nums whitespace-nowrap">
                  {section.questions.length} keys · Avg Importance {section.avgImportance}/10
                </div>
              </div>

              {/* Quick Scan Grid */}
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {section.questions.map((q, idx) => {
                    const letter = OPTION_LETTERS[q.correctIndex];
                    const picked = userAnswers[q.id];
                    const isRight = picked !== undefined && picked === q.correctIndex;
                    const isWrong = picked !== undefined && picked !== q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`px-2.5 py-1.5 rounded border text-xs font-mono tabular-nums flex items-center justify-between ${
                          isRight
                            ? 'border-emerald-300 bg-emerald-50/60 text-emerald-900'
                            : isWrong
                            ? 'border-rose-300 bg-rose-50/60 text-rose-900'
                            : 'border-slate-200 bg-slate-50/40 text-slate-800'
                        }`}
                      >
                        <span className="text-slate-500">
                          {String(idx + 1).padStart(2, '0')} ({q.id})
                        </span>
                        <span className="font-bold">{letter}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Table */}
              {includeExplanations && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 bg-white">
                        <th className="py-3 pl-6 pr-3 w-24">ID</th>
                        <th className="py-3 px-3 w-20">Key</th>
                        <th className="py-3 px-3 w-24">Score</th>
                        <th className="py-3 px-3 w-36">Difficulty</th>
                        <th className="py-3 px-3 w-48">Topic & Concept</th>
                        <th className="py-3 pl-3 pr-6">Correct Answer & Exam Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {section.questions.map((q, idx) => {
                        const letter = OPTION_LETTERS[q.correctIndex];
                        const topic = TOPIC_MAP[q.topicId];
                        return (
                          <tr
                            key={q.id}
                            className="align-top hover:bg-slate-50/60 transition-colors"
                          >
                            <td className="py-3.5 pl-6 pr-3 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                              {String(idx + 1).padStart(2, '0')} · {q.id}
                            </td>
                            <td className="py-3.5 px-3 font-mono text-sm font-bold text-emerald-700 whitespace-nowrap">
                              Option {letter}
                            </td>
                            <td className="py-3.5 px-3 font-mono text-xs font-semibold text-sky-700 tabular-nums whitespace-nowrap">
                              {q.importance}/10
                            </td>
                            <td className="py-3.5 px-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                              {q.difficulty}
                            </td>
                            <td className="py-3.5 px-3 text-xs text-slate-600">
                              <div className="font-medium text-slate-900">
                                {q.subtopic}
                              </div>
                              <div className="text-slate-500 mt-0.5">
                                {topic?.shortTitle}
                              </div>
                            </td>
                            <td className="py-3.5 pl-3 pr-6 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
                              <div className="font-semibold text-slate-900">
                                {q.options[q.correctIndex]}
                              </div>
                              <p className="text-slate-600">{q.explanation}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
