import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import {
  Activity,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  Clock,
  Heart,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Zap,
  Bell,
  MessageSquare,
  ClipboardList,
  Stethoscope,
  Pill,
  Smartphone,
  CheckCircle2,
  MoreVertical,
  Plus,
  User,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Badge } from "../components/ui/badge";

// AI Sphere Image
const AISphereImg = "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/ai-sphere.png";

const healthStats = [
  {
    title: "今日步数",
    value: "8,432",
    target: "10,000",
    unit: "步",
    icon: Activity,
    color: "from-blue-500 to-blue-600",
    percentage: 84,
  },
  {
    title: "心率 (静息)",
    value: "72",
    unit: "bpm",
    status: "正常",
    icon: Heart,
    color: "from-red-500 to-red-600",
  },
  {
    title: "血压",
    value: "120/80",
    unit: "mmHg",
    status: "理想",
    icon: Activity,
    color: "from-green-500 to-green-600",
  },
  {
    title: "健康积分",
    value: "1,250",
    unit: "分",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
  },
];

const medicationReminders = [
  {
    id: 1,
    name: "瑞舒伐他汀钙片",
    time: "08:00",
    dosage: "1片",
    taken: true,
  },
  {
    id: 2,
    name: "阿司匹林",
    time: "12:00",
    dosage: "1片",
    taken: false,
  },
  {
    id: 3,
    name: "维生素C",
    time: "18:00",
    dosage: "1片",
    taken: false,
  },
];

const recentAppointments = [
  {
    id: 1,
    doctor: "李明华 医生",
    department: "心内科",
    time: "2026-04-03 14:00",
    location: "社区医疗中心 A栋2楼",
    status: "待就诊",
  },
];

const initialMedicationReminders = [
  {
    id: 1,
    name: "瑞舒伐他汀钙片",
    time: "08:00",
    dosage: "1片",
    taken: true,
  },
  {
    id: 2,
    name: "阿司匹林",
    time: "12:00",
    dosage: "1片",
    taken: false,
  },
  {
    id: 3,
    name: "维生素C",
    time: "18:00",
    dosage: "1片",
    taken: false,
  },
];

