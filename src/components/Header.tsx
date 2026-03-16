import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { searchTools } from "@/data/tools";

export default function Header() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const results = query.length > 1 ? searchTools(query) : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">MOKXX</span>
        </Link>

        <div ref={ref} className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="global-search"
              type="text"
              placeholder="Search tools... ⌘K"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
            />
          </div>
          {open && results.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-card rounded-xl shadow-lg ring-1 ring-border max-h-80 overflow-y-auto z-50">
              {results.slice(0, 8).map(({ category, tool }) => (
                <Link
                  key={tool.slug}
                  to={`/tools/${category.slug}/${tool.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <tool.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {["Fitness", "Media", "Developer", "Text", "SEO"].map(cat => (
            <Link
              key={cat}
              to={`/tools/${cat.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
