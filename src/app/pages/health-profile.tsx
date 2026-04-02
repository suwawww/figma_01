import { motion as Motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Activity, 
  Heart, 
  Calendar, 
  ChevronRight, 
  ArrowLeft,
  Download,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit3,
  User,
  Scale,
  Ruler,
  Droplets,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export function HealthProfilePage() {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // 个人健康状态
  const [personalInfo, setPersonalInfo] = useState({
    bloodType: "A 型",
    height: "172",
    weight: "68",
    bmi: "23.0",
    metabolism: "1650",
    allergies: "青霉素过敏",
  });

  const [tempInfo, setTempInfo] = useState({ ...personalInfo });

  const healthData = [
    { label: "血型", value: `${personalInfo.bloodType}`, status: "normal", icon: Droplets },
    { label: "身高", value: `${personalInfo.height} cm`, status: "normal", icon: Ruler },
    { label: "体重", value: `${personalInfo.weight} kg`, status: "warning", icon: Scale },
    { label: "BMI", value: `${personalInfo.bmi}`, status: "normal", icon: Activity },
    { label: "基础代谢", value: `${personalInfo.metabolism} kcal`, status: "normal", icon: Zap },
    { label: "过敏史", value: personalInfo.allergies, status: "danger", icon: AlertCircle },
  ];

  const handleSave = () => {
    setPersonalInfo(tempInfo);
    setIsEditOpen(false);
    toast.success("个人健康信息已更新");
  };

  const reports = [
    { id: 1, title: "2026年Q1季度体检报告", date: "2026-03-15", doctor: "王建中 主任", type: "综合体检" },
    { id: 2, title: "心血管专项筛查报告", date: "2026-02-10", doctor: "李丽 医师", type: "专科检查" },
    { id: 3, title: "日常血糖监测月报 (2月)", date: "2026-03-01", doctor: "系统生成", type: "定期监测" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-indigo-50 text-indigo-600 h-12 w-12"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              我的健康档案
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">全面管理您的个人健康数据与报告</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-indigo-100 text-indigo-600 font-bold gap-2 hover:bg-indigo-50 transition-all">
            <Share2 className="w-4 h-4" /> 授权分享
          </Button>
          <Button className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 shadow-xl shadow-indigo-100 transition-all">
            <Download className="w-4 h-4" /> 导出档案
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧个人摘要 */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="p-8 border-slate-200/50 rounded-[2.5rem] shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-600/10 transition-all" />
            
            <div className="relative z-10 flex flex-col items-center mb-8">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-[2.5rem] border-4 border-white shadow-xl mx-auto overflow-hidden bg-slate-100 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/08.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Dialog open={isEditOpen} onOpenChange={(val) => {
                  setIsEditOpen(val);
                  if (val) setTempInfo({...personalInfo});
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      size="icon" 
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-indigo-600 text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 border-none shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">编辑个人健康信息</DialogTitle>
                      <DialogDescription className="text-slate-400 font-medium">
                        请确保填写的数据准确，以便我们为您提供精准的健康评估。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6 py-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">血型</label>
                        <Input 
                          value={tempInfo.bloodType} 
                          onChange={(e) => setTempInfo({...tempInfo, bloodType: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">身高 (cm)</label>
                        <Input 
                          type="number"
                          value={tempInfo.height} 
                          onChange={(e) => setTempInfo({...tempInfo, height: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">体重 (kg)</label>
                        <Input 
                          type="number"
                          value={tempInfo.weight} 
                          onChange={(e) => setTempInfo({...tempInfo, weight: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">BMI</label>
                        <Input 
                          value={tempInfo.bmi} 
                          onChange={(e) => setTempInfo({...tempInfo, bmi: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">基础代谢 (kcal)</label>
                        <Input 
                          type="number"
                          value={tempInfo.metabolism} 
                          onChange={(e) => setTempInfo({...tempInfo, metabolism: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">药物/过敏史</label>
                        <Input 
                          value={tempInfo.allergies} 
                          onChange={(e) => setTempInfo({...tempInfo, allergies: e.target.value})}
                          className="h-12 rounded-xl border-slate-200 focus:ring-indigo-500"
                          placeholder="如：无、青霉素过敏等"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-3">
                      <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="h-12 rounded-xl font-bold flex-1">取消</Button>
                      <Button onClick={handleSave} className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex-1 shadow-lg shadow-indigo-100">保存更新</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">王建国</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">ID: 20260401008</p>
            </div>

            <div className="space-y-4">
              {healthData.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover/item:text-indigo-600 transition-colors shadow-sm">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 tracking-tight">{item.value}</span>
                    {item.status === "danger" && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                    {item.status === "warning" && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-none bg-indigo-600 text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-indigo-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Heart className="w-5 h-5 text-indigo-200 fill-indigo-200" />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight">健康评估</h3>
                  <p className="text-[10px] text-indigo-200 font-black uppercase tracking-widest opacity-80">Health Rating</p>
                </div>
              </div>
              <p className="text-sm font-medium text-indigo-50 mb-8 leading-relaxed opacity-90">
                基于您的最新体检数据与日常监测，您的整体健康状况评分为 <span className="font-black text-white">88 分</span>。建议保持现有的规律运动与饮食计划。
              </p>
              <div className="flex items-baseline gap-2">
                <div className="text-6xl font-black tracking-tighter">88</div>
                <div className="text-xs font-black text-indigo-200 uppercase tracking-widest">Excellent</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧列表 */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-slate-200/50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                <h3 className="font-extrabold text-xl tracking-tight">近期检查报告</h3>
              </div>
              <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-xl">全部报告</Button>
            </div>
            <div className="space-y-4">
              {reports.map((report, i) => (
                <Motion.div 
                  key={report.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-5 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-pointer bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all shadow-sm">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{report.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {report.date}
                          </span>
                          <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5" /> {report.doctor}
                          </span>
                          <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border-none px-3">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl group-hover:bg-white shadow-none group-hover:shadow-sm transition-all">
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-slate-200/50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              <h3 className="font-extrabold text-xl tracking-tight">慢性病管理监测</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">监测指标</span>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">血压波动</h4>
                  </div>
                  <Badge className="bg-white text-indigo-600 text-[10px] font-black border-indigo-100 shadow-sm">稳定</Badge>
                </div>
                <div className="h-24 flex items-end gap-1.5 mb-4">
                  {[40, 60, 45, 70, 50, 85, 55].map((h, i) => (
                    <Motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className="flex-1 bg-indigo-300/40 rounded-t-lg group-hover:bg-indigo-600 transition-colors"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 font-bold">最近 7 天平均</p>
                  <p className="text-sm font-black text-slate-900">124/82 <span className="text-[10px] text-slate-400 font-bold">mmHg</span></p>
                </div>
              </div>
              <div className="p-6 rounded-[2.5rem] bg-emerald-50/50 border border-emerald-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">监测指标</span>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">空腹血糖</h4>
                  </div>
                  <Badge className="bg-white text-emerald-600 text-[10px] font-black border-emerald-100 shadow-sm">正常</Badge>
                </div>
                <div className="h-24 flex items-end gap-1.5 mb-4">
                  {[30, 35, 32, 58, 34, 31, 33].map((h, i) => (
                    <Motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className="flex-1 bg-emerald-300/40 rounded-t-lg group-hover:bg-emerald-600 transition-colors"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 font-bold">最近 7 天平均</p>
                  <p className="text-sm font-black text-slate-900">5.4 <span className="text-[10px] text-slate-400 font-bold">mmol/L</span></p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
