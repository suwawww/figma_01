import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { motion as Motion } from "motion/react";
import {
  Users,
  UserPlus,
  FileText,
  Activity,
  Bell,
  Calendar,
  Heart,
  Download,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Award,
  ArrowRight,
  Sparkles,
  Edit,
  User,
  Phone,
  Droplets,
  HeartPulse,
  Save,
  Camera,
} from "lucide-react";

// ─── 数据 ──────────────────────────────────────────────────────────────────────
const myRecords = [
  {
    id: 1,
    type: "年度体检报告",
    date: "2026-03-15",
    doctor: "李明华 医生",
    result: "正常",
    icon: FileText,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    type: "心电图检查",
    date: "2026-02-10",
    doctor: "张伟 医生",
    result: "窦性心律",
    icon: Activity,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: 3,
    type: "血常规",
    date: "2026-01-05",
    doctor: "陈静 医生",
    result: "正常",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const announcements = [
  {
    id: 1,
    title: "春季流感疫苗接种通知",
    desc: "社区卫生站已开放春季流感疫苗接种预约，建议 60 岁以上长者优先安排。",
    date: "2026-03-31",
    tag: "医疗服务",
    isNew: true,
    img: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/7-1.png",
  },
  {
    id: 2,
    title: "社区健康讲座：心血管养生",
    desc: "本周六下午 2:00 在社区活动中心二楼举办，主讲人为市医院特聘专家。",
    date: "2026-03-28",
    tag: "健康讲座",
    isNew: false,
    img: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/7-2.png",
  },
  {
    id: 3,
    title: "药房补货提醒",
    desc: "您常购的慢病药物已到货，请持处方到药房领取。",
    date: "2026-03-25",
    tag: "药品提醒",
    isNew: false,
    img: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/7-3.png",
  },
];

const familyMembers = [
  {
    id: 1,
    name: "王建国 (我)",
    relation: "本人",
    age: 65,
    phone: "138-0000-0001",
    healthStatus: "正常",
    lastCheckup: "2026-03-15",
    avatar: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/08.png",
    color: "bg-indigo-600",
  },
  {
    id: 2,
    name: "林淑芬",
    relation: "配偶",
    age: 62,
    phone: "138-0000-0002",
    healthStatus: "需关注",
    lastCheckup: "2026-02-20",
    avatar: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/07.png",
    color: "bg-emerald-600",
  },
  {
    id: 3,
    name: "王小明",
    relation: "孙子",
    age: 8,
    phone: "-",
    healthStatus: "良好",
    lastCheckup: "2026-01-10",
    avatar: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/10.png",
    color: "bg-amber-600",
  },
];

const memberBenefits = [
  { title: "免费体检", desc: "每年享受一次全套深度体检", status: "可用", icon: Activity, color: "text-indigo-600 bg-indigo-50" },
  { title: "优先挂号", desc: "社区卫生站预约免排队", status: "生效中", icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
  { title: "健康讲座", desc: "无限次参加线下健康沙龙", status: "生效中", icon: Award, color: "text-amber-600 bg-amber-50" },
  { title: "药品折扣", desc: "指定常用药 8.5 折优惠", status: "生效中", icon: Heart, color: "text-rose-600 bg-rose-50" },
];

// ─── 主组件 ────────────────────────────────────────────────────────────────────
export function AccountFamilyPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [recordsTab, setRecordsTab] = useState("records");
  const [familySubTab, setFamilySubTab] = useState("family");

  // 账号设置表单状态
  const [formName, setFormName] = useState("王建国");
  const [formAge, setFormAge] = useState("68");
  const [formGender, setFormGender] = useState("男");
  const [formBloodType, setFormBloodType] = useState("A型");
  const [formChronic, setFormChronic] = useState("高血压");
  const [formPhone, setFormPhone] = useState("138-0000-0001");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("个人信息已更新！");
  };

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("家庭成员添加申请已提交，请等待系统核实。");
    setIsAddFamilyOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            账号与家庭设置
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1.5">
            管理个人信息、健康档案与家庭成员
          </p>
        </div>
      </div>

      {/* 顶层 Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-fit">
          <TabsTrigger
            value="profile"
            className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
          >
            <User className="w-4 h-4 mr-2" />
            个人设置
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            健康档案
          </TabsTrigger>
          <TabsTrigger
            value="family"
            className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
          >
            <Users className="w-4 h-4 mr-2" />
            家庭中心
          </TabsTrigger>
        </TabsList>

        {/* ── 个人设置 ─────────────────────────────────────────────────────── */}
        <TabsContent value="profile" className="mt-6 outline-none">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左：头像卡片 */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <Card className="p-8 rounded-[2.5rem] border-slate-200/50 text-center relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-50 rounded-full" />
                <div className="relative z-10">
                  <div className="relative inline-block mb-5">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow-xl mx-auto">
                      <ImageWithFallback
                        src="https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/08.png"
                        alt="王建国"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => toast.info("头像更换功能开发中...")}
                      className="absolute bottom-0 right-0 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="font-extrabold text-xl text-slate-900 mb-1">{formName}</h2>
                  <p className="text-xs text-slate-400 font-bold mb-6">社区居民 · 健康会员</p>

                  {/* 健康小指标 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                      <HeartPulse className="w-5 h-5 text-rose-400 mx-auto mb-1.5" />
                      <p className="font-extrabold text-slate-900 text-sm">72 bpm</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">心率</p>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                      <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                      <p className="font-extrabold text-slate-900 text-sm">128/82</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">血压</p>
                    </div>
                  </div>

                  {/* 会员卡标识 */}
                  <div className="mt-5 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-2xl px-5 py-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-extrabold tracking-wide">GOLD 会员</span>
                    <Badge className="bg-amber-500 text-slate-900 border-none text-[9px] font-black">有效</Badge>
                  </div>
                </div>
              </Card>
            </Motion.div>

            {/* 右：编辑表单 */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="p-8 rounded-[2.5rem] border-slate-200/50">
                <h3 className="font-extrabold text-lg text-slate-900 mb-6 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-indigo-500" />
                  编辑个人信息
                </h3>
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        姓名
                      </label>
                      <Input
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        年龄
                      </label>
                      <Input
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        性别
                      </label>
                      <select
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value)}
                        className="w-full h-12 px-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option>男</option>
                        <option>女</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        血型
                      </label>
                      <select
                        value={formBloodType}
                        onChange={(e) => setFormBloodType(e.target.value)}
                        className="w-full h-12 px-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option>A型</option>
                        <option>B型</option>
                        <option>AB型</option>
                        <option>O型</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        慢性病史
                      </label>
                      <Input
                        value={formChronic}
                        onChange={(e) => setFormChronic(e.target.value)}
                        placeholder="如：高血压、糖尿病（无则填无）"
                        className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        联系电话
                      </label>
                      <Input
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-200 transition-all"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      保存修改
                    </Button>
                  </div>
                </form>
              </Card>
            </Motion.div>
          </div>
        </TabsContent>

        {/* ── 健康档案 ─────────────────────────────────────────────────────── */}
        <TabsContent value="health" className="mt-6 outline-none">
          <div className="flex items-center justify-between mb-6">
            <div />
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-10 px-6 font-bold shadow-lg shadow-indigo-200">
              <Calendar className="w-4 h-4 mr-2" />
              预约新检查
            </Button>
          </div>

          <Tabs value={recordsTab} onValueChange={setRecordsTab} className="w-full">
            <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-fit mb-6">
              <TabsTrigger value="records" className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <FileText className="w-4 h-4 mr-2" />
                我的档案
              </TabsTrigger>
              <TabsTrigger value="news" className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <Bell className="w-4 h-4 mr-2" />
                社区动态
              </TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="outline-none">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    <h2 className="font-extrabold text-xl text-slate-900">最近检查结果</h2>
                  </div>
                  <div className="grid gap-5">
                    {myRecords.map((record, i) => (
                      <Motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Card className="p-6 border-slate-200/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer rounded-[2rem]">
                          <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl ${record.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                              <record.icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-extrabold text-slate-900">{record.type}</h4>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{record.date}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-400">主检：{record.doctor}</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 border-none font-extrabold">
                              {record.result}
                            </Badge>
                            <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Card>
                      </Motion.div>
                    ))}
                  </div>

                  <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-white/50 hover:border-indigo-200 transition-all group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Download className="w-8 h-8 text-slate-300 group-hover:text-indigo-400" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 mb-2">历史纸质档案录入</h3>
                    <p className="text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
                      申请将过去的纸质病历进行数字化录入，为家庭医生提供更精准的参考。
                    </p>
                    <Button variant="outline" className="rounded-2xl border-indigo-100 text-indigo-600 font-extrabold hover:bg-indigo-600 hover:text-white transition-all">
                      提交申请
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    <h2 className="font-extrabold text-xl text-slate-900">健康趋势</h2>
                  </div>
                  <Card className="p-7 border-slate-200/50 rounded-[2.5rem]">
                    <div className="space-y-6">
                      {[
                        { label: "空腹血糖 (较上月)", bar: "65%", color: "bg-indigo-600", note: "↓ 0.2", noteColor: "text-emerald-600" },
                        { label: "平均心率", bar: "72%", color: "bg-indigo-400", note: "Stable", noteColor: "text-slate-400" },
                        { label: "BMI 指数", bar: "85%", color: "bg-amber-500", note: "↑ 0.5", noteColor: "text-amber-600" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between items-end mb-2">
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{item.label}</p>
                            <span className={`text-xs font-black ${item.noteColor}`}>{item.note}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <Motion.div
                              initial={{ width: 0 }}
                              animate={{ width: item.bar }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-7 border-none bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/20 rounded-full blur-3xl -mr-14 -mt-14" />
                    <h3 className="font-extrabold text-base mb-3 flex items-center gap-2 tracking-tight">
                      <Stethoscope className="w-4 h-4 text-indigo-400" />
                      私人医生点评
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                      "王先生，您的血糖控制有所好转，请继续清淡饮食，早起散步。下次复查建议四月中旬。"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs">李</div>
                      <div>
                        <p className="text-xs font-extrabold">李明华 医生</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Chief Physician</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news" className="outline-none">
              <div className="max-w-3xl space-y-5">
                {announcements.map((item, i) => (
                  <Motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="p-6 border-slate-200/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer relative overflow-hidden rounded-[2rem]">
                      {item.isNew && (
                        <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                          New
                        </div>
                      )}
                      <div className="flex gap-6 items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[10px] uppercase">
                              {item.tag}
                            </Badge>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                          </div>
                          <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                          <Button variant="link" className="p-0 h-auto mt-3 text-[11px] text-indigo-600 font-extrabold uppercase tracking-widest hover:no-underline flex items-center gap-1.5">
                            了解详情 <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="w-40 h-28 shrink-0 rounded-2xl overflow-hidden border border-slate-100">
                          <ImageWithFallback
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </Card>
                  </Motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ── 家庭中心 ─────────────────────────────────────────────────────── */}
        <TabsContent value="family" className="mt-6 outline-none">
          <div className="flex items-center justify-between mb-6">
            <div />
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-2xl h-10 border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                <CreditCard className="w-4 h-4 mr-2" />
                电子会员卡
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-10 px-5 font-bold shadow-lg shadow-indigo-200"
                onClick={() => setIsAddFamilyOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                添加成员
              </Button>
            </div>
          </div>

          {/* 会员卡 + 权益提醒 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-56 rounded-[2.5rem] bg-slate-900 p-7 text-white overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-7 opacity-20 group-hover:opacity-40 transition-opacity">
                <ShieldCheck className="w-16 h-16 text-indigo-400" />
              </div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-400">Premium Member</span>
                    <Badge className="bg-amber-500 text-slate-900 border-none text-[9px] font-black h-5">GOLD</Badge>
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">王建国</h2>
                </div>
                <div className="space-y-4">
                  <p className="font-mono text-lg tracking-[0.25em] opacity-90">6225 **** 8899</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">Healthy Points</p>
                      <p className="font-extrabold tracking-tight">1,250 <span className="text-xs opacity-50 font-bold">PTS</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">Valid Thru</p>
                      <p className="text-sm font-extrabold">12 / 2027</p>
                    </div>
                  </div>
                </div>
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 h-56 p-7 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-indigo-200/20 rounded-full blur-2xl group-hover:bg-indigo-200/40 transition-all" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-[1.5rem] bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                  <Heart className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-2">
                    专属守护提醒
                  </div>
                  <h4 className="font-extrabold text-indigo-900 text-lg tracking-tight mb-2">
                    您有一项待领取的家属权益
                  </h4>
                  <p className="text-sm text-indigo-700/70 leading-relaxed max-w-lg">
                    本月您还享有 <span className="font-black text-indigo-900">1 次"家庭医生上门咨询"</span> 权益未行使。点击下方按钮可立即为家属预约专业医疗服务。
                  </p>
                  <Button variant="link" className="p-0 h-auto text-indigo-600 font-black text-xs uppercase tracking-widest hover:no-underline flex items-center gap-2 mt-3">
                    立即预约咨询 <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* 成员列表 & 权益中心 */}
          <Tabs value={familySubTab} onValueChange={setFamilySubTab} className="w-full">
            <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-fit mb-6">
              <TabsTrigger value="family" className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <Users className="w-4 h-4 mr-2" />
                成员列表
              </TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-xl px-6 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <Award className="w-4 h-4 mr-2" />
                权益中心
              </TabsTrigger>
            </TabsList>

            <TabsContent value="family" className="outline-none">
              <div className="grid md:grid-cols-2 gap-5">
                {familyMembers.map((member, i) => (
                  <Motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="p-7 border-slate-200/50 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group rounded-[2.5rem]">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${member.color} overflow-hidden shadow-lg group-hover:scale-110 transition-transform`}>
                          <ImageWithFallback src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-extrabold text-slate-900">{member.name}</h3>
                            <Badge className="bg-indigo-50 text-indigo-600 border-none font-extrabold text-[9px]">{member.relation}</Badge>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{member.age} YEARS · {member.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">健康状态</span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-lg ${member.healthStatus === "正常" || member.healthStatus === "良好" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                            {member.healthStatus}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">最近体检</span>
                          <span className="text-xs font-bold text-slate-900">{member.lastCheckup}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 h-10 text-xs font-extrabold border-slate-200 rounded-xl">查看档案</Button>
                        <Button className="flex-1 h-10 text-xs font-extrabold bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border-none shadow-none rounded-xl transition-all">健康建议</Button>
                      </div>
                    </Card>
                  </Motion.div>
                ))}

                <button
                  onClick={() => setIsAddFamilyOpen(true)}
                  className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group min-h-[220px]"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-7 h-7" />
                  </div>
                  <p className="font-extrabold text-sm">添加新的家庭成员</p>
                  <p className="text-[10px] mt-1.5 font-bold uppercase tracking-widest opacity-60">共享社区健康守护服务</p>
                </button>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="outline-none">
              <div className="grid md:grid-cols-2 gap-5">
                {memberBenefits.map((benefit, i) => (
                  <Motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-7 border-slate-200/50 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all rounded-[2.5rem] group flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-2xl ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                        <benefit.icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-extrabold text-slate-900">{benefit.title}</h3>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none font-extrabold text-[9px]">{benefit.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">{benefit.desc}</p>
                      <Button variant="link" className="p-0 h-auto mt-5 text-[11px] text-indigo-600 font-extrabold uppercase tracking-widest hover:no-underline flex items-center gap-1.5">
                        立即使用 <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Card>
                  </Motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* 添加家属对话框 */}
      <Dialog open={isAddFamilyOpen} onOpenChange={setIsAddFamilyOpen}>
        <DialogContent className="sm:max-w-[520px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-indigo-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-3xl -mr-14 -mt-14" />
            <DialogTitle className="text-2xl font-extrabold mb-2">添加家庭成员</DialogTitle>
            <DialogDescription className="text-indigo-100 opacity-90 leading-relaxed">
              添加后，您可以代家属进行预约、查看健康周报，并共享全部会员尊享服务。
            </DialogDescription>
          </div>
          <form onSubmit={handleAddFamily} className="p-8 space-y-5 bg-white">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">真实姓名</label>
                <Input placeholder="姓名" className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">与您的关系</label>
                <select className="w-full h-12 px-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>配偶</option>
                  <option>子女</option>
                  <option>父母</option>
                  <option>其他</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">联系电话</label>
              <Input placeholder="138-0000-0000" className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">身份证号（用于同步病历）</label>
              <Input placeholder="请输入证件号" className="rounded-2xl border-slate-200 h-12 font-bold bg-slate-50/50" required />
            </div>
            <div className="flex gap-4 pt-3">
              <Button type="button" variant="ghost" className="flex-1 h-12 rounded-2xl font-bold" onClick={() => setIsAddFamilyOpen(false)}>取消</Button>
              <Button type="submit" className="flex-1 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-lg shadow-indigo-100">提交同步申请</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}