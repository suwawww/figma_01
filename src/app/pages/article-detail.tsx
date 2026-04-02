import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion as Motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  Heart,
  Brain,
  Apple,
  Dumbbell,
  Pill,
  Baby,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  chronic: "bg-rose-50 text-rose-600 border-rose-100",
  mental: "bg-violet-50 text-violet-600 border-violet-100",
  nutrition: "bg-green-50 text-green-600 border-green-100",
  exercise: "bg-orange-50 text-orange-600 border-orange-100",
  medicine: "bg-blue-50 text-blue-600 border-blue-100",
  child: "bg-yellow-50 text-yellow-600 border-yellow-100",
};

const categoryNames: Record<string, string> = {
  chronic: "慢病管理",
  mental: "心理健康",
  nutrition: "营养膳食",
  exercise: "运动健康",
  medicine: "用药指导",
  child: "儿童健康",
};

// ─── 文章完整内容数据 ────────────────────────────────────────────────────────────
const articlesContent: Record<
  number,
  {
    id: number;
    title: string;
    category: string;
    author: string;
    authorTitle: string;
    date: string;
    readTime: string;
    views: number;
    likes: number;
    image: string;
    summary: string;
    content: {
      type: "paragraph" | "heading" | "tip" | "warning" | "list" | "numbered";
      text?: string;
      items?: string[];
    }[];
    tags: string[];
    relatedIds: number[];
  }
