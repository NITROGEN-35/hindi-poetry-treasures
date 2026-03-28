import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-hindi font-bold text-lg">अ</span>
              </div>
              <div className="leading-tight">
                <div className="text-primary font-bold text-sm tracking-wide">AOHP</div>
                <div className="text-muted-foreground text-[10px] tracking-widest uppercase">Art of Hindi Poetry</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating the beauty and depth of Hindi poetry. A curated collection of timeless verses from legendary poets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Poems", to: "/poems" },
                { label: "Poets", to: "/poets" },
                { label: "Library", to: "/library" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {["Love", "Nature", "Life", "Spirituality", "Patriotic", "Philosophy"].map((cat) => (
                <li key={cat}>
                  <Link to={`/poems?category=${cat}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community of poetry lovers and stay updated with new additions.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Mail, label: "Email" },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Art of Hindi Poetry. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart size={12} className="text-primary fill-primary" /> for poetry lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
