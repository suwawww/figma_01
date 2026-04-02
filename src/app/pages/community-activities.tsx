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
  Users2,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["全部", "健康讲座", "文体娱乐", "志愿服务", "长者教育"];

const activities = [
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
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-1.png",
    description: "本讲座特邀市医院专家，针对春季气候变化对老年人心血管系统的影响进行深度解析，并提供日常保养与饮食建议。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
      "https://i.pravatar.cc/150?u=4",
    ],
  },
  {
    id: 2,
    title: "\u201c夕阳红\u201d书画艺术交流展",
    category: "文体娱乐",
    date: "2026-04-12",
    time: "09:00 - 17:00",
    location: "社区文化广场 A区",
    organizer: "社区老年书画社",
    participants: 120,
    maxParticipants: 200,
    status: "预热中",
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-2.png",
    description: "展示社区长者们的精美书画作品，旨在弘扬传统文化，增进邻里感情，欢迎各位居民携家属参观。",
    isJoined: true,
    attendees: [
      "https://i.pravatar.cc/150?u=5",
      "https://i.pravatar.cc/150?u=6",
      "https://i.pravatar.cc/150?u=7",
    ],
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
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-4.png",
    description: "诚邀社区长者参与讨论如何优化小区无障碍设施，您的每一条建议都是我们改进社区环境的重要动力。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=8",
      "https://i.pravatar.cc/150?u=9",
    ],
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
    image: "https://raw.githubusercontent.com/suwawww/photo_box/refs/heads/main/6-5.png",
    description: "手把手教您使用微信、支付、地图导航及在线问诊等实用功能，让长者们紧跟时代步伐，享受数字化便利。",
    isJoined: false,
    attendees: [
      "https://i.pravatar.cc/150?u=10",
      "https://i.pravatar.cc/150?u=11",
      "https://i.pravatar.cc/150?u=12",
    ],
  },
];

export function CommunityActivitiesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activities.filter(
    (a) =>
      (selectedCategory === "全部" || a.category === selectedCategory) &&
      (a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.organizer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-16">
      {/* 顶部标题 */}
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
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1.5">
              丰富您的长者生活 · 共享邻里温馨时刻
            </p>
          </div>
        </div>
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

      {/* 分类筛选 */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? "default" : "ghost"}
            className={`rounded-full px-8 h-12 transition-all font-extrabold tracking-tight whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700"
                : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* 活动卡片列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredActivities.map((activity, i) => (
          <Motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() =>
              navigate(`/dashboard/community-activities/${activity.id}`)
            }
            className="group cursor-pointer"
          >
            <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 rounded-[2.5rem] bg-white flex flex-col md:flex-row h-full">
              {/* 图片 */}
              <div className="md:w-60 shrink-0 relative overflow-hidden min-h-[180px]">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:bg-none" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 backdrop-blur-md text-indigo-600 border-none font-extrabold px-3 py-1 rounded-xl shadow-sm text-[11px]">
                    {activity.category}
                  </Badge>
                </div>
                {activity.isJoined && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-indigo-600 text-white border-none font-extrabold text-[10px] px-3 py-1 rounded-xl">
                      ✓ 已报名
                    </Badge>
                  </div>
                )}
              </div>

              {/* 内容 */}
              <div className="p-7 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {activity.date}
                    </span>
                    <Badge
                      className={`border-none font-extrabold text-[10px] px-3 py-1 rounded-lg ${
                        activity.status === "已满员"
                          ? "bg-slate-100 text-slate-400"
                          : activity.status === "火热报名"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug tracking-tight">
                    {activity.title}
                  </h3>

                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                      {activity.time}
                    </p>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                      {activity.location}
                    </p>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wide">
                      <Users2 className="w-3.5 h-3.5 shrink-0" />
                      {activity.organizer}
                    </p>
                  </div>
                </div>

                {/* 底部：参与者 + 进入箭头 */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      {activity.attendees.slice(0, 4).map((a, idx) => (
                        <img
                          key={idx}
                          src={a}
                          className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                          alt="Attendee"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-400">
                      {activity.participants}/{activity.maxParticipants} 人
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
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
