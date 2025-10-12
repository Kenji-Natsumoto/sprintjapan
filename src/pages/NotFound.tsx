import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">ページが見つかりません</h2>
          <p className="text-foreground/80 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Home className="mr-2" size={20} />
              ホームに戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
