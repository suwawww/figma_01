import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  Activity, Eye, EyeOff, Phone, Lock, User, ArrowRight,
  Heart, HeartPulse, ShieldCheck,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ─── 数据 ────────────────────────────────────────────────────────────────────
const carouselImages = [
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/0.png",  caption: "专业团队，守护健康" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/01.png", caption: "贴心服务，温暖相伴" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/02.png", caption: "智慧医疗，触手可及" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/03.png", caption: "社区关怀，共筑健康" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/04.png", caption: "快速响应，安心保障" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/05.png", caption: "全程陪伴，健康同行" },
  { src: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/06.png", caption: "用心呵护，幸福长者" },
];

const floatingStats = [
  { icon: Heart,       label: "社区居民", value: "1,200+", color: "bg-rose-500/20 border-rose-400/30 text-rose-200",         pos: "absolute -left-14 top-10" },
  { icon: HeartPulse,  label: "全天响应", value: "24 H",   color: "bg-emerald-500/20 border-emerald-400/30 text-emerald-200", pos: "absolute -right-14 top-1/3" },
  { icon: ShieldCheck, label: "满意度",   value: "98 %",   color: "bg-amber-500/20 border-amber-400/30 text-amber-200",       pos: "absolute -left-10 bottom-14" },
];

const orbs = [
  { size: 420, x: "10%", y: "15%", delay: 0, duration: 8  },
  { size: 300, x: "60%", y: "65%", delay: 2, duration: 10 },
  { size: 200, x: "75%", y: "10%", delay: 1, duration: 7  },
  { size: 160, x: "20%", y: "75%", delay: 3, duration: 9  },
];

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
  center: {              x: 0,                             opacity: 1, scale: 1    },
  exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%",  opacity: 0, scale: 0.96 }),
};

