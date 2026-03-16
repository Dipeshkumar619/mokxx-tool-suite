import { Link } from "react-router-dom";
import { categories } from "@/data/tools";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">MOKXX</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Free online tools for fitness, media, developers, and everyday tasks. No sign-up required.
            </p>
          </div>
          {categories.slice(0, 4).map(cat => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-sm text-foreground mb-3">{cat.name}</h4>
              <ul className="space-y-2">
                {cat.tools.slice(0, 4).map(tool => (
                  <li key={tool.slug}>
                    <Link to={`/tools/${cat.slug}/${tool.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MOKXX. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
