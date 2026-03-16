import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
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
        <section className="py-16 sm:py-24 px-4" style={{ background: "var(--hero-gradient)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Free Online Tools for Fitness, Media, Developers and Everyday Tasks
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              mokxx.com provides simple and powerful tools to help you calculate, convert, download, and optimize things instantly.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 25+ free tools..."
                value={heroQuery}
                onChange={e => setHeroQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-background ring-1 ring-border text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg transition-all"
              />
              {heroResults.length > 0 && (
                <div className="absolute top-16 left-0 right-0 bg-card rounded-xl shadow-lg ring-1 ring-border max-h-64 overflow-y-auto z-50">
                  {heroResults.slice(0, 6).map(({ category, tool }) => (
                    <Link
                      key={tool.slug}
                      to={`/tools/${category.slug}/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    >
                      <tool.icon className="w-4 h-4 text-muted-foreground" />
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
            <div key={category.slug} className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">{category.name}</h2>
                </div>
                <Link
                  to={`/tools/${category.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
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
