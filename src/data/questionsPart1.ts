import { MCQItem } from '../types/mcq';

export const QUESTIONS_PART_1: MCQItem[] = [
  // =========================================================================
  // TOPIC 1: BIG DATA FOUNDATIONS, 5 Vs & DATA TYPES (Q01 - Q12)
  // =========================================================================
  {
    id: 'Q01',
    number: 1,
    topicId: 'foundations',
    subtopic: 'The 5 Vs of Big Data',
    importance: 10,
    difficulty: 'Foundational',
    question:
      'Which of the Five Vs of Big Data specifically addresses the trustworthiness, noise, duplicates, and quality of raw datasets such as social media posts containing abbreviations and spelling errors?',
    options: ['Velocity', 'Variety', 'Veracity', 'Value'],
    correctIndex: 2,
    explanation:
      'Veracity (also called Validity) refers to the trustworthiness and quality of data. Because Big Data often contains noise, inaccuracies, and duplicates (e.g., informal social media posts), cleaning and validation are required.',
  },
  {
    id: 'Q02',
    number: 2,
    topicId: 'foundations',
    subtopic: 'Unstructured Data Share',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'Approximately what percentage of Big Data consists of unstructured data (such as videos, images, audio, email bodies, and social media posts)?',
    options: ['About 20%', 'About 45%', 'About 60%', 'Over 80% (~80%+)'],
    correctIndex: 3,
    explanation:
      'Unstructured data accounts for the largest portion of Big Data (~80%+). It conforms to no predefined schema or data model and requires distributed tools such as Hadoop, Spark, or NLP.',
  },
  {
    id: 'Q03',
    number: 3,
    topicId: 'foundations',
    subtopic: 'Traditional BI vs. Big Data',
    importance: 10,
    difficulty: 'Applied',
    question:
      'What is the core architectural processing shift when moving from Traditional Business Intelligence (BI) to Big Data Analytics?',
    options: [
      'Moving data to a central server where the code executes',
      'Moving small computation code to the distributed nodes where the massive data already resides',
      'Converting all unstructured media into relational tables before storage',
      'Replacing horizontal scaling with vertical mainframe scaling',
    ],
    correctIndex: 1,
    explanation:
      'Traditional BI moves data to code on a central server. Big Data Analytics moves code to data because programs are only a few kilobytes whereas datasets span terabytes to exabytes.',
  },
  {
    id: 'Q04',
    number: 4,
    topicId: 'foundations',
    subtopic: 'Big Data vs. Traditional Data',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'How do Big Data platforms differ from Traditional RDBMS systems in terms of scalability and hardware strategy?',
    options: [
      'Big Data scales vertically using high-end proprietary servers; Traditional Data scales horizontally',
      'Big Data scales horizontally by adding commodity hardware nodes; Traditional Data scales vertically by upgrading a single server',
      'Both systems scale exclusively vertically to preserve ACID guarantees',
      'Big Data requires specialized supercomputers rather than commodity clusters',
    ],
    correctIndex: 1,
    explanation:
      'Big Data systems scale horizontally (scaling out) by adding inexpensive commodity hardware machines to a cluster, whereas traditional RDBMS systems scale vertically (scaling up) by adding CPU/RAM to a single expensive server.',
  },
  {
    id: 'Q05',
    number: 5,
    topicId: 'foundations',
    subtopic: 'Semi-Structured Data',
    importance: 8,
    difficulty: 'Applied',
    question:
      'Why is an Email message typically classified as semi-structured data in Big Data systems?',
    options: [
      'Because it is always stored inside a fixed-schema SQL database table',
      'Because it contains structured metadata headers (sender, recipient, subject, timestamp) combined with an unstructured free-text body',
      'Because emails only contain binary attachments such as JPEG and MPEG files',
      'Because emails follow strict ACID constraints during transmission',
    ],
    correctIndex: 1,
    explanation:
      'Semi-structured data lies between structured and unstructured data. Emails combine structured fields (sender, subject) with an unstructured message body; other examples include JSON, XML, and HTML.',
  },
  {
    id: 'Q06',
    number: 6,
    topicId: 'foundations',
    subtopic: 'Data, Analytics & Information',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'In the Netflix illustration of Data, Analytics, and Information, what does the personalized "Top Picks for You Today" homepage represent?',
    options: [
      'Raw unorganized data logs',
      'The analytics algorithm engine',
      'Information (the organized, meaningful, actionable output)',
      'Qualitative noise requiring deduplication',
    ],
    correctIndex: 2,
    explanation:
      'Individual user clicks/interactions are raw Data; Netflix algorithms finding behavior patterns are Analytics; and the organized "Top Picks for You Today" recommendations are Information.',
  },
  {
    id: 'Q07',
    number: 7,
    topicId: 'foundations',
    subtopic: '3 Cs of Data',
    importance: 8,
    difficulty: 'Applied',
    question:
      'Which of the three characteristics of data (3 Cs) asks whether raw data requires cleaning, validation, or further enhancement before use?',
    options: ['Composition', 'Condition', 'Context', 'Consistency'],
    correctIndex: 1,
    explanation:
      'The 3 Cs of data are Composition (structure, source, granularity), Condition (current state and whether cleaning/enhancement is needed), and Context (where, why, sensitivity, and associated events).',
  },
  {
    id: 'Q08',
    number: 8,
    topicId: 'foundations',
    subtopic: 'Evolution of Big Data',
    importance: 6,
    difficulty: 'Foundational',
    question:
      'During which historical era did RDBMS systems (Oracle, IBM DB2, MS SQL Server, MySQL) introduce SQL and the 3-Tier Architecture (Client, Business Logic, Database)?',
    options: [
      '1970s and before (Mainframe era)',
      '1980s & 1990s (Data Utilization era)',
      '2000s – 2010s (Social Media & Cloud era)',
      '2010s – Now (Mobile & IoT era)',
    ],
    correctIndex: 1,
    explanation:
      'The 1970s relied on mainframes, punch cards, and magnetic tapes. The 1980s & 1990s saw the rise of RDBMS (tables, rows, columns, keys, SQL) and the 3-Tier Architecture.',
  },
  {
    id: 'Q09',
    number: 9,
    topicId: 'foundations',
    subtopic: 'Value Creation Flow',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'What is the exact sequence of the Big Data Value Creation Flow?',
    options: [
      'Information -> Data -> Better Decisions -> Actionable Intelligence -> Business Value',
      'Data -> Information -> Actionable Intelligence -> Better Decisions -> Enhanced Business Value',
      'Data -> Actionable Intelligence -> Information -> Enhanced Business Value -> Better Decisions',
      'Analytics -> Structured Tables -> Data -> Better Decisions -> Business Value',
    ],
    correctIndex: 1,
    explanation:
      'The Value Creation Flow progresses strictly as: Data -> Information -> Actionable Intelligence -> Better Decisions -> Enhanced Business Value.',
  },
  {
    id: 'Q10',
    number: 10,
    topicId: 'foundations',
    subtopic: 'Small Data vs. Big Data',
    importance: 6,
    difficulty: 'Applied',
    question:
      'How does the course material contrast "Small Data" with "Big Data" regarding composition and context?',
    options: [
      'Small Data is about certainty (known sources, stable composition/context); Big Data is about complexity (multiple/unknown datasets, exploding volume/velocity/variety)',
      'Small Data is always unstructured while Big Data is always structured',
      'Small Data only uses streaming analytics while Big Data only uses offline batch processing',
      'Small Data requires distributed Hadoop clusters while Big Data runs on punch cards',
    ],
    correctIndex: 0,
    explanation:
      'Small Data is characterized by certainty—known sources and minimal changes to composition and context—whereas Big Data is characterized by complexity across multiple unknown sources and high volume, velocity, and variety.',
  },
  {
    id: 'Q11',
    number: 11,
    topicId: 'foundations',
    subtopic: 'Radial Dimensions of 3 Vs',
    importance: 7,
    difficulty: 'Exam-Tricky',
    question:
      'According to the radial growth model (Figure 2.5), which sequence correctly orders the progression of the Velocity dimension from lowest to highest?',
    options: [
      'Table -> Database -> Photo/Web/Audio -> Social/Video/Mobile',
      'MB -> GB -> TB -> PB',
      'Batch -> Periodic -> Near real-time -> Real-time',
      'Offline -> Semi-structured -> Structured -> Streaming',
    ],
    correctIndex: 2,
    explanation:
      'In the radial growth model: Volume scales MB -> GB -> TB -> PB; Velocity scales Batch -> Periodic -> Near real-time -> Real-time; Variety scales Table -> Database -> Photo/Web/Audio -> Social/Video/Mobile.',
  },
  {
    id: 'Q12',
    number: 12,
    topicId: 'foundations',
    subtopic: 'Unstructured Data Challenges',
    importance: 8,
    difficulty: 'Exam-Tricky',
    question:
      'Which of the following is NOT listed as an advantage of Structured Data over Unstructured Data?',
    options: [
      'Streamlined indexing and searching on text and attributes',
      'Straightforward updating and deleting of records',
      'Ability to ingest raw CCTV footage and audio directly into fixed relational columns without preprocessing',
      'Well-defined data types that simplify storage and BI mining operations',
    ],
    correctIndex: 2,
    explanation:
      'Raw CCTV footage and audio are unstructured data and cannot be stored directly in fixed relational rows/columns. Structured data excels at storage, indexing/searching, updating/deleting, security, and BI operations.',
  },

  // =========================================================================
  // TOPIC 2: MAPREDUCE ARCHITECTURE, PIPELINE & WORDCOUNT (Q13 - Q24)
  // =========================================================================
  {
    id: 'Q13',
    number: 13,
    topicId: 'mapreduce-core',
    subtopic: 'HashPartitioner Formula',
    importance: 10,
    difficulty: 'Applied',
    question:
      'Using Hadoop\'s default HashPartitioner formula, if a job has 3 Reducers (0, 1, 2) and Hash("Banana") = 74381, which Reducer receives the key "Banana"?',
    codeSnippet: 'Partition = abs(Hash(Key)) mod NumReducers',
    options: ['Reducer 0', 'Reducer 1', 'Reducer 2', 'Distributed across all 3 Reducers'],
    correctIndex: 2,
    explanation:
      'abs(74381) mod 3 = 2 (since 74381 = 3 × 24793 + 2). By contrast, Hash("Apple") = 14523 gives 14523 mod 3 = 0 (Reducer 0).',
  },
  {
    id: 'Q14',
    number: 14,
    topicId: 'mapreduce-core',
    subtopic: 'HashPartitioner Formula',
    importance: 9,
    difficulty: 'Exam-Tricky',
    question:
      'Why does the default HashPartitioner wrap Hash(Key) inside abs(...) before applying modulo NumReducers?',
    codeSnippet: 'Partition = abs(Hash(Key)) mod NumReducers',
    options: [
      'To force alphabetical sorting of string keys before shuffling',
      'To guarantee a non-negative partition ID because hash functions can return negative integers',
      'To ensure every reducer receives the exact same number of bytes',
      'To compress intermediate keys before writing to local disk',
    ],
    correctIndex: 1,
    explanation:
      'Hash functions in Java (such as hashCode()) can produce negative integers. Taking abs(...) guarantees a valid non-negative partition index in the range [0, NumReducers - 1].',
  },
  {
    id: 'Q15',
    number: 15,
    topicId: 'mapreduce-core',
    subtopic: 'MapReduce Pipeline Execution',
    importance: 10,
    difficulty: 'Applied',
    question:
      'Where do the Partitioner, Shuffle, Sort, and Combiner stages execute respectively in the MapReduce pipeline?',
    options: [
      'Partitioner: Reducer side | Shuffle: Mapper side | Sort: Network | Combiner: Reducer side',
      'Partitioner: Mapper side | Shuffle: Network | Sort: Reducer side | Combiner: Mapper side',
      'Partitioner: NameNode | Shuffle: DataNode | Sort: Mapper side | Combiner: Network',
      'Partitioner: Reducer side | Shuffle: Network | Sort: Mapper side | Combiner: Reducer side',
    ],
    correctIndex: 1,
    explanation:
      'Partitioner and Combiner run on the Mapper side; Shuffle transfers data across the Network; Sort, Group by Key, and Reduce execute on the Reducer side.',
  },
  {
    id: 'Q16',
    number: 16,
    topicId: 'mapreduce-core',
    subtopic: 'Sort Phase Mechanics',
    importance: 9,
    difficulty: 'Applied',
    question:
      'Which statement accurately describes the built-in Sort phase in MapReduce?',
    options: [
      'It sorts both keys and values in descending order using QuickSort',
      'It sorts strictly by KEY (not by value) using Merge Sort internally in natural key order',
      'It requires the developer to manually implement a sorting algorithm in the Reducer',
      'It executes before the Map function splits the input file',
    ],
    correctIndex: 1,
    explanation:
      'MapReduce automatically sorts strictly by KEY (never by value) using Merge Sort internally (across memory and disk for large data) in natural order (alphabetical for Text, ascending for numbers).',
  },
  {
    id: 'Q17',
    number: 17,
    topicId: 'mapreduce-core',
    subtopic: 'Synchronization Barrier',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'Regarding synchronization between the Map and Reduce phases in Hadoop MapReduce, when can the Reduce function begin executing?',
    options: [
      'Immediately after the very first line of the input file is mapped',
      'Only after the entire Map phase has emitted all intermediate key-value pairs and they are grouped by key',
      'Before the Partitioner assigns keys to reducers',
      'Simultaneously with the first Mapper on the exact same split',
    ],
    correctIndex: 1,
    explanation:
      'MapReduce enforces a synchronization barrier: the Mapper class executes completely on the entire input dataset, and the Reduce phase starts only after all map key-value pairs are emitted, shuffled, sorted, and grouped.',
  },
  {
    id: 'Q18',
    number: 18,
    topicId: 'mapreduce-core',
    subtopic: 'Hadoop 1.x Daemons',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'In the classic two-layer Hadoop 1.x architecture, which pair correctly identifies the Master and Slave daemons of the MapReduce processing layer?',
    options: [
      'NameNode (Master) and DataNode (Slave)',
      'JobTracker (Master) and TaskTracker (Slave)',
      'ResourceManager (Master) and Secondary NameNode (Slave)',
      'ApplicationMaster (Master) and DataStreamer (Slave)',
    ],
    correctIndex: 1,
    explanation:
      'HDFS is the storage layer (NameNode = Master, DataNode = Slave). MapReduce is the processing layer (JobTracker = single Master per cluster, TaskTracker = Slave daemon per worker node).',
  },
  {
    id: 'Q19',
    number: 19,
    topicId: 'mapreduce-core',
    subtopic: 'TaskTracker Parallelism & Heartbeats',
    importance: 8,
    difficulty: 'Applied',
    question:
      'How does a TaskTracker execute multiple map/reduce tasks in parallel and inform the JobTracker that it is still alive?',
    options: [
      'It runs all tasks in a single thread and writes to FsImage every hour',
      'It spawns multiple JVMs for parallel task execution and continuously sends heartbeat messages to the JobTracker',
      'It delegates execution to the NameNode and waits for an Ack queue reply',
      'It broadcasts UDP packets directly to every other TaskTracker in the cluster',
    ],
    correctIndex: 1,
    explanation:
      'Each slave node runs one TaskTracker, which spawns multiple JVMs to run tasks in parallel and continuously sends heartbeats to the JobTracker. If heartbeats stop, the JobTracker reschedules tasks on another node.',
  },
  {
    id: 'Q20',
    number: 20,
    topicId: 'mapreduce-core',
    subtopic: 'WordCount Java Mapper Signature',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'In the course WordCount Java program (WordCounterMap.java), what are the exact 4 generic type parameters of the Mapper class?',
    codeSnippet: 'public class WordCounterMap extends Mapper<K1, V1, K2, V2>',
    options: [
      'Mapper<Text, IntWritable, Text, IntWritable>',
      'Mapper<LongWritable, Text, Text, IntWritable>',
      'Mapper<IntWritable, String, String, IntWritable>',
      'Mapper<LongWritable, Text, IntWritable, Text>',
    ],
    correctIndex: 1,
    explanation:
      'WordCounterMap extends Mapper<LongWritable, Text, Text, IntWritable>: Input Key is byte offset (LongWritable), Input Value is a text line (Text), Output Key is each word (Text), and Output Value is count 1 (IntWritable).',
  },
  {
    id: 'Q21',
    number: 21,
    topicId: 'mapreduce-core',
    subtopic: 'WordCount Java Code Tracing',
    importance: 8,
    difficulty: 'Applied',
    question:
      'In the WordCount Java Reducer (WordCounterRed.java), what does the method signature accept as its second parameter to process all counts belonging to a single word?',
    codeSnippet:
      'protected void reduce(Text word, ??? values, Context context)',
    options: [
      'IntWritable values',
      'Iterable<IntWritable> values',
      'HashMap<Text, IntWritable> values',
      'ArrayList<LongWritable> values',
    ],
    correctIndex: 1,
    explanation:
      'After the Group by Key phase bundles all counts for a given word, the reduce() method receives Iterable<IntWritable> values and iterates over them to accumulate count += val.get().',
  },
  {
    id: 'Q22',
    number: 22,
    topicId: 'mapreduce-core',
    subtopic: 'WordCount Conceptual Trace',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'When running WordCount on the sentence "An elephant is an animal" (lowercased), what is the exact output order immediately after the Shuffle & Sort phase (before Reduce)?',
    options: [
      '(an, 2), (animal, 1), (elephant, 1), (is, 1)',
      '(an, 1), (elephant, 1), (is, 1), (an, 1), (animal, 1)',
      '(an, 1), (an, 1), (animal, 1), (elephant, 1), (is, 1)',
      '(is, 1), (elephant, 1), (animal, 1), (an, 1), (an, 1)',
    ],
    correctIndex: 2,
    explanation:
      'Map emits tokens in sentence order; Shuffle & Sort sorts the individual key-value pairs alphabetically by key: (an, 1), (an, 1), (animal, 1), (elephant, 1), (is, 1). Only the Reducer sums (an, 2).',
  },
  {
    id: 'Q23',
    number: 23,
    topicId: 'mapreduce-core',
    subtopic: 'WordCount Driver Class',
    importance: 6,
    difficulty: 'Foundational',
    question:
      'Which of the three Java classes in a Hadoop WordCount job configures the input/output HDFS paths, specifies OutputKeyClass/OutputValueClass, and invokes job.waitForCompletion(true)?',
    options: [
      'Mapper Class (WordCounterMap.java)',
      'Reducer Class (WordCounterRed.java)',
      'Driver Class (WordCounter.java)',
      'Partitioner Class (HashPartitioner.java)',
    ],
    correctIndex: 2,
    explanation:
      'The Driver Class (WordCounter.java) holds job configuration: job name, JAR class, Mapper/Reducer classes, output key/value types, input/output paths, and job.waitForCompletion(true).',
  },
  {
    id: 'Q24',
    number: 24,
    topicId: 'mapreduce-core',
    subtopic: 'Data Locality & Classroom Analogy',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'In the classroom analogy (counting the word "Hadoop" across 100 answer sheets distributed among 5 students and summed by 1 teacher), what do the 5 students and the teacher represent respectively?',
    options: [
      'Students = DataNodes; Teacher = NameNode',
      'Students = Mapper nodes; Teacher = Reducer node',
      'Students = Combiners; Teacher = Partitioner',
      'Students = Reducers; Teacher = JobTracker',
    ],
    correctIndex: 1,
    explanation:
      'In the analogy: Classroom = Hadoop, Answer sheets = HDFS files, Students = Mapper nodes (counting locally), Counting = Map function, Teacher = Reducer node (summing intermediate totals), Final total = Output file.',
  },

  // =========================================================================
  // TOPIC 3: DESIGN PATTERNS, LOCAL AGGREGATION & CORRECTNESS (Q25 - Q36)
  // =========================================================================
  {
    id: 'Q25',
    number: 25,
    topicId: 'aggregation-patterns',
    subtopic: 'Mean Combiner Trap',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'Which aggregation function CANNOT be safely computed directly inside a standard MapReduce Combiner without modifying the value payload?',
    options: ['sum()', 'count()', 'mean()', 'max()'],
    correctIndex: 2,
    explanation:
      'A Combiner requires associative and commutative operations. sum(), count(), min(), and max() are associative and commutative, whereas mean() is NOT associative across unevenly sized partitions.',
  },
  {
    id: 'Q26',
    number: 26,
    topicId: 'aggregation-patterns',
    subtopic: 'Mean Combiner Numerical Calculation',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'Mapper 1 processes values [10, 10] and Mapper 2 processes values [2, 2, 2, 2]. If a developer mistakenly uses a naive mean() Combiner, what wrong result does the Reducer output compared to the true global mean?',
    codeSnippet:
      'Mapper 1 split: [10, 10]\nMapper 2 split: [2, 2, 2, 2]',
    options: [
      'Naive Combiner outputs 6.00; True Global Mean is 4.67',
      'Naive Combiner outputs 4.67; True Global Mean is 6.00',
      'Naive Combiner outputs 5.00; True Global Mean is 4.67',
      'Both Naive Combiner and True Global Mean output 4.67',
    ],
    correctIndex: 0,
    explanation:
      'Naive Combiner emits avg(10,10)=10 and avg(2,2,2,2)=2; Reducer averages (10+2)/2 = 6.00 (losing partition weights). The true global mean is (10+10+2+2+2+2)/6 = 28/6 = 4.67.',
  },
  {
    id: 'Q27',
    number: 27,
    topicId: 'aggregation-patterns',
    subtopic: 'Fixing Mean in Combiners',
    importance: 10,
    difficulty: 'Applied',
    question:
      'How do you correctly implement distributed average (mean) calculation while still using a MapReduce Combiner?',
    options: [
      'Force Hadoop to execute the Combiner exactly once per mapper',
      'Emit a composite value (partial_sum, partial_count) from Mapper and Combiner, and divide total_sum / total_count once in the final Reducer',
      'Sort all values in descending order inside the Partitioner before averaging',
      'Pad smaller mapper splits with zeros so every split has identical length',
    ],
    correctIndex: 1,
    explanation:
      'By emitting (partial_sum, partial_count)—for example (20, 2) and (8, 4)—the Combiner and Reducer can associatively sum both components to (28, 6) and divide once at the end (28 / 6 = 4.67).',
  },
  {
    id: 'Q28',
    number: 28,
    topicId: 'aggregation-patterns',
    subtopic: 'Combiner Execution Guarantee',
    importance: 9,
    difficulty: 'Exam-Tricky',
    question:
      'What execution guarantee does the Hadoop MapReduce framework provide regarding how many times a Combiner will be called?',
    options: [
      'Guaranteed to run exactly once per map split',
      'Guaranteed to run at least once on every reducer node',
      'No strict guarantee—it may run zero, one, or multiple times',
      'Guaranteed to run only when the number of reducers is greater than 1',
    ],
    correctIndex: 2,
    explanation:
      'Hadoop makes NO strict guarantee on combiner invocation (0, 1, or multiple times). Therefore, job correctness must never depend on the combiner running, and its output types must match its input types.',
  },
  {
    id: 'Q29',
    number: 29,
    topicId: 'aggregation-patterns',
    subtopic: 'In-Mapper Combining Lifecycle',
    importance: 10,
    difficulty: 'Applied',
    question:
      'In the In-Mapper Combining pattern, which Mapper lifecycle method is responsible for looping through the in-memory HashMap and emitting the final aggregated tallies once per split?',
    options: ['setup()', 'map()', 'cleanup() (or close())', 'partition()'],
    correctIndex: 2,
    explanation:
      'In-Mapper Combining uses 3 lifecycle methods: setup() initializes an empty HashMap once at start; map() updates counts in memory per record without emitting; cleanup() emits all aggregated pairs once at the end of the split.',
  },
  {
    id: 'Q30',
    number: 30,
    topicId: 'aggregation-patterns',
    subtopic: 'In-Mapper Combining Risks',
    importance: 9,
    difficulty: 'Exam-Tricky',
    question:
      'What are the two primary correctness and operational risks introduced by In-Mapper Combining?',
    options: [
      'Excessive network traffic and lack of sorting in the Shuffle phase',
      'Running out of RAM (Out of Memory errors) on large splits and failing to flush cached state inside cleanup()',
      'Loss of data locality and inability to run multiple JVMs',
      'Corrupting HDFS EditLog files during map execution',
    ],
    correctIndex: 1,
    explanation:
      'Because In-Mapper Combining manually preserves state across records in mapper RAM (via a HashMap), large cardinalities can trigger Out-of-Memory (OOM) errors, and omitting emission in cleanup() drops all aggregated data.',
  },
  {
    id: 'Q31',
    number: 31,
    topicId: 'aggregation-patterns',
    subtopic: 'Combiner Type Matching',
    importance: 8,
    difficulty: 'Applied',
    question:
      'To preserve algorithmic correctness and prevent runtime job failures, what type-matching rule must a MapReduce Combiner obey?',
    options: [
      'Combiner output types must match the original HDFS input file byte offsets',
      'Combiner output key-value types must exactly match the input key-value types expected by the Reducer',
      'Combiner keys must always be IntWritable regardless of the Mapper',
      'Combiner input and output types must be completely different classes',
    ],
    correctIndex: 1,
    explanation:
      'Because a Combiner may run zero, one, or multiple times between Mapper and Reducer, its output key-value types must match the Reducer input key-value types (and Mapper output types).',
  },
  {
    id: 'Q32',
    number: 32,
    topicId: 'aggregation-patterns',
    subtopic: 'Filtering & Selection Pattern',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'In the MapReduce Filtering & Selection design pattern, where does the operational filtering logic reside, and what role does the Reducer typically play?',
    options: [
      'Logic resides in the Reducer; Mapper acts as an identity pass-through',
      'Logic resides entirely in the Mapper; Reducer often acts as a simple pass-through (identity reducer) or is omitted',
      'Logic resides in the Partitioner; Mapper and Reducer are both empty',
      'Logic resides inside the Secondary NameNode',
    ],
    correctIndex: 1,
    explanation:
      'In Filtering & Selection, each record is evaluated independently inside the Mapper; matching records are emitted as (record-id, record-content), while the Reducer simply passes them through (identity reducer).',
  },
  {
    id: 'Q33',
    number: 33,
    topicId: 'aggregation-patterns',
    subtopic: 'Reduce-Side Join Tagging',
    importance: 9,
    difficulty: 'Applied',
    question:
      'When joining a 10 GB Users file and a 500 GB Orders file using a Reduce-Side Join, why must Mappers tag emitted values such as ("User", "Alice") and ("Order", "Laptop")?',
    codeSnippet:
      'Users mapper  -> Key: 101, Value: ("User", "Alice")\nOrders mapper -> Key: 101, Value: ("Order", "Laptop")',
    options: [
      'So the Partitioner sends Users and Orders to different Reducers',
      'So the Reducer can identify which source dataset each incoming record originated from before merging them',
      'So the Combiner can automatically delete duplicate Order IDs',
      'So HDFS increases the replication factor of the Orders file',
    ],
    correctIndex: 1,
    explanation:
      'Shuffle & Sort routes all records with the same Join Key (e.g., User_ID 101) to the same Reducer as a single mixed iterator. Tagging lets the Reducer separate User records from Order records and perform the merge.',
  },
  {
    id: 'Q34',
    number: 34,
    topicId: 'aggregation-patterns',
    subtopic: 'Primary Goal of Local Aggregation',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'What is the primary performance benefit of applying Local Aggregation techniques (Combiners or In-Mapper Combining) on the map side?',
    options: [
      'Eliminating the need for HDFS replication',
      'Drastically reducing intermediate data volume transferred over the network during Shuffle & Sort and lowering Reducer workload',
      'Allowing Reducers to start before Mappers read input splits',
      'Converting unstructured video into structured SQL tables',
    ],
    correctIndex: 1,
    explanation:
      'Instead of emitting three separate (K, 1) pairs over the network, local aggregation collapses them into one (K, 3) pair on the mapper machine, slashing network I/O and reducer workload.',
  },
  {
    id: 'Q35',
    number: 35,
    topicId: 'aggregation-patterns',
    subtopic: 'Summarization Design Pattern',
    importance: 6,
    difficulty: 'Foundational',
    question:
      'In the Summarization MapReduce design pattern (used for word counts, min/max, or totals), how are input records organized for aggregation?',
    options: [
      'The output value is used to route data to different NameNodes',
      'The emitted key acts as the grouping mechanism so the Reducer iterates through all values for that group and computes one summary',
      'Records are joined across two files using source tags',
      'All records are dropped unless they match a regular expression',
    ],
    correctIndex: 1,
    explanation:
      'In Summarization, Mappers emit (grouping_key, value); Shuffle & Sort groups all values by grouping_key; and the Reducer iterates through the values to compute the summary statistic.',
  },
  {
    id: 'Q36',
    number: 36,
    topicId: 'aggregation-patterns',
    subtopic: 'Associative & Commutative Properties',
    importance: 8,
    difficulty: 'Applied',
    question:
      'Which pair of mathematical properties guarantees that an aggregation produces identical results regardless of how MapReduce groups or orders intermediate records across Combiners?',
    options: [
      'Distributive and Transitive',
      'Commutative (a + b = b + a) and Associative ((a + b) + c = a + (b + c))',
      'Reflexive and Symmetric',
      'Linear and Exponential',
    ],
    correctIndex: 1,
    explanation:
      'Commutativity ensures input order does not matter, and associativity ensures arbitrary partial grouping across mappers and combiners yields the exact same global result.',
  },
];
