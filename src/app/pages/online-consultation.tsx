import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Video, 
  Send, 
  Paperclip, 
  Phone, 
  Info,
  User,
  Activity,
  ArrowLeft,
  X,
  Stethoscope,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  CreditCard,
  MapPin,
  Truck,
  FileText,
  ChevronRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";

export function OnlineConsultationPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, role: "doctor", text: "您好，王先生。我是张医生，看到您发起的健康咨询，请问您今天感觉哪里不舒服吗？", time: "10:30" },
    { id: 2, role: "user", text: "张医生您好，我今天早上起床觉得头有点沉，血压测了一下是 145/92，比平时高了一些。", time: "10:32" },
    { id: 3, role: "doctor", text: "收到。除了血压升高，还有没有头晕、视物模糊或者胸闷的情况？", time: "10:33" },
    { id: 4, role: "user", text: "稍微有点头晕，但是视力还算清晰。", time: "10:35" },
    { id: 5, role: "doctor", type: "prescription", prescriptionId: "RX-20260401-08", medicines: [
      { name: "硝苯地平控释片", dosage: "30mg x 7片", usage: "每日1次，每次1片", price: 45.00 },
      { name: "复方丹参片", dosage: "0.3g x 60片", usage: "每日3次，每次3片", price: 28.50 }
    ], total: 73.50, time: "10:40" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: 确认, 2: 地址, 3: 成功
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      role: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInputText("");

    // 模拟医生回复
    setTimeout(() => {
      const doctorReply = {
        id: Date.now() + 1,
        role: "doctor",
        text: "了解了。建议您先静坐休息 15 分钟后再复测一次。如果依然在 140 以上，可能需要调整一下降压药的剂量。您最近有按时服药吗？",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, doctorReply]);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex gap-6">
      {/* 左侧：医生信息与健康概览 */}
      <div className="hidden lg:flex flex-col w-80 space-y-6">
        <Card className="p-6 border-blue-50">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full border-2 border-blue-100 overflow-hidden bg-slate-100 shadow-xl shadow-blue-900/5">
                <img 
                  src="https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-2.png" 
                  alt="Doctor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <h3 className="font-bold text-lg">张志远 医生</h3>
            <p className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-wider">心内科 · 主任医师</p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-3 h-3 text-orange-400 fill-orange-400">
                  <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
              ))}
              <span className="text-[10px] text-slate-400 ml-1">4.9 (1200+评价)</span>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50 gap-2">
                <Video className="w-4 h-4" /> 视频通话
              </Button>
              <Button variant="outline" className="w-full rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50 gap-2">
                <Phone className="w-4 h-4" /> 语音咨询
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-blue-50 flex-1">
          <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" /> 
            患者实时体征
          </h4>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-slate-500">最新血压</span>
                <span className="text-[10px] text-red-500 font-bold">偏高</span>
              </div>
              <p className="text-lg font-bold text-slate-900">145/92 <span className="text-[10px] font-normal text-slate-400">mmHg</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-slate-500">当前心率</span>
                <span className="text-[10px] text-green-500 font-bold">正常</span>
              </div>
              <p className="text-lg font-bold text-slate-900">78 <span className="text-[10px] font-normal text-slate-400">bpm</span></p>
            </div>
          </div>
        </Card>
      </div>

      {/* 右侧：聊天主界面 */}
      <Card className="flex-1 flex flex-col border-blue-50 overflow-hidden shadow-2xl shadow-blue-900/5 relative">
        {/* 背景光晕装饰 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-3xl -ml-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl -mr-32 -mb-32 pointer-events-none" />

        {/* 顶部标题栏 */}
        <div className="px-6 py-4 border-b border-blue-50 bg-white/50 backdrop-blur-md flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:hidden rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900">在线问诊会话</h2>
                <Badge className="bg-green-100 text-green-600 text-[10px] border-none font-bold">诊疗中</Badge>
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> 剩余咨询时长: 24:15
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Info className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 消息滚动区 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 relative z-10">
          <AnimatePresence>
            {messages.map((msg) => (
              <Motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.role === "doctor" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === "doctor" ? "justify-start" : "justify-end"}`}
              >
                {msg.type === "prescription" ? (
                  <div className="max-w-[85%] w-full flex flex-col gap-2">
                    <Card className="p-0 border-blue-100 overflow-hidden shadow-xl shadow-blue-900/5 bg-white">
                      <div className="bg-blue-600 p-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <FileText className="w-4 h-4" /> 电子处方笺
                        </div>
                        <span className="text-[10px] opacity-80">{msg.prescriptionId}</span>
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                          <div>
                            <p className="text-[10px] text-slate-400 mb-1">开方医生</p>
                            <p className="text-sm font-bold text-slate-900">张志远</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 mb-1">临床诊断</p>
                            <p className="text-sm font-bold text-slate-900">高血压（二级）</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-blue-600">Rp.</span>
                          </div>
                          {msg.medicines?.map((med, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div>
                                <p className="font-bold text-slate-900">{med.name}</p>
                                <p className="text-[10px] text-slate-500">{med.usage} / {med.dosage}</p>
                              </div>
                              <span className="font-medium text-slate-900">¥{med.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                          <span className="text-xs text-slate-500">处方金额</span>
                          <span className="text-lg font-bold text-blue-600">¥{msg.total?.toFixed(2)}</span>
                        </div>
                        <Button 
                          onClick={() => {
                            setIsPaymentOpen(true);
                            setPaymentStep(1);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 h-10 rounded-xl font-bold gap-2"
                        >
                          <CreditCard className="w-4 h-4" /> 立即购药送货到门
                        </Button>
                      </div>
                    </Card>
                    <p className="text-[10px] text-slate-400 text-center">{msg.time}</p>
                  </div>
                ) : (
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === "doctor" ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 ${msg.role === "doctor" ? "border-blue-100" : "border-slate-100 shadow-sm bg-white flex items-center justify-center text-blue-600"}`}>
                      {msg.role === "doctor" ? (
                        <img src="https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/4-2.png" alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                        msg.role === "doctor" 
                          ? "bg-white text-slate-800 rounded-tl-none border border-blue-50 shadow-sm" 
                          : "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/20"
                      }`}>
                        {msg.text}
                      </div>
                      <p className={`text-[10px] text-slate-400 ${msg.role === "doctor" ? "text-left" : "text-right"}`}>
                        {msg.time} {msg.role === "doctor" && "· 已读"}
                      </p>
                    </div>
                  </div>
                )}
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 输入区 */}
        <div className="p-6 bg-white border-t border-blue-50 relative z-10">
          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2 pl-4 border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-all">
            <button className="text-slate-400 hover:text-blue-600 p-2 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="请输入您的问题或症状描述..." 
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm h-10 p-0"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* 购药支付弹窗 */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-3xl overflow-hidden p-0 border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>处方支付与配送</DialogTitle>
            <DialogDescription>完成处方药品在线支付及社区极速配送服务。</DialogDescription>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {paymentStep === 1 && (
              <Motion.div 
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-6"
              >
                <div className="space-y-1.5 mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    确认处方订单
                  </h3>
                  <p className="text-sm text-slate-500">请确认药品清单及金额，支付后将由社区药房极速配送。</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">药品总计</span>
                    <span className="font-bold">¥73.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">配送费 (社区绿色通道)</span>
                    <span className="font-bold text-green-600">¥0.00</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-slate-900">应付合计</span>
                    <span className="text-2xl font-bold text-blue-600">¥73.50</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                  <Truck className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold">社区医疗中心药房直接配药，由“暖心骑手”在 30 分钟内送达。</p>
                </div>
                <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-500/20" onClick={() => setPaymentStep(2)}>
                  确认去支付
                </Button>
              </Motion.div>
            )}

            {paymentStep === 2 && (
              <Motion.div 
                key="address"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-6"
              >
                <div className="space-y-1.5 mb-6">
                  <h3 className="text-2xl font-bold">配送地址</h3>
                  <p className="text-sm text-slate-500">请确认您的社区住址，我们将为您提供极速送药服务。</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-600 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-slate-900">王建国</h4>
                        <span className="text-sm font-bold text-slate-900">138 **** 8888</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        幸福里社区 8 号楼 3 单元 1205 室
                      </p>
                      <Badge className="mt-2 bg-blue-100 text-blue-700 border-none text-[10px]">默认地址</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-slate-300 text-slate-400 gap-2">
                    <PlusIcon className="w-4 h-4" /> 使用其他地址
                  </Button>
                </div>
                <div className="pt-4 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-bold text-slate-900">支付方式</span>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Alipay_logo.svg/1024px-Alipay_logo.svg.png" className="w-6" alt="Alipay" />
                      </div>
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center border border-green-200 opacity-40">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/WeChat_Pay_logo.svg/1024px-WeChat_Pay_logo.svg.png" className="w-6" alt="Wechat" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-xl shadow-blue-500/20" onClick={() => {
                    localStorage.setItem("orderStatus", "delivering");
                    window.dispatchEvent(new Event("orderStatusUpdate"));
                    toast.success("支付成功！药品已进入配药流程");
                    setPaymentStep(3);
                  }}>
                    确认并支付 ¥73.50
                  </Button>
                </div>
              </Motion.div>
            )}

            {paymentStep === 3 && (
              <Motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-lg shadow-green-100 mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">下单成功</h3>
                  <p className="text-sm text-slate-500">骑手正在赶往社区药房配药，预计 20 分钟内送达。</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" /> 物流跟踪
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold">待配送</span>
                  </div>
                  <div className="relative pl-6 space-y-4">
                    <div className="absolute left-[7px] top-[5px] bottom-[5px] w-[2px] bg-blue-100" />
                    <div className="relative">
                      <div className="absolute -left-[23px] top-[2px] w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                      <p className="text-xs font-bold text-slate-900">订单已确认</p>
                      <p className="text-[10px] text-slate-400">10:45</p>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-[23px] top-[2px] w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                      <p className="text-xs font-bold text-slate-900">药房配药中</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold" onClick={() => setIsPaymentOpen(false)}>
                  返回对话
                </Button>
              </Motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
