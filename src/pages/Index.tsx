import { Link } from "react-router-dom";
import { Search, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { categories, searchTools } from "@/data/tools";

export default function Index() {
  const [heroQuery, setHeroQuery] = useState("");
  const heroResults = heroQuery.length > 1 ? searchTools(heroQuery) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              25+ Free Tools — No Sign-up Required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
              Free Online Tools for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Builders & Creators
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Calculate, convert, optimize, and build — instantly in your browser. No accounts, no downloads.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 25+ free tools..."
                value={heroQuery}
                onChange={e => setHeroQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-2xl transition-all"
              />
              {heroResults.length > 0 && (
                <div className="absolute top-16 left-0 right-0 bg-card rounded-xl shadow-2xl border border-border max-h-64 overflow-y-auto z-50">
                  {heroResults.slice(0, 6).map(({ category, tool }) => (
                    <Link
                      key={tool.slug}
                      to={`/tools/${category.slug}/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    >
                      <tool.icon className="w-4 h-4 text-primary/70" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{category.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          {categories.map(category => (
            <div key={category.slug} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">{category.name}</h2>
                </div>
                <Link
                  to={`/tools/${category.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} category={category} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