const availableMedicines = [
  { id: 101, name: "阿莫西林胶囊", unit: "粒" },
  { id: 102, name: "对乙酰氨基酚片", unit: "片" },
  { id: 103, name: "瑞舒伐他汀钙片", unit: "片" },
  { id: 104, name: "维生素C 泡腾片", unit: "片" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [sosStage, setSosStage] = useState<'idle' | 'countdown' | 'incall'>('idle');
  const [countdown, setCountdown] = useState(5);
  
  // 服药计划状态
  const [reminders, setReminders] = useState(initialMedicationReminders);
  const [isCustomMedOpen, setIsCustomMedOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", time: "09:00", dosage: "1" });
  
  // 预约详情状态
  const [isApptDetailsOpen, setIsApptDetailsOpen] = useState(false);

  const handleConfirmIntake = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: true } : r));
    toast.success("用药确认成功，已记录到健康档案");
  };

  const handleAddCustomMed = () => {
    if (!newMed.name) {
      toast.error("请选择或输入药品名称");
      return;
    }
    const med = {
      id: Date.now(),
      name: newMed.name,
      time: newMed.time,
      dosage: `${newMed.dosage}${availableMedicines.find(m => m.name === newMed.name)?.unit || '片'}`,
      taken: false
    };
    setReminders(prev => [...prev, med].sort((a, b) => a.time.localeCompare(b.time)));
    setIsCustomMedOpen(false);
    setNewMed({ name: "", time: "09:00", dosage: "1" });
    toast.success("自定义服药任务已添加");
  };

  const handleStartSOS = () => {
    setIsSOSOpen(true);
    setSosStage('countdown');
    setCountdown(5);
  };

  const handleFastCall = () => {
    setSosStage('incall');
  };

  const handleCancelSOS = () => {
    setIsSOSOpen(false);
    setSosStage('idle');
    setCountdown(5);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosStage === 'countdown' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (sosStage === 'countdown' && countdown === 0) {
      setSosStage('incall');
    }
    return () => clearInterval(timer);
  }, [sosStage, countdown]);

  return (
    <div className="space-y-8 pb-10">
      {/* 居民欢迎横幅 - 现代渐变与毛玻璃 */}
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-10 text-white shadow-2xl shadow-indigo-200"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative z-10 grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 space-y-8">
            <Motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-[11px] font-bold tracking-widest uppercase"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-200" />
              <span>智能健康守护中 · 第 452 天</span>
            </Motion.div>
            
            <div className="space-y-4">
              <Motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-extrabold tracking-tight leading-tight"
              >
                下午好，<br />王建国 先生
              </Motion.h1>
              <Motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-indigo-50 text-xl font-medium opacity-90 max-w-lg leading-relaxed"
              >
                今天是 {new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" })}。您的健康指标非常稳定，请继续保持。
              </Motion.p>
            </div>
            
            <Motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              <Button 
                onClick={handleStartSOS}
                className="bg-red-500 hover:bg-red-600 text-white h-14 px-10 rounded-2xl font-bold shadow-2xl shadow-red-900/20 group transition-all"
              >
                <Phone className="w-5 h-5 mr-3 animate-bounce" />
                一键呼救 (SOS)
              </Button>
                          </Motion.div>
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <div className="relative group flex items-center justify-center">
              {/* 背景辉光动画 - 调亮后的浅蓝色系 */}
              <Motion.div 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute w-80 h-80 bg-indigo-300/40 blur-[70px] rounded-full" 
              />
              
              {/* AI 智能球主体 */}
              <Motion.div
                animate={{ 
                  y: [-12, 12, -12],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                {/* 球体外壳 - 浅 Indigo 与 磨砂白渐变 */}
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100/40 via-white/20 to-indigo-400/30 backdrop-blur-3xl border border-white/60 shadow-[0_0_60px_rgba(165,180,252,0.4)] flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_90px_rgba(165,180,252,0.6)] transition-all duration-700">
                  
                  {/* 内部微光装饰 */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
                  
                  {/* AI 智能眼睛 - 核心左右扫视交互 */}
                  <Motion.div 
                    animate={{ 
                      x: [-25, 25, -25], // 眼睛左右扫视
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                    className="flex items-center gap-5 z-20"
                  >
                    {/* 左眼 */}
                    <Motion.div 
                      animate={{ 
                        scaleY: [1, 1, 0.1, 1, 1], // 眨眼
                        height: [28, 36, 28],      // 呼吸
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.9)",
                          "0 0 25px rgba(129,140,248,1)",
                          "0 0 10px rgba(255,255,255,0.9)"
                        ]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        times: [0, 0.45, 0.5, 0.55, 1],
                        ease: "easeInOut" 
                      }}
                      className="w-3.5 h-8 bg-white rounded-full"
                    />
                    {/* 右眼 */}
                    <Motion.div 
                      animate={{ 
                        scaleY: [1, 1, 0.1, 1, 1], 
                        height: [28, 36, 28],
                        boxShadow: [
                          "0 0 10px rgba(255,255,255,0.9)",
                          "0 0 25px rgba(129,140,248,1)",
                          "0 0 10px rgba(255,255,255,0.9)"
                        ]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        times: [0, 0.45, 0.5, 0.55, 1],
                        ease: "easeInOut" 
                      }}
                      className="w-3.5 h-8 bg-white rounded-full"
                    />
                  </Motion.div>

                  {/* 旋转装饰光圈 */}
                  <Motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 border border-white/20 rounded-full border-t-indigo-500/40 border-l-transparent"
                  />
                  
                  {/* 表面柔光横扫 */}
                  <Motion.div 
                    animate={{ x: [-350, 350] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </div>
                
                {/* 底部悬浮柔影 */}
                <Motion.div 
                  animate={{ 
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-48 h-8 bg-indigo-900/10 blur-3xl rounded-full"
                />
              </Motion.div>
            </div>
          </div>
        </div>
      </Motion.div>

      {/* 核心服务入口 - 现代化极简方块 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "健康档案", icon: FileText, color: "bg-indigo-50 text-indigo-600", desc: "历史记录", path: "/dashboard/health-profile" },
          { name: "在线问诊", icon: MessageSquare, color: "bg-emerald-50 text-emerald-600", desc: "专业建议", path: "/dashboard/consultation-selection" },
          { name: "我的药箱", icon: Pill, color: "bg-amber-50 text-amber-600", desc: "用药管理", path: "/dashboard/medicine-box" },
          { name: "社区活动", icon: Users, color: "bg-rose-50 text-rose-600", desc: "邻里生活", path: "/dashboard/community-activities" },
        ].map((service, i) => (
          <Motion.button
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => service.path !== "#" && navigate(service.path)}
            className="p-8 bg-white rounded-[2rem] border border-slate-200/50 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all text-left group"
          >
            <div className={`w-14 h-14 ${service.color} rounded-2xl mb-6 flex items-center justify-center shadow-sm`}>
              <service.icon className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1 tracking-tight">{service.name}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest opacity-80">{service.desc}</p>
          </Motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 健康指数 & 步数 - Bento Layout */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-slate-200/50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                <h2 className="font-extrabold text-xl tracking-tight">健康概览</h2>
              </div>
              <Button variant="ghost" className="text-indigo-600 font-bold rounded-xl hover:bg-indigo-50">历史详情</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthStats.map((stat) => (
                <div key={stat.title} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100/50 flex items-center gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                  <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-indigo-600 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 tracking-tighter">{stat.value}</span>
                      <span className="text-xs text-slate-400 font-bold">{stat.unit}</span>
                    </div>
                  </div>
                  {stat.percentage && (
                    <div className="relative w-14 h-14">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={150} strokeDashoffset={150 - (150 * stat.percentage) / 100} className="text-indigo-600" strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold">{stat.percentage}%</span>
                    </div>
                  )}
                  {stat.status && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold rounded-lg px-3">
                      {stat.status}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 服药提醒 - Modern List */}
            <Card className="p-8 border-slate-200/50 rounded-[2.5rem] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                  <h2 className="font-extrabold text-xl tracking-tight">服药计划</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700 border-none font-bold rounded-lg px-3">今日 {reminders.length} 次</Badge>
                  <Dialog open={isCustomMedOpen} onOpenChange={setIsCustomMedOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-amber-50 text-amber-600">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-8 border-none shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">自定义服药任务</DialogTitle>
                        <DialogDescription className="text-slate-500">
                          您可以从药箱中选择药品，并设置临时的服药提醒。
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">选择药品</label>
                          <select 
                            value={newMed.name}
                            onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                            className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white text-sm font-bold focus:ring-indigo-500 outline-none"
                          >
                            <option value="">点击选择药品...</option>
                            {availableMedicines.map(m => (
                              <option key={m.id} value={m.name}>{m.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">服药时间</label>
                            <Input 
                              type="time" 
                              value={newMed.time}
                              onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                              className="h-12 rounded-xl border-slate-200 font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">剂量</label>
                            <Input 
                              type="number" 
                              value={newMed.dosage}
                              onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                              className="h-12 rounded-xl border-slate-200 font-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsCustomMedOpen(false)} className="h-12 rounded-xl font-bold flex-1">取消</Button>
                        <Button onClick={handleAddCustomMed} className="h-12 rounded-xl bg-indigo-600 text-white font-bold flex-1 shadow-lg shadow-indigo-100">添加任务</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
                <AnimatePresence mode="popLayout">
                  {reminders.map((pill) => (
                    <Motion.div 
                      key={pill.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${pill.taken ? 'bg-emerald-50 text-emerald-500' : 'bg-white shadow-sm text-slate-400 group-hover:text-indigo-600'}`}>
                        {pill.taken ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-extrabold text-[15px] tracking-tight ${pill.taken ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{pill.name}</h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{pill.dosage} · {pill.time}</p>
                      </div>
                      {!pill.taken && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleConfirmIntake(pill.id)}
                          className="h-9 px-4 text-xs border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-bold transition-all"
                        >
                          确认服用
                        </Button>
                      )}
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>

            {/* 最近预约 - Elegant Card */}
            <Card className="p-8 border-slate-200/50 rounded-[2.5rem] bg-indigo-50/30 group/appt overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover/appt:bg-indigo-600/10 transition-all" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                  <h2 className="font-extrabold text-xl tracking-tight">下个预约</h2>
                </div>
              </div>
              {recentAppointments.map((app) => (
                <div key={app.id} className="space-y-6 relative z-10">
                  <div 
                    onClick={() => setIsApptDetailsOpen(true)}
                    className="p-6 bg-white rounded-3xl shadow-sm border border-indigo-100 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-indigo-50">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                        <Stethoscope className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 tracking-tight">{app.doctor}</h4>
                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-0.5">{app.department}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        {app.time}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        {app.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50 h-12 rounded-2xl font-bold" 
                      variant="outline"
                      onClick={() => toast.info("正在跳转预约管理系统...")}
                    >
                      修改时间
                    </Button>
                    <Button 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-12 rounded-2xl font-bold text-white shadow-lg shadow-indigo-100"
                      onClick={() => toast.success("正在为您规划社区医疗中心路线...")}
                    >
                      查看导航
                    </Button>
                  </div>
                </div>
              ))}

              <Dialog open={isApptDetailsOpen} onOpenChange={setIsApptDetailsOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
                  <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <DialogTitle className="text-2xl font-black mb-2">预约详情</DialogTitle>
                    <DialogDescription className="text-indigo-100 font-medium">请准时前往就诊，并携带相关病例资料。</DialogDescription>
                  </div>
                  <div className="p-8 bg-white space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">主治医生</p>
                          <p className="font-bold text-slate-900">李明华 医生 (副主任医师)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600">
                          <ClipboardList className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">就诊事项</p>
                          <p className="font-bold text-slate-900">心内科例行复查 (血常规、心电图)</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsApptDetailsOpen(false)}
                      className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all"
                    >
                      确认并关闭
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        </div>

        {/* 社区动态 & 快速联系 - Sidebar Bento */}
        <div className="space-y-8">
          <Card className="p-8 border-none bg-slate-900 text-white rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-3xl -mr-24 -mt-24 group-hover:bg-indigo-500/40 transition-all" />
            <h2 className="font-extrabold text-xl tracking-tight mb-6 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-indigo-400" />
              健康周报
            </h2>
            <div className="space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                “您的心率稳定性提升了 <span className="text-indigo-400 font-bold">12%</span>，建议增加户外散步时间，目前您的健康评分已超过 85% 的社区用户。”
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-indigo-50 border-none font-extrabold h-12 rounded-2xl transition-all">
                开启 AI 分析
              </Button>
            </div>
          </Card>

          <Card className="p-8 border-slate-200/50 rounded-[2.5rem]">
            <h2 className="font-extrabold text-xl tracking-tight mb-6">快捷联系</h2>
            <div className="space-y-3">
              {[
                { name: "社区居委会", phone: "010-88889999", type: "生活咨询" },
                { name: "24h 医疗中心", phone: "010-12345678", type: "全天候咨询" },
                { name: "家庭医生服务台", phone: "010-66667777", type: "签约服务" },
              ].map((contact) => (
                <div key={contact.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group cursor-pointer">
                  <div>
                    <h4 className="font-extrabold text-[14px] text-slate-900 tracking-tight">{contact.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{contact.type}</p>
                  </div>
                  <button className="p-3 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* SOS 紧急呼救系统 - 沉浸式对话框 */}
      <Dialog open={isSOSOpen} onOpenChange={(open) => !open && handleCancelSOS()}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] overflow-hidden p-0 border-none shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>紧急呼救 SOS</DialogTitle>
            <DialogDescription>启动紧急呼救流程，联系社区医疗团队。</DialogDescription>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {sosStage === 'countdown' ? (
              <Motion.div 
                key="countdown"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-red-600 p-12 text-center text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
                
                <div className="relative z-10 space-y-8">
                  <div className="relative inline-block">
                    <Motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20"
                    >
                      <span className="text-6xl font-black tabular-nums">{countdown}</span>
                    </Motion.div>
                    <div className="absolute -inset-4 bg-white/5 rounded-full animate-ping" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">即将启动紧急呼救</h2>
                    <p className="text-red-100 font-medium opacity-90">
                      正在自动接入社区 24H 医疗指挥中心...
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button
                      onClick={handleCancelSOS}
                      variant="outline"
                      className="h-16 rounded-2xl border-white/30 bg-white/10 text-white hover:bg-white hover:text-red-600 font-bold text-lg backdrop-blur-xl transition-all"
                    >
                      取消拨打
                    </Button>
                    <Button
                      onClick={handleFastCall}
                      className="h-16 rounded-2xl bg-white text-red-600 hover:bg-red-50 font-black text-lg shadow-xl shadow-red-900/20 transition-all"
                    >
                      立即呼叫
                    </Button>
                  </div>
                </div>
              </Motion.div>
            ) : (
              <Motion.div 
                key="incall"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white flex flex-col h-[650px]"
              >
                {/* 顶部状态栏 */}
                <div className="bg-red-600 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Phone className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg leading-tight">正在通话中...</h3>
                      <p className="text-xs text-red-100 font-bold opacity-80 uppercase tracking-widest">社区紧急指挥中心</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-white/20 text-white border-none font-bold px-3 py-1">00:12</Badge>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {/* 地图区域 - 模拟 */}
                  <div className="h-64 bg-slate-100 relative overflow-hidden">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                      className="w-full h-full object-cover opacity-60 grayscale"
                    />
                    <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply" />
                    
                    {/* 地图上的标记点 */}
                    <Motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </Motion.div>

                    <div className="absolute top-1/3 right-1/4">
                      <Motion.div 
                         animate={{ x: [-20, 0], y: [20, 0] }}
                         transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                         className="flex flex-col items-center"
                      >
                         <div className="bg-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 mb-2">
                           <span className="text-[10px] font-black text-indigo-600 whitespace-nowrap">社区医疗队 (3.2km)</span>
                         </div>
                         <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                           <Activity className="w-3 h-3 text-white" />
                         </div>
                      </Motion.div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                             <Clock className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">预计到达时间</p>
                             <p className="text-sm font-black text-slate-900">约 5 分钟后抵达</p>
                          </div>
                       </div>
                       <Badge className="bg-indigo-600 text-white border-none font-bold">加速中</Badge>
                    </div>
                  </div>

                  {/* 详细信息 */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        已同步联系紧急联系人
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                              女
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">王小红 (女儿)</p>
                              <p className="text-[11px] text-slate-500 font-medium">138 **** 8888</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold text-[10px]">已接通</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
                       <div className="flex items-center gap-2 text-amber-700">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-black uppercase tracking-wide">急救指导</span>
                       </div>
                       <p className="text-xs text-amber-800 leading-relaxed font-medium">
                         请原地坐下或躺平，解开领口扣子，保持平稳呼吸。医疗队正携带您的病历档案赶往现场。
                       </p>
                    </div>
                  </div>
                </div>

                {/* 底部挂断按钮 */}
                <div className="p-6 border-t border-slate-100">
                  <Button 
                    onClick={handleCancelSOS}
                    className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all"
                  >
                    结束紧急呼救
                  </Button>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
