import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion as Motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Phone,
  Star,
  Heart,
  Mic,
  BookOpen,
  Lightbulb,
  ListChecks,
  Smartphone,
  Brush,
  Building2,
  Users2,
} from "lucide-react";

// ─── 活动完整数据 ─────────────────────────────────────────────────────────────
const activitiesContent: Record<
  number,
  {
    id: number;
    title: string;
    category: string;
    categoryColor: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    contact: string;
    participants: number;
    maxParticipants: number;
    status: string;
    image: string;
    summary: string;
    isJoined: boolean;
    attendees: string[];
    content: {
      type: "paragraph" | "heading" | "tip" | "warning" | "list" | "numbered" | "schedule";
      text?: string;
      items?: string[];
    }[];
    speakers?: { name: string; title: string; avatar: string }[];
    highlights: string[];
  }
> = {
  1: {
    id: 1,
    title: "春季心血管健康公益讲座",
    category: "健康讲座",
    categoryColor: "bg-rose-50 text-rose-600 border-rose-100",
    date: "2026-04-10",
    time: "14:00 - 16:00",
    location: "社区活动中心 2楼多功能厅",
    organizer: "市第一人民医院 心内科",
    contact: "138-1000-2233",
    participants: 45,
    maxParticipants: 60,
    status: "进行中",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-1.png",
    summary: "本讲座特邀市医院专家，针对春季气候变化对老年人心血管系统的影响进行深度解析，并提供日常保养与饮食建议。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
      "https://i.pravatar.cc/150?u=4",
    ],
    highlights: ["专家现场答疑", "免费血压检测", "健康手册赠送", "积分奖励"],
    speakers: [
      { name: "陈建华", title: "心血管内科主任医师 · 从医 22 年", avatar: "https://i.pravatar.cc/150?u=101" },
      { name: "林晓燕", title: "心内科副主任 · 擅长老年心脏病", avatar: "https://i.pravatar.cc/150?u=102" },
    ],
    content: [
      {
        type: "paragraph",
        text: "春季是心血管疾病的高发季节，气温忽冷忽热导致血管频繁收缩舒张，对老年人心脏造成较大负担。本次公益讲座由市第一人民医院心内科权威专家团队主讲，专为社区长者量身定制，内容通俗易懂，实用性强。",
      },
      {
        type: "heading",
        text: "一、讲座主要内容",
      },
      {
        type: "numbered",
        items: [
          "春季心血管风险因素解析：为何春天更危险？",
          "血压、心率的家庭自我监测方法与注意事项",
          "心脏病发作的早期预警信号识别与应急处理",
          "适合老年人的春季日常运动与饮食调节方案",
          "常见心血管药物的正确服用时机与禁忌事项",
        ],
      },
      {
        type: "heading",
        text: "二、活动现场安排",
      },
      {
        type: "schedule",
        items: [
          "14:00 — 签到入场，免费发放《心脏守护手册》",
          "14:10 — 专题一：陈建华主任主讲心血管风险与预防",
          "14:50 — 专题二：林晓燕医生主讲药物管理与饮食",
          "15:30 — 开放问答环节，专家现场解答居民问题",
          "15:50 — 现场免费血压与心率检测服务",
          "16:00 — 活动结束，积分签到领取小礼品",
        ],
      },
      {
        type: "tip",
        text: "💡 小贴士：如您有近期检查报告或正在服用的药物清单，欢迎携带至现场，专家可为您提供个性化建议。",
      },
      {
        type: "heading",
        text: "三、参与须知",
      },
      {
        type: "list",
        items: [
          "活动面向全体社区居民，免费参与，欢迎家属陪同",
          "请携带社区居民卡或健康码以便签到",
          "讲座现场提供舒适座椅，请提前 10 分钟入场落座",
          "如需取消参与，请提前在系统中操作，以便将名额开放给其他居民",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 温馨提示：本次活动名额有限（60人），请尽早报名。如身体不适，请以休息为优先，无需勉强出席。",
      },
    ],
  },

  2: {
    id: 2,
    title: "\u201c夕阳红\u201d书画艺术交流展",
    category: "文体娱乐",
    categoryColor: "bg-amber-50 text-amber-600 border-amber-100",
    date: "2026-04-12",
    time: "09:00 - 17:00",
    location: "社区文化广场 A区",
    organizer: "社区老年书画社",
    contact: "138-2000-3344",
    participants: 120,
    maxParticipants: 200,
    status: "预热中",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-2.png",
    summary: "展示社区长者们的精美书画作品，旨在弘扬传统文化，增进邻里感情，欢迎各位居民携家属参观。",
    isJoined: true,
    attendees: [
      "https://i.pravatar.cc/150?u=5",
      "https://i.pravatar.cc/150?u=6",
      "https://i.pravatar.cc/150?u=7",
    ],
    highlights: ["50+ 精品展品", "现场泼墨表演", "传统茶歇体验", "留影纪念"],
    speakers: [],
    content: [
      {
        type: "paragraph",
        text: "「夕阳红」书画艺术交流展是社区老年书画社的年度重磅活动，今年迎来第八届。本次展览汇集了社区 30 余位长者历时数月精心创作的 50 余件书法、国画、水彩及剪纸作品，每一件都凝聚着作者的心血与热情。",
      },
      {
        type: "heading",
        text: "一、展览亮点",
      },
      {
        type: "list",
        items: [
          "50+ 精选书画作品，涵盖楷书、行书、山水、花鸟等多种风格",
          "「现场泼墨」表演：资深书法家现场创作，展现传统书法之美",
          "互动创作区：居民可在指导下体验毛笔书写，感受笔墨纸砚的魅力",
          "传统茶歇区：配有香茗点心，边品茶边赏画，悠享文化下午",
          "优秀作品评选，参观者可投票选出心目中的「最美作品」",
        ],
      },
      {
        type: "heading",
        text: "二、展览时间与分区",
      },
      {
        type: "schedule",
        items: [
          "09:00 — 开幕式暨书法现场表演（约 30 分钟）",
          "09:30 — 展览正式开放，分东西两区自由参观",
          "10:30 — 互动创作体验区开放（每次约 15 分钟）",
          "14:00 — 下午场特别表演：剪纸艺术演示",
          "15:30 — 观众投票截止，公布「最美作品」评选结果",
          "17:00 — 活动圆满结束",
        ],
      },
      {
        type: "tip",
        text: "💡 展览免费对外开放，欢迎携带家中小朋友一同参观，让传统文化在家庭间传承。",
      },
      {
        type: "heading",
        text: "三、投稿参展说明",
      },
      {
        type: "paragraph",
        text: "如您有意将本人书画作品纳入本次展览，仍有少量参展名额，请于 4 月 8 日前将作品（宣纸或裱框均可）送至社区居委会二楼书画社办公室，工作人员将协助完成登记。",
      },
      {
        type: "warning",
        text: "⚠️ 天气提示：活动设于室外广场，请留意当日天气，携带遮阳帽或雨具，如遇极端天气将临时调整至室内场地。",
      },
    ],
  },

  3: {
    id: 3,
    title: "社区适老化设施改造意见征集会",
    category: "志愿服务",
    categoryColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    date: "2026-04-15",
    time: "10:00 - 11:30",
    location: "居委会会议室",
    organizer: "社区居委会",
    contact: "138-3000-4455",
    participants: 18,
    maxParticipants: 30,
    status: "火热报名",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-4.png",
    summary: "诚邀社区长者参与讨论如何优化小区无障碍设施，您的每一条建议都是我们改进社区环境的重要动力。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=8",
      "https://i.pravatar.cc/150?u=9",
    ],
    highlights: ["意见直达政策", "专业设计师参与", "有偿调研补贴", "优先施工落实"],
    speakers: [
      { name: "赵丽萍", title: "社区居委会主任 · 从事社区工作 15 年", avatar: "https://i.pravatar.cc/150?u=103" },
      { name: "吴国栋", title: "城市无障碍规划设计师", avatar: "https://i.pravatar.cc/150?u=104" },
    ],
    content: [
      {
        type: "paragraph",
        text: "随着社区老龄化程度不断加深，提升小区适老化水平已列为今年社区改造工作的重点议题。本次意见征集会由居委会主办，携手专业无障碍规划设计团队，诚邀社区长者、残障居民及家属代表，共同讨论当前小区设施的不足之处及改造方向。",
      },
      {
        type: "heading",
        text: "一、征集改造的重点领域",
      },
      {
        type: "list",
        items: [
          "出入口与坡道：楼道入口台阶改坡道、防滑处理与扶手加装",
          "电梯与楼道：低楼层加装电梯可行性评估、楼道照明与扶手",
          "公共卫生间：无障碍厕位改造、防滑地面与呼叫铃设置",
          "绿化与步道：园区步道硬化、防滑地砖、夜间照明路灯",
          "停车与快递：老年专属停车位划定、快递存取便利化",
          "医疗配套：AED 急救设备点位扩充、急救指引标识优化",
        ],
      },
      {
        type: "heading",
        text: "二、会议议程",
      },
      {
        type: "schedule",
        items: [
          "10:00 — 居委会主任致辞，介绍本次改造背景与预算规划",
          "10:15 — 设计师讲解国内外优秀适老化社区案例",
          "10:40 — 分组讨论：居民分区域反映现有设施问题",
          "11:10 — 汇总反馈，设计师现场回应改造可行性",
          "11:25 — 会议总结，公布意见收集渠道与时间节点",
          "11:30 — 结束，参与居民领取参与补贴（50元电子购物券）",
        ],
      },
      {
        type: "tip",
        text: "💡 您的每一条意见都将被完整记录，纳入正式改造方案。预计 6 月底前公示最终方案，年内启动施工。",
      },
      {
        type: "heading",
        text: "三、参与资格与补贴说明",
      },
      {
        type: "paragraph",
        text: "本次会议面向全体在册社区居民，优先邀请 60 岁以上长者及行动不便居民。每位参与完整全程的居民，将在活动结束时领取 50 元社区电子购物券作为参与补贴，以感谢您对社区建设的贡献。",
      },
      {
        type: "warning",
        text: "⚠️ 名额提示：会议室座位有限，仅接受 30 人参与，目前已有 18 人报名，请尽快确认参与意向。",
      },
    ],
  },

  4: {
    id: 4,
    title: "智能手机应用基础培训班 (第二期)",
    category: "长者教育",
    categoryColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    date: "2026-04-18",
    time: "14:30 - 16:00",
    location: "社区智慧教室",
    organizer: "青年志愿者协会",
    contact: "138-4000-5566",
    participants: 25,
    maxParticipants: 25,
    status: "已满员",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-5.png",
    summary: "手把手教您使用微信、支付、地图导航及在线问诊等实用功能，让长者们紧跟时代步伐，享受数字化便利。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=10",
      "https://i.pravatar.cc/150?u=11",
      "https://i.pravatar.cc/150?u=12",
    ],
    highlights: ["一对一辅导", "课后笔记赠送", "免费手机支架", "第三期优先名额"],
    speakers: [
      { name: "张浩然", title: "青年志愿者队长 · 数字素养推广员", avatar: "https://i.pravatar.cc/150?u=105" },
      { name: "刘梦琪", title: "互联网产品工程师 · 志愿讲师", avatar: "https://i.pravatar.cc/150?u=106" },
    ],
    content: [
      {
        type: "paragraph",
        text: "本次培训班为第二期，第一期参与的 20 位长者反馈热烈，平均满意度达 4.9 分（满分 5 分）。本期继续由青年志愿者协会联合社区智慧教室举办，每位学员将配备一名志愿者进行一对一现场辅导，确保每位长者都能真正学会并用起来。",
      },
      {
        type: "heading",
        text: "一、本期培训内容",
      },
      {
        type: "numbered",
        items: [
          "微信基础操作：发消息、语音通话、视频聊天与朋友圈",
          "移动支付入门：微信支付/支付宝绑卡、扫码付款与安全设置",
          "地图导航使用：查公交路线、步行导航与打车叫车",
          "在线问诊操作：社区医疗 App 预约挂号与远程问诊全流程",
          "防诈骗知识：识别常见电信诈骗、安全设置密码与隐私保护",
        ],
      },
      {
        type: "heading",
        text: "二、课程时间安排",
      },
      {
        type: "schedule",
        items: [
          "14:30 — 签到，志愿者与学员一对一配对，检查手机状态",
          "14:40 — 微信与视频通话操作实练（20 分钟）",
          "15:00 — 移动支付与扫码操作实练（20 分钟）",
          "15:20 — 地图导航与叫车应用实练（15 分钟）",
          "15:35 — 在线问诊 App 操作演示与实练（15 分钟）",
          "15:50 — 防诈骗要点讲解，答疑与课后笔记发放",
          "16:00 — 结课，发放纪念品与第三期优先报名码",
        ],
      },
      {
        type: "tip",
        text: "💡 请携带您本人的手机参加培训，并提前确保手机电量充足（或携带充电宝）。如有眼镜请记得携带。",
      },
      {
        type: "heading",
        text: "三、学员须知",
      },
      {
        type: "list",
        items: [
          "本期已全部满员，候补名单将优先获得第三期报名资格",
          "培训结束后提供图文版课后笔记，可打印带回家复习",
          "如课后遇到操作问题，可加入班级微信群，志愿者继续在线答疑",
          "每位学员课��将收到操作练习视频，方便反复学习",
        ],
      },
      {
        type: "warning",
        text: "⚠️ 本期名额已满。您可点击下方按钮加入候补名单，一旦有人取消将第一时间通知您。",
      },
    ],
  },
};

