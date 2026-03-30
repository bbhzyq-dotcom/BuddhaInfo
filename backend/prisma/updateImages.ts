import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const images: Record<string, string> = {
  // 佛
  '释迦牟尼佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Shakyamuni_Buddha.jpg/440px-Shakyamuni_Buddha.jpg',
  '阿弥陀佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Amitabha_Triad.JPG/440px-Amitabha_Triad.JPG',
  '药师佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bhai%C5%9Bajyaguru.jpg/440px-Bhai%C5%9Bajyaguru.jpg',
  '燃灯佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dipankara.jpg/440px-Dipankara.jpg',
  '弥勒佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Maitreya_at_Ajitagad.JPG/440px-Maitreya_at_Ajitagad.JPG',
  '毗卢遮那佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Vairocana_Buddha_Taiwan.jpg/440px-Vairocana_Buddha_Taiwan.jpg',
  '多宝佛': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Prabhutaratna.jpg/440px-Prabhutaratna.jpg',
  
  // 菩萨
  '观世音菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '文殊菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Manjushri_Tabo.jpg/440px-Manjushri_Tabo.jpg',
  '普贤菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Samantabhadra_Pujian.jpg/440px-Samantabhadra_Pujian.jpg',
  '地藏菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Ksitigarbha_Bodhisattva.jpg/440px-Ksitigarbha_Bodhisattva.jpg',
  '大势至菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mah%C4%81sth%C4%81mapr%C4%81pta.jpg/440px-Mah%C4%81sth%C4%81mapr%C4%81pta.jpg',
  '弥勒菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Maitreya_Bodhisattva.jpg/440px-Maitreya_Bodhisattva.jpg',
  '金刚手菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Vajrapani_2480.jpg/440px-Vajrapani_2480.jpg',
  '虚空藏菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Akasagarbha.jpg/440px-Akasagarbha.jpg',
  '准提菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cundi.jpg/440px-Cundi.jpg',
  '日光菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Suryaprabha.jpg/440px-Suryaprabha.jpg',
  '月光菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Candraprabha.jpg/440px-Candraprabha.jpg',
  '药王菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Bhai%C5%9Bajyaguru_R%C4%81ja.jpg/440px-Bhai%C5%9Bajyaguru_R%C4%81ja.jpg',
  '药上菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bhai%C5%9Bajyaguru-vaid%C5%ABrya-prabha.jpg/440px-Bhai%C5%9Bajyaguru-vaid%C5%ABrya-prabha.jpg',
  '善财童子': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Sudhana.jpg/440px-Sudhana.jpg',
  '龙女': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Naga.jpg/440px-Naga.jpg',
  
  // 罗汉
  '宾头卢尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pindola.jpg/440px-Pindola.jpg',
  '摩诃迦叶尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mahakasyapa.jpg/440px-Mahakasyapa.jpg',
  '须菩提尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Subhuti.jpg/440px-Subhuti.jpg',
  '舍利弗尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Shariputra.jpg/440px-Shariputra.jpg',
  '目犍连尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Maudgalyayana.jpg/440px-Maudgalyayana.jpg',
  '阿那律尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Aniruddha.jpg/440px-Aniruddha.jpg',
  '富楼那尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Purna.jpg/440px-Purna.jpg',
  '迦旃延尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Katyayana.jpg/440px-Katyayana.jpg',
  '优波离尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Upali.jpg/440px-Upali.jpg',
  '罗睺罗尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Rahula.jpg/440px-Rahula.jpg',
  '阿难陀尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Ananda.jpg/440px-Ananda.jpg',
  '提婆达多尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Devadatta.jpg/440px-Devadatta.jpg',
  '周利盘特迦尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Culapanthaka.jpg/440px-Culapanthaka.jpg',
  '难陀尊者': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Nanda.jpg/440px-Nanda.jpg',
  '耶输陀罗': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Yashodhara.jpg/440px-Yashodhara.jpg',
  '摩登伽女': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Matang%C4%AB.jpg/440px-Matang%C4%AB.jpg',
  
  // 护法
  '韦陀菩萨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Vajrapani_2480.jpg/440px-Vajrapani_2480.jpg',
  '关羽': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Guan_god.jpg/440px-Guan_god.jpg',
  '增长天王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dhrtarastra.jpg/440px-Dhrtarastra.jpg',
  '持国天王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Virudhaka.jpg/440px-Virudhaka.jpg',
  '多闻天王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vaisravana.jpg/440px-Vaisravana.jpg',
  '广目天王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Virupaksha.jpg/440px-Virupaksha.jpg',
  '阎魔罗王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Yama.jpg/440px-Yama.jpg',
  '莲花生大士': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Padmasambhava.jpg/440px-Padmasambhava.jpg',
  '大黑天': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Mahakala.jpg/440px-Mahakala.jpg',
  '摩利支天': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Marici.jpg/440px-Marici.jpg',
  '坚牢地神': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Prithvi.jpg/440px-Prithvi.jpg',
  '辩才天女': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Saraswati.jpg/440px-Saraswati.jpg',
  '吉祥天女': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lakshmi.jpg/440px-Lakshmi.jpg',
  '金刚亥母': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vajravarahi.jpg/440px-Vajravarahi.jpg',
  '帝释天': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Sakra.jpg/440px-Sakra.jpg',
  '梵天': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Brahma.jpg/440px-Brahma.jpg',
  '那伽': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Naga.jpg/440px-Naga.jpg',
  '金翅鸟': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Garuda.jpg/440px-Garuda.jpg',
  '紧那罗': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kinnara.jpg/440px-Kinnara.jpg',
  '乾达婆': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Gandharva.jpg/440px-Gandharva.jpg',
  '摩睺罗伽': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Mahoraga.jpg/440px-Mahoraga.jpg',
  '阿修罗': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Asura.jpg/440px-Asura.jpg',
  
  // 其他高僧
  '龙树': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nagarjuna.jpg/440px-Nagarjuna.jpg',
  '提婆': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Aryadeva.jpg/440px-Aryadeva.jpg',
  '无著': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Asanga.jpg/440px-Asanga.jpg',
  '世亲': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vasubandhu.jpg/440px-Vasubandhu.jpg',
  '达摩祖师': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bodhidharma.jpg/440px-Bodhidharma.jpg',
  '慧能大师': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Huineng.jpg/440px-Huineng.jpg',
  '玄奘': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Xuanzang.jpg/440px-Xuanzang.jpg',
  '鉴真': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jianzhen.jpg/440px-Jianzhen.jpg',
  
  // 观音化身
  '千手千眼观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '圣观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '杨柳观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '白衣观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '游戏观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '莲卧观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '持经观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '岩户观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '众宝观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '滴水观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '青颈观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '合掌观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '一叶观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '六时观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '延命观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '马郎妇观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '如意轮观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Cintamani.jpg/440px-Cintamani.jpg',
  '十一面观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '不空羂索观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guanyin_11.jpg/440px-Guanyin_11.jpg',
  '马头观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hayagriva.jpg/440px-Hayagriva.jpg',
  '准提观音': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cundi.jpg/440px-Cundi.jpg',
  
  // 度母
  '绿度母': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Green_Tara.jpg/440px-Green_Tara.jpg',
  '白度母': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/White_Tara.jpg/440px-White_Tara.jpg',
  '红度母': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Kurukulla.jpg/440px-Kurukulla.jpg',
  
  // 其他
  '宝藏神': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Jambhala.jpg/440px-Jambhala.jpg',
  '大梵天王': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Brahma.jpg/440px-Brahma.jpg',
  '摩酰首罗天': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maheshvara.jpg/440px-Maheshvara.jpg',
}

async function main() {
  console.log('Updating character images...')
  
  let updated = 0
  for (const [name, imageUrl] of Object.entries(images)) {
    try {
      const result = await prisma.character.updateMany({
        where: { name },
        data: { imageUrl },
      })
      if (result.count > 0) {
        updated++
        console.log(`Updated: ${name}`)
      }
    } catch (e) {
      console.error(`Error updating ${name}:`, e.message)
    }
  }
  
  console.log(`\nTotal updated: ${updated} characters`)
  
  // Count remaining without images
  const withoutImages = await prisma.character.count({
    where: { imageUrl: null },
  })
  console.log(`Remaining without images: ${withoutImages}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
