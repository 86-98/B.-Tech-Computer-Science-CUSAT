import { TopicMeta } from '../types/mcq';

export const TOPICS: TopicMeta[] = [
  {
    id: 'foundations',
    order: 1,
    shortTitle: 'Big Data Foundations',
    title: '01. Big Data Foundations, 5 Vs & Data Types',
    moduleRef: 'Module 1 (Part A)',
    summary:
      'Data vs. analytics vs. information, historical evolution from mainframes to IoT, 3 Cs, 5 Vs, structured/semi-structured/unstructured data, and Traditional BI vs. Big Data.',
    examFocus: [
      '5 Vs definitions & radial growth',
      '~80%+ unstructured data & 6 challenges',
      'Vertical vs. Horizontal scaling',
      'Move code to data vs. move data to code',
    ],
  },
  {
    id: 'mapreduce-core',
    order: 2,
    shortTitle: 'MapReduce & WordCount',
    title: '02. MapReduce Architecture, Pipeline & WordCount',
    moduleRef: 'Module 1 (Part B) & WordCount PDF',
    summary:
      'Divide-and-conquer, data locality, Hadoop 1.x daemons (JobTracker/TaskTracker), full Map-to-Reduce pipeline, HashPartitioner formula, and 3-class Java WordCount.',
    examFocus: [
      'HashPartitioner modulo calculations',
      'Pipeline order & where each stage runs',
      'Synchronization barrier & Merge Sort',
      'Driver, Mapper, Reducer Java signatures',
    ],
  },
  {
    id: 'aggregation-patterns',
    order: 3,
    shortTitle: 'Design Patterns & Aggregation',
    title: '03. Design Patterns, Local Aggregation & Correctness',
    moduleRef: 'Module 2 (Part A)',
    summary:
      'Summarization, Filtering, Reduce-Side Join tagging, Combiners, the non-associative Mean trap, In-Mapper Combining lifecycle, and the 4 algorithmic correctness strategies.',
    examFocus: [
      'Why mean() fails in Combiners & (sum, count) fix',
      'Combiner 0/1/many execution guarantee',
      'setup(), map(), cleanup() HashMap lifecycle',
      'Type matching & OOM risks',
    ],
  },
  {
    id: 'pairs-stripes-joins',
    order: 4,
    shortTitle: 'Pairs, Stripes & Joins',
    title: '04. Pairs & Stripes, Order Inversion, Secondary Sort & Joins',
    moduleRef: 'Module 2 (Part B)',
    summary:
      'Co-occurrence matrix trade-offs, relative frequencies, Order Inversion with special * marginal keys, 3 Pillars of Secondary Sorting, and Map-Side vs. Reduce-Side Joins.',
    examFocus: [
      'Pairs (network-heavy) vs. Stripes (memory-risky)',
      'Order Inversion (*) partition & sort rules',
      'Composite Key, Custom Partitioner, Sort vs. Grouping Comparator',
      'Map-Side Join broadcast HashMap optimization',
    ],
  },
  {
    id: 'hdfs-yarn-rdbms',
    order: 5,
    shortTitle: 'HDFS, YARN & RDBMS',
    title: '05. HDFS Architecture, Read/Write, Commands, YARN & RDBMS',
    moduleRef: 'Module 2 (Part C)',
    summary:
      'HDFS block storage, NameNode/DataNode/Secondary NameNode, FsImage & EditLog, 6-step File Read, 7-step File Write pipeline, HDFS CLI commands, YARN daemons, and Hadoop vs. RDBMS.',
    examFocus: [
      'FsImage vs. EditLog & Secondary NameNode limits',
      'DataStreamer pipeline & Ack queue rules',
      'HDFS CLI flags (-put, -get, -ls -R, -rm -r)',
      'YARN ResourceManager, NodeManager, ApplicationMaster',
    ],
  },
  {
    id: 'hadoop-ecosystem',
    order: 6,
    shortTitle: 'Hadoop Ecosystem',
    title: '06. Hadoop Ecosystem (Avro, ZooKeeper, Storm, Flink, HBase, Hive, Pig)',
    moduleRef: 'Module 2 (Part D) & Handwritten Notes',
    summary:
      '4-layer ecosystem architecture, Avro binary serialization & schema evolution, ZooKeeper znodes, Storm vs. Flink stream processing, HBase vs. HDFS, Hive warehousing, and Pig scripting.',
    examFocus: [
      'Avro schema evolution & self-describing headers',
      'Persistent vs. Ephemeral znodes & SPOF',
      'Storm (Spouts/Bolts, At-Least-Once) vs. Flink',
      'HBase vs. HDFS 9-point comparison (4-5x Hive slowdown)',
    ],
  },
];

export const TOPIC_MAP: Record<string, TopicMeta> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t])
);
