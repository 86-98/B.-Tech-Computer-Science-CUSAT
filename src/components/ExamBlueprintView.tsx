import { ArrowRight } from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { TopicId } from '../types/mcq';

interface ExamBlueprintViewProps {
  userAnswers: Record<string, number>;
  onJumpToTopic: (topicId: TopicId) => void;
}

const HIGH_YIELD_FORMULAS = [
  {
    name: 'Default HashPartitioner',
    formula: 'Partition = abs(Hash(Key)) mod NumReducers',
    note: 'Apple (14523) mod 3 = 0 · Banana (74381) mod 3 = 2',
  },
  {
    name: 'Relative Co-occurrence Frequency',
    formula: 'f(w_j | w_i) = N(w_i, w_j) / sum_k N(w_i, w_k)',
    note: 'Stripes: sum row map directly · Pairs: Order Inversion via (w_i, *)',
  },
  {
    name: 'Mean Combiner Composite Fix',
    formula: 'Emit (partial_sum, partial_count) -> global_mean = sum(sums) / sum(counts)',
    note: 'Naive mean([10,10], [2,2,2,2]) gives 6.00 instead of true 4.67',
  },
  {
    name: 'MapReduce Pipeline Sequence',
    formula: 'Map -> Partitioner -> Shuffle -> Sort -> Group by Key -> Combiner -> Reduce',
    note: 'Mapper side: Partitioner, Combiner · Network: Shuffle · Reducer side: Sort, Group',
  },
];

const HDFS_COMMANDS = [
  { cmd: 'hadoop fs -ls /', purpose: 'List files & directories at HDFS root' },
  { cmd: 'hadoop fs -ls -R /', purpose: 'List all files & subdirectories recursively' },
  { cmd: 'hadoop fs -mkdir /sample', purpose: 'Create a new directory in HDFS' },
  { cmd: 'hadoop fs -put <local> <hdfs>', purpose: 'Upload file from local FS into HDFS' },
  { cmd: 'hadoop fs -get <hdfs> <local>', purpose: 'Download file from HDFS to local FS' },
  { cmd: 'hadoop fs -cat /sample/test.txt', purpose: 'Display HDFS file contents on console' },
  { cmd: 'hadoop fs -cp <src> <dest>', purpose: 'Copy file within HDFS' },
  { cmd: 'hadoop fs -rm -r /sample1', purpose: 'Delete HDFS directory (-r mandatory)' },
];

export function ExamBlueprintView({
  userAnswers,
  onJumpToTopic,
}: ExamBlueprintViewProps) {
  const topicStats = TOPICS.map((topic) => {
    const qs = ALL_QUESTIONS.filter((q) => q.topicId === topic.id);
    const critical = qs.filter((q) => q.importance >= 9).length;
    const tricky = qs.filter((q) => q.difficulty === 'Exam-Tricky').length;
    const avgImp =
      Math.round((qs.reduce((s, q) => s + q.importance, 0) / qs.length) * 10) / 10;
    const attempted = qs.filter((q) => userAnswers[q.id] !== undefined).length;
    const correct = qs.filter((q) => userAnswers[q.id] === q.correctIndex).length;
    return { topic, total: qs.length, critical, tricky, avgImp, attempted, correct };
  });

  const criticalTotal = ALL_QUESTIONS.filter((q) => q.importance >= 9).length;
  const highTotal = ALL_QUESTIONS.filter(
    (q) => q.importance >= 7 && q.importance <= 8
  ).length;
  const standardTotal = ALL_QUESTIONS.filter((q) => q.importance <= 6).length;

  return (
    <div className="space-y-8">
      {/* Top Distribution Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Critical Must-Know (9–10/10)
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-sky-700 tabular-nums">
              {criticalTotal}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              questions ({Math.round((criticalTotal / ALL_QUESTIONS.length) * 100)}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Core exam questions: 5 Vs, HashPartitioner, WordCount Java, Mean trap, Order Inversion, Secondary Sort, HDFS Read/Write, YARN, HBase vs. HDFS.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            High-Yield Core (7–8/10)
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {highTotal}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              questions ({Math.round((highTotal / ALL_QUESTIONS.length) * 100)}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Frequently tested comparisons, design patterns, Avro schema evolution, Pig/Sqoop/Flume, and TaskTracker/DataNode heartbeat mechanics.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Standard Syllabus (5–6/10)
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-700 tabular-nums">
              {standardTotal}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              questions ({Math.round((standardTotal / ALL_QUESTIONS.length) * 100)}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Historical evolution milestones, Small Data vs. Big Data framing, Driver boilerplate, and foundational summaries.
          </p>
        </div>
      </section>

      {/* Syllabus Coverage Matrix */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">
            Syllabus Coverage & Mastery Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            All 6 modules covered across your four course documents (12 questions per module). Click any module to study it directly.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-500">
                <th className="py-3 pl-6 pr-3">Syllabus Module</th>
                <th className="py-3 px-3 text-right">Total</th>
                <th className="py-3 px-3 text-right">Avg Score</th>
                <th className="py-3 px-3 text-right">Critical (9–10)</th>
                <th className="py-3 px-3 text-right">Exam-Tricky</th>
                <th className="py-3 px-3 text-right">Your Progress</th>
                <th className="py-3 pl-3 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {topicStats.map((row) => (
                <tr key={row.topic.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-6 pr-3">
                    <div className="font-semibold text-slate-900">
                      {row.topic.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {row.topic.moduleRef} · {row.topic.examFocus.join(' · ')}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs font-semibold text-slate-700 tabular-nums">
                    {row.total}
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs font-semibold text-sky-700 tabular-nums">
                    {row.avgImp}/10
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs text-slate-700 tabular-nums">
                    {row.critical}
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs text-amber-700 tabular-nums">
                    {row.tricky}
                  </td>
                  <td className="py-4 px-3 text-right font-mono text-xs tabular-nums whitespace-nowrap">
                    {row.attempted === 0 ? (
                      <span className="text-slate-400">Not started</span>
                    ) : (
                      <span className="text-slate-800 font-semibold">
                        {row.correct}/{row.attempted} correct
                      </span>
                    )}
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                    <button
                      type="button"
                      onClick={() => onJumpToTopic(row.topic.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two-Column Quick-Reference Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              High-Yield Formulas & Sequences
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Memorize exact formulas and numerical edge cases tested in MCQs.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {HIGH_YIELD_FORMULAS.map((item) => (
              <div key={item.name} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                <div className="text-xs font-semibold text-slate-900">
                  {item.name}
                </div>
                <div className="font-mono text-xs bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-800 overflow-x-auto">
                  {item.formula}
                </div>
                <div className="text-xs text-slate-500">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              HDFS CLI Commands & Key Defaults
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Default block size: 64 MB (classic) / 128 MB (modern) · Replication: 3 · Hive on HBase: 4–5x slower.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {HDFS_COMMANDS.map((item) => (
              <div
                key={item.cmd}
                className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
              >
                <code className="font-mono font-semibold text-slate-900">
                  {item.cmd}
                </code>
                <span className="text-slate-600">{item.purpose}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
