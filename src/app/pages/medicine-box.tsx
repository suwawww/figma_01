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
  Calendar, 
  ChevronRight, 
  ArrowLeft,
  ShoppingCart,
  Bell,
  CheckCircle2,
  Trash2,
  MoreVertical,
  History
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";

const initialMedicines = [
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
    reminders: ["08:00", "12:00", "18:00"]
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
    reminders: []
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
    reminders: ["21:00"]
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
    reminders: ["10:00"]
  }
];

export function MedicineBoxPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMed, setSelectedMed] = useState<typeof initialMedicines[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRefillOpen, setIsRefillOpen] = useState(false);

  const filteredMeds = initialMedicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefill = () => {
    toast.success(`${selectedMed?.name} 的补充订单已提交！药房将尽快为您配送。`);
    setIsRefillOpen(false);
    setIsDetailOpen(false);
    // 触发配送看板联动
    localStorage.setItem("orderStatus", "delivering");
    window.dispatchEvent(new Event("orderStatusUpdate"));
  };

  const openDetail = (med: typeof initialMedicines[0]) => {
    setSelectedMed(med);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 顶部导航与搜索 */}
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
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              我的药箱
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">智能用药与库存管理系统</p>
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

      {/* 统计横幅 - Bento Style */}
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

      {/* 药品列表网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMeds.map((med, i) => (
          <Motion.div
            key={med.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => openDetail(med)}
            className="group cursor-pointer"
          >
            <Card className="overflow-hidden border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all h-full flex flex-col relative rounded-[2.5rem] bg-white">
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback 
                  src={med.image} 
                  alt={med.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className={`border-none ${med.type === '处方药' ? 'bg-indigo-600' : 'bg-slate-900'} text-white font-bold rounded-lg px-3 py-1`}>
                    {med.type}
                  </Badge>
                  {med.stock < 10 && (
                    <Badge className="bg-red-500 text-white border-none animate-pulse font-bold rounded-lg px-3 py-1">
                      补货
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-7 space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{med.name}</h3>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">{med.category}</p>
                  </div>
                  <div className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-3">
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
                      className={`h-full ${med.stock < 10 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {med.dosage}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-200 text-slate-600 font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                  详情管理
                </Button>
              </div>
            </Card>
          </Motion.div>
        ))}
      </div>

      {/* 药品详情弹窗 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[3rem] shadow-2xl">
          {selectedMed && (
            <div className="flex flex-col">
              <div className="h-64 relative">
                <ImageWithFallback 
                  src={selectedMed.image} 
                  alt={selectedMed.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <Badge className="bg-indigo-600/80 backdrop-blur-md border-none mb-3 font-bold px-4 py-1">{selectedMed.category}</Badge>
                  <DialogTitle className="text-3xl font-extrabold tracking-tight">{selectedMed.name}</DialogTitle>
                  <DialogDescription className="sr-only">
                    查看 {selectedMed.name} 的详细用药信息和库存状态。
                  </DialogDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/20 h-10 w-10"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </Button>
              </div>
              
              <div className="p-10 bg-white space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">库存状态</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-extrabold tracking-tighter ${selectedMed.stock < 10 ? 'text-rose-500' : 'text-slate-900'}`}>{selectedMed.stock}</span>
                      <span className="text-sm font-bold text-slate-400">{selectedMed.unit} 剩余</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">有效期截止</p>
                    <p className="text-xl font-extrabold text-slate-900 tracking-tight">{selectedMed.expiry}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Bell className="w-4 h-4" />
                    </div>
                    服药智能计划
                  </h4>
                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <p className="text-sm font-extrabold text-slate-700 mb-4">{selectedMed.dosage}</p>
                    {selectedMed.reminders.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {selectedMed.reminders.map(time => (
                          <Badge key={time} variant="secondary" className="bg-white border-slate-200 text-indigo-600 px-4 py-2 font-extrabold rounded-xl shadow-sm">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic font-medium">暂未开启定时提醒</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="h-16 rounded-2xl border-slate-200 text-slate-600 font-extrabold"
                    onClick={() => toast.info("更多用药记录功能开发中...")}
                  >
                    <History className="w-5 h-5 mr-3" />
                    历史日志
                  </Button>
                  <Button 
                    className="h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-2xl shadow-indigo-100"
                    onClick={() => setIsRefillOpen(true)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    极速补药
                  </Button>
                </div>
                
                <div className="flex justify-center">
                   <button className="text-[10px] text-rose-500 font-extrabold uppercase tracking-widest hover:underline flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                     <Trash2 className="w-3 h-3" />
                     从药箱中移出
                   </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 补药确认 */}
      <Dialog open={isRefillOpen} onOpenChange={setIsRefillOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-[3rem] p-10 border-none shadow-2xl">
          <DialogHeader className="text-center">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <DialogTitle className="text-2xl font-extrabold tracking-tight">确认补充药品？</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium leading-relaxed mt-2">
              系统将为您自动下单一份 <span className="font-extrabold text-slate-900">{selectedMed?.name}</span>，由社区定点药房配送至您的住址。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-6">
             <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">预计金额</span>
                   <span className="font-extrabold text-slate-900">¥ 45.00</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-slate-200/60">
                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">配送地址</span>
                   <span className="font-extrabold text-slate-900">12号楼 201室</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Button variant="ghost" onClick={() => setIsRefillOpen(false)} className="rounded-2xl h-14 font-bold">取消</Button>
                <Button onClick={handleRefill} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-extrabold shadow-xl shadow-indigo-100">确认并支付</Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
