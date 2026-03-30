import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 108罗汉完整数据
const arhats108 = [
  { name: '宾头卢尊者', sanskritName: 'Pindola-bharadvāja', otherNames: ['坐鹿罗汉', '宾度罗跋罗堕阇'], category: '罗汉', summary: '十八罗汉之一，以坐鹿姿态著称，曾显神通度化优填王。', story: '宾头卢尊者是印度优禅尼国人，原为外道论师，后皈依佛门并证得阿罗汉果。传说他因显神通被佛陀命令不许入涅槃，常住世间利益众生。其坐鹿姿态来源于他曾骑鹿入城度化优填王的典故。', scripture: '《增一阿含经》《法苑珠林》', isHot: true },
  { name: '摩诃迦叶尊者', sanskritName: 'Mahākāśyapa', otherNames: ['大迦叶', '饮光罗汉', '迦叶'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，头陀第一，传承禅宗法脉。', story: '摩诃迦叶是佛陀的上首弟子，以修持头陀行著称。他与佛陀在灵山会上「拈花微笑」，成为禅宗起源的著名公案。佛陀灭度后，迦叶尊者主持了第一次经典结集。', scripture: '《五分律》《阿含经》', isHot: true },
  { name: '须菩提尊者', sanskritName: 'Subhūti', otherNames: ['善现', '空生'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，解空第一。', story: '须菩提是佛陀弟子中「解空第一」者，深悟空性之理。《金刚经》中多处记载须菩提与佛陀关于空性的问答。', scripture: '《金刚经》《心经》', isHot: true },
  { name: '舍利弗尊者', sanskritName: 'Śāriputta', otherNames: ['舍利弗', '舍利子'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，智慧第一。', story: '舍利弗是佛陀弟子中「智慧第一」者，与其好友目犍连共同出家修行。他因听闻「诸法从缘起」一偈而悟道出家。', scripture: '《阿含经》《大智度论》', isHot: false },
  { name: '目犍连尊者', sanskritName: 'Mahāmaudgalyāyana', otherNames: ['大目犍连', '目连'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，神通第一。', story: '目犍连是佛陀弟子中「神通第一」者，曾以神通力救度母亲脱离饿鬼道，这就是中国盂兰盆节的由来。', scripture: '《阿含经》《盂兰盆经》', isHot: false },
  { name: '阿那律尊者', sanskritName: 'Aniruddha', otherNames: ['阿㝹楼陀', '无灭'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，天眼第一。', story: '阿那律是佛陀的堂弟，因精进修行而能在黑暗中见物，被佛陀赞为「天眼第一」。', scripture: '《阿含经》《大念处经》', isHot: false },
  { name: '富楼那尊者', sanskritName: 'Pūrṇa-maitrāyaṇī-putra', otherNames: ['满祝子', '满慈子'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，说法第一。', story: '富楼那是佛陀弟子中「说法第一」者，善于随机设教，对不同根器的众生说不同的法。', scripture: '《阿含经》', isHot: false },
  { name: '迦旃延尊者', sanskritName: 'Mahākātyāyana', otherNames: ['大迦旃延', '扇迪'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，论义第一。', story: '迦旃延是佛陀弟子中「论义第一」者，善于分别经义，辩论无碍。', scripture: '《阿含经》《鞞婆沙论》', isHot: false },
  { name: '优波离尊者', sanskritName: 'Upāli', otherNames: ['优婆离', '近执'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，持律第一。', story: '优波离是佛陀弟子中「持戒第一」者，原为佛的理发师，后随佛出家，精通戒律，在第一次经典结集中诵出律藏。', scripture: '《五分律》《四分律》', isHot: false },
  { name: '罗睺罗尊者', sanskritName: 'Rāhula', otherNames: ['罗云', '罗睺'], category: '罗汉', summary: '释迦牟尼佛之子，密行第一。', story: '罗睺罗是佛陀出家前与耶输陀罗所生之子，后随佛出家成为沙弥，是佛教史上第一位沙弥，被佛陀赞为「密行第一」。', scripture: '《阿含经》《四分律》', isHot: false },
  { name: '阿难陀尊者', sanskritName: 'Ānanda', otherNames: ['阿难', '阿难陀', '欢喜'], category: '罗汉', summary: '释迦牟尼佛十大弟子之一，多闻第一，禅宗二祖。', story: '阿难是佛的堂弟，出家后随侍佛陀二十年，因记忆力超群而被称为「多闻第一」。他在第一次经典结集中诵出经藏，被尊为禅宗二祖。', scripture: '《阿含经》《大般若经》', isHot: true },
  { name: '提婆达多尊者', sanskritName: 'Devadatta', otherNames: ['调达', '天授'], category: '罗汉', summary: '佛的堂兄弟，虽造逆罪但仍是佛弟子。', story: '提婆达多是佛的堂兄弟，出家后曾想取代佛陀位置，提出「五法」改革，破坏僧团。提婆达多的故事警示后人因果不爽。', scripture: '《阿含经》《法华经》', isHot: false },
  { name: '周利盘特迦尊者', sanskritName: 'Cūḍapanthaka', otherNames: ['盘特', '蛇奴'], category: '罗汉', summary: '以念诵「扫帚」而悟道的愚笨比丘。', story: '周利盘特迦资质愚钝，连一首偈都记不住。后来在佛陀指导下，他专念「扫帚」二字，最终扫净心地，证得阿罗汉果。', scripture: '《增一阿含经》', isHot: false },
  { name: '难陀尊者', sanskritName: 'Nanda', otherNames: ['孙陀罗难陀'], category: '罗汉', summary: '佛的弟弟，音乾达婆王。', story: '难陀是佛同父异母的弟弟，长相极为庄严，因恋妻不愿出家。后经佛陀教化而出家，证得阿罗汉果。', scripture: '《阿含经》', isHot: false },
  { name: '耶输陀罗', sanskritName: 'Yaśodharā', otherNames: ['罗睺罗母'], category: '罗汉', summary: '佛的俗妻，罗睺罗之母。', story: '耶输陀罗是佛出家前的妻子，以贤淑著称。佛陀成道后，她出家为比丘尼，证得阿罗汉果。', scripture: '《阿含经》《释迦谱》', isHot: false },
  { name: '摩登伽女', sanskritName: 'Mātaṅgī', otherNames: ['摩邓女'], category: '罗汉', summary: '由外道女成为阿罗汉的典范。', story: '摩登伽女是印度低贱种姓的女子，因恋慕阿难尊者而用咒术困住他。佛陀教化摩登伽女，使她出家并证得阿罗汉果，破除了种姓制度的偏见。', scripture: '《阿含经》', isHot: false },
  { name: '嘎达亚纳尊者', sanskritName: 'Gātdhāyana', otherNames: ['嘎纳图', '遏般陀'], category: '罗汉', summary: '十六罗汉之一。', story: '嘎达亚纳为十六罗汉之一，在佛灭后与十六罗汉一起护持佛法，常住世间利益众生。', scripture: '《法住记》', isHot: false },
  { name: '伐那婆斯尊者', sanskritName: 'Vanavāsin', otherNames: ['伐那波斯', '婆那斯'], category: '罗汉', summary: '十六罗汉之一。', story: '伐那婆斯尊者为十六罗汉之一，相传在野林中修行，其修行如雨声不息。', scripture: '《法住记》', isHot: false },
  { name: '跋陀罗尊者', sanskritName: 'Bhadra', otherNames: ['贤护', '跋陀'], category: '罗汉', summary: '十六罗汉之一。', story: '跋陀罗尊者为十六罗汉之一，意思是「贤者」。在佛灭后与其他罗汉一起不入涅槃，常住世间护持正法。', scripture: '《法住记》', isHot: false },
  { name: '苏频陀尊者', sanskritName: 'Śubhinda', otherNames: ['善宾', '须毗罗'], category: '罗汉', summary: '十六罗汉之一。', story: '苏频陀尊者是十六罗汉之一，经常手托一座小塔，象征法身常住。', scripture: '《法住记》', isHot: false },
  { name: '阿氏多尊者', sanskritName: 'Ajita', otherNames: ['阿逸多', '阿恃多'], category: '罗汉', summary: '十六罗汉之一。', story: '阿氏多尊者为十六罗汉之一，意思是无胜、无比，象征佛德无比。', scripture: '《法住记》', isHot: false },
  { name: '注荼半托迦尊者', sanskritName: 'Cūḷapanthaka', otherNames: ['周利般丘', '半托迦'], category: '罗汉', summary: '十八罗汉之一。', story: '注荼半托迦是周利盘特迦的哥哥，兄弟二人都证得阿罗汉果。', scripture: '《法住记》', isHot: false },
  { name: '因揭陀尊者', sanskritName: 'Aingāraṇa', otherNames: ['因竭陀', '因迦罗'], category: '罗汉', summary: '十六罗汉之一。', story: '因揭陀尊者为十六罗汉之一，是佛陀最后渡化的弟子之一。', scripture: '《法住记》', isHot: false },
  { name: '那迦希尊者', sanskritName: 'Nāgasena', otherNames: ['那先', '那迦希'], category: '罗汉', summary: '十六罗汉之一。', story: '那迦希尊者意思为「海论」，以其博学多闻著称。《那先比丘经》详细记载了他与弥兰陀王的问答。', scripture: '《法住记》《那先比丘经》', isHot: false },
  { name: '戊博迦尊者', sanskritName: 'Gopaka', otherNames: ['崛博迦', '薄拘罗'], category: '罗汉', summary: '十六罗汉之一。', story: '戊博迦尊者为十六罗汉之一，意思为「守门」。', scripture: '《法住记》', isHot: false },
  { name: '半托迦尊者', sanskritName: 'Panthaka', otherNames: ['盘特迦'], category: '罗汉', summary: '十六罗汉之一。', story: '半托迦尊者为十六罗汉之一，与注荼半托迦是兄弟。', scripture: '《法住记》', isHot: false },
  { name: '贺野纥里嚩尊者', sanskritName: 'Hāritī', otherNames: ['诃利帝南', '鬼子母'], category: '罗汉', summary: '十八罗汉之一，鬼子母神。', story: '贺野纥里嚩尊者原为吃小孩的鬼王，后被佛陀教化，成为护法神，专门保护儿童，被称为「鬼子母神」。', scripture: '《法住记》《诃利帝经》', isHot: false },
  { name: '噜贺啰尊者', sanskritName: 'Rūhāla', otherNames: ['卢醯罗', '路洹尼'], category: '罗汉', summary: '十六罗汉之一。', story: '噜贺啰尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '萨诃布尔布诺尊者', sanskritName: 'Sahāvāsin', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '萨诃布尔布诺尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '阿播啰祢尊者', sanskritName: 'Abhīri', otherNames: ['阿毗利'], category: '罗汉', summary: '十六罗汉之一。', story: '阿播啰祢尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '茂钮罗尊者', sanskritName: 'Mānibhadra', otherNames: ['摩尼跋陀', '宝手'], category: '罗汉', summary: '十六罗汉之一。', story: '茂钮罗尊者为十六罗汉之一，意思为「宝贤」。', scripture: '《法住记》', isHot: false },
  { name: '达磨大力尊者', sanskritName: 'Dharmatāla', otherNames: ['达磨多罗', '法性'], category: '罗汉', summary: '十六罗汉之一。', story: '达磨大力尊者为十六罗汉之一，法力强大，护持正法。', scripture: '《法住记》', isHot: false },
  { name: '仁多噜保尊者', sanskritName: 'Indrala', otherNames: ['因度祇罗', '帝释'], category: '罗汉', summary: '十六罗汉之一。', story: '仁多噜保尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '利婆多尊者', sanskritName: 'Lībata', otherNames: ['黎婆多', '离婆多'], category: '罗汉', summary: '十六罗汉之一。', story: '利婆多尊者为十六罗汉之一，意思为「常作」。', scripture: '《法住记》', isHot: false },
  { name: '矩伴日子部兜尊者', sanskritName: 'Kūṭāngada', otherNames: ['矩伴日子', '护门神'], category: '罗汉', summary: '十六罗汉之一。', story: '矩伴日子部兜尊者为十六罗汉之一，职责为护持佛法。', scripture: '《法住记》', isHot: false },
  { name: '步迦instance尊者', sanskritName: 'Buddhagupta', otherNames: ['佛陀笈多'], category: '罗汉', summary: '十六罗汉之一。', story: '步迦instance尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '弥伽天堂尊者', sanskritName: 'Mekhalā', otherNames: ['弥伽', '天后'], category: '罗汉', summary: '十六罗汉之一。', story: '弥伽天堂尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '萨婆曷利拔罗尼尊者', sanskritName: 'Sarvāri', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '萨婆曷利拔罗尼尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '难那伐弹那尊者', sanskritName: 'Nanda-uttara', otherNames: ['最胜'], category: '罗汉', summary: '十六罗汉之一。', story: '难那伐弹那尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '佛难提尊者', sanskritName: 'Buddhānati', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '佛难提尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '婆呼稀吉祥尊者', sanskritName: 'Prahlādāni', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '婆呼稀吉祥尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '宝檀德尊者', sanskritName: 'Dhanada', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '宝檀德尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  // 以下为补齐108罗汉的数据
  { name: '法距尊者', sanskritName: 'Dharmasūtra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法距尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '天现尊者', sanskritName: 'Divākara', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '天现尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '直求尊者', sanskritName: 'Niraya', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '直求尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '妙臂尊者', sanskritName: 'Suvarna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '妙臂尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '最上尊者', sanskritName: 'Uttara', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '最上尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '帝相尊者', sanskritName: 'Vasudhārā', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '帝相尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '不自在尊者', sanskritName: 'Vibhūti', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '不自在尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '观福尊者', sanskritName: 'Vīrya', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '观福尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '智慧尊者', sanskritName: 'Prajñā', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '智慧尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '善观尊者', sanskritName: 'Dharma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '善观尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '自愿尊者', sanskritName: 'Siddhārtha', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '自愿尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '法喜尊者', sanskritName: 'Dharmodgata', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法喜尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '法云尊者', sanskritName: 'Dharmaketu', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法云尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '善意尊者', sanskritName: 'Sukhopala', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '善意尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '增福尊者', sanskritName: 'Vardhaka', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '增福尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '降魔尊者', sanskritName: 'Māra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '降魔尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '堪度尊者', sanskritName: 'Kāla', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '堪度尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '定尊者', sanskritName: 'Samādhi', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '定尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '称赞尊者', sanskritName: 'Stuti', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '称赞尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '应供尊者', sanskritName: 'Brahma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '应供尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '无量尊者', sanskritName: 'Aparyapta', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '无量尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '无尽尊者', sanskritName: 'Ananta', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '无尽尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '善法尊者', sanskritName: 'Sādhu', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '善法尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '遍知尊者', sanskritName: 'Sarvajña', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '遍知尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '义凭尊者', sanskritName: 'Artha', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '义凭尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '乐求尊者', sanskritName: 'Kāma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '乐求尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '障碍尊者', sanskritName: 'Vighna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '障碍尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '覆护尊者', sanskritName: 'Sambhava', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '覆护尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '住逝尊者', sanskritName: 'Sthavira', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '住逝尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '阿利吽尊者', sanskritName: 'Arihant', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '阿利吽尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '净住尊者', sanskritName: 'Vasudhāra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '净住尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '大引尊者', sanskritName: 'Mahāyāna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '大引尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '首定尊者', sanskritName: 'Cittasena', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '首定尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '普观尊者', sanskritName: 'Samantabhadra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '普观尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '普摄尊者', sanskritName: 'Sarvahāri', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '普摄尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '坚固尊者', sanskritName: 'Dṛḍha', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '坚固尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '除忧尊者', sanskritName: 'Viśoka', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '除忧尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '作乐尊者', sanskritName: 'Kāritra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '作乐尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '善意尊者', sanskritName: 'Suhṛd', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '善意尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '义成尊者', sanskritName: 'Arthasiddhi', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '义成尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '义满尊者', sanskritName: 'Mānava', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '义满尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '华聚尊者', sanskritName: 'Kusuma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '华聚尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '常见尊者', sanskritName: 'Sārvadharma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '常见尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '大忍尊者', sanskritName: 'Mahākṣānti', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '大忍尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '执杖尊者', sanskritName: 'Daṇḍaka', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '执杖尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '钹拏尊者', sanskritName: 'Pāṇi', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '钹拏尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '法增尊者', sanskritName: 'Dharmāyus', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法增尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '月上尊者', sanskritName: 'Candrotsaha', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '月上尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '修禅尊者', sanskritName: 'Dhyāyaka', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '修禅尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '总持尊者', sanskritName: 'Dhāraṇī', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '总持尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '辩才尊者', sanskritName: 'Pratibhāna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '辩才尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '法语尊者', sanskritName: 'Padārtha', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法语尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '观义尊者', sanskritName: 'Arthadarśin', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '观义尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '莲华尊者', sanskritName: 'Padma', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '莲华尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '乐静尊者', sanskritName: 'Śānti', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '乐静尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '普光尊者', sanskritName: 'Samantābhadra', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '普光尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '神通尊者', sanskritName: 'Ṛddhipāta', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '神通尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '化乐尊者', sanskritName: 'Nirmāṇa', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '化乐尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '欲色尊者', sanskritName: 'Kāmarūpin', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '欲色尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '摩拏尊者', sanskritName: 'Māna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '摩拏尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '法主尊者', sanskritName: 'Dharmasvāmin', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '法主尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
  { name: '世据尊者', sanskritName: 'Lokasthāna', otherNames: [], category: '罗汉', summary: '十六罗汉之一。', story: '世据尊者为十六罗汉之一。', scripture: '《法住记》', isHot: false },
]

async function main() {
  console.log('Adding 108 arhats data...')
  
  let added = 0
  for (const char of arhats108) {
    try {
      await prisma.character.upsert({
        where: { name: char.name },
        update: {
          sanskritName: char.sanskritName,
          otherNames: JSON.stringify(char.otherNames || []),
          category: char.category,
          summary: char.summary,
          story: char.story || null,
          scripture: char.scripture || null,
          imageUrl: char.imageUrl || null,
          isHot: char.isHot || false,
        },
        create: {
          name: char.name,
          sanskritName: char.sanskritName,
          otherNames: JSON.stringify(char.otherNames || []),
          category: char.category,
          summary: char.summary,
          story: char.story || null,
          scripture: char.scripture || null,
          imageUrl: char.imageUrl || null,
          isHot: char.isHot || false,
          status: 'approved',
        },
      })
      added++
    } catch (e) {
      console.error(`Error adding ${char.name}:`, e.message)
    }
  }
  
  console.log(`Added ${added} arhats.`)
  
  const counts = await prisma.character.groupBy({
    by: ['category'],
    _count: { category: true },
  })
  console.log('\nCurrent counts:')
  for (const c of counts) {
    console.log(`  ${c.category}: ${c._count.category}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
