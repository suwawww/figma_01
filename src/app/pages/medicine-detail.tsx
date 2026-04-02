import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion as Motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Bell,
  ShoppingCart,
  Trash2,
  History,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Thermometer,
  Package,
  Pill,
  ShieldAlert,
  ChevronRight,
  Zap,
} from "lucide-react";

// ─── 药品完整数据 ───────────────────────────────────────────────────────────────
const medicinesContent: Record<
  number,
  {
    id: number;
    name: string;
    genericName: string;
    category: string;
    type: string;
    typeColor: string;
    image: string;
    stock: number;
    total: number;
    unit: string;
    expiry: string;
    dosage: string;
    reminders: string[];
    manufacturer: string;
    approvalNo: string;
    summary: string;
    content: {
      type: "paragraph" | "heading" | "tip" | "warning" | "list" | "numbered" | "info";
      text?: string;
      items?: string[];
    }[];
    highlights: { icon: string; label: string; value: string; color: string }[];
  }
> = {
  1: {
    id: 1,
    name: "阿莫西林胶囊",
    genericName: "Amoxicillin Capsules",
    category: "消炎解毒",
    type: "处方药",
    typeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-1.png",
    stock: 12,
    total: 30,
    unit: "粒",
    expiry: "2026-12-30",
    dosage: "1粒/次，3次/日",
    reminders: ["08:00", "12:00", "18:00"],
    manufacturer: "华北制药股份有限公司",
    approvalNo: "国药准字H20044060",
    summary: "阿莫西林胶囊为广谱青霉素类抗生素，主要用于敏感菌所致的各类感染，对革兰阳性菌及部分革兰阴性菌均具良好抗菌活性。",
    highlights: [
      { icon: "💊", label: "规格", value: "0.25g×24粒", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
      { icon: "🏭", label: "类型", value: "处方药·Rx", color: "bg-violet-50 border-violet-100 text-violet-700" },
      { icon: "⏱️", label: "服药频率", value: "每日三次", color: "bg-sky-50 border-sky-100 text-sky-700" },
      { icon: "📅", label: "有效期至", value: "2026-12-30", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
    ],
    content: [
      { type: "paragraph", text: "阿莫西林（Amoxicillin）属于广谱青霉素类抗生素，通过抑制细菌细胞壁合成发挥杀菌作用。本品为白色或类白色粉末状胶囊，口服后吸收迅速，生物利用度约 90%，血药浓度峰值约在服药后 1～2 小时出现。" },
      { type: "heading", text: "一、适用症状" },
      { type: "list", items: [
        "上呼吸道感染：鼻窦炎、咽炎、扁桃体炎等",
        "下呼吸道感染：急性支气管炎、肺炎（轻中度）",
        "泌尿道感染：膀胱炎、尿道炎、肾盂肾炎",
        "皮肤软组织感染：蜂窝组织炎、伤口感染",
        "幽门螺杆菌根除（需联合其他药物，遵医嘱）",
      ]},
      { type: "heading", text: "二、用法与用量" },
      { type: "numbered", items: [
        "成人常用量：每次 0.25～0.5g（1～2粒），每 8 小时服用一次",
        "饭前饭后均可服用，建议饭后服药可减少胃肠道刺激",
        "疗程通常为 5～10 天，请遵医嘱完成整个疗程，切勿自行停药",
        "建议用温开水（非牛奶）送服，避免与酸性饮料同服",
      ]},
      { type: "tip", text: "💡 用药提示：即使症状在用药后 2～3 天即明显改善，也请坚持完成整个疗程，否则可能导致细菌耐药，影响下次治疗效果。" },
      { type: "heading", text: "三、常见不良反应" },
      { type: "list", items: [
        "消化系统：恶心、呕吐、腹泻（发生率约 10%，多为轻度）",
        "皮肤过敏：皮疹、荨麻疹（如出现请立即停药并就医）",
        "严重（罕见）：过敏性休克，首次用药后 30 分钟内需注意观察",
      ]},
      { type: "warning", text: "⚠️ 重要提示：对青霉素类或头孢菌素类抗生素有过敏史者禁用。用药前须告知医生您的过敏史。如出现面部水肿、呼吸困难等症状，请立即拨打急救电话。" },
      { type: "heading", text: "四、储存方式" },
      { type: "info", text: "🌡️ 请密封保存于阴凉干燥处（温度不超过 25°C），避免阳光直射及潮湿环境。开封后请在 1 个月内用完。" },
    ],
  },

  2: {
    id: 2,
    name: "对乙酰氨基酚片",
    genericName: "Paracetamol Tablets",
    category: "解热镇痛",
    type: "OTC",
    typeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-2.png",
    stock: 5,
    total: 20,
    unit: "片",
    expiry: "2026-05-15",
    dosage: "2片/次，按需服用",
    reminders: [],
    manufacturer: "中美天津史克制药有限公司",
    approvalNo: "国药准字H10900007",
    summary: "对乙酰氨基酚（扑热息痛）是临床最常用的非处方解热镇痛药，用于缓解发热、头痛、牙痛、肌肉痛等多种轻至中度疼痛。",
    highlights: [
      { icon: "💊", label: "规格", value: "0.5g×20片", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
      { icon: "🛒", label: "类型", value: "OTC·非处方", color: "bg-green-50 border-green-100 text-green-700" },
      { icon: "⏱️", label: "间隔时间", value: "≥4～6小时", color: "bg-sky-50 border-sky-100 text-sky-700" },
      { icon: "📅", label: "有效期至", value: "2026-05-15", color: "bg-amber-50 border-amber-100 text-amber-700" },
    ],
    content: [
      { type: "paragraph", text: "对乙酰氨基酚（Paracetamol，又称扑热息痛）通过抑制中枢神经系统前列腺素的合成，发挥解热和镇痛作用。本品安全性高，适用范围广，是家庭备用药箱的必备品。" },
      { type: "heading", text: "一、适用情况" },
      { type: "list", items: [
        "退热：普通感冒、流感引起的发热（成人体温 >38.5°C）",
        "镇痛：头痛、偏头痛、牙痛、肌肉痛、关节痛",
        "痛经：轻至中度月经期腹痛",
        "术后或接种疫苗后的轻度疼痛和发热",
      ]},
      { type: "heading", text: "二、正确用法" },
      { type: "numbered", items: [
        "成人每次口服 500mg（1片）或 1000mg（2片），用温开水送服",
        "两次服药间隔不少于 4～6 小时，每日最多服用 4 次",
        "连续用于退热不超过 3 天，用于镇痛不超过 5 天",
        "若症状持续或加重，请及时就医，不可擅自加大剂量",
      ]},
      { type: "tip", text: "💡 老年人提示：60 岁以上老年人肝脏代谢能力下降，建议每次服用 500mg（1片），两次间隔延长至 6 小时，每日不超过 3 次。" },
      { type: "heading", text: "三、重要禁忌" },
      { type: "list", items: [
        "严重肝功能不全或活动性肝病者禁用",
        "每日饮酒 3 个单位以上者慎用，用前咨询医师",
        "��在服用含对乙酰氨基酚复方制剂（如多种感冒药）时，避免重复用药",
        "对本品过敏者禁用",
      ]},
      { type: "warning", text: "⚠️ 超量风险：对乙酰氨基酚过量会导致严重肝损伤！24 小时内成人摄入量不得超过 4000mg（8片）。库存已不足 10 片，建议尽快补充。" },
      { type: "heading", text: "四、储存方式" },
      { type: "info", text: "🌡️ 密封，在阴凉处（不超过 20°C）保存，避免儿童接触。已接近有效期（2026-05-15），请注意及时使用或补充新药。" },
    ],
  },

  3: {
    id: 3,
    name: "瑞舒伐他汀钙片",
    genericName: "Rosuvastatin Calcium Tablets",
    category: "慢病用药",
    type: "处方药",
    typeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-3.png",
    stock: 22,
    total: 28,
    unit: "片",
    expiry: "2027-02-10",
    dosage: "1片/次，每晚1次",
    reminders: ["21:00"],
    manufacturer: "阿斯利康制药有限公司",
    approvalNo: "国药准字J20120006",
    summary: "瑞舒伐他汀钙片是一种强效他汀类降脂药物，通过抑制 HMG-CoA 还原酶降低低密度脂蛋白胆固醇（LDL-C），用于治疗高胆固醇血症及预防心血管事件。",
    highlights: [
      { icon: "💊", label: "规格", value: "10mg×7片/板×4板", color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
      { icon: "🏭", label: "类型", value: "处方药·长期用药", color: "bg-violet-50 border-violet-100 text-violet-700" },
      { icon: "🌙", label: "服药时间", value: "每晚睡前", color: "bg-sky-50 border-sky-100 text-sky-700" },
      { icon: "📅", label: "有效期至", value: "2027-02-10", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
    ],
    content: [
      { type: "paragraph", text: "瑞舒伐他汀（Rosuvastatin）是第三代他汀类降脂药物，通过选择性抑制 HMG-CoA 还原酶（胆固醇合成的限速酶），有效降低血浆中低密度脂蛋白胆固醇（LDL-C）水平，同时升高高密度脂蛋白胆固醇（HDL-C），显著降低心肌梗死和脑卒中风险。" },
      { type: "heading", text: "一、治疗目标" },
      { type: "list", items: [
        "原发性高胆固醇血症及混合型血脂异常",
        "心血管疾病高风险患者（糖尿病、高血压、吸烟等）的一级预防",
        "已发生心肌梗死或脑卒中患者的二级预防",
        "家族性高胆固醇血症（需更高剂量，遵专科医生指导）",
      ]},
      { type: "heading", text: "二、正确服用方法" },
      { type: "numbered", items: [
        "每日固定时间（建议睡前 21:00）口服一片，不受饮食影响",
        "整片吞服，不可掰开或咀嚼，用水送服",
        "本药为长期用药，不可擅自停药，即使感觉良好也须坚持",
        "漏服时：若距下次服药时间尚早，立即补服；若时间已近，则跳过本次",
        "定期（每 3～6 个月）复查血脂、肝功能、肌酸激酶（CK）",
      ]},
      { type: "tip", text: "💡 生活配合：药物治疗需配合低脂饮食（减少动物内脏、油炸食品摄入）、规律运动、戒烟戒酒，才能取得最佳降脂效果。" },
      { type: "heading", text: "三、不良反应监测" },
      { type: "list", items: [
        "肌肉症状：肌肉疼痛或无力（肌病），严重时为横纹肌溶解症（罕见但危险）",
        "肝脏影响：转氨酶升高（多为轻度可逆），需定期监测",
        "血糖影响：长期使用可能轻度升高血糖，糖尿病患者需加强监测",
        "常见：头痛、腹痛、恶心、便秘（多为轻度）",
      ]},
      { type: "warning", text: "⚠️ 出现肌肉疼痛、无力或尿液变为深褐色，应立即停药并就医——这可能是横纹肌溶解症的早期信号。同时，大量饮用葡萄柚汁会升高血药浓度，增加副作用风险，请避免。" },
      { type: "heading", text: "四、储存方式" },
      { type: "info", text: "🌡️ 遮光密封，在阴凉处（温度 10～30°C）保存，远离儿童。本品有效期至 2027-02-10，库存充足，请按时服用。" },
    ],
  },

  4: {
    id: 4,
    name: "维生素C泡腾片",
    genericName: "Vitamin C Effervescent Tablets",
    category: "营养补充",
    type: "保健品",
    typeColor: "bg-amber-100 text-amber-700 border-amber-200",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-4.png",
    stock: 8,
    total: 10,
    unit: "片",
    expiry: "2026-08-20",
    dosage: "1片/次，每日1次",
    reminders: ["10:00"],
    manufacturer: "北京同仁堂科技发展股份有限公司",
    approvalNo: "国药准字H10940023",
    summary: "维生素C泡腾片是一种水溶性营养补充制剂，含维生素C（抗坏血酸）1000mg，适合抵抗力偏低、日常饮食摄入不足的人群补充使用。",
    highlights: [
      { icon: "🍋", label: "规格", value: "1000mg×10片/管", color: "bg-amber-50 border-amber-100 text-amber-700" },
      { icon: "🛒", label: "类型", value: "保健品·OTC", color: "bg-orange-50 border-orange-100 text-orange-700" },
      { icon: "☀️", label: "建议服用", value: "上午 10:00", color: "bg-yellow-50 border-yellow-100 text-yellow-700" },
      { icon: "📅", label: "有效期至", value: "2026-08-20", color: "bg-rose-50 border-rose-100 text-rose-700" },
    ],
    content: [
      { type: "paragraph", text: "维生素C（抗坏血酸）是人体必需的水溶性维生素，参与胶原蛋白合成、免疫功能调节、铁的吸收以及抗氧化防御等多项重要生理过程。本品以泡腾片形式呈现，口感清爽，吸收速度快，每片含维生素C 1000mg，满足成人每日推荐摄入量的约 10 倍。" },
      { type: "heading", text: "一、主要功效" },
      { type: "list", items: [
        "增强免疫力：促进白细胞功能，提高机体抗感染能力",
        "抗氧化：清除自由基，延缓细胞老化，保护心血管",
        "促进铁吸收：将三价铁还原为二价铁，提高非血红素铁吸收率",
        "皮肤健康：参与胶原蛋白合成，有助维持皮肤弹性",
        "缓解疲劳：补充因压力或体力消耗过多损耗的维生素C",
      ]},
      { type: "heading", text: "二、正确使用方法" },
      { type: "numbered", items: [
        "将 1 片泡腾片投入 150～200ml 温水（约 40°C）或凉水中",
        "等待完全溶解（约 1～2 分钟，水变橙黄色）后立即饮用",
        "建议在上午餐后服用，避免空腹大量摄入",
        "不可直接放入口中含服或干吞，以免刺激口腔黏膜",
        "开封后尽快用完，避免吸潮失效",
      ]},
      { type: "tip", text: "💡 饮食补充建议：日常可多食用猕猴桃、彩椒、西兰花、草莓等天然维生素C丰富的食物，效果更为持久温和，与本品形成互补。" },
      { type: "heading", text: "三、注意事项" },
      { type: "list", items: [
        "每日摄入不超过 2000mg（2片），长期超量可能导致肾结石",
        "肾功能不全、草酸钙肾结石患者应在医生指导下谨慎使用",
        "糖尿病患者注意：本品含蔗糖，建议选用无糖型规格",
        "勿与牛奶同服，钙会与维生素C相互影响吸收",
        "服用阿司匹林期间，大剂量维生素C可能降低其疗效",
      ]},
      { type: "warning", text: "⚠️ 库存提醒：当前库存仅剩 8 片，即将耗尽。同时请注意有效期为 2026-08-20，建议在有效期前尽快使用完毕并适时补充。" },
      { type: "heading", text: "四、储存方式" },
      { type: "info", text: "🌡️ 密封，阴凉干燥处保存，避免高温和潮湿。维生素C遇光、热、碱性物质易分解，开管后建议在铝膜盖紧后放入密封袋，并于 1 个月内用完。" },
    ],
  },
};

// ─── 内容块渲染 ────────────────────────────────────────────────────────────────
function renderBlock(
  block: { type: string; text?: string; items?: string[] },
  idx: number
) {
  switch (block.type) {
    case "paragraph":
      return <p key={idx} className="text-slate-600 leading-relaxed">{block.text}</p>;

    case "heading":
      return (
        <h3 key={idx} className="flex items-center gap-3 font-extrabold text-xl text-slate-900 mt-8 mb-2">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block shrink-0" />
          {block.text}
        </h3>
      );

    case "tip":
      return (
        <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
          <Lightbulb className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-700 leading-relaxed">{block.text}</p>
        </div>
      );

    case "warning":
      return (
        <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed">{block.text}</p>
        </div>
      );

    case "info":
      return (
        <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <Thermometer className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
        </div>
      );

    case "list":
      return (
        <ul key={idx} className="space-y-3">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol key={idx} className="space-y-3">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-sm text-slate-600">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );

    default:
      return null;
  }
}

// ─── 主组件 ────────────────────────────────────────────────────────────────────
export function MedicineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const medId = Number(id);
  const med = medicinesContent[medId];

  const [stock, setStock]               = useState(med?.stock ?? 0);
  const [refillStep, setRefillStep]     = useState<"idle" | "confirm">("idle");
  const [bookmarked, setBookmarked]     = useState(false);

  if (!med) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <Pill className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">药品不存在</h2>
        <p className="text-slate-400">该药品可能已从药箱移出或链接有误</p>
        <Button onClick={() => navigate("/dashboard/medicine-box")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-8 font-bold">
          返回药箱
        </Button>
      </div>
    );
  }

  const stockPct       = Math.round((stock / med.total) * 100);
  const isLow          = stock < 10;
  const isNearExpiry   = new Date(med.expiry) < new Date("2026-08-01");

  const handleRefill = () => {
    toast.success(`${med.name} 的补充订单已提交！药房将尽快配送至您的住址。`);
    setRefillStep("idle");
    localStorage.setItem("orderStatus", "delivering");
    window.dispatchEvent(new Event("orderStatusUpdate"));
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto pb-20"
    >
      {/* 返回按钮 */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/medicine-box")}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold">返回药箱</span>
        </button>
      </div>

      {/* Hero 图片区 */}
      <div className="relative w-full h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-slate-300/40">
        <ImageWithFallback
          src={med.image}
          alt={med.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* 徽章 */}
        <div className="absolute top-5 left-5 flex gap-2">
          <Badge className={`border font-extrabold ${med.typeColor}`}>{med.type}</Badge>
          {isLow && (
            <Badge className="bg-rose-500 text-white border-none font-extrabold animate-pulse">
              库存告急
            </Badge>
          )}
        </div>

        {/* 底部信息 */}
        <div className="absolute bottom-6 left-7 right-7 text-white">
          <p className="text-indigo-200 text-xs font-extrabold uppercase tracking-widest mb-1">
            {med.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">{med.name}</h1>
          <p className="text-white/60 text-sm font-medium">{med.genericName}</p>
        </div>
      </div>

      {/* 主体：正文 + 侧栏 */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* ── 左：详情正文 ────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* 亮点标签 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {med.highlights.map((h) => (
              <div key={h.label} className={`p-3 rounded-2xl border text-center ${h.color}`}>
                <p className="text-lg mb-0.5">{h.icon}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">{h.label}</p>
                <p className="text-sm font-extrabold mt-0.5">{h.value}</p>
              </div>
            ))}
          </div>

          {/* 摘要 */}
          <Card className="p-6 rounded-[2.5rem] border-slate-200/50 bg-gradient-to-br from-indigo-50/60 to-white">
            <p className="text-slate-700 leading-relaxed">{med.summary}</p>
          </Card>

          {/* 正文 */}
          <Card className="p-8 rounded-[2.5rem] border-slate-200/50 space-y-5">
            {med.content.map((block, idx) => renderBlock(block, idx))}
          </Card>

          {/* 生产信息 */}
          <Card className="p-6 rounded-[2.5rem] border-slate-200/50">
            <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400" />
              药品信息
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "生产厂家", value: med.manufacturer },
                { label: "批准文号", value: med.approvalNo },
                { label: "有效期至", value: med.expiry },
                { label: "用法用量", value: med.dosage },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 右：库存 + 提醒 + 操作 ──────────────────────────────────── */}
        <div className="space-y-5 lg:sticky lg:top-24">

          {/* 库存卡 */}
          <Card className="p-6 rounded-[2.5rem] border-slate-200/50 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-700">库存状态</span>
              <span className={`text-2xl font-extrabold tracking-tighter ${isLow ? "text-rose-500" : "text-indigo-600"}`}>
                {stock}
                <span className="text-sm text-slate-400 font-bold ml-1">{med.unit}</span>
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                <span>剩余 {stock} {med.unit}</span>
                <span>满额 {med.total} {med.unit}</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    stockPct <= 30 ? "bg-rose-500" : stockPct <= 60 ? "bg-amber-500" : "bg-indigo-600"
                  }`}
                />
              </div>
            </div>

            {isNearExpiry && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <p className="text-xs font-bold text-amber-700">有效期即将到期，请尽快使用</p>
              </div>
            )}

            {/* 极速补药 */}
            <AnimatePresence mode="wait">
              {refillStep === "idle" ? (
                <Motion.div key="refill-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    onClick={() => setRefillStep("confirm")}
                    className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    极速补药
                  </Button>
                </Motion.div>
              ) : (
                <Motion.div
                  key="refill-confirm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-2">
                    <p className="text-xs font-extrabold text-indigo-700 uppercase tracking-widest">确认补充</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold">药品</span>
                      <span className="font-extrabold text-slate-800">{med.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold">预计金额</span>
                      <span className="font-extrabold text-slate-800">¥ 45.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold">配送地址</span>
                      <span className="font-extrabold text-slate-800">12号楼 201室</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setRefillStep("idle")}
                      className="rounded-2xl font-bold border-slate-200 h-11"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleRefill}
                      className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold h-11"
                    >
                      确认下单
                    </Button>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="outline"
              onClick={() => toast.info("用药历史记录功能开发中...")}
              className="w-full h-11 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
            >
              <History className="w-4 h-4 mr-2" />
              历史日志
            </Button>
          </Card>

          {/* 服药提醒 */}
          <Card className="p-6 rounded-[2.5rem] border-slate-200/50 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-indigo-400" />
              <h4 className="font-extrabold text-slate-900">服药提醒</h4>
            </div>
            <p className="text-sm font-bold text-slate-500">{med.dosage}</p>
            {med.reminders.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {med.reminders.map((time) => (
                  <div key={time} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-sm font-extrabold text-indigo-700">{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-bold">暂未开启提醒</p>
                <button
                  onClick={() => toast.info("提醒设置功能开发中...")}
                  className="mt-2 text-xs font-extrabold text-indigo-500 hover:text-indigo-700 flex items-center gap-1 mx-auto"
                >
                  <Bell className="w-3 h-3" />
                  添加提醒
                </button>
              </div>
            )}
          </Card>

          {/* 移出药箱 */}
          <button
            onClick={() => toast.error("确定移出药箱？此操作不可撤销", { action: { label: "确认移出", onClick: () => navigate("/dashboard/medicine-box") } })}
            className="w-full flex items-center justify-center gap-2 text-xs text-rose-400 font-extrabold hover:text-rose-600 transition-colors py-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            从药箱中移出
          </button>
        </div>
      </div>
    </Motion.div>
  );
}
