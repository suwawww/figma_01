import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  Users, 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  Plus,
  ArrowRight,
  Info,
  CheckCircle2,
  Users2
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";

const categories = ["全部", "健康讲座", "文体娱乐", "志愿服务", "长者教育"];

const initialActivities = [
  {
    id: 1,
    title: "春季心血管健康公益讲座",
    category: "健康讲座",
    date: "2026-04-10",
    time: "14:00 - 16:00",
    location: "社区活动中心 2楼多功能厅",
    organizer: "市第一人民医院 心内科",
    participants: 45,
    maxParticipants: 60,
    status: "进行中",
    image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?w=600&q=80",
    description: "本讲座特邀市医院专家，针对春季气候变化对老年人心血管系统的影响进行深度解析，并提供日常保养与饮食建议。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
      "https://i.pravatar.cc/150?u=4"
    ]
  },
  {
    id: 2,
    title: "“夕阳红”书画艺术交流展",
    category: "文体娱乐",
    date: "2026-04-12",
    time: "09:00 - 17:00",
    location: "社区文化广场 A区",
    organizer: "社区老年书画社",
    participants: 120,
    maxParticipants: 200,
    status: "预热中",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    description: "展示社区长者们的精美书画作品，旨在弘扬传统文化，增进邻里感情，欢迎各位居民携家属参观。",
    isJoined: true,
    attendees: [
      "https://i.pravatar.cc/150?u=5",
      "https://i.pravatar.cc/150?u=6",
      "https://i.pravatar.cc/150?u=7"
    ]
  },
  {
    id: 3,
    title: "社区适老化设施改造意见征集会",
    category: "志愿服务",
    date: "2026-04-15",
    time: "10:00 - 11:30",
    location: "居委会会议室",
    organizer: "社区居委会",
    participants: 18,
    maxParticipants: 30,
    status: "火热报名",
    image: "https://images.unsplash.com/photo-1544333346-611910688a10?w=600&q=80",
    description: "诚邀社区长者参与讨论如何优化小区无障碍设施，您的每一条建议都是我们改进社区环境的重要动力。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=8",
      "https://i.pravatar.cc/150?u=9"
    ]
  },
  {
    id: 4,
    title: "智能手机应用基础培训班 (第二期)",
    category: "长者教育",
    date: "2026-04-18",
    time: "14:30 - 16:00",
    location: "社区智慧教室",
    organizer: "青年志愿者协会",
    participants: 25,
    maxParticipants: 25,
    status: "已满员",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80",
    description: "手把手教您使用微信、支付、地图导航及在线问诊等实用功能，让长者们紧跟时代步伐，享受数字化便利。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=10",
      "https://i.pravatar.cc/150?u=11",
      "https://i.pravatar.cc/150?u=12"
    ]
  }
];

