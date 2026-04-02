import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Heart, Shield, Users, Activity } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 模拟登录
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 模拟注册
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* 左侧 - 品牌信息 */}
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                社区医疗服务
              </h1>
              <p className="text-sm text-muted-foreground">智能关怀 健康同行</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80">
            为社区居民提供便捷、专业的紧急医疗服务平台
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <Shield className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-foreground">专业团队</h3>
              <p className="text-sm text-muted-foreground mt-1">资深医疗专家</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-foreground">社区服务</h3>
              <p className="text-sm text-muted-foreground mt-1">贴心社区关怀</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <Activity className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-foreground">健康档案</h3>
              <p className="text-sm text-muted-foreground mt-1">全面健康管理</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <Heart className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-foreground">紧急服务</h3>
              <p className="text-sm text-muted-foreground mt-1">快速响应机制</p>
            </div>
          </div>
        </div>

        {/* 右侧 - 登录注册表单 */}
        <Card className="p-8 shadow-2xl border-blue-100">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-foreground">用户名/手机号</label>
                  <Input
                    type="text"
                    placeholder="请输入用户名或手机号"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">密码</label>
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-blue-300" />
                    <span className="text-muted-foreground">记住我</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    忘记密码？
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "登录中..." : "登录"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-foreground">用户名</label>
                  <Input
                    type="text"
                    placeholder="请输入用户名"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">手机号</label>
                  <Input
                    type="tel"
                    placeholder="请输入手机号"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">密码</label>
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">确认密码</label>
                  <Input
                    type="password"
                    placeholder="请再次输入密码"
                    className="bg-input-background border-blue-200 focus:border-primary"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "注册中..." : "注册"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
