import { MCQItem } from '../types/mcq';

export const QUESTIONS_PART_2: MCQItem[] = [
  // =========================================================================
  // TOPIC 4: PAIRS & STRIPES, ORDER INVERSION, SECONDARY SORT & JOINS (Q37 - Q48)
  // =========================================================================
  {
    id: 'Q37',
    number: 37,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Pairs vs. Stripes Trade-off',
    importance: 10,
    difficulty: 'Applied',
    question:
      'Which statement accurately captures the core trade-off between the Pairs and Stripes approaches for building a word co-occurrence matrix?',
    options: [
      'Pairs is network-efficient but memory-risky; Stripes is memory-friendly but network-heavy',
      'Pairs is memory-friendly (stateless mapper) but network-heavy; Stripes is network-efficient but memory-risky (OOM risk on frequent words)',
      'Both approaches transmit the exact same number of network messages',
      'Stripes cannot use a Reducer because associative arrays cannot be merged',
    ],
    correctIndex: 1,
    explanation:
      'Pairs emits every co-occurrence ((w, u), 1) immediately (zero mapper memory, huge network bottleneck). Stripes aggregates neighbors in an in-memory HashMap per word (few network messages, but high-frequency words like "the" can cause OOM crashes).',
  },
  {
    id: 'Q38',
    number: 38,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Pairs vs. Stripes Message Count',
    importance: 9,
    difficulty: 'Applied',
    question:
      'For the target word "power" in the sentence "Data is power, knowledge is power.", how do the Pairs and Stripes mappers package the co-occurrence output respectively?',
    codeSnippet: 'Sentence: "Data is power, knowledge is power."',
    options: [
      'Pairs: 1 message power -> {is: 2, knowledge: 1} | Stripes: 3 messages',
      'Pairs: 3 separate messages (power, is)->1, (power, knowledge)->1, (power, is)->1 | Stripes: 1 combined message power -> {is: 2, knowledge: 1}',
      'Pairs: 2 messages | Stripes: 2 messages',
      'Pairs: 1 message with total count 3 | Stripes: 3 separate messages',
    ],
    correctIndex: 1,
    explanation:
      'Pairs emits each co-occurrence independently (3 network messages—like mailing individual letters). Stripes packs all neighbors of "power" into one associative array: power -> {is: 2, knowledge: 1} (1 network message—like mailing one box).',
  },
  {
    id: 'Q39',
    number: 39,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Relative Frequency with Stripes',
    importance: 8,
    difficulty: 'Applied',
    question:
      'In the Stripes approach, if the Reducer merges maps for the key "power" into {is: 10, knowledge: 5, data: 5}, what is the relative frequency f(knowledge | power)?',
    codeSnippet: 'f(wj | wi) = N(wi, wj) / sum_k N(wi, wk)',
    options: ['0.50', '0.25', '0.20', '0.33'],
    correctIndex: 1,
    explanation:
      'The marginal total for "power" is 10 + 5 + 5 = 20. Therefore, f(knowledge | power) = 5 / 20 = 0.25 (while is = 0.50 and data = 0.25).',
  },
  {
    id: 'Q40',
    number: 40,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Order Inversion (Pairs Relative Frequency)',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'Why is the Order Inversion pattern (emitting a special marginal key like ((power, *), 1)) required when computing relative frequencies with the Pairs approach?',
    options: [
      'Because Pairs requires sorting words in reverse alphabetical order from Z to A',
      'Because the Reducer needs the marginal total denominator sum_k N(wi, wk) to arrive BEFORE any specific (wi, wj) pair so it can divide on the fly without buffering all pairs in RAM',
      'Because Hadoop does not allow string keys to contain two words unless an asterisk is present',
      'Because Stripes cannot compute relative frequencies at all',
    ],
    correctIndex: 1,
    explanation:
      'In Pairs, each (wi, wj) arrives separately. Order Inversion emits ((wi, *), 1), routes all wi keys to the same Reducer via a custom partitioner, and sorts (wi, *) FIRST so the Reducer computes and saves the marginal denominator before dividing incoming (wi, wj) counts.',
  },
  {
    id: 'Q41',
    number: 41,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Order Inversion Partitioner Rule',
    importance: 9,
    difficulty: 'Exam-Tricky',
    question:
      'In Order Inversion for Pairs, how must the Custom Partitioner route composite keys like (power, *) and (power, knowledge)?',
    options: [
      'Hash the entire pair so (power, *) goes to Reducer 0 and (power, knowledge) goes to Reducer 2',
      'Hash ONLY the first word (power) so (power, *) and every (power, wj) land on the exact same Reducer',
      'Hash ONLY the second word (* or knowledge) to balance reducer load',
      'Send all (*) keys to a single dedicated master reducer',
    ],
    correctIndex: 1,
    explanation:
      'If the default HashPartitioner hashed the full pair, (power, *) and (power, knowledge) could go to different Reducers. Hashing strictly on the first word (wi) guarantees the marginal total and all dependent pairs arrive at the same Reducer.',
  },
  {
    id: 'Q42',
    number: 42,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Secondary Sorting Problem',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'What specific MapReduce limitation does Secondary Sorting solve?',
    options: [
      'MapReduce cannot sort string keys alphabetically',
      'MapReduce sorts keys automatically, but values for a given key arrive in arbitrary order—Secondary Sorting sorts those values without loading them all into Reducer RAM',
      'MapReduce cannot process more than two input files in a single job',
      'MapReduce drops duplicate keys during the Shuffle phase',
    ],
    correctIndex: 1,
    explanation:
      'Standard MapReduce sorts only by key; values arrive in arbitrary order. Loading all values into a Reducer list to sort in memory causes OOM crashes on large datasets. Secondary Sorting delegates value ordering to the framework.',
  },
  {
    id: 'Q43',
    number: 43,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Three Pillars of Secondary Sorting',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'In Secondary Sorting with composite keys like (Alice, English), (Alice, Math), and (Alice, Science), what is the exact responsibility of the Grouping Comparator?',
    codeSnippet:
      'Sorted stream: (Alice, English)->80, (Alice, Math)->85, (Alice, Science)->90',
    options: [
      'Sorting records by Natural Key first and then by Secondary Key',
      'Comparing ONLY the Natural Key (Alice) so all of Alice\'s records are bundled into ONE single reduce() call in sorted value order',
      'Hashing the Secondary Key to pick the destination Reducer',
      'Performing an element-wise sum of HashMaps inside the Mapper',
    ],
    correctIndex: 1,
    explanation:
      'The Sort Comparator sorts by Natural Key then Secondary Key, while the Grouping Comparator compares ONLY the Natural Key so the Reducer receives one logical group per student: Key = Alice, Values = [English 80, Math 85, Science 90].',
  },
  {
    id: 'Q44',
    number: 44,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Secondary Sorting Custom Partitioner',
    importance: 9,
    difficulty: 'Applied',
    question:
      'What goes wrong in Secondary Sorting if you create a Composite Key (Student, Subject) but forget to write a Custom Partitioner?',
    options: [
      'The job fails to compile in Java',
      'HashPartitioner hashes the entire composite key, potentially sending (Alice, English) and (Alice, Math) to different Reducers',
      'All records are sent exclusively to Reducer 0',
      'The Combiner automatically strips out the Subject field',
    ],
    correctIndex: 1,
    explanation:
      'Without a Custom Partitioner that hashes ONLY the Natural Key (hash(Student) % reducers), records sharing the same Student but different Subjects can be scattered across different Reducers.',
  },
  {
    id: 'Q45',
    number: 45,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Map-Side Join vs. Reduce-Side Join',
    importance: 10,
    difficulty: 'Applied',
    question:
      'Which relational join technique in MapReduce skips the Shuffle & Sort phase entirely and requires NO Reduce phase?',
    options: [
      'Reduce-Side Join (Repartition Join)',
      'Map-Side Join (broadcasting the small table into an in-memory HashMap on every Mapper)',
      'Order Inversion Join',
      'Secondary Sort Cross-Product Join',
    ],
    correctIndex: 1,
    explanation:
      'When one dataset (e.g., a small dimension table) fits completely in memory, it is broadcast to every node. Mappers load it into a HashMap, stream the large fact table, perform instant lookups, and emit joined records with zero Shuffle/Sort and no Reduce phase.',
  },
  {
    id: 'Q46',
    number: 46,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Map-Side Join Prerequisite',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'When is it NOT feasible to use a standard broadcast Map-Side Join, forcing you to use a Reduce-Side (Repartition) Join instead?',
    options: [
      'When both tables being joined are too massive to fit into a single worker node\'s RAM',
      'When the join key is an integer rather than a string',
      'When the cluster has more than 3 DataNodes',
      'When both tables are stored as text files in HDFS',
    ],
    correctIndex: 0,
    explanation:
      'A broadcast Map-Side Join requires at least one table to be small enough to fit completely into each Mapper\'s memory. A Reduce-Side (Repartition) Join works regardless of dataset sizes.',
  },
  {
    id: 'Q47',
    number: 47,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Reduce-Side Join Execution',
    importance: 8,
    difficulty: 'Applied',
    question:
      'In a Reduce-Side Join, once the Reducer receives a Join Key and separates its tagged values into a list of "User" records and a list of "Order" records, what operation produces the final joined rows?',
    options: [
      'Element-wise HashMap division',
      'A cross-product pairing matching User records with Order records for that key',
      'Merge sorting the records by HDFS block ID',
      'Dropping all records except the first Order',
    ],
    correctIndex: 1,
    explanation:
      'After separating tagged values (e.g., ("User", "Alice") and [("Order", "Laptop"), ("Order", "Book")]), the Reducer performs a cross-product to emit ("Alice", "Laptop") and ("Alice", "Book").',
  },
  {
    id: 'Q48',
    number: 48,
    topicId: 'pairs-stripes-joins',
    subtopic: 'Stripes Reducer Operation',
    importance: 7,
    difficulty: 'Foundational',
    question:
      'What operation does the Reducer perform when it receives multiple associative arrays (stripes) for the same key word w from different Mappers?',
    options: [
      'Concatenates all arrays into a single comma-separated string without summing',
      'Performs an element-wise sum across the maps, adding counts for identical neighbor keys',
      'Keeps only the largest stripe and discards the others',
      'Re-hashes every neighbor key and sends them back to the Mappers',
    ],
    correctIndex: 1,
    explanation:
      'In Stripes, the Reducer merges all incoming associative arrays for key w by performing an element-wise sum of counts for every neighbor word.',
  },

  // =========================================================================
  // TOPIC 5: HDFS ARCHITECTURE, FILE READ/WRITE, COMMANDS, YARN & RDBMS (Q49 - Q60)
  // =========================================================================
  {
    id: 'Q49',
    number: 49,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'HDFS Block Splitting & Replication',
    importance: 9,
    difficulty: 'Applied',
    question:
      'A 192 MB file (Sample.txt) is stored in classic HDFS with a 64 MB block size and the default replication factor of 3. How many logical blocks are created, and how many total physical block copies are stored across DataNodes?',
    options: [
      '3 logical blocks; 3 physical block copies total',
      '3 logical blocks; 9 physical block copies total',
      '4 logical blocks; 12 physical block copies total',
      '1 logical block; 3 physical block copies total',
    ],
    correctIndex: 1,
    explanation:
      '192 MB / 64 MB = 3 logical blocks (Block A, Block B, Block C). With the default replication factor of 3, each block is stored on 3 DataNodes, yielding 3 × 3 = 9 physical block copies.',
  },
  {
    id: 'Q50',
    number: 50,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'NameNode Metadata Files',
    importance: 10,
    difficulty: 'Foundational',
    question:
      'In HDFS, what is the distinction between FsImage and EditLog maintained by the NameNode?',
    options: [
      'FsImage stores actual user file blocks; EditLog stores MapReduce jar files',
      'FsImage stores the complete file system namespace and block-to-file mappings; EditLog is the transaction log recording every metadata change',
      'FsImage runs on DataNodes; EditLog runs only on the Secondary NameNode',
      'FsImage records DataNode heartbeats; EditLog stores Rack IDs only',
    ],
    correctIndex: 1,
    explanation:
      'FsImage holds the full namespace snapshot (directory tree, file properties, block-to-file mappings), whereas EditLog is a transaction log recording every create/delete/rename mutation to HDFS metadata.',
  },
  {
    id: 'Q51',
    number: 51,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Secondary NameNode Misconception',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'Which statement about the HDFS Secondary NameNode is TRUE?',
    options: [
      'It acts as an automatic, real-time hot-standby failover mirror of the NameNode',
      'It requires far less RAM than the NameNode and always runs on a DataNode',
      'It takes periodic snapshots of HDFS metadata, has the same memory requirements as the NameNode, does NOT record real-time changes, and requires manual configuration to bring up a failed cluster',
      'It stores the third replica of every HDFS data block',
    ],
    correctIndex: 2,
    explanation:
      'A classic exam trap: the Secondary NameNode is NOT a real-time backup. It takes periodic checkpoints/snapshots, needs the same memory as the NameNode (so it runs on a separate machine), and requires manual intervention if the NameNode fails.',
  },
  {
    id: 'Q52',
    number: 52,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Anatomy of HDFS File Write',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'During an HDFS File Write, when is a data packet finally removed from the DFSOutputStream "Ack queue"?',
    options: [
      'As soon as DataStreamer pushes the packet onto the network',
      'Immediately after the 1st DataNode in the pipeline receives it',
      'Only after ALL DataNodes in the replication pipeline acknowledge the packet',
      'Only after the Secondary NameNode takes its next periodic snapshot',
    ],
    correctIndex: 2,
    explanation:
      'DataStreamer streams packets down the 3-node DataNode pipeline (DN1 -> DN2 -> DN3). DFSOutputStream holds in-flight packets in the Ack queue and removes a packet ONLY after every DataNode in the pipeline acknowledges it.',
  },
  {
    id: 'Q53',
    number: 53,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Anatomy of HDFS File Read',
    importance: 9,
    difficulty: 'Applied',
    question:
      'During the 6-step Anatomy of an HDFS File Read, what role does the NameNode play vs. the DataNodes?',
    options: [
      'The NameNode reads all data blocks from disk and streams them directly to the client',
      'DistributedFileSystem queries the NameNode only for block locations (DataNode addresses), and DFSInputStream streams actual block data directly from the closest DataNode',
      'The client connects to a random DataNode first and asks it where the NameNode is',
      'The client reads through DataStreamer and Ack queues',
    ],
    correctIndex: 1,
    explanation:
      'In File Read: client calls open() -> DistributedFileSystem gets block locations from NameNode and returns FSDataInputStream -> DFSInputStream connects directly to the closest DataNode for each block and streams data until close().',
  },
  {
    id: 'Q54',
    number: 54,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'HDFS CLI Commands',
    importance: 10,
    difficulty: 'Applied',
    question:
      'Which HDFS command correctly uploads a file from the local Linux filesystem (/root/sample/test.txt) into HDFS (/sample/test.txt)?',
    options: [
      'hadoop fs -get /root/sample/test.txt /sample/test.txt',
      'hadoop fs -put /root/sample/test.txt /sample/test.txt',
      'hadoop fs -cp /root/sample/test.txt /sample/test.txt',
      'hadoop fs -cat /root/sample/test.txt /sample/test.txt',
    ],
    correctIndex: 1,
    explanation:
      '-put <local_src> <hdfs_dest> uploads from local filesystem to HDFS. -get <hdfs_src> <local_dest> downloads from HDFS to local. -cp copies within HDFS, and -cat prints file contents.',
  },
  {
    id: 'Q55',
    number: 55,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'HDFS Directory Deletion & Listing',
    importance: 9,
    difficulty: 'Applied',
    question:
      'Which pair of HDFS commands correctly (1) lists all files and directories recursively from root and (2) deletes the HDFS directory /sample1?',
    options: [
      '(1) hadoop fs -ls /   and   (2) hadoop fs -rm /sample1',
      '(1) hadoop fs -ls -R /   and   (2) hadoop fs -rm -r /sample1',
      '(1) hadoop fs -cat -R /   and   (2) hadoop fs -mkdir -d /sample1',
      '(1) hadoop fs -get -R /   and   (2) hadoop fs -cp -r /sample1',
    ],
    correctIndex: 1,
    explanation:
      'hadoop fs -ls -R / lists all subdirectories and files recursively. To remove a directory in HDFS, the recursive flag -r is mandatory: hadoop fs -rm -r /sample1.',
  },
  {
    id: 'Q56',
    number: 56,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'YARN Architecture',
    importance: 10,
    difficulty: 'Applied',
    question:
      'In Hadoop 2.x/3.x YARN (Yet Another Resource Negotiator), what is the exact role of the ApplicationMaster?',
    options: [
      'A single permanent master daemon that allocates CPU and RAM containers across the entire cluster',
      'A per-node worker daemon that monitors local container CPU/RAM health',
      'A temporary per-job coordinator that negotiates resource containers from the ResourceManager and collaborates with NodeManagers to execute and monitor that specific job\'s tasks',
      'The HDFS daemon responsible for Rack Awareness and block replication',
    ],
    correctIndex: 2,
    explanation:
      'YARN splits resource management into: ResourceManager (cluster-wide master allocating Containers), NodeManager (per-node slave monitoring local containers), and ApplicationMaster (temporary per-application coordinator).',
  },
  {
    id: 'Q57',
    number: 57,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Why YARN Exists',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'Why is YARN described as the "operating system of the Hadoop cluster"?',
    options: [
      'Because it replaces the Linux kernel on every DataNode',
      'Because it decouples cluster resource allocation from processing so Hadoop can run multiple engines (MapReduce, Spark, Flink) simultaneously',
      'Because it provides a graphical desktop interface for editing FsImage',
      'Because it enforces ACID transactions on HDFS files',
    ],
    correctIndex: 1,
    explanation:
      'YARN decouples resource management (CPU/RAM Containers) from the processing engine, allowing batch (MapReduce), in-memory (Spark), and streaming (Flink) workloads to share one Hadoop cluster.',
  },
  {
    id: 'Q58',
    number: 58,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Hadoop vs. RDBMS (Schema & Access)',
    importance: 10,
    difficulty: 'Foundational',
    question:
      'How do Hadoop and traditional RDBMS differ on schema enforcement and read/write access patterns?',
    options: [
      'Hadoop uses Schema on Write and supports frequent random updates; RDBMS uses Schema on Read and WORM',
      'Hadoop uses Schema on Read and follows Write Once, Read Many (WORM); RDBMS uses Schema on Write and supports Read and Write many times',
      'Both enforce Schema on Write to accelerate batch writes',
      'Hadoop supports ACID OLTP updates while RDBMS is strictly batch-only',
    ],
    correctIndex: 1,
    explanation:
      'Hadoop enforces Schema on Read (making writes fast with no schema validation) and uses a WORM (Write Once, Read Many) model for analytics. RDBMS enforces Schema on Write, obeys ACID, and supports fast indexed random reads/writes for OLTP.',
  },
  {
    id: 'Q59',
    number: 59,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'HDFS Heartbeats & Fault Recovery',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'What happens automatically in HDFS if a DataNode stops sending heartbeat messages to the NameNode?',
    options: [
      'The entire Hadoop cluster shuts down immediately to prevent data loss',
      'The NameNode assumes the DataNode has failed and automatically replicates its blocks onto surviving DataNodes',
      'The Secondary NameNode takes over as the missing DataNode',
      'Clients must manually run hadoop fs -cp to restore missing blocks',
    ],
    correctIndex: 1,
    explanation:
      'DataNodes continuously send heartbeats to the NameNode. If heartbeats cease, the NameNode marks the node dead and automatically triggers re-replication of its blocks across healthy DataNodes.',
  },
  {
    id: 'Q60',
    number: 60,
    topicId: 'hdfs-yarn-rdbms',
    subtopic: 'Hadoop vs. RDBMS (Throughput & Integrity)',
    importance: 7,
    difficulty: 'Applied',
    question:
      'Which row correctly compares Hadoop vs. RDBMS across Query Language, Throughput, Primary Use Case, and Integrity?',
    options: [
      'Hadoop: SQL, Low Throughput, OLTP, ACID | RDBMS: HiveQL, High Throughput, Analytics, Low Integrity',
      'Hadoop: HiveQL, High Throughput, Analytics/Data Discovery, Low Integrity | RDBMS: SQL, Low Throughput, OLTP, High Integrity (ACID)',
      'Hadoop: Pig Latin only, Low Latency, OLTP, ACID | RDBMS: HiveQL, High Latency, Batch, Low Integrity',
      'Hadoop: HiveQL, Low Throughput, OLTP, High Integrity | RDBMS: SQL, High Throughput, Batch, Low Integrity',
    ],
    correctIndex: 1,
    explanation:
      'Hadoop provides HiveQL querying, High Throughput, Analytics/Data Discovery use cases, and Low Integrity (non-ACID). RDBMS provides SQL, Low Throughput (low latency immediate responses), OLTP, and High Integrity obeying ACID.',
  },

  // =========================================================================
  // TOPIC 6: HADOOP ECOSYSTEM TECHNOLOGIES (Q61 - Q72)
  // =========================================================================
  {
    id: 'Q61',
    number: 61,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Hadoop Ecosystem Layers',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'In the 4-layer Hadoop Ecosystem architecture, which set of tools belongs to the Data Access layer?',
    options: [
      'HDFS and HBase',
      'MapReduce and YARN',
      'Hive, Pig, Mahout, Avro, and Sqoop',
      'Oozie, Chukwa, Flume, and ZooKeeper',
    ],
    correctIndex: 2,
    explanation:
      'The 4 Ecosystem layers are: Data Storage (HDFS, HBase), Data Processing (MapReduce, YARN), Data Access (Hive, Pig, Mahout, Avro, Sqoop), and Data Management (Oozie, Chukwa, Flume, ZooKeeper).',
  },
  {
    id: 'Q62',
    number: 62,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Sqoop vs. Flume',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'Which pair of Hadoop Ecosystem tools handles (1) bulk data transfer between RDBMS and Hadoop and (2) collection of streaming/log data respectively?',
    options: [
      '(1) Flume and (2) Sqoop',
      '(1) Sqoop and (2) Flume',
      '(1) Avro and (2) Pig',
      '(1) Oozie and (2) HBase',
    ],
    correctIndex: 1,
    explanation:
      'Sqoop transfers structured data between RDBMS and Hadoop, whereas Flume is used for collecting and ingesting streaming/log data into Hadoop.',
  },
  {
    id: 'Q63',
    number: 63,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Avro Serialization',
    importance: 9,
    difficulty: 'Applied',
    question:
      'Why is Apache Avro dramatically more compact and faster than JSON or standard Java serialization in Big Data pipelines?',
    options: [
      'Avro stores only integers and prohibits strings or nested maps',
      'Avro separates the JSON schema (stored once in the self-describing file header) from the compact binary payload so field names are not repeated in every record',
      'Avro requires developers to hand-write C++ code generation for every schema edit',
      'Avro disables schema evolution so fields can never be added or changed',
    ],
    correctIndex: 1,
    explanation:
      'Unlike JSON (which repeats field keys like "name", "age" in every record), Avro writes the JSON schema once into the self-describing file header and encodes records as raw compact binary. It requires no code generation and supports forward/backward Schema Evolution.',
  },
  {
    id: 'Q64',
    number: 64,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Avro Schema Evolution',
    importance: 8,
    difficulty: 'Applied',
    question:
      'What capability allows an Apache Avro reader using a newer schema to read older binary data files (and vice versa) even when fields are added, missing, or changed?',
    options: [
      'Rack Awareness',
      'Schema Evolution (supporting both backward and forward compatibility)',
      'Order Inversion',
      'Ephemeral Serialization',
    ],
    correctIndex: 1,
    explanation:
      'Avro\'s Schema Evolution gracefully handles added, missing, or altered fields, providing both backward compatibility (new schema reading old data) and forward compatibility (old schema reading new data).',
  },
  {
    id: 'Q65',
    number: 65,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache ZooKeeper Znodes',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'In Apache ZooKeeper\'s hierarchical znode tree, what happens to an Ephemeral Znode versus a Persistent Znode when the client that created it crashes or disconnects?',
    options: [
      'Both Persistent and Ephemeral znodes are deleted immediately on disconnect',
      'Persistent znodes stay alive until explicitly deleted; Ephemeral znodes are automatically deleted by ZooKeeper within seconds of client disconnection',
      'Ephemeral znodes store permanent database configs; Persistent znodes detect dead nodes',
      'ZooKeeper converts Ephemeral znodes into HDFS FsImage snapshots on crash',
    ],
    correctIndex: 1,
    explanation:
      'Persistent znodes remain until explicitly deleted (ideal for permanent configs like /config/database). Ephemeral znodes exist only while the client session is active and vanish within seconds on crash—ideal for leader election and failure detection.',
  },
  {
    id: 'Q66',
    number: 66,
    topicId: 'hadoop-ecosystem',
    subtopic: 'ZooKeeper Role & High Availability',
    importance: 9,
    difficulty: 'Applied',
    question:
      'How does Apache ZooKeeper solve coordination in Hadoop\'s "shared-nothing" architecture while avoiding becoming a Single Point of Failure (SPOF)?',
    options: [
      'By forcing all worker nodes to broadcast full state to each other every millisecond',
      'By running on an ensemble (group) of servers acting as a centralized single source of truth for leader election, distributed locks, and configuration',
      'By embedding its state inside MapReduce Combiners',
      'By running strictly as a single standalone process on the NameNode',
    ],
    correctIndex: 1,
    explanation:
      'ZooKeeper runs as a replicated ensemble of servers (High Availability, no SPOF) providing a simple, expressive, loosely coupled, high-performance coordination service for distributed locks, leader election, config management, and service discovery.',
  },
  {
    id: 'Q67',
    number: 67,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Storm Architecture',
    importance: 10,
    difficulty: 'Foundational',
    question:
      'In Apache Storm\'s stream processing topology, what are the distinct roles of Spouts and Bolts?',
    options: [
      'Spouts perform SQL warehousing; Bolts perform HDFS block replication',
      'Spouts act as stream sources pumping raw data as tuples; Bolts are processing units that filter, aggregate, transform, access DBs, or emit new tuples',
      'Spouts are batch reducers; Bolts are batch mappers',
      'Spouts store persistent znodes; Bolts serialize Avro headers',
    ],
    correctIndex: 1,
    explanation:
      'An Apache Storm topology consists of Spouts (stream sources pumping raw data as tuples) connected to Bolts (processing units performing filtering, aggregation, transformation, or DB updates) for ultra-low-latency tuple-by-tuple processing.',
  },
  {
    id: 'Q68',
    number: 68,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Storm vs. Apache Flink',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'How does Apache Flink differ from Apache Storm (early versions) in its core processing principle and state/delivery accuracy?',
    options: [
      'Storm treats everything as a batch file; Flink only processes tuples with at-least-once duplicates',
      'Flink follows "Everything is a stream" (unifying live real-time and historical batch with exact in-memory state management for fraud detection), whereas early Storm focused on ultra-low latency with At-Least-Once guarantees where crashes could repeat data',
      'Storm runs only on RDBMS while Flink runs only on mainframes',
      'Flink cannot handle real-time analytics and is exclusively an ETL scripting tool',
    ],
    correctIndex: 1,
    explanation:
      'Flink\'s core principle is "Everything is a stream", applying identical logic to live streams and historical batches with exact in-memory state precision (ideal for Fraud Detection and Real-Time Analytics). Early Storm prioritized ultra-low latency with At-Least-Once semantics.',
  },
  {
    id: 'Q69',
    number: 69,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache HBase Data Model',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'Which description accurately defines Apache HBase in the Hadoop Ecosystem?',
    options: [
      'A relational OLTP database modeled after Oracle DB',
      'The first non-batch component of Hadoop: a NoSQL, non-relational, column-oriented database built on HDFS and modeled after Google BigTable',
      'A batch-only distributed file system modeled after Google File System (GFS)',
      'A declarative SQL data warehouse that compiles queries into MapReduce jobs',
    ],
    correctIndex: 1,
    explanation:
      'Apache HBase is Hadoop\'s first non-batch component—a NoSQL, non-relational, column-oriented database built atop HDFS and modeled after Google BigTable, organizing rows into Column Families containing key-value columns.',
  },
  {
    id: 'Q70',
    number: 70,
    topicId: 'hadoop-ecosystem',
    subtopic: 'HBase vs. HDFS (9-Point Comparison)',
    importance: 10,
    difficulty: 'Exam-Tricky',
    question:
      'According to the 9-point HBase vs. HDFS comparison, which statement is TRUE regarding performance, latency, and API access?',
    options: [
      'HDFS supports real-time random read/write via REST APIs; HBase is WORM and accessed only via MapReduce',
      'HBase supports low-latency real-time random read/write, dynamic storage, and Java/REST/Avro/Thrift APIs, whereas Hive on HBase is 4–5 times slower than Hive on HDFS',
      'Hive on HBase is 4–5 times faster than Hive on HDFS because HBase uses GFS',
      'HBase has higher latency than HDFS and only supports full table scans',
    ],
    correctIndex: 1,
    explanation:
      'HBase offers low-latency real-time random read/write, dynamic storage, small range scans, and Java/REST/Avro/Thrift APIs—while HDFS is WORM, high-latency batch, accessed via MapReduce, and runs Hive 4–5x faster than Hive on HBase.',
  },
  {
    id: 'Q71',
    number: 71,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Hive',
    importance: 9,
    difficulty: 'Foundational',
    question:
      'What are the three main tasks performed by Apache Hive, and how does it execute queries on Hadoop?',
    options: [
      'Real-time random updates, distributed locking, and binary serialization via Spouts',
      'Summarization, querying, and analysis—by translating declarative SQL-like HiveQL (HQL) queries into MapReduce jobs on Hadoop',
      'Log collection, leader election, and container scheduling via YARN NodeManagers',
      'Streaming fraud detection, schema evolution, and memory caching',
    ],
    correctIndex: 1,
    explanation:
      'Apache Hive is a Data Warehouse on Hadoop built for three main tasks: Summarization, Querying, and Analysis. It uses HiveQL/HQL and compiles SQL-style queries into MapReduce jobs (analytical batch, not OLTP).',
  },
  {
    id: 'Q72',
    number: 72,
    topicId: 'hadoop-ecosystem',
    subtopic: 'Apache Pig & Pig Latin',
    importance: 8,
    difficulty: 'Foundational',
    question:
      'What are the two core components of Apache Pig, and what workflow is it especially well-suited for?',
    options: [
      'Spouts and Bolts — suited for ultra-low-latency streaming',
      'FsImage and EditLog — suited for distributed metadata checkpoints',
      'Pig Latin (Yahoo\'s high-level SQL-like scripting language using Load/filter/group/join) and Pig Runtime — ideal as a Java MapReduce alternative for ETL pipelines',
      'Persistent and Ephemeral Znodes — suited for cluster leader election',
    ],
    correctIndex: 2,
    explanation:
      'Apache Pig comprises Pig Latin (developed by Yahoo, translated into MapReduce jobs over YARN/HDFS, starting with a Load command) and the Pig Runtime. It is widely used as an alternative to raw Java MapReduce for ETL (Extract, Transform, Load) pipelines.',
  },
];
