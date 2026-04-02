import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold text-foreground mt-4 mb-2">
            页面未找到
          </p>
          <p className="text-muted-foreground">
            抱歉，您访问的页面不存在或已被移除
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一页
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