> = {
  1: {
    id: 1,
    title: "高血压患者的日常管理与注意事项",
    category: "chronic",
    author: "李明医生",
    authorTitle: "心血管内科主任医师 · 从医 18 年",
    date: "2026-03-29",
    readTime: "5分钟",
    views: 3456,
    likes: 234,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-1.png",
    summary:
      "高血压是常见的慢性疾病，通过规范的生活方式和科学用药可以有效控制血压，降低心脑血管事件的发生风险。",
    tags: ["高血压", "慢病管理", "血压控制", "生活方式"],
    relatedIds: [3, 5],
    content: [
      {
        type: "paragraph",
        text: "高血压（Hypertension）是指以体循环动脉血压升高为主要特征的临床综合征，是最常见的慢性疾病之一。长期高血压会损伤心脏、大脑、肾脏和眼睛等靶器官，是脑卒中、心肌梗死、肾衰竭的重要危险因素。",
      },
      {
        type: "heading",
        text: "一、每日血压监测",
      },
      {
        type: "paragraph",
        text: "规律监测血压是高血压管理的基础。建议患者在家中使用经过验证的上臂式电子血压计，每天固定时间（早晨起床后和晚上睡前）各测量一次，每次测量前静坐休息 5 分钟，连续测量 2 次取平均值，并记录在血压日记本中，以便复诊时提供给医生参考。",
      },
      {
        type: "tip",
        text: "💡 小贴士：测量血压时应保持坐姿端正，双脚平放于地面，袖带下缘距肘窝 2～3 cm，测量过程中避免说话和移动。",
      },
      {
        type: "heading",
        text: "二、饮食管理：低盐低脂是关键",
      },
      {
        type: "paragraph",
        text: "饮食是控制血压最重要的非药物手段之一。研究表明，每减少 1 g 食盐摄入，收缩压可平均降低 1～2 mmHg。推荐遵循「DASH 饮食法」，重点包括：",
      },
      {
        type: "list",
        items: [
          "每日食盐摄入量控制在 5 g 以内，减少酱油、腌制品、加工食品的摄入",
          "增加富含钾的食物：香蕉、橙子、菠菜、西兰花、土豆",
          "多吃富含镁和钙的食物：低脂乳制品、坚果、豆类",
          "减少饱和脂肪酸摄入，选择橄榄油、鱼类等健康脂肪来源",
          "控制酒精摄入：男性每日不超过 25 g 酒精，女性不超过 15 g",
          "适量摄入全谷物、蔬菜和水果，保证膳食纤维充足",
        ],
      },
      {
        type: "heading",
        text: "三、适量运动，循序渐进",
      },
      {
        type: "paragraph",
        text: "规律的有氧运动可使收缩压降低 4～9 mmHg。高血压患者适合的运动包括：散步、慢跑、骑自行车、游泳、太极拳等中等强度的有氧运动。",
      },
      {
        type: "numbered",
        items: [
          "运动频率：每周至少 5 天，每次 30～45 分钟",
          "运动强度：以「微微出汗、能说话但不能唱歌」为宜",
          "运动前先做 5～10 分钟热身，运动后做适度放松",
          "避免剧烈的无氧运动和憋气动作（如举重、用力屏气），以防血压骤升",
          "运动前后各测量一次血压，若运动前血压 > 180/110 mmHg，应暂停运动",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 注意：血压控制不稳定期间，请在医生指导下制定运动方案，切勿擅自进行高强度运动。",
      },
      {
        type: "heading",
        text: "四、规律服药，切勿擅自停药",
      },
      {
        type: "paragraph",
        text: "药物治疗是高血压管理的重要手段。患者必须按照医嘱规律服药，切忌「血压正常了就停药」。高血压是慢性病，需要长期、甚至终身管理。突然停药可能导致血压反弹性升高，诱发心脑血管急性事件。",
      },
      {
        type: "list",
        items: [
          "每日固定时间服药，养成良好的服药习惯",
          "不可随意更改剂量或更换药物种类",
          "出现不良反应时及时告知医生，由医生调整方案",
          "定期（每 3～6 个月）复诊，根据血压情况调整治疗方案",
        ],
      },
      {
        type: "heading",
        text: "五、心理调节与睡眠管理",
      },
      {
        type: "paragraph",
        text: "长期精神压力和睡眠不足是血压难以控制的重要原因。建议高血压患者学习压力管理技巧，保持积极心态，每晚保证 7～8 小时的高质量睡眠。如有睡眠问题，可寻求专科医生帮助。",
      },
      {
        type: "tip",
        text: "📌 记住：高血压的管理是一场「马拉松」。坚持生活方式干预 + 规律用药 + 定期复诊，绝大多数患者都能把血压控制在理想水平，享受高质量的生活。",
      },
    ],
  },

  2: {
    id: 2,
    title: "如何缓解工作压力与焦虑情绪",
    category: "mental",
    author: "陈静医生",
    authorTitle: "心理卫生科副主任医师 · 心理咨询师",
    date: "2026-03-28",
    readTime: "8分钟",
    views: 2890,
    likes: 189,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-3.png",
    summary:
      "现代生活节奏快，工作压力大，学会自我调节和心理疏导非常重要，本文提供科学有效的压力管理和焦虑缓解方法。",
    tags: ["心理健康", "压力管理", "焦虑缓解", "情绪调节"],
    relatedIds: [1, 4],
    content: [
      {
        type: "paragraph",
        text: "在快节奏的现���社会中，工作压力和焦虑情绪已成为许多人面临的普遍挑战。适度的压力可以激发潜能，但长期处于高压状态会损害身心健康，引发失眠、免疫力下降乃至抑郁等问题。学会科学地管理压力和调节情绪，是保护心理健康的重要技能。",
      },
      {
        type: "heading",
        text: "一、认识压力与焦虑的本质",
      },
      {
        type: "paragraph",
        text: "压力是大脑对威胁或挑战的一种应激反应，适量压力有助于提高专注度和行动力。焦虑则是对未来不确定性的担忧，当这种担忧超出实际需要时，就会影响正常生活和工作。了解这些情绪的本质，能够帮助我们以更理性的态度面对它们。",
      },
      {
        type: "heading",
        text: "二、正念呼吸：即时平静的工具",
      },
      {
        type: "paragraph",
        text: "腹式深呼吸是最简单、最有效的即时减压方法。当感到焦虑或紧张时，可以随时随地使用「4-7-8 呼吸法」：",
      },
      {
        type: "numbered",
        items: [
          "用鼻子缓慢吸气，默数 4 拍",
          "屏住呼吸，默数 7 拍",
          "用嘴缓慢呼气，默数 8 拍",
          "重复以上步骤 4～6 次",
        ],
      },
      {
        type: "tip",
        text: "💡 研究证明，控制呼吸可以直接激活副交感神经系统，降低心率和皮质醇水平，在 2～3 分钟内有效缓解急性焦虑。",
      },
      {
        type: "heading",
        text: "三、认知重构：改变看问题的视角",
      },
      {
        type: "paragraph",
        text: "焦虑往往源于对问题的「灾难化」思维。认知行为疗法（CBT）提供了一套实用的思维重构工具：当负面想法出现时，尝试问自己以下问题：",
      },
      {
        type: "list",
        items: [
          "「这件事真的有我想的那么糟糕吗？最坏的结果是什么？」",
          "「即使最坏的情况发生，我有没有能力应对？」",
          "「一年后，五年后，这件事还会让我烦恼吗？」",
          "「有没有其他更客观的方式来看待这个问题？」",
          "「我的担忧是基于事实，还是基于假设？」",
        ],
      },
      {
        type: "heading",
        text: "四、时间管理：减少压力的根源",
      },
      {
        type: "paragraph",
        text: "工作压力很大程度上来自于任务过载和时间失控。科学的时间管理可以从根本上减少压力来源。",
      },
      {
        type: "numbered",
        items: [
          "使用「艾森豪威尔矩阵」：将任务按「重要性」和「紧急性」分为四象限，优先处理重要且紧急的事项",
          "番茄工作法：专注工作 25 分钟，休息 5 分钟，每 4 个番茄钟后休息 15～30 分钟",
          "每天列出 3 件「最重要的事（MITs）」，确保核心任务完成",
          "学会说「不」：合理评估自己的承载能力，避免过度承诺",
        ],
      },
      {
        type: "heading",
        text: "五、建立「减压缓冲区」",
      },
      {
        type: "paragraph",
        text: "在工作与生活之间建立明确的「减压缓冲区」，有助于心理的切换与恢复。以下活动被科学证明能有效降低压力激素水平：",
      },
      {
        type: "list",
        items: [
          "规律运动：每周 3～5 次有氧运动，持续 30 分钟以上",
          "接触自然：公园散步、园艺等户外活动能显著改善情绪",
          "社交连接：与亲友保持定期联系，诉说烦恼，获得情感支持",
          "创意活动：绘画、音乐、写作等能转移注意力，带来心流体验",
          "正念冥想：每天 10 分钟的冥想练习，长期坚持效果显著",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 重要提示：如果焦虑情绪持续 2 周以上、严重影响正常生活和工作，或伴有心悸、失眠、呼吸困难等躯体症状，请及时就医，寻求专业的心理评估和治疗。",
      },
      {
        type: "heading",
        text: "六、高质量睡眠是心理健康的基石",
      },
      {
        type: "paragraph",
        text: "睡眠不足会加重焦虑和压力感，形成恶性循环。建议建立规律的睡眠习惯：每天固定时间上床和起床，睡前 1 小时避免使用电子设备，营造黑暗、安静、凉爽的睡眠环境，必要时可以借助白噪音或轻音乐帮助入睡。",
      },
      {
        type: "tip",
        text: "📌 请记住：照顾好自己的心理健康，不是自私，而是负责任。只有保持良好的心理状态，才能更好地工作、更好地爱护家人。",
      },
    ],
  },

  3: {
    id: 3,
    title: "均衡饮食：一日三餐的科学搭配",
    category: "nutrition",
    author: "张伟医生",
    authorTitle: "营养科主任医师 · 国家注册营养师",
    date: "2026-03-27",
    readTime: "6分钟",
    views: 4123,
    likes: 312,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-2.png",
    summary:
      "营养均衡的饮食是健康的基础，本文详细介绍如何科学安排一日三餐，让您在享受美食的同时获得全面的营养。",
    tags: ["营养膳食", "均衡饮食", "健康饮食", "膳食指南"],
    relatedIds: [1, 4],
    content: [
      {
        type: "paragraph",
        text: "「民以食为天」——饮食不仅是生命的基础，更直接影响着我们的体重、精力、免疫力和慢性病风险。《中国居民膳食指南（2022）》指出，均衡多样的饮食模式是维护健康、预防疾病的核心策略。那么，如何才能做到真正的「均衡饮食」？",
      },
      {
        type: "heading",
        text: "一、认识中国居民膳食宝塔",
      },
      {
        type: "paragraph",
        text: "中国居民平衡膳食宝塔将食物分为五层，从底层到顶层，建议摄入量依次递减：",
      },
      {
        type: "numbered",
        items: [
          "第一层（底层）——谷薯类：每天 250～400 g，其中全谷物和杂豆 50～150 g，薯类 50～100 g",
          "第二层——蔬菜和水果：蔬菜每天 300～500 g（深色蔬菜占一半），水果 200～350 g",
          "第三层——动物性食物：禽畜肉 40～75 g，水产品 40～75 g，蛋类 40～50 g",
          "第四层——奶和大豆：奶制品 300 g，大豆及坚果 25～35 g",
          "第五层（顶层）——烹调油和盐：食用油 25～30 g，食盐不超过 5 g",
        ],
      },
      {
        type: "heading",
        text: "二、早餐：一天中最重要的一餐",
      },
      {
        type: "paragraph",
        text: "早餐提供全天约 25%～30% 的能量，是维持上午血糖稳定、保证大脑工作效率的关键。一顿营养丰富的早餐应包含：",
      },
      {
        type: "list",
        items: [
          "主食类（提供碳水化合物和 B 族维生素）：全麦面包、燕麦粥、杂粮馒头",
          "蛋白质来源（维持饱腹感和肌肉合成）：鸡蛋、豆浆、低脂奶、豆腐",
          "蔬菜或水果（补充维生素、矿物质和膳食纤维）：凉拌菜、应季水果",
          "健康脂肪（少量即可）：少量坚果或牛油果",
        ],
      },
      {
        type: "tip",
        text: "💡 推荐早餐组合：全麦面包 + 水煮蛋 + 低脂牛奶 + 小份应季水果，营养全面、操作简单、耗时不超过 10 分钟。",
      },
      {
        type: "heading",
        text: "三、午餐：能量补充的黄金时机",
      },
      {
        type: "paragraph",
        text: "午餐应提供全天约 35%～40% 的能量，是最重要的正餐。遵循「一拳主食 + 一掌蛋白质 + 两手蔬菜」的搭配原则，可以帮助快速估算合适的食物份量。",
      },
      {
        type: "list",
        items: [
          "主食多样化：米饭、面条交替，每周至少 2～3 次全谷物替代精制主食",
          "蛋白质轮换：禽肉、畜肉、鱼虾、豆制品轮流搭配，避免单一",
          "蔬菜至少 2 种以上，深色（如菠菜、西兰花、胡萝卜）与浅色搭配",
          "烹饪方式以蒸、煮、炒为主，减少油炸和重油重盐",
        ],
      },
      {
        type: "heading",
        text: "四、晚餐：清淡为主，适当减量",
      },
      {
        type: "paragraph",
        text: "晚餐应清淡、易消化，能量约占全天的 30%。由于夜间活动量减少，晚餐过于丰盛容易导致体重增加和睡眠质量下降。",
      },
      {
        type: "numbered",
        items: [
          "主食适当减量，可用豆腐、蒸蛋等高蛋白食物部分替代",
          "以蔬菜为主角，搭配适量鱼虾或豆制品",
          "避免高糖、高脂、高盐食物，拒绝宵夜",
          "晚餐时间建议在 18:00～19:00，睡前 3 小时不再进食",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 特别提醒：不要因为减肥而跳过正餐，这会导致下一餐过度进食，反而不利于体重管理。规律进餐、控制总量才是科学之道。",
      },
      {
        type: "heading",
        text: "五、喝水也是饮食的重要部分",
      },
      {
        type: "paragraph",
        text: "水是人体含量最多的营养素。成年人每天应饮水 1500～1700 mL（约 7～8 杯），以白开水为首选，避免用含糖饮料代替饮水。建议少量多次，不要等到口渴才喝水。",
      },
      {
        type: "tip",
        text: "📌 健康饮食不需要追求完美，重要的是形成长期可持续的饮食习惯。从今天开始，在现有饮食基础上做一点改善，日积月累，就能看到健康的改变。",
      },
    ],
  },

  4: {
    id: 4,
    title: "适合中老年人的运动方式推荐",
    category: "exercise",
    author: "王芳医生",
    authorTitle: "康复医学科副主任医师 · 运动医学专家",
    date: "2026-03-26",
    readTime: "7分钟",
    views: 2456,
    likes: 178,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-4.png",
    summary:
      "中老年人需要选择适合自己年龄和身体状况的运动方式，科学运动不仅能强身健体，还能预防慢性病、延缓衰老。",
    tags: ["运动健康", "中老年运动", "健身指导", "慢病预防"],
    relatedIds: [1, 3],
    content: [
      {
        type: "paragraph",
        text: "「生命在于运动」——这一原则对中老年人尤为重要。研究表明，规律运动可以降低中老年人心脑血管疾病风险达 35%，减少跌倒骨折风险，延缓认知功能衰退，改善情绪和睡眠质量。然而，中老年人的运动方式必须根据自身年龄、健康状况和运动基础进行科学选择。",
      },
      {
        type: "heading",
        text: "一、运动前的安全评估",
      },
      {
        type: "paragraph",
        text: "中老年人在开始新的运动计划前，建议先进行全面的健康评估，特别是有心血管疾病、糖尿病、骨质疏松等慢性疾病的人群，应在医生指导下制定个性化运动方案。",
      },
      {
        type: "list",
        items: [
          "进行一次体检，重点检查血压、血糖、心电图和骨密度",
          "评估自身的运动能力和关节健康状况",
          "了解哪些动作对自己的身体状况可能存在风险",
          "从低强度开始，循序渐进地增加运动量",
        ],
      },
      {
        type: "heading",
        text: "二、有氧运动：心肺健康的基础",
      },
      {
        type: "paragraph",
        text: "有氧运动是中老年人最推荐的基础运动类型，建议每周累计达到 150 分钟中等强度有氧运动。以下是最适合中老年人的有氧运动：",
      },
      {
        type: "numbered",
        items: [
          "步行：最安全、最简单的有氧运动。每天快走 30～45 分钟，步速以「微微气喘但仍能说话」为宜。目标每日步数 6000～8000 步",
          "太极拳：中国传统功法，动作轻柔、重心低，可改善平衡能力，降低跌倒风险，特别适合 60 岁以上人群",
          "游泳/水中健身操：水的浮力减轻关节负担，是关节炎、肥胖患者的理想选择",
          "骑行（室内单车）：低冲击力，对膝关节友好，同时锻炼下肢力量",
          "广场舞/健身操：节奏感强，社交性好，能同时锻炼协调性和平衡感",
        ],
      },
      {
        type: "tip",
        text: "💡 目标心率参考：中等强度运动时，心率应达到（220 - 年龄）× 50%～70%。例如 60 岁，目标心率约为 80～112 次/分钟。",
      },
      {
        type: "heading",
        text: "三、力量训练：对抗肌肉流失",
      },
      {
        type: "paragraph",
        text: "人体从 30 岁开始每年流失约 1% 的肌肉质量（肌少症），70 岁后速度加快。肌肉减少会导致代谢下降、跌倒风险增加、生活自理能力下降。因此，力量训练对中老年人同样重要，建议每周 2～3 次：",
      },
      {
        type: "list",
        items: [
          "弹力带训练：使用不同阻力的弹力带锻炼上下肢肌肉，安全且有效",
          "坐姿/站姿静蹲：强化大腿和臀部肌肉，改善膝关节稳定性",
          "俯卧撑（扶墙式）：上肢力量训练的入门动作，可按能力调整难度",
          "核心训练（平板支撑改良版）：保护腰椎，改善姿势",
          "哑铃/矿泉水瓶替代：0.5～2 kg 的轻器械适合大多数中老年人",
        ],
      },
      {
        type: "heading",
        text: "四、平衡与柔韧性训练：预防跌倒",
      },
      {
        type: "paragraph",
        text: "跌倒是 65 岁以上老年人意外伤害的首要原因。定期进行平衡和柔韧性训练，可以显著降低跌倒风险：",
      },
      {
        type: "numbered",
        items: [
          "单腿站立练习：每次保持 10～30 秒，每天 2～3 组，可扶墙辅助",
          "踮脚尖练习：强化小腿肌肉和踝关节稳定性",
          "颈部、肩部、腰部的拉伸运动：每个动作保持 15～30 秒",
          "瑜伽（基础款）或八段锦：提高整体柔韧性和身体意识",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 运动时如出现胸痛、气促、头晕、心悸等症状，应立即停止运动并就医。不要抱着「坚持就是胜利」的心态强撑。",
      },
      {
        type: "heading",
        text: "五、运动的最佳时间与注意事项",
      },
      {
        type: "list",
        items: [
          "最佳运动时间：上午 9:00～11:00 或下午 15:00～17:00（避开血压、血糖的波动高峰）",
          "避免在极端天气下户外运动（气温过高/过低、空气污染严重时）",
          "运动前充分热身 5～10 分钟，运动后充分拉伸放松",
          "保持运动的连贯性和规律性，避免突然大量运动后长时间休息",
          "运动后补充适量水分，必要时补充电解质",
        ],
      },
      {
        type: "tip",
        text: "📌 运动应该是一件愉快的事情！找到自己喜欢的运动方式，或约上朋友一起，更容易长期坚持。每一步都是对健康的投资。",
      },
    ],
  },

  5: {
    id: 5,
    title: "常见药物的正确使用方法",
    category: "medicine",
    author: "赵医生",
    authorTitle: "药学部主任药师 · 临床药学专家",
    date: "2026-03-25",
    readTime: "10分钟",
    views: 3789,
    likes: 256,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-5.png",
    summary:
      "正确用药是治疗疾病的关键，了解药物的使用时间、剂量和注意事项，可以最大化药物疗效，避免不良反应。",
    tags: ["用药指导", "安全用药", "药物知识", "处方药"],
    relatedIds: [1, 6],
    content: [
      {
        type: "paragraph",
        text: "「是药三分毒」——这句话揭示了用药的双面性。药物既能治病救人，也可能因使用不当而带来伤害。世界卫生组织（WHO）数据显示，全球约 50% 的药物未能正确使用，因用药错误导致的伤害事件数以亿计。正确用药，是每一位患者和家属都应该掌握的基本技能。",
      },
      {
        type: "heading",
        text: "一、处方药 vs 非处方药，你分清楚了吗？",
      },
      {
        type: "paragraph",
        text: "在中国，药品根据管理级别分为处方药（Rx）和非处方药（OTC）两大类：",
      },
      {
        type: "list",
        items: [
          "处方药：必须凭执业医师处方才能购买和使用，如抗生素、降压药、降糖药、精神类药物等。擅自购买和使用处方药是违规且危险的行为",
          "甲类非处方药（红色 OTC 标志）：可自行购买，但需在药师指导下使用",
          "乙类非处方药（绿色 OTC 标志）：相对最安全，可在超市、便利店购买使用",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 严重警示：抗生素属于处方药，绝对不可自行购买服用！滥用抗生素是细菌耐药性的主要原因，也可能引发严重的过敏反应和肝肾损害。",
      },
      {
        type: "heading",
        text: "二、看懂药品说明书的关键信息",
      },
      {
        type: "paragraph",
        text: "药品说明书是用药的「第一指南」，在服药前务必仔细阅读以下核心内容：",
      },
      {
        type: "numbered",
        items: [
          "【适应症】：确认该药物是否适用于您的症状，切勿「一药治百病」",
          "【用法用量】：注意每次用量、每日次数和疗程，不得随意加减量",
          "【禁忌症】：特定疾病患者（如孕妇、肾病、肝病患者）可能被禁止使用",
          "【药物相互作用】：如正在服用多种药物，务必注意是否存在配伍禁忌",
          "【不良反应】：了解可能出现的副作用，出现严重反应时及时就医",
          "【有效期】：过期药物不可服用，否则不仅无效，还可能有害",
        ],
      },
      {
        type: "heading",
        text: "三、常见用药误区与纠正",
      },
      {
        type: "list",
        items: [
          "误区一「症状消失就停药」：抗生素、降压药、降糖药等必须按疗程规律服用，症状消失不代表治愈，擅自停药会导致病情复发或耐药",
          "误区二「多种药一起吃更有效」：多药合用可能产生相互作用，降低疗效甚至增加毒性，应严格遵医嘱",
          "误区三「别人有效的药我也可以吃」：药物效果因人而异，他人的处方不可「借用」",
          "误区四「中药没有副作用」：中药同样含有活性成分，部分中药（如含马兜铃酸的）对肾脏有毒性",
          "误区五「儿童药就是成人药减量」：很多成人药物对儿童有特殊毒性，必须使用儿童专用剂型",
        ],
      },
      {
        type: "heading",
        text: "四、特殊用药时间的讲究",
      },
      {
        type: "paragraph",
        text: "药物的服用时间直接影响其吸收效果和副作用：",
      },
      {
        type: "numbered",
        items: [
          "空腹服用（餐前 30～60 分钟）：促进胃肠动力的药物（如多潘立酮）、某些抗菌药（如阿莫西林）",
          "餐中/饭后服用：刺激胃肠道的药物（如布洛芬、阿司匹林）、脂溶性维生素（A、D、E、K）",
          "睡前服用：安眠类药物、降脂药（他汀类在夜间肝脏合成胆固醇最旺盛）、抗组胺药（因嗜睡副作用）",
          "特定时间点服用：降压药（通常早晨服）、胰岛素（根据餐前或睡前情况调整）",
        ],
      },
      {
        type: "tip",
        text: "💡 不确定服药时间？记住一个原则：在没有特殊说明的情况下，大多数口服药餐后 30 分钟服用是最安全的选择，可减少胃肠道刺激。",
      },
      {
        type: "heading",
        text: "五、药物储存的正确方法",
      },
      {
        type: "list",
        items: [
          "大多数药物应在常温（10℃～30℃）、避光、干燥的环境保存",
          "需冷藏的药物（如胰岛素、某些眼药水）放 2℃～8℃冰箱保存，但不可冷冻",
          "药物不宜放在厨房、浴室等高温潮湿环境",
          "定期清理家庭小药箱，清除过期、变色、变质的药品",
          "所有药物放在儿童不易接触的地方，防止误服",
        ],
      },
      {
        type: "tip",
        text: "📌 最后提醒：用药有疑问，首先咨询医生或药师，这是最安全、最负责任的做法。不要轻信网络上来源不明的用药建议。",
      },
    ],
  },

  6: {
    id: 6,
    title: "儿童春季常见疾病预防指南",
    category: "child",
    author: "刘医生",
    authorTitle: "儿科副主任医师 · 小儿内科专家",
    date: "2026-03-24",
    readTime: "6分钟",
    views: 2134,
    likes: 145,
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/8-6.png",
    summary:
      "春季是儿童呼吸道疾病高发期，家长应该了解常见疾病的预防措施和护理方法，守护孩子的春季健康。",
    tags: ["儿童健康", "疾病预防", "春季护理", "育儿知识"],
    relatedIds: [5, 2],
    content: [
      {
        type: "paragraph",
        text: "春季气温忽高忽低，空气中各类细菌和病毒活跃，加之儿童免疫系统尚未发育完善，春季成为儿童疾病的高发季节。了解常见疾病的特点、预防方法和家庭护理技巧，可以帮助家长有效保护孩子的健康。",
      },
      {
        type: "heading",
        text: "一、春季儿童高发疾病概览",
      },
      {
        type: "list",
        items: [
          "上呼吸道感染（感冒）：最常见，由多种病毒引起，症状包括鼻塞、流涕、咳嗽、低热",
          "流行性感冒（流感）：症状比普通感冒更重，起病急，高热（39℃以上），全身酸痛",
          "手足口病：3～7 岁儿童高发，口腔、手、足出现疱疹，有传染性",
          "过敏性鼻炎/哮喘：春季花粉、尘螨浓度升高，过敏体质儿童易发作",
          "水痘：传染性极强，全身出现水疱样皮疹，需隔离治疗",
          "急性胃肠炎：「病从口入」，腹泻、呕吐为主要表现",
        ],
      },
      {
        type: "heading",
        text: "二、感冒和流感的鉴别与应对",
      },
      {
        type: "paragraph",
        text: "家长需要学会区分普通感冒和流感，因为两者的处理方式不同：",
      },
      {
        type: "list",
        items: [
          "普通感冒：起病较缓，症状较轻，主要以鼻部症状为主，一般无需用药，充分休息和补水即可自愈（7～10 天）",
          "流感：突然高热（≥39℃）、全身肌肉酸痛、极度乏力，需及时就医，可能需要服用奥司他韦等抗病毒药",
          "发热处理原则：体温 < 38.5℃，优先物理降温（温水擦浴）；≥ 38.5℃ 且孩子不适，可服用退烧药（对乙酰氨基酚或布洛芬）",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 紧急就医信号：孩子出现以下情况需立即就医：持续高热超过 3 天不退、呼吸急促或困难、精神极差/嗜睡难唤醒、皮疹大量出现、反复呕吐无法进食。",
      },
      {
        type: "heading",
        text: "三、疫苗：最有效的预防武器",
      },
      {
        type: "paragraph",
        text: "按时接种疫苗是预防儿童传染病最经济、最有效的手段。春季到来前，请确认孩子以下疫苗的接种状态：",
      },
      {
        type: "numbered",
        items: [
          "流感疫苗：每年 9～11 月接种，保护期约一年，强烈建议 6 月龄以上儿童每年接种",
          "水痘疫苗：2 针次（1 岁和 4 岁），未接种者应及时补种",
          "手足口病（EV71 疫苗）：6 月龄～5 岁儿童可接种，预防重症手足口病",
          "肺炎球菌疫苗（PCV）：预防肺炎、脑膜炎等严重感染，按推荐程序接种",
        ],
      },
      {
        type: "heading",
        text: "四、日常预防：好习惯是最好的盾牌",
      },
      {
        type: "numbered",
        items: [
          "手卫生：教会孩子「七步洗手法」，饭前便后、接触公共物品后必须洗手。洗手时间不少于 20 秒",
          "合理穿衣：「春捂秋冻」有一定道理，但注意不要过度捂，以孩子活动后背部微汗为宜",
          "营养与睡眠：保证均衡饮食和充足睡眠（学龄前儿童 10～13 小时/天，学龄儿童 9～11 小时/天）",
          "避开人员密集场所：流感高峰期少去商场、游乐园等通风不良、人员密集的地方",
          "室内通风：每天开窗通风 2～3 次，每次 15～30 分钟，改善室内空气质量",
        ],
      },
      {
        type: "heading",
        text: "五、过敏体质儿童的特殊防护",
      },
      {
        type: "paragraph",
        text: "春季花粉和尘螨是儿童过敏的主要诱因。过敏体质的孩子需要额外注意：",
      },
      {
        type: "list",
        items: [
          "关注当地花粉指数预报，花粉高峰期减少户外活动时间",
          "外出时佩戴口罩，回家后及时清洗面部和手部",
          "保持室内清洁，定期清洗床上用品（55℃以上热水），减少尘螨",
          "如孩子有哮喘病史，确保备好急救药物（速效支气管扩张剂），制定急救计划",
          "在医生指导下考虑是否进行过敏原检测和脱敏治疗",
        ],
      },
      {
        type: "tip",
        text: "📌 家长的平静是孩子最好的安慰剂。当孩子生病时，保持镇定、给予充足的关爱和陪伴，比任何药物都更能帮助孩子快速恢复。",
      },
    ],
  },
};

const relatedArticlesData = Object.values(articlesContent).map((a) => ({
  id: a.id,
  title: a.title,
  image: a.image,
  category: a.category,
  readTime: a.readTime,
}));

// ─── 渲染文章内容块 ────────────────────────────────────────────────────────────
function renderContentBlock(
  block: {
    type: "paragraph" | "heading" | "tip" | "warning" | "list" | "numbered";
    text?: string;
    items?: string[];
  },
  index: number
) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="text-slate-700 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h3 key={index} className="flex items-center gap-2 mt-8 mb-4">
          <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full" />
          <span className="font-bold text-slate-900">{block.text}</span>
        </h3>
      );
    case "tip":
      return (
        <div
          key={index}
          className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-4"
        >
          <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-700 leading-relaxed">{block.text}</p>
        </div>
      );
    case "warning":
      return (
        <div
          key={index}
          className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4"
        >
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed">{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul key={index} className="space-y-2 mb-5 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
              <span className="text-slate-700 leading-relaxed text-sm">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol key={index} className="space-y-2 mb-5 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-700 leading-relaxed text-sm">{item}</span>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

// ─── 主组件 ───────────────────────────────────────────────────────────────────
export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const articleId = Number(id);
  const article = articlesContent[articleId];

  // 初始化点赞数
  const displayLikes = article ? article.likes + likeCount : 0;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <BookmarkIcon className="w-16 h-16 text-slate-300" />
        <p className="text-slate-500">文章不存在或已被删除</p>
        <Button onClick={() => navigate("/dashboard/health-knowledge")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回健康知识
        </Button>
      </div>
    );
  }

  const related = relatedArticlesData.filter((a) =>
    article.relatedIds.includes(a.id)
  );

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* 返回按钮 */}
      <button
        onClick={() => navigate("/dashboard/health-knowledge")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        返回健康知识
      </button>

      {/* 文章头图 */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Badge
            className={`mb-3 border ${categoryColors[article.category] || "bg-slate-50 text-slate-600 border-slate-100"}`}
          >
            {categoryNames[article.category] || article.category}
          </Badge>
          <h1 className="text-white text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </div>

      {/* 文章主体 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 内容区 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 作者信息栏 */}
          <Card className="p-5 border-slate-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{article.author}</p>
                  <p className="text-xs text-slate-400">{article.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString()}
                </span>
                <span>{article.date}</span>
              </div>
            </div>
          </Card>

          {/* 摘要 */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-100">
            <p className="text-indigo-700 leading-relaxed italic text-sm">
              {article.summary}
            </p>
          </div>

          {/* 正文内容 */}
          <Card className="p-6 border-slate-100">
            <div className="prose prose-slate max-w-none">
              {article.content.map((block, index) =>
                renderContentBlock(block, index)
              )}
            </div>
          </Card>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"
              >
                # {tag}
              </span>
            ))}
          </div>

          {/* 点赞与分享 */}
          <Card className="p-5 border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">这篇文章对您有帮助吗？</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!liked) {
                      setLiked(true);
                      setLikeCount((c) => c + 1);
                      toast.success("感谢您的点赞！");
                    } else {
                      setLiked(false);
                      setLikeCount((c) => c - 1);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    liked
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{displayLikes}</span>
                </button>
                <button
                  onClick={() => {
                    setBookmarked(!bookmarked);
                    toast.success(bookmarked ? "已取消收藏" : "已加入收藏！");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    bookmarked
                      ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                      : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  收藏
                </button>
                <button
                  onClick={() => toast.success("链接已复制到剪贴板！")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-600 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-4">
          {/* 相关文章 */}
          <Card className="p-5 border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full" />
              相关推荐
            </h3>
            <div className="space-y-4">
              {related.map((rel) => (
                <Motion.div
                  key={rel.id}
                  whileHover={{ x: 4 }}
                  onClick={() =>
                    navigate(`/dashboard/health-knowledge/article/${rel.id}`)
                  }
                  className="flex gap-3 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {rel.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">{rel.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 shrink-0 self-center" />
                </Motion.div>
              ))}
            </div>
          </Card>

          {/* 快速操作 */}
          <Card className="p-5 border-slate-100 bg-gradient-to-br from-indigo-50 to-blue-50">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">有疑问？立即咨询</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              我们的专科医生在线，可以针对本文内容为您提供个性化解答。
            </p>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              size="sm"
              onClick={() => navigate("/dashboard/consultation-selection")}
            >
              在线问诊
            </Button>
          </Card>

          {/* 健康提示卡 */}
          <Card className="p-5 border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
              今日健康目标
            </h3>
            <div className="space-y-2">
              {[
                "饮水 1500ml 以上",
                "步行 30 分钟",
                "按时服药",
              ].map((goal, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {goal}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Motion.div>
  );
}

// Placeholder icon for fallback
function BookmarkIcon({ className }: { className?: string }) {
  return <Bookmark className={className} />;
}