// ─── 内容渲染 ──────────────────────────────────────────────────────────────────
function renderBlock(
  block: { type: string; text?: string; items?: string[] },
  idx: number
) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="text-slate-600 leading-relaxed">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h3
          key={idx}
          className="flex items-center gap-3 font-extrabold text-xl text-slate-900 mt-8 mb-2"
        >
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block shrink-0" />
          {block.text}
        </h3>
      );
    case "tip":
      return (
        <div
          key={idx}
          className="flex gap-4 p-5 rounded-2xl bg-indigo-50 border border-indigo-100"
        >
          <Lightbulb className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-700 leading-relaxed">{block.text}</p>
        </div>
      );
    case "warning":
      return (
        <div
          key={idx}
          className="flex gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200"
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed">{block.text}</p>
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
    case "schedule":
      return (
        <div key={idx} className="space-y-2">
          {block.items?.map((item, i) => {
            const [time, ...rest] = item.split("—");
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors"
              >
                <span className="text-xs font-extrabold text-indigo-600 whitespace-nowrap mt-0.5 min-w-[52px]">
                  {time.trim()}
                </span>
                <span className="w-px h-full min-h-[1rem] bg-slate-200 shrink-0" />
                <span className="text-sm text-slate-600 leading-relaxed">
                  {rest.join("—").trim()}
                </span>
              </div>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}

// ─── 主组件 ────────────────────────────────────────────────────────────────────
export function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activityId = Number(id);
  const activity = activitiesContent[activityId];

  const [isJoined, setIsJoined] = useState(activity?.isJoined ?? false);
  const [participants, setParticipants] = useState(activity?.participants ?? 0);
  const [bookmarked, setBookmarked] = useState(false);

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <Info className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">活动不存在</h2>
        <p className="text-slate-400">该活动可能已下线或链接有误</p>
        <Button
          onClick={() => navigate("/dashboard/community-activities")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-8 font-bold"
        >
          返回活动列表
        </Button>
      </div>
    );
  }

  const isFull = activity.status === "已满员";
  const progressPct = Math.round((participants / activity.maxParticipants) * 100);

  const handleJoin = () => {
    if (isFull && !isJoined) return;
    if (isJoined) {
      setIsJoined(false);
      setParticipants((p) => p - 1);
      toast.success("已取消报名");
    } else {
      setIsJoined(true);
      setParticipants((p) => p + 1);
      toast.success("报名成功！记得按时参加哦~");
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto pb-20 space-y-0"
    >
      {/* ── 返回按钮 ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/community-activities")}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold">返回活动列表</span>
        </button>
      </div>

      {/* ── Hero 图片区 ────────────────────────────────────────────────────── */}
      <div className="relative w-full h-72 md:h-96 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-slate-300/40">
        <ImageWithFallback
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* 右上角操作 */}
        <div className="absolute top-5 right-5 flex gap-2">
          <button
            onClick={() => toast.info("分享功能开发中...")}
            className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all border border-white/20 flex items-center justify-center"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setBookmarked(!bookmarked);
              toast.success(bookmarked ? "已取消收藏" : "收藏成功！");
            }}
            className={`w-10 h-10 rounded-xl backdrop-blur-md transition-all border flex items-center justify-center ${
              bookmarked
                ? "bg-amber-400 text-white border-amber-300"
                : "bg-white/15 text-white border-white/20 hover:bg-white/30"
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* 底部文字 */}
        <div className="absolute bottom-7 left-8 right-8 text-white">
          <Badge className={`mb-3 border ${activity.categoryColor} font-extrabold`}>
            {activity.category}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug mb-3">
            {activity.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold opacity-90">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-300" />
              {activity.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-300" />
              {activity.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-300" />
              {activity.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── 主体内容 + 侧边栏 ─────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* 左：详情正文 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 摘要 */}
          <Card className="p-7 rounded-[2.5rem] border-slate-200/50 bg-gradient-to-br from-indigo-50/60 to-white">
            <p className="text-slate-700 leading-relaxed">{activity.summary}</p>
          </Card>

          {/* 亮点标签 */}
          <div className="flex flex-wrap gap-2">
            {activity.highlights.map((h) => (
              <span
                key={h}
                className="px-4 py-1.5 bg-indigo-600/10 text-indigo-700 text-xs font-extrabold rounded-full border border-indigo-200/60"
              >
                ✦ {h}
              </span>
            ))}
          </div>

          {/* 正文块 */}
          <Card className="p-8 rounded-[2.5rem] border-slate-200/50 space-y-5">
            {activity.content.map((block, idx) => renderBlock(block, idx))}
          </Card>

          {/* 主讲嘉宾 */}
          {activity.speakers && activity.speakers.length > 0 && (
            <Card className="p-8 rounded-[2.5rem] border-slate-200/50">
              <h3 className="flex items-center gap-3 font-extrabold text-xl text-slate-900 mb-5">
                <Mic className="w-5 h-5 text-indigo-500" />
                主讲嘉宾
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {activity.speakers.map((sp) => (
                  <div
                    key={sp.name}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors"
                  >
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900">{sp.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">{sp.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* 右：信息卡 + 报名区 */}
        <div className="space-y-5 lg:sticky lg:top-24">
          {/* 报名进度 */}
          <Card className="p-7 rounded-[2.5rem] border-slate-200/50 space-y-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-extrabold text-slate-700">报名进度</span>
              <Badge
                className={`border-none font-extrabold text-[10px] ${
                  isFull
                    ? "bg-slate-100 text-slate-400"
                    : activity.status === "火热报名"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {activity.status}
              </Badge>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                <span>{participants} 人已报名</span>
                <span>共 {activity.maxParticipants} 个名额</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    progressPct >= 100
                      ? "bg-slate-400"
                      : progressPct >= 80
                      ? "bg-amber-500"
                      : "bg-indigo-600"
                  }`}
                />
              </div>
            </div>

            {/* 参与者头像 */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {activity.attendees.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt="Attendee"
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-bold">
                已有 {participants} 位邻居加入
              </span>
            </div>

            {/* 报名按钮 */}
            <Button
              disabled={isFull && !isJoined}
              onClick={handleJoin}
              className={`w-full h-14 rounded-2xl font-extrabold text-base shadow-lg transition-all active:scale-95 ${
                isJoined
                  ? "bg-slate-100 text-slate-500 hover:bg-slate-200 shadow-none"
                  : isFull
                  ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
              }`}
            >
              {isJoined
                ? "取消我的报名"
                : isFull
                ? "加入候补名单"
                : "立即报名参加"}
            </Button>
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              报名后系统将同步至您的健康日程
            </p>
          </Card>

          {/* 活动信息 */}
          <Card className="p-7 rounded-[2.5rem] border-slate-200/50 space-y-4">
            <h4 className="font-extrabold text-slate-900 mb-4">活动信息</h4>
            {[
              { icon: Building2, label: "主办单位", value: activity.organizer },
              { icon: MapPin, label: "活动地点", value: activity.location },
              { icon: Calendar, label: "活动日期", value: activity.date },
              { icon: Clock, label: "活动时间", value: activity.time },
              { icon: Phone, label: "咨询电话", value: activity.contact },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Motion.div>
  );
}
