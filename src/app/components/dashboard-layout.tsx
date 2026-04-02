import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Home,
  Network,
  BookOpen,
  LogOut,
  Bell,
  MessageSquare,
  Pill,
  Users,
  ChevronRight,
  Activity,
  Phone,
  Edit,
  Stethoscope,
  Menu,
  X,
  AlertTriangle,
  Droplets,
  HeartPulse,
  User,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

// ─── 顶部导航项 ───────────────────────────────────────────────────────────────
const topNavItems = [
  { name: "主页", path: "/dashboard", icon: Home, exact: true },
  { name: "社区医疗服务", path: "/dashboard/medical-network", icon: Stethoscope },
  { name: "在线问诊", path: "/dashboard/consultation-selection", icon: MessageSquare },
  { name: "知识课堂", path: "/dashboard/health-knowledge", icon: BookOpen },
  { name: "药箱管理", path: "/dashboard/medicine-box", icon: Pill },
  { name: "社区活动", path: "/dashboard/community-activities", icon: Users },
];

// ─── 用户信息 ──────────────────────────────────────────────────────────────────
const userProfile = {
  name: "王建国",
  gender: "男",
  age: 68,
  bloodType: "A型",
  chronicDisease: "高血压",
  avatar: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/08.png",
};

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => navigate("/");

  // 判断导航项是否激活
  const isNavActive = (item: { path: string; exact?: boolean }) => {
    if (item.exact) return location.pathname === item.path;
    return (
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/60">
      {/* ── 顶部导航栏 ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-indigo-600 shadow-lg shadow-indigo-900/20">
        {/* 主行 */}
        <div className="flex items-center justify-between px-4 lg:px-6 h-16 text-white">
          {/* 左：Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="hidden sm:block font-extrabold text-base tracking-tight text-white">
              社区紧急医疗服务站
            </span>
          </div>

          {/* 中：桌面端导航标签 */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {topNavItems.map((item) => {
              const active = isNavActive(item);
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all outline-none ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  {active && (
                    <Motion.div
                      layoutId="top-nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 右：操作区 */}
          <div className="flex items-center gap-3 shrink-0">
            {/* 系统状态 */}
            <div className="hidden xl:flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/20 gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-white">系统正常</span>
            </div>

            {/* 通知 */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-white/10 text-white rounded-full"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full ring-2 ring-indigo-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-0 border-slate-200 shadow-2xl rounded-3xl overflow-hidden mt-2"
                align="end"
              >
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
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        药品到库提醒
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        您关注的降压药已补货完成。
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2">10分钟前</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* 用户头像下拉 */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 p-1 pr-3 hover:bg-white/10 rounded-full transition-all border border-white/10 outline-none group">
                  <div className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden group-hover:scale-110 transition-transform">
                    <ImageWithFallback
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:block text-xs font-bold text-white tracking-tight">
                    {userProfile.name}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 border-slate-200 shadow-2xl rounded-[2rem] overflow-hidden mt-2 bg-white/95 backdrop-blur-xl"
                align="end"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => navigate("/dashboard/account-family")}
                    className="flex items-center justify-between w-full p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <span className="text-sm font-black text-slate-700">账号与家庭设置</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  <div className="h-px bg-slate-100 mx-4 my-1" />

                  <button
                    onClick={() => toast.info("模式切换功能开发中...")}
                    className="flex items-center justify-between w-full p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <span className="text-sm font-black text-slate-700">模式切换</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all" />
                  </button>

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

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {mobileNavOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端导航：横向滚动 */}
        <AnimatePresence>
          {mobileNavOpen && (
            <Motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide">
                {topNavItems.map((item) => {
                  const active = isNavActive(item);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileNavOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                        active
                          ? "bg-white text-indigo-600"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 主体区域 ──────────────────────────────────────────────────────── */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* ── 左侧：用户信息面板 ─────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          {/* 蓝色渐变主卡片 */}
          <div className="flex flex-col flex-1 m-4 rounded-3xl bg-gradient-to-b from-indigo-600 to-indigo-700 p-5 shadow-xl shadow-indigo-200/60 overflow-hidden relative">
            {/* 装饰圆 */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />

            {/* 头像 */}
            <div className="relative z-10 flex flex-col items-center pt-3 pb-5">
              <div className="w-24 h-24 rounded-full border-4 border-white/60 shadow-xl overflow-hidden mb-3">
                <ImageWithFallback
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-2xl font-extrabold tracking-tight">
                {userProfile.name}
              </h2>
              <p className="text-indigo-200 text-xs mt-1">社区居民 · 健康用户</p>
            </div>

            {/* 个人信息卡 */}
            <div className="relative z-10 bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
              <p className="text-white/80 text-xs font-bold mb-3 tracking-wide">个人信息</p>
              {[
                { label: "姓名", value: userProfile.name },
                { label: "性别", value: userProfile.gender },
                { label: "年龄", value: `${userProfile.age} 岁` },
                { label: "血型", value: userProfile.bloodType },
                { label: "慢性病", value: userProfile.chronicDisease },
              ].map((row, i, arr) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-white/70 text-sm">{row.label}</span>
                    <span className="text-white text-sm font-semibold">{row.value}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-px bg-white/10" />
                  )}
                </div>
              ))}

              {/* 修改信息按钮 */}
              <button
                onClick={() => navigate("/dashboard/account-family")}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-2.5 rounded-xl transition-all border border-white/30"
              >
                <Edit className="w-4 h-4" />
                去修改个人信息
              </button>
            </div>

            {/* 健康小指标 */}
            <div className="relative z-10 grid grid-cols-2 gap-2 mb-4">
              <div className="bg-white/15 rounded-2xl p-3 border border-white/20 text-center">
                <HeartPulse className="w-5 h-5 text-rose-300 mx-auto mb-1" />
                <p className="text-white text-xs font-bold">72 bpm</p>
                <p className="text-white/50 text-[10px]">心率</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-3 border border-white/20 text-center">
                <Droplets className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                <p className="text-white text-xs font-bold">128/82</p>
                <p className="text-white/50 text-[10px]">血压</p>
              </div>
            </div>

            {/* 紧急求助按钮 */}
            <button
              onClick={() => {
                toast.error("🚨 紧急求助已发送！社区医疗站正在响应...", {
                  duration: 5000,
                });
              }}
              className="relative z-10 w-full flex items-center justify-center gap-3 bg-white hover:bg-rose-50 text-indigo-700 font-extrabold text-base py-4 rounded-2xl transition-all shadow-lg active:scale-95 border-2 border-white mt-auto"
            >
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              紧急求助
            </button>

            {/* 退出登录 */}
            <button
              onClick={handleLogout}
              className="relative z-10 mt-3 w-full flex items-center justify-center gap-2 text-white/50 hover:text-white/80 text-xs py-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              退出系统
            </button>
          </div>
        </aside>

        {/* ── 主内容区 ───────────────────────────────────────────────────── */}
        <main className="flex-1 p-5 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
