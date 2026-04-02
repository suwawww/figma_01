import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { toast } from "sonner";
import {
  BookOpen,
  Search,
  Heart,
  Brain,
  Apple,
  Dumbbell,
  Pill,
  Baby,
  Users2,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Play,
} from "lucide-react";

const categories = [
  { id: "all", name: "全部", icon: BookOpen },
  { id: "chronic", name: "慢病管理", icon: Heart },
  { id: "mental", name: "心理健康", icon: Brain },
  { id: "nutrition", name: "营养膳食", icon: Apple },
  { id: "exercise", name: "运动健康", icon: Dumbbell },
  { id: "medicine", name: "用药指导", icon: Pill },
  { id: "child", name: "儿童健康", icon: Baby },
  { id: "elderly", name: "老年保健", icon: Users2 },
];

const knowledgeArticles = [
  {
    id: 1,
    title: "高血压患者的日常管理与注意事项",
    category: "chronic",
    author: "李明医生",
    date: "2026-03-29",
    readTime: "5分钟",
    views: 3456,
    likes: 234,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "高血压是常见的慢性疾病，通过规范的生活方式和科学用药可以有效控制血压...",
    featured: true,
  },
  {
    id: 2,
    title: "如何缓解工作压力与焦虑情绪",
    category: "mental",
    author: "陈静医生",
    date: "2026-03-28",
    readTime: "8分钟",
    views: 2890,
    likes: 189,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "现代生活节奏快，工作压力大，学会自我调节和心理疏导非常重要...",
    featured: false,
  },
  {
    id: 3,
    title: "均衡饮食：一日三餐的科学搭配",
    category: "nutrition",
    author: "张伟医生",
    date: "2026-03-27",
    readTime: "6分钟",
    views: 4123,
    likes: 312,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "营养均衡的饮食是健康的基础，本文详细介绍如何科学安排一日三餐...",
    featured: true,
  },
  {
    id: 4,
    title: "适合中老年人的运动方式推荐",
    category: "exercise",
    author: "王芳医生",
    date: "2026-03-26",
    readTime: "7分钟",
    views: 2456,
    likes: 178,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "中老年人需要选择适合自己年龄和身体状况的运动方式来保持健康...",
    featured: false,
  },
  {
    id: 5,
    title: "常见药物的正确使用方法",
    category: "medicine",
    author: "赵医生",
    date: "2026-03-25",
    readTime: "10分钟",
    views: 3789,
    likes: 256,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "正确用药是治疗疾病的关键，了解药物的使用时间、剂量和注意事项...",
    featured: false,
  },
  {
    id: 6,
    title: "儿童春季常见疾病预防指南",
    category: "child",
    author: "刘医生",
    date: "2026-03-24",
    readTime: "6分钟",
    views: 2134,
    likes: 145,
    image: "https://images.unsplash.com/photo-1669165266608-5aa72f61303b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBrbm93bGVkZ2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0OTQ2NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    summary: "春季是儿童呼吸道疾病高发期，家长应该了解预防措施和护理方法...",
    featured: false,
  },
];

const videoTutorials = [
  {
    id: 1,
    title: "心肺复苏CPR操作演示",
    duration: "10:23",
    views: 15234,
    thumbnail: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzc0OTEwOTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "正确测量血压的方法",
    duration: "5:47",
    views: 8932,
    thumbnail: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzc0OTEwOTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "居家康复训练指导",
    duration: "12:15",
    views: 6543,
    thumbnail: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGh8ZW58MXx8fHwxNzc0OTEwOTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function HealthKnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = knowledgeArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          健康知识
        </h1>
        <p className="text-muted-foreground mt-1">科学健康知识，守护您的健康</p>
      </div>

      {/* 搜索栏 */}
      <Card className="p-4 border-blue-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索健康知识..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input-background"
          />
        </div>
      </Card>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "bg-white text-foreground hover:bg-blue-50 border border-blue-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles">
            <BookOpen className="w-4 h-4 mr-2" />
            文章
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Play className="w-4 h-4 mr-2" />
            视频教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-8 mt-6">
          {/* 推荐文章 */}
          {featuredArticles.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded"></span>
                推荐阅读
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow border-blue-100 group cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          推荐
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {article.likes}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 全部文章 */}
          {regularArticles.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded"></span>
                全部文章
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100 group cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground">
                          {article.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {article.likes}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">暂无相关文章</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3">{video.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} 次观看</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}