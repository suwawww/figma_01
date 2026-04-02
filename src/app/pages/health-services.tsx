import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { toast } from "sonner";
import {
  Bell,
  FileText,
  Activity,
  Calendar,
  TrendingUp,
  Heart,
  Clock,
  Eye,
  Download,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { Badge } from "../components/ui/badge";

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
  },
  {
    id: 2,
    title: "社区健康讲座：心血管养生",
    desc: "本周六下午 2:00 在社区活动中心二楼举办，主讲人为市医院特聘专家。",
    date: "2026-03-28",
    tag: "健康讲座",
    isNew: false,
  },
  {
    id: 3,
    title: "药房补货提醒",
    desc: "您常购的慢病药物已到货，请持处方到药房领取。",
    date: "2026-03-25",
    tag: "药品提醒",
    isNew: false,
  },
];

export function HealthServicesPage() {
  const [selectedTab, setSelectedTab] = useState("records");

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            健康服务
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1.5">查看个人报告、历史档案与社区动态</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-8 font-bold shadow-xl shadow-indigo-200 transition-all">
          <Calendar className="w-4 h-4 mr-2" />
          预约新服务
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-slate-100 p-1.5 rounded-2xl w-fit mb-8">
          <TabsTrigger value="records" className="rounded-xl px-8 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
            <FileText className="w-4 h-4 mr-2" />
            我的档案
          </TabsTrigger>
          <TabsTrigger value="news" className="rounded-xl px-8 h-10 font-extrabold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">
            <Bell className="w-4 h-4 mr-2" />
            社区动态
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-0 outline-none">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                <h2 className="font-extrabold text-2xl tracking-tight text-slate-900">最近检查结果</h2>
              </div>
              <div className="grid gap-6">
                {myRecords.map((record, i) => (
                  <Motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group cursor-pointer rounded-[2rem] bg-white">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl ${record.color} flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110`}>
                          <record.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="font-extrabold text-lg text-slate-900 tracking-tight">{record.type}</h4>
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{record.date}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">主检：{record.doctor}</p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <Badge className="bg-emerald-100 text-emerald-700 border-none px-4 py-1 font-extrabold rounded-lg">
                            {record.result}
                          </Badge>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Motion.div>
                ))}
              </div>

              <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-white/50 hover:bg-white hover:border-indigo-200 transition-all group">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-10 h-10 text-slate-300 group-hover:text-indigo-400" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">历史纸质档案录入</h3>
                <p className="text-sm font-medium text-slate-500 max-w-xs mb-8 leading-relaxed">
                  您可以申请将过去的纸质病历进行数字化录入，以便家庭医生提供更精准的诊疗。
                </p>
                <Button variant="outline" className="rounded-2xl h-12 px-8 border-indigo-100 text-indigo-600 font-extrabold hover:bg-indigo-600 hover:text-white transition-all">
                  提交申请
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                <h2 className="font-extrabold text-2xl tracking-tight text-slate-900">健康趋势</h2>
              </div>
              <Card className="p-8 border-slate-200/50 rounded-[2.5rem] bg-white shadow-sm">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">空腹血糖 (较上月)</p>
                      <span className="text-xs text-emerald-600 font-black">↓ 0.2</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <Motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">平均心率</p>
                      <span className="text-xs text-slate-400 font-black uppercase">Stable</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <Motion.div initial={{ width: 0 }} animate={{ width: "72%" }} className="h-full bg-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">BMI 指数</p>
                      <span className="text-xs text-amber-600 font-black">↑ 0.5</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <Motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-amber-500" />
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-10 h-12 text-xs font-extrabold text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-xl uppercase tracking-widest">
                  查看详细趋势图表
                </Button>
              </Card>

              <Card className="p-8 border-none bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <h3 className="font-extrabold text-lg mb-4 flex items-center gap-3 tracking-tight">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-indigo-400" />
                  </div>
                  私人医生点评
                </h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed italic mb-8">
                  “王先生，您的血糖控制情况有所好转，请继续保持清淡饮食，早起散步。下次复查建议在四月中旬。”
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-lg">
                    李
                  </div>
                  <div>
                    <p className="text-xs font-extrabold tracking-tight">李明华 医生</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Chief Physician</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="news" className="mt-0 outline-none">
          <div className="max-w-4xl space-y-6">
            {announcements.map((item, i) => (
              <Motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group cursor-pointer relative overflow-hidden rounded-[2.5rem] bg-white">
                  {item.isNew && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-rose-500 text-white text-[9px] font-black px-4 py-1.5 rounded-bl-2xl shadow-lg uppercase tracking-widest">
                        New
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none font-black text-[10px] px-3 py-1 rounded-lg uppercase tracking-widest">
                        {item.tag}
                      </Badge>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{item.date}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button variant="link" className="p-0 h-auto text-indigo-600 font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                        了解详情
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
