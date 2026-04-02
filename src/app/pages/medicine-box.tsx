import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Pill,
  Search,
  Plus,
  Clock,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const medicines = [
  {
    id: 1,
    name: "阿莫西林胶囊",
    dosage: "1片/次, 3次/日",
    stock: 12,
    total: 30,
    unit: "粒",
    expiry: "2026-12-30",
    category: "消炎解毒",
    type: "处方药",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-1.png",
    reminders: ["08:00", "12:00", "18:00"],
  },
  {
    id: 2,
    name: "对乙酰氨基酚片",
    dosage: "2片/次, 按需",
    stock: 5,
    total: 20,
    unit: "片",
    expiry: "2026-05-15",
    category: "解热镇痛",
    type: "OTC",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-2.png",
    reminders: [],
  },
  {
    id: 3,
    name: "瑞舒伐他汀钙片",
    dosage: "1片/次, 1次/晚",
    stock: 22,
    total: 28,
    unit: "片",
    expiry: "2027-02-10",
    category: "慢病用药",
    type: "处方药",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-3.png",
    reminders: ["21:00"],
  },
  {
    id: 4,
    name: "维生素C 泡腾片",
    dosage: "1片/次, 1次/日",
    stock: 8,
    total: 10,
    unit: "片",
    expiry: "2026-08-20",
    category: "营养补充",
    type: "保健品",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/5-4.png",
    reminders: ["10:00"],
  },
];

export function MedicineBoxPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeds = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 顶部 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full hover:bg-indigo-50 text-indigo-600 h-12 w-12"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">我的药箱</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
              智能用药与库存管理系统
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索药品或类别..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-14 bg-white border-slate-200/60 rounded-2xl focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200 transition-all">
            <Plus className="w-5 h-5 mr-2" />
            添加药品
          </Button>
        </div>
      </div>

      {/* 统计横幅 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none bg-rose-50 text-rose-700 rounded-[2rem] flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-70">库存告急</p>
            <p className="text-lg font-extrabold">2 种药品库存不足</p>
          </div>
        </Card>
        <Card className="p-6 border-none bg-indigo-50 text-indigo-700 rounded-[2rem] flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-70">今日剩余</p>
            <p className="text-lg font-extrabold">3 次服药提醒</p>
          </div>
        </Card>
        <Card className="p-6 border-none bg-emerald-50 text-emerald-700 rounded-[2rem] flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-70">安全检测</p>
            <p className="text-lg font-extrabold">全部在有效期内</p>
          </div>
        </Card>
      </div>

      {/* 药品卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMeds.map((med, i) => (
          <Motion.div
            key={med.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/dashboard/medicine-box/${med.id}`)}
            className="group cursor-pointer"
          >
            <Card className="overflow-hidden border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative rounded-[2.5rem] bg-white">
              {/* 药品图片 */}
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback
                  src={med.image}
                  alt={med.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge
                    className={`border-none ${
                      med.type === "处方药" ? "bg-indigo-600" : med.type === "OTC" ? "bg-emerald-600" : "bg-amber-500"
                    } text-white font-bold rounded-lg px-3 py-1 text-[10px]`}
                  >
                    {med.type}
                  </Badge>
                  {med.stock < 10 && (
                    <Badge className="bg-rose-500 text-white border-none animate-pulse font-bold rounded-lg px-3 py-1 text-[10px]">
                      补货
                    </Badge>
                  )}
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">
                      {med.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">
                      {med.category}
                    </p>
                  </div>
                  <div className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-wider">剩余库存</span>
                    <span className={med.stock < 10 ? "text-rose-600" : "text-slate-900"}>
                      {med.stock} {med.unit} / {med.total}{med.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(med.stock / med.total) * 100}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={`h-full rounded-full ${med.stock < 10 ? "bg-rose-500" : "bg-indigo-600"}`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <Clock className="w-3 h-3" />
                    {med.dosage}
                  </div>
                </div>
              </div>

              {/* 底部按钮 */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    点击查看详情
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card>
          </Motion.div>
        ))}
      </div>
    </div>
  );
}