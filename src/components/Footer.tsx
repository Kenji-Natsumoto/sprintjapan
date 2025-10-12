import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-elevated border-t border-border">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                <div className="w-1 h-6 bg-primary rounded-sm"></div>
                <div className="w-1 h-6 bg-secondary rounded-sm"></div>
                <div className="w-1 h-6 bg-accent rounded-sm"></div>
                <div className="w-1 h-6 bg-primary rounded-sm"></div>
              </div>
              <span className="text-lg font-bold">ProSprint</span>
            </div>
            <p className="text-sm text-muted-foreground">
              会議の知を、即ソフトへ。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">プロダクト</h3>
            <div className="flex flex-col gap-2">
              <Link to="/platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                プラットフォーム
              </Link>
              <Link to="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ソリューション
              </Link>
              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                導入実績
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">企業情報</h3>
            <div className="flex flex-col gap-2">
              <Link to="/vision" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ビジョン
              </Link>
              <Link to="/company" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                会社情報
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">お問い合わせ</h3>
            <div className="flex flex-col gap-2">
              <Link to="/rfi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                資料請求
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sprint Japan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
