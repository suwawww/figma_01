import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Home,
  Network,
  Heart,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Activity,
  MessageSquare,
  Pill,
  ShieldCheck,
  ChevronRight,
  Truck,
  Package,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

const navigationItems = [
  { name: "主页概览", path: "/dashboard", icon: Home },
  { name: "医疗网络", path: "/dashboard/medical-network", icon: Network },
  { name: "健康档案", path: "/dashboard/health-services", icon: Heart },
  { name: "知识课堂", path: "/dashboard/health-knowledge", icon: BookOpen },
  { name: "家庭中心", path: "/dashboard/member-management", icon: Users },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);

  useEffect(() => {
    // 模拟检测配送状态
    const checkDelivery = () => {
      const status = localStorage.getItem("orderStatus");
      setIsDelivering(status === "delivering");
    };

    checkDelivery();
    window.addEventListener("storage", checkDelivery);
    // 自定义事件处理，用于同页面状态更新
    const handleStatusUpdate = () => checkDelivery();
    window.addEventListener("orderStatusUpdate", handleStatusUpdate);

    return () => {
      window.removeEventListener("storage", checkDelivery);
      window.removeEventListener("orderStatusUpdate", handleStatusUpdate);
    };
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* 顶部导航栏 - 极简现代感 */}
      <header className="sticky top-0 z-50 bg-indigo-600/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-indigo-900/20">
        <div className="relative flex items-center justify-between px-6 lg:px-8 h-16 text-white">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>

            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/dashboard")}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="font-extrabold text-lg tracking-tight text-white">
                社区紧急医疗服务站
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1.5 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">系统运行正常</span>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-white/10 text-white rounded-full">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full ring-2 ring-indigo-600"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-slate-200 shadow-2xl rounded-3xl overflow-hidden mt-2" align="end">
                <div className="bg-indigo-600 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-wide">消息通知</span>
                    <Badge className="bg-white/20 text-white border-none">1 条未读</Badge>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 leading-tight">药品到库提醒</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">您关注的降压药已补货完成。</p>
                      <p className="text-[10px] text-slate-400 mt-2">10分钟前</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="h-8 w-px bg-white/20 mx-1" />
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-3 p-1 pr-3 hover:bg-white/10 rounded-full transition-all border border-white/10 outline-none group">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-xs overflow-hidden group-hover:scale-110 transition-transform">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" />
                  </div>
                  <span className="hidden sm:block text-xs font-bold text-white tracking-tight">王建国</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 border-slate-200 shadow-2xl rounded-[2rem] overflow-hidden mt-2 bg-white/95 backdrop-blur-xl" align="end">
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => {
                      toast.info("正在切换至关怀模式...");
                    }}
                    className="flex items-center justify-between w-full p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <span className="text-sm font-black text-slate-700">模式切换</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                  </button>
                  
                  <div className="h-px bg-slate-100 mx-4 my-1" />
                  
                  <button 
                    onClick={() => navigate("/dashboard/member-management")}
                    className="w-full text-left p-4 hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    <span className="text-sm font-black text-slate-700">账号与家庭设置</span>
                  </button>
                  
                  <div className="h-px bg-slate-100 mx-4 my-1" />
                  
                  <button 
                    onClick={() => toast.info("帮助中心正在加载...")}
                    className="w-full text-left p-4 hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    <span className="text-sm font-black text-slate-700">帮助中心</span>
                  </button>
                  
                  <button 
                    onClick={() => toast.info("正在接入人工客服...")}
                    className="w-full text-left p-4 hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    <span className="text-sm font-black text-slate-700">联系客服</span>
                  </button>
                  
                  <div className="h-px bg-slate-100 mx-4 my-1" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left p-4 hover:bg-rose-50 text-rose-500 rounded-2xl transition-all"
                  >
                    <span className="text-sm font-black">退出登录</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>


      <div className="flex">
        {/* 侧边栏 - 浮动感设计 */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col p-4">
            <nav className="flex-1 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full group relative flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 outline-none ${
                      isActive
                        ? "text-indigo-600 scale-[1.02]"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {isActive && (
                      <Motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-indigo-50/50 shadow-sm border border-indigo-100/50 rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    </div>
                    
                    <span className={`relative z-10 font-black text-base tracking-tight transition-colors ${isActive ? 'text-indigo-600' : ''}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* 侧边栏动态业务看板 */}
            <div className="space-y-4 pt-4 border-t border-slate-200/50">
              <AnimatePresence mode="wait">
                {isDelivering ? (
                  <Motion.div 
                    key="delivery-kanban"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 rounded-[2rem] bg-indigo-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                            <Truck className="w-5 h-5" />
                         </div>
                         <Badge className="bg-emerald-400 text-slate-900 border-none font-black text-[10px] animate-bounce">配送中</Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-black text-sm tracking-tight">极速配送看板</h4>
                        <p className="text-[10px] text-indigo-100 font-bold opacity-80 uppercase tracking-widest mt-0.5">预计 15 分钟内抵达</p>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between text-[10px] font-bold">
                            <span>社区药房</span>
                            <span>您的住址</span>
                         </div>
                         <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <Motion.div 
                              initial={{ width: "10%" }} 
                              animate={{ width: "65%" }} 
                              transition={{ duration: 2, ease: "easeOut" }}
                              className="h-full bg-white relative" 
                            >
                               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                            </Motion.div>
                         </div>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full h-10 bg-white text-indigo-600 hover:bg-indigo-50 font-black text-xs rounded-xl shadow-lg border-none"
                        onClick={() => navigate("/dashboard/medicine-box")}
                      >
                        查看物流详情
                      </Button>
                    </div>
                  </Motion.div>
                ) : (
                  <Motion.div 
                    key="health-kanban"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden"
                  >
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <ShieldCheck className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">健康看板</p>
                            <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">运行良好</h4>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 rounded-2xl bg-slate-50 text-center">
                            <p className="text-[10px] font-bold text-slate-400 mb-1">今日任务</p>
                            <p className="text-xs font-black text-slate-900">3/4 完成</p>
                         </div>
                         <div className="p-3 rounded-2xl bg-slate-50 text-center">
                            <p className="text-[10px] font-bold text-slate-400 mb-1">心率波动</p>
                            <p className="text-xs font-black text-emerald-600">稳定</p>
                         </div>
                      </div>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-slate-500 hover:text-red-500 transition-colors rounded-2xl hover:bg-red-50 font-bold"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">退出系统</span>
              </button>
            </div>
          </div>
        </aside>

        {/* 主内容区 - 卡片化间距 */}
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* 移动端遮罩 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