export function CommunityActivitiesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<typeof initialActivities[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activities, setActivities] = useState(initialActivities);

  const filteredActivities = activities.filter(a => 
    (selectedCategory === "全部" || a.category === selectedCategory) &&
    (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.organizer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoin = (id: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, isJoined: !a.isJoined, participants: a.isJoined ? a.participants - 1 : a.participants + 1 } : a));
    
    const activity = activities.find(a => a.id === id);
    if (activity?.isJoined) {
      toast.success("已取消报名");
    } else {
      toast.success("报名成功！记得按时参加哦~");
    }
    
    setIsDetailOpen(false);
  };

  const openDetail = (activity: typeof initialActivities[0]) => {
    setSelectedActivity(activity);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 顶部导航 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
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
              社区活动
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1.5">丰富您的长者生活 · 共享邻里温馨时刻</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="搜索感兴趣的活动..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-14 bg-white border-slate-200/60 rounded-2xl focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 分类筛选 - Pill design */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? "default" : "ghost"}
            className={`rounded-full px-8 h-12 transition-all font-extrabold tracking-tight ${
              selectedCategory === cat 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700" 
                : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* 活动列表 - Bento Style Masonry-ish Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredActivities.map((activity, i) => (
          <Motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => openDetail(activity)}
            className="group cursor-pointer"
          >
            <Card className="overflow-hidden border-none shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 rounded-[2.5rem] bg-white group flex flex-col md:flex-row h-full border border-slate-100">
              <div className="md:w-64 shrink-0 relative overflow-hidden">
                <ImageWithFallback 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-5 left-5">
                  <Badge className="bg-white/95 backdrop-blur-md text-indigo-600 border-none font-extrabold px-4 py-1.5 rounded-xl shadow-sm">
                    {activity.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {activity.date}
                     </span>
                     <Badge className={`border-none ${activity.status === '已满员' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-100 text-emerald-600'} font-extrabold text-[10px] px-3 py-1 rounded-lg`}>
                       {activity.status}
                     </Badge>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight tracking-tight">
                    {activity.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {activity.location}
                    </p>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                      <Users2 className="w-3.5 h-3.5" />
                      {activity.organizer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                         {activity.attendees.map((a, idx) => (
                            <img key={idx} src={a} className="w-8 h-8 rounded-full border-4 border-white shadow-sm" alt="Attendee" />
                         ))}
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-400 tracking-wide uppercase">
                        {activity.participants} / {activity.maxParticipants} 已加入
                      </span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </Card>
          </Motion.div>
        ))}
      </div>

      {/* 活动详情弹窗 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none rounded-[3.5rem] shadow-2xl">
          {selectedActivity && (
            <div className="flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="h-80 relative">
                <ImageWithFallback 
                  src={selectedActivity.image} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-6 right-8 flex gap-3">
                   <Button size="icon" variant="ghost" className="bg-white/15 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 h-11 w-11 border border-white/20">
                      <Share2 className="w-5 h-5" />
                   </Button>
                   <Button size="icon" variant="ghost" className="bg-white/15 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 h-11 w-11 border border-white/20">
                      <Bookmark className="w-5 h-5" />
                   </Button>
                </div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                   <DialogTitle className="text-4xl font-extrabold mb-4 tracking-tighter leading-tight">{selectedActivity.title}</DialogTitle>
                   <DialogDescription className="sr-only">
                     查看 {selectedActivity.title} 的活动时间、地点和详情。
                   </DialogDescription>
                   <div className="flex items-center gap-6 text-sm font-bold opacity-90 tracking-wide uppercase">
                      <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" /> {selectedActivity.date}</span>
                      <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-400" /> {selectedActivity.time}</span>
                   </div>
                </div>
              </div>

              <div className="p-12 bg-white space-y-12">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                          <Users2 className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest mb-1">当前热度</p>
                          <p className="text-xl font-extrabold text-slate-900">{selectedActivity.participants} 人参与</p>
                       </div>
                    </div>
                    <div className="p-6 rounded-[2.5rem] bg-amber-50 border border-amber-100 flex items-center gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-100">
                          <MapPin className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest mb-1">活动地点</p>
                          <p className="text-xl font-extrabold text-slate-900 truncate">多功能厅</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="font-extrabold text-2xl text-slate-900 flex items-center gap-3 tracking-tight">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                       关于本次活动
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-lg">
                       {selectedActivity.description}
                    </p>
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                          <div>
                             <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">主办单位</p>
                             <p className="text-sm font-extrabold text-slate-800">{selectedActivity.organizer}</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                          <div>
                             <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">参与对象</p>
                             <p className="text-sm font-extrabold text-slate-800">社区长者及家属</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6">
                    <Button 
                      disabled={selectedActivity.status === '已满员' && !selectedActivity.isJoined}
                      onClick={() => handleJoin(selectedActivity.id)}
                      className={`w-full h-20 rounded-[2rem] text-xl font-extrabold shadow-2xl transition-all ${
                        selectedActivity.isJoined 
                          ? "bg-slate-100 text-slate-400 hover:bg-slate-200" 
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 active:scale-95"
                      }`}
                    >
                       {selectedActivity.isJoined ? "取消我的报名" : (selectedActivity.status === '已满员' ? "报名名额已满" : "立即加入活动")}
                    </Button>
                    <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest">
                       报名后系统将自动为您同步至健康日程表
                    </p>
                 </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
