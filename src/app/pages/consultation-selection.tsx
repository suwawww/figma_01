import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  Stethoscope, 
  Star, 
  Activity, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function ConsultationSelectionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 症状输入, 2: 医生选择
  const [symptom, setSymptom] = useState("");
  
  const commonSymptoms = ["头痛头晕", "发烧感冒", "肠胃不适", "胸闷气短", "腰酸背痛", "失眠多梦"];
  
  const doctors = [
    { 
      id: 1, 
      name: "张志远", 
      title: "主任医师", 
      dept: "心内科", 
      hospital: "社区医疗中心", 
      rating: 4.9, 
      cases: "1200+", 
      price: 29, 
      status: "online",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 2, 
      name: "李红梅", 
      title: "副主任医师", 
      dept: "全科", 
      hospital: "社区医疗中心", 
      rating: 4.8, 
      cases: "850+", 
      price: 19, 
      status: "online",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200"
    },
    { 
      id: 3, 
      name: "王建中", 
      title: "主治医师", 
      dept: "呼吸内科", 
      hospital: "市人民医院", 
      rating: 4.7, 
      cases: "2100+", 
      price: 25, 
      status: "busy",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* 顶部导航 */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => step === 1 ? navigate(-1) : setStep(1)}
          className="rounded-full bg-white shadow-sm border border-blue-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">在线问诊</h1>
          <p className="text-sm text-slate-500">
            {step === 1 ? "请描述您的症状以获取精准推荐" : "选择您信任的医生开始咨询"}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <Motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <Card className="p-8 border-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <div className="space-y-4 mb-8">
                <label className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  您现在哪里不舒服？
                </label>
                <textarea 
                  className="w-full h-40 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all text-slate-700 resize-none outline-none"
                  placeholder="请详细描述您的症状、持续时间以及是否有用药史..."
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                />
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-500">常见症状：</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map(s => (
                    <button 
                      key={s}
                      onClick={() => setSymptom(prev => prev ? `${prev}，${s}` : s)}
                      className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all text-sm font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!symptom.trim()}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-500/20"
              >
                匹配推荐医生
              </Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "权威认证", desc: "实名执业医师" },
                { icon: Clock, title: "极速响应", desc: "3分钟内接诊" },
                { icon: Heart, title: "隐私保障", desc: "全程加密通话" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-blue-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Motion.div>
        ) : (
          <Motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input className="pl-12 h-12 rounded-2xl border-blue-50 bg-white" placeholder="搜索医生姓名、科室或擅长领域..." />
            </div>

            {doctors.map((doc, i) => (
              <Motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 border-blue-50 hover:shadow-xl hover:border-blue-200 transition-all group cursor-pointer overflow-hidden relative" onClick={() => navigate("/dashboard/online-consultation")}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all" />
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                        <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.status === "online" ? "bg-green-500" : "bg-orange-500"}`} />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-xl text-slate-900">{doc.name}</h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none font-bold text-[10px]">
                            {doc.title}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">问诊费</p>
                          <p className="text-xl font-bold text-blue-600">¥{doc.price}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-blue-400" />
                        {doc.dept} · {doc.hospital}
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <span className="text-sm font-bold text-slate-900">{doc.rating}</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          服务 <span className="font-bold text-slate-900">{doc.cases}</span> 人次
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 快速接诊
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              </Motion.div>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
