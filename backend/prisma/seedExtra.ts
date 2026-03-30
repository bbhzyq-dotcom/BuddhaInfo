import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const additionalBuddhasAndBodhisattvas = [
  { name: "阿弥陀佛", sanskritName: "Amitābha", otherNames: ["无量寿佛", "无量光佛", "接引佛"], category: "佛", summary: "西方极乐世界的教主，以慈悲愿力接引众生往生净土。", story: "阿弥陀佛在因地修行时发下四十八愿，建立西方极乐净土，接引念佛众生往生。", scripture: "《无量寿经》《观无量寿经》《阿弥陀经》", isHot: true },
  { name: "过去正结实佛", sanskritName: "Vyūharāja", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去正结实佛在过去庄严劫中出世，度化无量众生。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去金光佛", sanskritName: "Suvarṇaprabhāsa", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去金光佛以金光普照世间。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去月光佛", sanskritName: "Chandraprabha", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去月光佛以月光清凉照世。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去电光佛", sanskritName: "Vidyutprabha", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去电光佛以电光破暗。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去火光佛", sanskritName: "Jvalaprabha", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去火光佛以火光照明。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去无量威神佛", sanskritName: "Anantatejā", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去无量威神佛威德无量。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去日月光佛", sanskritName: "Sūryacandra", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去日月光佛如日月照世。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去明亮佛", sanskritName: "Prabhākara", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去明亮佛光明普照。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去光明佛", sanskritName: "Jyotiḥpravṛddha", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去光明佛光光相照。", scripture: "《三千佛名经》", isHot: false },
  { name: "过去火轮佛", sanskritName: "Agnicakra", otherNames: [], category: "佛", summary: "过去庄严劫千佛之一。", story: "过去火轮佛如轮旋转。", scripture: "《三千佛名经》", isHot: false },
  { name: "金刚不坏佛", sanskritName: "Vajra-aṃala", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "金刚不坏佛身如金刚，永不损坏。", scripture: "《三十五佛名经》", isHot: false },
  { name: "宝光佛", sanskritName: "Ratnaprabha", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "宝光佛宝相光明。", scripture: "《三十五佛名经》", isHot: false },
  { name: "龙尊王佛", sanskritName: "Nāgarāja", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "龙尊王佛为龙族所尊。", scripture: "《三十五佛名经》", isHot: false },
  { name: "精进军佛", sanskritName: "Śūraṃsena", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "精进军佛勇猛精进。", scripture: "《三十五佛名经》", isHot: false },
  { name: "精进喜佛", sanskritName: "Prasṛta", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "精进喜佛精进欢喜。", scripture: "《三十五佛名经》", isHot: false },
  { name: "宝月佛", sanskritName: "Ratna-candra", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "宝月佛如月清凉。", scripture: "《三十五佛名经》", isHot: false },
  { name: "无垢佛", sanskritName: "Vimala", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "无垢佛清净无染。", scripture: "《三十五佛名经》", isHot: false },
  { name: "勇施佛", sanskritName: "Vīra-dāna", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "勇施佛勇猛布施。", scripture: "《三十五佛名经》", isHot: false },
  { name: "清净佛", sanskritName: "Śuddha", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "清净佛身心清净。", scripture: "《三十五佛名经》", isHot: false },
  { name: "不退转佛", sanskritName: "Avaivartika", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "不退转佛修行不退。", scripture: "《三十五佛名经》", isHot: false },
  { name: "日月殊伦佛", sanskritName: "Sūrya-candra-bheda", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "日月殊伦佛日月分别。", scripture: "《三十五佛名经》", isHot: false },
  { name: "三존陀佛", sanskritName: "Samanta-mandra", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "三존陀佛普遍庄严。", scripture: "《三十五佛名经》", isHot: false },
  { name: "曼殊师利菩萨佛", sanskritName: "Mañju-śrī", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "曼殊师利佛智慧第一。", scripture: "《三十五佛名经》", isHot: false },
  { name: "金刚心佛", sanskritName: "Vajra-citta", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "金刚心佛心如金刚。", scripture: "《三十五佛名经》", isHot: false },
  { name: "药王佛", sanskritName: "Bhaiṣajya-rāja", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "药王佛如药能治。", scripture: "《三十五佛名经》", isHot: false },
  { name: "无力佛", sanskritName: "Anaṅga", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "无力佛慈悲无量。", scripture: "《三十五佛名经》", isHot: false },
  { name: "智慈佛", sanskritName: "Jñāna-karuṇā", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "智慈佛智慧慈悲。", scripture: "《三十五佛名经》", isHot: false },
  { name: "日光明佛", sanskritName: "Sūrya-prabha", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "日光明佛日光光明。", scripture: "《三十五佛名经》", isHot: false },
  { name: "一切佛", sanskritName: "Sarva-buddha", otherNames: [], category: "佛", summary: "三十五佛之一。", story: "一切佛总集一切佛功德。", scripture: "《三十五佛名经》", isHot: false },
  { name: "千手千眼观音", sanskritName: "Sahasrabhuja-avalokiteśvara", otherNames: ["千手观音", "大悲观音"], category: "菩萨", summary: "具有千手千眼的观音化身。", story: "千手观音是观世音菩萨的化身，象征无限的慈悲与智慧。", scripture: "《千手千眼观世音菩萨广大圆满无碍大悲心陀罗尼经》", isHot: true },
  { name: "圣观音", sanskritName: "Avalokiteśvara", otherNames: ["正观音"], category: "菩萨", summary: "观世音菩萨的标准相。", story: "圣观音是观世音菩萨的标准形象。", scripture: "《法华经》", isHot: false },
  { name: "十一面观音", sanskritName: "Ekādaśamu-kha", otherNames: ["十一面观世音"], category: "菩萨", summary: "具有十一张面孔的观音。", story: "十一面观音共有十一张面孔，表法十一地菩萨。", scripture: "《十一面神咒经》", isHot: false },
  { name: "如意轮观音", sanskritName: "Cintāmaṇicakra", otherNames: ["如意轮菩萨"], category: "菩萨", summary: "能满众生愿望的观音。", story: "如意轮观音以如意宝珠和法轮能满足众生一切愿求。", scripture: "《如意轮陀罗尼经》", isHot: false },
  { name: "不空羂索观音", sanskritName: "Amoghapāśa", otherNames: ["不空羂索菩萨"], category: "菩萨", summary: "以羂索救度众生的观音。", story: "不空羂索观音以法器羂索救度一切众生。", scripture: "《不空羂索神变真言经》", isHot: false },
  { name: "马头观音", sanskritName: "Hayagrīva", otherNames: ["马头明王"], category: "菩萨", summary: "观音的愤怒化身。", story: "马头观音以马头为饰，降伏一切魔障。", scripture: "《马头观音心咒经》", isHot: false },
  { name: "准提观音", sanskritName: "Cundī", otherNames: ["准提佛母"], category: "菩萨", summary: "密教重要本尊。", story: "准提观音感应强力，能息灾增益。", scripture: "《准提陀罗尼经》", isHot: false },
  { name: "杨柳观音", sanskritName: "Avalokiteśvara-Willow", otherNames: ["杨柳枝观音"], category: "菩萨", summary: "手持杨柳枝的观音。", story: "杨柳观音以杨柳枝消灾解厄。", scripture: "《观音感应传》", isHot: false },
  { name: "白衣观音", sanskritName: "Avalokiteśvara-White", otherNames: ["白衣观世音"], category: "菩萨", summary: "身着白衣的观音。", story: "白衣观音象征清净无染。", scripture: "《观音感应传》", isHot: false },
  { name: "莲卧观音", sanskritName: "Avalokiteśvara-Reclining", otherNames: ["卧观音"], category: "菩萨", summary: "以卧姿显现的观音。", story: "莲卧观音以吉祥卧的姿态安卧于莲华之上。", scripture: "《观音感应传》", isHot: false },
  { name: "泷见观音", sanskritName: "Avalokiteśvara-Waterfall", otherNames: ["瀑布观音"], category: "菩萨", summary: "在瀑布前显现的观音。", story: "泷见观音观照瀑布，如观心念。", scripture: "《观音感应传》", isHot: false },
  { name: "持经观音", sanskritName: "Avalokiteśvara-Sutra", otherNames: ["读经观音"], category: "菩萨", summary: "手持经典的观音。", story: "持经观音手持经卷，象征般若智慧。", scripture: "《观音感应传》", isHot: false },
  { name: "岩户观音", sanskritName: "Avalokiteśvara-Cave", otherNames: ["岩石观音"], category: "菩萨", summary: "在岩窟中显现的观音。", story: "岩户观音端坐于岩窟之中，修习禅定。", scripture: "《观音感应传》", isHot: false },
  { name: "众宝观音", sanskritName: "Avalokiteśvara-Treasure", otherNames: ["多宝观音"], category: "菩萨", summary: "以众宝装饰的观音。", story: "众宝观音以众宝庄严全身。", scripture: "《观音感应传》", isHot: false },
  { name: "滴水观音", sanskritName: "Avalokiteśvara-Water", otherNames: ["滴水"], category: "菩萨", summary: "洒滴净水的观音。", story: "滴水观音以宝瓶滴下净水洗净众生。", scripture: "《观音感应传》", isHot: false },
  { name: "游戏观音", sanskritName: "Avalokiteśvara-Vikrīdita", otherNames: ["游戏坐观音"], category: "菩萨", summary: "以游戏坐姿显现的观音。", story: "游戏观音以游戏坐姿安坐，自在度化众生。", scripture: "《法华经》", isHot: false },
  { name: "青颈观音", sanskritName: "Avalokiteśvara-Neck-Blue", otherNames: ["青颈"], category: "菩萨", summary: "颈部呈青色的观音。", story: "青颈观音能破一切灾祸。", scripture: "《观音感应传》", isHot: false },
  { name: "合掌观音", sanskritName: "Avalokiteśvara-Palms-Joined", otherNames: ["合掌"], category: "菩萨", summary: "合掌显现的观音。", story: "合掌观音双手合掌，象征恭敬皈依。", scripture: "《观音感应传》", isHot: false },
  { name: "一叶观音", sanskritName: "Avalokiteśvara-One-Leaf", otherNames: ["一叶"], category: "菩萨", summary: "乘一叶莲华的观音。", story: "一叶观音乘一叶莲华浮于水面。", scripture: "《观音感应传》", isHot: false },
  { name: "六时观音", sanskritName: "Avalokiteśvara-Six-Periods", otherNames: ["六时"], category: "菩萨", summary: "昼夜六时护佑众生的观音。", story: "六时观音于昼夜六时勤加守护众生。", scripture: "《观音感应传》", isHot: false },
  { name: "延命观音", sanskritName: "Avalokiteśvara-Life", otherNames: ["延命"], category: "菩萨", summary: "延命救苦的观音。", story: "延命观音能护持众生延命增福。", scripture: "《观音感应传》", isHot: false },
  { name: "众寂观音", sanskritName: "Avalokiteśvara-Stillness", otherNames: ["众寂"], category: "菩萨", summary: "以寂静显现的观音。", story: "众寂观音体现一切法寂静。", scripture: "《观音感应传》", isHot: false },
  { name: "能静观音", sanskritName: "Avalokiteśvara-Quiet", otherNames: ["能静"], category: "菩萨", summary: "以寂静相显现的观音。", story: "能静观音令众生内心平静。", scripture: "《观音感应传》", isHot: false },
  { name: "阿摩提观音", sanskritName: "Avalokiteśvara-Avatan", otherNames: ["阿摩提"], category: "菩萨", summary: "观音的愤怒化身。", story: "阿摩提观音降伏魔障。", scripture: "《观音感应传》", isHot: false },
  { name: "马郎妇观音", sanskritName: "Avalokiteśvara-Horse-Merchant", otherNames: ["马郎妇"], category: "菩萨", summary: "化现美女的观音。", story: "马郎妇观音以善巧方便度化众生。", scripture: "《观音感应传》", isHot: false },
  { name: "一如观音", sanskritName: "Avalokiteśvara-Unity", otherNames: ["一如"], category: "菩萨", summary: "显现真如自性的观音。", story: "一如观音体现诸法平等一如。", scripture: "《观音感应传》", isHot: false },
  { name: "洒水观音", sanskritName: "Avalokiteśvara-Sprinkling", otherNames: ["洒水"], category: "菩萨", summary: "洒水清净的观音。", story: "洒水观音以清净之水洗净众生罪业。", scripture: "《观音感应传》", isHot: false },
  { name: "叶衣观音", sanskritName: "Avalokiteśvara-Leaf-Clothed", otherNames: ["叶衣"], category: "菩萨", summary: "以树叶为衣的观音。", story: "叶衣观音以树叶为衣衫。", scripture: "《观音感应传》", isHot: false },
  { name: "琉璃观音", sanskritName: "Avalokiteśvara-Lapis", otherNames: ["琉璃"], category: "菩萨", summary: "手持琉璃宝珠的观音。", story: "琉璃观音能满足众生一切愿望。", scripture: "《观音感应传》", isHot: false },
  { name: "绿度母", sanskritName: "Śyāma-tārā", otherNames: ["救度母"], category: "菩萨", summary: "二十一度母之首。", story: "绿度母能救度一切苦难，是藏传佛教最普遍的本尊之一。", scripture: "《绿度母经》", isHot: true },
  { name: "白度母", sanskritName: "Sita-tārā", otherNames: ["七眼白度母", "速勇母"], category: "菩萨", summary: "具有七眼的度母。", story: "白度母又称七眼白度母，能消除一切恐惧。", scripture: "《大白伞盖经》", isHot: false },
  { name: "红度母", sanskritName: "Kurukullā", otherNames: ["作明佛母", "咕噜咕咧佛母"], category: "菩萨", summary: "摄受众生的度母。", story: "红度母能摄受一切众生，增添智慧与慈悲。", scripture: "《作明佛母经》", isHot: false },
  { name: "黄度母", sanskritName: "Jambhala-tārā", otherNames: ["财源度母"], category: "菩萨", summary: "赐予财富的度母。", story: "黄度母能赐予众生财富与福报。", scripture: "《财源度母经》", isHot: false },
  { name: "蓝度母", sanskritName: "Uṣṇīṣa-vijayā", otherNames: ["顶髻尊胜佛母"], category: "菩萨", summary: "尊胜佛母化身的度母。", story: "蓝度母能除一切魔障。", scripture: "《尊胜佛母经》", isHot: false },
  { name: "紫度母", sanskritName: "Nīla-tārā", otherNames: [], category: "菩萨", summary: "二十一度母之一。", story: "紫度母能除一切苦难。", scripture: "《度母经》", isHot: false },
  { name: "日光菩萨", sanskritName: "Sūryaprabha", otherNames: ["日光遍照菩萨"], category: "菩萨", summary: "药师佛的左胁侍。", story: "日光菩萨与月光菩萨同为药师佛的胁侍，合称东方三圣。", scripture: "《药师琉璃光如来本愿功德经》", isHot: false },
  { name: "月光菩萨", sanskritName: "Candraprabha", otherNames: ["月光遍照菩萨"], category: "菩萨", summary: "药师佛的右胁侍。", story: "月光菩萨能除一切众生热恼。", scripture: "《药师琉璃光如来本愿功德经》", isHot: false },
  { name: "药王菩萨", sanskritName: "Bhaiṣajyaguru-rāja", otherNames: ["药王"], category: "菩萨", summary: "施与众生良药的菩萨。", story: "药王菩萨发愿以医术救治众生。", scripture: "《观药王药上二菩萨经》", isHot: false },
  { name: "药上菩萨", sanskritName: "Bhaiṣajyaguru-vaidūrya-prabha-rāja", otherNames: ["药上"], category: "菩萨", summary: "药王菩萨之兄。", story: "药上菩萨发愿救治众生一切病苦。", scripture: "《观药王药上二菩萨经》", isHot: false },
  { name: "无尽意菩萨", sanskritName: "Aksobhya-tathāgata", otherNames: ["无尽慧菩萨"], category: "菩萨", summary: "象征愿力无穷无尽的菩萨。", story: "无尽意菩萨发下无穷誓愿，要度尽一切众生。", scripture: "《大方广佛华严经》", isHot: false },
  { name: "贤护菩萨", sanskritName: "Bhadrapāla", otherNames: ["善守"], category: "菩萨", summary: "在家菩萨的代表。", story: "贤护菩萨是著名的在家菩萨，护持正法。", scripture: "《贤护经》", isHot: false },
  { name: "善财童子", sanskritName: "Sudhana", otherNames: [], category: "菩萨", summary: "华严经中福城长者之子。", story: "善财童子参访五十三位善知识，代表精进求法的典范。", scripture: "《华严经·入法界品》", isHot: true },
  { name: "龙女", sanskritName: "Nāgakanyā", otherNames: ["妙庄严夫人"], category: "菩萨", summary: "法华经中八岁成佛的龙族少女。", story: "龙女是娑竭罗龙王之女，在法华会上瞬间示现成佛。", scripture: "《妙法莲华经·提婆达多品》", isHot: false },
  { name: "弥勒菩萨", sanskritName: "Maitreya", otherNames: ["阿逸多菩萨"], category: "菩萨", summary: "未来佛，现为菩萨身份。", story: "弥勒菩萨现在兜率天内院说法，五十六亿七千万年后下生人间成佛。", scripture: "《弥勒上生经》《弥勒下生经》", isHot: true },
  { name: "普贤菩萨", sanskritName: "Samantabhadra", otherNames: ["普贤如来", "遍吉"], category: "菩萨", summary: "行愿的象征，与文殊菩萨为华严三圣之一。", story: "普贤菩萨十大愿王闻名于世。峨眉山是其道场。", scripture: "《华严经·普贤行愿品》", isHot: true },
  { name: "地藏菩萨", sanskritName: "Kṣitigarbha", otherNames: ["地藏王菩萨"], category: "菩萨", summary: "发下地狱不空誓不成佛的大愿。", story: "地藏菩萨为救度亡母发下大愿。九华山是其道场。", scripture: "《地藏菩萨本愿经》", isHot: true },
  { name: "大势至菩萨", sanskritName: "Mahāsthāmaprāpta", otherNames: ["得大势菩萨"], category: "菩萨", summary: "阿弥陀佛的右胁侍。", story: "大势至菩萨与观世音菩萨合称西方三圣。", scripture: "《观无量寿经》", isHot: false },
  { name: "虚空藏菩萨", sanskritName: "Ākāśagarbha", otherNames: ["虚空孕菩萨"], category: "菩萨", summary: "象征智慧的宝藏如虚空般无限。", story: "虚空藏菩萨以虚空为库藏，蕴育无穷智慧与慈悲。", scripture: "《虚空藏菩萨经》", isHot: false },
  { name: "金刚手菩萨", sanskritName: "Vajrapāṇi", otherNames: ["金刚萨埵", "执金刚菩萨"], category: "菩萨", summary: "密教重要本尊。", story: "金刚手菩萨代表佛陀的坚固不坏之力。", scripture: "《金刚手经》《大日经》", isHot: true },
  { name: "辩才天女", sanskritName: "Sarasvatī", otherNames: ["妙音天女", "辩才天"], category: "菩萨", summary: "智慧与辩才女神。", story: "辩才天女掌管智慧、辩才、音乐和艺术。", scripture: "《大吉祥天女经》《金光明经》", isHot: false },
  { name: "吉祥天女", sanskritName: "Lakṣmī", otherNames: ["功德天女", "财富女神"], category: "菩萨", summary: "佛教护法女神。", story: "吉祥天女能除众生一切衰祸，令得福德智慧。", scripture: "《金光明经》《大吉祥天女经》", isHot: false },
  { name: "大白伞盖佛母", sanskritName: "Sitātapatrā", otherNames: ["白伞盖佛母"], category: "菩萨", summary: "密教重要本尊。", story: "大白伞盖佛母能庇护一切众生。", scripture: "《大白伞盖经》", isHot: false },
  { name: "金刚亥母", sanskritName: "Vajravārāhī", otherNames: ["多吉帕姆"], category: "菩萨", summary: "藏传佛教重要女性本尊。", story: "金刚亥母是胜乐金刚之明妃。", scripture: "《胜乐金刚本续》", isHot: false },
  { name: "狮吼观音", sanskritName: "Simhahanumān", otherNames: ["骑狮观音"], category: "菩萨", summary: "观世音菩萨的愤怒化身。", story: "狮吼观音骑乘狮子，降伏一切魔障。", scripture: "《法华经》", isHot: false },
  { name: "如意轮观音", sanskritName: "Cintāmaṇicakra", otherNames: ["如意轮菩萨"], category: "菩萨", summary: "能满众生愿望的观音。", story: "如意轮观音能满足众生一切愿求。", scripture: "《如意轮陀罗尼经》", isHot: false },
  { name: "日光菩萨", sanskritName: "Sūryaprabha", otherNames: ["日光遍照菩萨"], category: "菩萨", summary: "药师佛的左胁侍。", story: "日光菩萨普照五道众生，消除业障。", scripture: "《药师琉璃光如来本愿功德经》", isHot: false },
]

async function main() {
  console.log("Adding additional Buddhas and Bodhisattvas...")
  
  let added = 0
  for (const char of additionalBuddhasAndBodhisattvas) {
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
          status: "approved",
        },
      })
      added++
    } catch (e) {
      console.error(`Error adding ${char.name}:`, e.message)
    }
  }
  
  console.log(`Added ${added} characters.`)
  
  const counts = await prisma.character.groupBy({
    by: ["category"],
    _count: { category: true },
  })
  console.log("\nCurrent counts:")
  for (const c of counts) {
    console.log(`  ${c.category}: ${c._count.category}`)
  }
  
  const total = await prisma.character.count()
  console.log(`\nTotal: ${total} characters`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