// ─── 轮播点指示器（复用） ──────────────────────────────────────────────────────
function CarouselDots({
  total, current, onGo, light = false,
}: { total: number; current: number; onGo: (i: number) => void; light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onGo(i)} className="outline-none group">
          <Motion.div
            animate={{ width: i === current ? 24 : 8, opacity: i === current ? 1 : 0.35 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`h-2 rounded-full group-hover:opacity-60 ${light ? "bg-white/70" : "bg-indigo-300"}`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── 主组件 ────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading]             = useState(false);
  const [activeTab, setActiveTab]             = useState<"login" | "register">("login");
  const [showPass, setShowPass]               = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [current, setCurrent]                 = useState(0);
  const [direction, setDirection]             = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate("/dashboard"); }, 1000);
  };

  return (
    /**
     * 整体容器
     * 手机: flex-col（上下布局）
     * 桌面: flex-row（左右布局）
     */
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════════
          视觉面板
          手机: 固定高度横幅（h-72），全幅轮播背景图 + 渐变遮罩
          桌面: 占满左侧高度，含居中轮播卡片 + 浮动数据角标
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          "relative flex flex-col bg-indigo-950 overflow-hidden",
          // 手机固定高度；桌面弹性填满
          "h-72 sm:h-80",
          "lg:flex-1 lg:h-auto",
        ].join(" ")}
      >
        {/* 背景气泡（桌面可见） */}
        {orbs.map((orb, i) => (
          <Motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* 右侧融合渐变（桌面） */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-950/60 to-transparent z-10 pointer-events-none" />
        {/* 底部渐变 */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-indigo-950 to-transparent pointer-events-none z-10" />

        {/* ── 手机专属：全幅轮播背景图 ─────────────────────────────────── */}
        <div className="lg:hidden absolute inset-0 z-[1]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <Motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={carouselImages[current].src}
                alt={carouselImages[current].caption}
                className="w-full h-full object-cover"
              />
            </Motion.div>
          </AnimatePresence>
        </div>
        {/* 手机遮罩（从下方深色到上方半透明） */}
        <div className="lg:hidden absolute inset-0 z-[2] bg-gradient-to-t from-indigo-950 via-indigo-900/60 to-indigo-800/30 pointer-events-none" />

        {/* ── 内容层 ─────────────────────────────────────────────────── */}
        <div className="relative z-20 flex flex-col h-full px-6 sm:px-8 lg:px-14 py-5 sm:py-6 lg:py-12">

          {/* Logo（始终显示） */}
          <Motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white/15 border border-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <span className="text-white font-extrabold tracking-tight text-sm lg:text-base">
              社区紧急医疗服务站
            </span>
          </Motion.div>

          {/* ── 手机：底部标语 + 轮播点 ──────────────────────────────── */}
          <div className="lg:hidden flex-1 flex flex-col justify-end gap-2.5">
            <AnimatePresence mode="wait">
              <Motion.p
                key={current}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/90 text-xs font-extrabold tracking-widest uppercase"
              >
                {carouselImages[current].caption}
              </Motion.p>
            </AnimatePresence>
            <CarouselDots total={carouselImages.length} current={current} onGo={goTo} light />
          </div>

          {/* ── 桌面：大标题 + 轮播卡片 + 点 ────────────────────────── */}
          <div className="hidden lg:flex flex-1 flex-col items-center justify-center -mt-4 gap-8">

            {/* 大标题 */}
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                守护您的<br />
                <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                  每一天健康
                </span>
              </h1>
              <p className="text-indigo-300 text-sm font-medium max-w-xs mx-auto leading-relaxed">
                智能关怀，专业团队，社区长者的贴心医疗服务平台
              </p>
            </Motion.div>

            {/* 轮播卡片（含浮动角标） */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-2xl scale-105 pointer-events-none" />

              <div className="relative w-72 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/60">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <Motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={carouselImages[current].src}
                      alt={carouselImages[current].caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent" />
                    <Motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="absolute bottom-4 left-0 right-0 text-center text-white text-xs font-extrabold tracking-widest uppercase px-4"
                    >
                      {carouselImages[current].caption}
                    </Motion.p>
                  </Motion.div>
                </AnimatePresence>
              </div>

              {/* 浮动数据角标（桌面独有） */}
              {floatingStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                    className={stat.pos}
                  >
                    <Motion.div
                      animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md border ${stat.color} whitespace-nowrap`}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold leading-none">{stat.value}</p>
                          <p className="text-[9px] opacity-70 mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    </Motion.div>
                  </Motion.div>
                );
              })}
            </Motion.div>

            {/* 轮播点 */}
            <CarouselDots total={carouselImages.length} current={current} onGo={goTo} />
          </div>

          {/* 桌面底部装饰 */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden lg:flex items-center justify-center gap-2 pb-2"
          >
            {[0, 1, 2].map((i) => (
              <Motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/50"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
          </Motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          表单面板
          手机: flex-1（填满剩余高度），可滚动，左右窄边距
          桌面: 固定宽度 420px，居中
      ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full flex-1 lg:flex-none lg:w-[420px] xl:w-[460px] flex items-start lg:items-center justify-center bg-white relative overflow-y-auto">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/80 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50/60 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 w-full max-w-sm px-6 sm:px-8 pt-8 pb-10 lg:py-12"
        >
          {/* 欢迎标题 */}
          <div className="mb-7">
            <Motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1"
            >
              {activeTab === "login" ? "欢迎回来" : "创建账号"}
            </Motion.h2>
            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-sm"
            >
              {activeTab === "login" ? "登录您的健康管家账号" : "加入社区医疗服务平台"}
            </Motion.p>
          </div>

          {/* Tab 切换 */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-7">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-1 py-2.5 text-sm font-extrabold rounded-xl transition-all outline-none"
              >
                {activeTab === tab && (
                  <Motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-white shadow-sm rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${activeTab === tab ? "text-indigo-600" : "text-slate-400"}`}>
                  {tab === "login" ? "登录" : "注册"}
                </span>
              </button>
            ))}
          </div>

          {/* 表单 */}
          <AnimatePresence mode="wait">
            <Motion.form
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* 姓名（注册专用） */}
              {activeTab === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">姓名</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input type="text" placeholder="请输入真实姓名"
                      className="pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all font-bold" required />
                  </div>
                </div>
              )}

              {/* 手机号 */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">手机号</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input type="tel" placeholder="请输入手机号码"
                    className="pl-10 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all font-bold" required />
                </div>
              </div>

              {/* 密码 */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input type={showPass ? "text" : "password"} placeholder="请输入密码"
                    className="pl-10 pr-10 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all font-bold" required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 确认密码（注册专用） */}
              {activeTab === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input type={showConfirmPass ? "text" : "password"} placeholder="请再次输入密码"
                      className="pl-10 pr-10 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all font-bold" required />
                    <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* 记住我 / 忘记密码（登录专用） */}
              {activeTab === "login" && (
                <div className="flex items-center justify-between text-sm pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-4 h-4 border-2 border-slate-200 rounded group-hover:border-indigo-400 transition-colors shrink-0" />
                    <span className="text-slate-400 font-bold">记住我</span>
                  </label>
                  <button type="button" className="text-indigo-500 font-extrabold text-xs hover:text-indigo-700 transition-colors">
                    忘记密码？
                  </button>
                </div>
              )}

              {/* 提交按钮 */}
              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 py-3.5 h-auto"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <Motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        {activeTab === "login" ? "登录中..." : "注册中..."}
                      </Motion.div>
                    ) : (
                      <Motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        {activeTab === "login" ? "登录账号" : "立即注册"}
                        <ArrowRight className="w-4 h-4" />
                      </Motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>

              {/* 分隔线 */}
              <div className="flex items-center gap-4 py-0.5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">或</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* 游客体验 */}
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all text-sm font-extrabold text-slate-500 hover:text-indigo-600"
              >
                游客模式体验
              </button>
            </Motion.form>
          </AnimatePresence>

          {/* 版权 */}
          <p className="text-center text-[11px] text-slate-300 font-bold mt-8 uppercase tracking-widest">
            © 2026 社区紧急医疗服务站
          </p>
        </Motion.div>
      </div>
    </div>
  );
}
