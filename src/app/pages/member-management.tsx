import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { toast } from "sonner";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  CreditCard,
  Heart,
  Baby,
  User,
  Activity,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { Badge } from "../components/ui/badge";

const familyMembers = [
  {
    id: 1,
    name: "王建国 (我)",
    relation: "本人",
    age: 65,
    phone: "138-0000-0001",
    healthStatus: "正常",
    lastCheckup: "2026-03-15",
    avatar: "W",
    color: "bg-indigo-600"
  },
  {
    id: 2,
    name: "林淑芬",
    relation: "配偶",
    age: 62,
    phone: "138-0000-0002",
    healthStatus: "需关注",
    lastCheckup: "2026-02-20",
    avatar: "L",
    color: "bg-emerald-600"
  },
  {
    id: 3,
    name: "王小明",
    relation: "孙子",
    age: 8,
    phone: "-",
    healthStatus: "良好",
    lastCheckup: "2026-01-10",
    avatar: "M",
    color: "bg-amber-600"
  },
];

const memberBenefits = [
  { title: "免费体检", desc: "每年享受一次全套深度体检", status: "可用", icon: Activity, color: "text-indigo-600 bg-indigo-50" },
  { title: "优先挂号", desc: "社区卫生站预约免排队", status: "生效中", icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
  { title: "健康讲座", desc: "无限次参加线下健康沙龙", status: "生效中", icon: Award, color: "text-amber-600 bg-amber-50" },
  { title: "药品折扣", desc: "指定常用药 8.5 折优惠", status: "生效中", icon: Heart, color: "text-rose-600 bg-rose-50" },
];

export function MemberManagementPage() {
  const [selectedTab, setSelectedTab] = useState("family");
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("家庭成员添加申请已提交，请等待系统核实。");
    setIsAddFamilyOpen(false);
  };

  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            家庭中心
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1.5">管理个人档案与家属健康权益</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl h-12 border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
            <CreditCard className="w-4 h-4 mr-2" />
            电子会员卡
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-6 font-bold shadow-xl shadow-indigo-200 transition-all" onClick={() => setIsAddFamilyOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            添加成员
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        {/* 会员卡片预览与提醒 - Top Section */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 relative h-64 w-full rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl overflow-hidden group border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <ShieldCheck className="w-20 h-20 text-indigo-400" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-400">Premium Member</span>
                    <Badge className="bg-amber-500 text-slate-900 border-none text-[10px] font-black h-5">GOLD</Badge>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tighter">王建国</h2>
                </div>
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              
              <div className="space-y-6">
                <p className="font-mono text-xl tracking-[0.3em] opacity-90">6225 **** 8899</p>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">Healthy Points</p>
                    <p className="text-lg font-extrabold tracking-tight">1,250 <span className="text-xs opacity-50 font-bold">PTS</span></p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">Valid Thru</p>
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
            className="lg:col-span-2 h-64 p-8 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl group-hover:bg-indigo-200/40 transition-all" />
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                <Heart className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                  专属守护提醒
                </div>
                <h4 className="font-extrabold text-indigo-900 text-xl tracking-tight">您有一项待领取的家属权益</h4>
                <p className="text-sm text-indigo-700/70 leading-relaxed font-medium max-w-lg">
                  本月您还享有 <span className="font-black text-indigo-900">1 次“家庭医生上门咨询”</span> 权益未行使。点击下方按钮可立即为家属预约专业医疗服务。
                </p>
                <Button variant="link" className="p-0 h-auto text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/link hover:no-underline mt-2">
                  立即预约咨询 <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Motion.div>
        </div>

        {/* 成员列表与权益中心 - Bottom Section */}
        <div className="space-y-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-fit mb-8">
              <TabsTrigger value="family" className="rounded-xl px-8 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <Users className="w-4 h-4 mr-2" />
                成员列表
              </TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-xl px-8 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
                <Award className="w-4 h-4 mr-2" />
                权益中心
              </TabsTrigger>
            </TabsList>

            <TabsContent value="family" className="space-y-8 outline-none">
              <div className="grid md:grid-cols-2 gap-6">
                {familyMembers.map((member, i) => (
                  <Motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-8 border-slate-200/50 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group overflow-hidden relative rounded-[2.5rem] bg-white">
                      <div className="flex items-start gap-5 mb-8 relative z-10">
                        <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform`}>
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">{member.name}</h3>
                            <Badge className="bg-indigo-50 text-indigo-600 border-none font-extrabold text-[9px] px-2 h-5 rounded-md">{member.relation}</Badge>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{member.age} YEARS · {member.phone}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-slate-400 uppercase tracking-widest text-[10px]">健康状态</span>
                          <span className={`px-3 py-1 rounded-lg ${member.healthStatus === '正常' || member.healthStatus === '良好' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {member.healthStatus}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-slate-400 uppercase tracking-widest text-[10px]">最近体检</span>
                          <span className="text-slate-900">{member.lastCheckup}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 relative z-10">
                        <Button variant="outline" className="flex-1 h-11 text-xs font-extrabold border-slate-200 hover:bg-slate-50 rounded-xl transition-all">
                          查看档案
                        </Button>
                        <Button className="flex-1 h-11 text-xs font-extrabold bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white border-none shadow-none rounded-xl transition-all">
                          健康建议
                        </Button>
                      </div>
                    </Card>
                  </Motion.div>
                ))}
                
                <button 
                  onClick={() => setIsAddFamilyOpen(true)}
                  className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group h-full min-h-[280px]"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <p className="font-extrabold text-sm tracking-tight">添加新的家庭成员</p>
                  <p className="text-[10px] mt-2 font-bold uppercase tracking-widest opacity-60">共享社区健康守护服务</p>
                </button>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-8 outline-none">
              <div className="grid md:grid-cols-2 gap-6">
                {memberBenefits.map((benefit, i) => (
                  <Motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-8 border-slate-200/50 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all rounded-[2.5rem] bg-white group h-full flex flex-col">
                      <div className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                        <benefit.icon className="w-7 h-7" />
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">{benefit.title}</h3>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none font-extrabold text-[9px] px-2 h-5 rounded-md">
                          {benefit.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">{benefit.desc}</p>
                      <Button variant="link" className="p-0 h-auto mt-6 text-[11px] text-indigo-600 font-extrabold uppercase tracking-widest hover:no-underline flex items-center gap-2 group/btn">
                        立即使用
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Card>
                  </Motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 添加家属对话框 */}
      <Dialog open={isAddFamilyOpen} onOpenChange={setIsAddFamilyOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-indigo-600 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <DialogTitle className="text-3xl font-extrabold tracking-tight mb-3">添加家庭成员</DialogTitle>
            <DialogDescription className="text-indigo-100 font-medium opacity-90 leading-relaxed">
              添加后，您可以代家属进行预约、查看健康周报，并共享全部会员尊享服务。
            </DialogDescription>
          </div>
          <form onSubmit={handleAddFamily} className="p-10 space-y-8 bg-white">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">真实姓名</label>
                <Input placeholder="姓名" className="rounded-2xl border-slate-200 h-14 font-bold bg-slate-50/50 focus:bg-white transition-all shadow-sm" required />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">与您的关系</label>
                <select className="w-full h-14 px-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none shadow-sm">
                  <option>配偶</option>
                  <option>子女</option>
                  <option>父母</option>
                  <option>其他</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">联系电话</label>
              <Input placeholder="138-0000-0000" className="rounded-2xl border-slate-200 h-14 font-bold bg-slate-50/50 shadow-sm" required />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">身份证号 (用于同步病历)</label>
              <Input placeholder="请输入证件号" className="rounded-2xl border-slate-200 h-14 font-bold bg-slate-50/50 shadow-sm" required />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="ghost" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => setIsAddFamilyOpen(false)}>
                取消
              </Button>
              <Button type="submit" className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-xl shadow-indigo-100">
                提交同步申请
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
