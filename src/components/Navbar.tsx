import { Home, FileText, Users, BookOpen, BookOpenText, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-hindi font-bold text-lg">अ</span>
          </div>
          <div className="leading-tight">
            <div className="text-primary font-bold text-sm tracking-wide">AOHP</div>
            <div className="text-muted-foreground text-[10px] tracking-widest uppercase">Art of Hindi Poetry</div>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {[
            { icon: Home, label: "Home", to: "/" },
            { icon: FileText, label: "Poems", to: "/poems" },
            { icon: Users, label: "Poets", to: "/poets" },
            { icon: BookOpen, label: "Library", to: "/library" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <item.icon size={16} />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <BookOpenText size={16} />
            <span className="hidden sm:inline">Reading</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <User size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
