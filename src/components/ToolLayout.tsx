import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Category, Tool } from "@/data/tools";

interface ToolLayoutProps {
  category: Category;
  tool: Tool;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
  relatedTools?: Tool[];
}

export default function ToolLayout({ category, tool, children, faq, relatedTools }: ToolLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/tools/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">{tool.name}</h1>
                <p className="text-lg text-muted-foreground">{tool.description}</p>
              </header>

              <section className="tool-card p-6 mb-8">
                {children}
              </section>

              {faq && faq.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faq.map((item, i) => (
                      <div key={i} className="tool-card p-5">
                        <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="rounded-xl bg-secondary p-6 ring-1 ring-border">
                <p className="label-text mb-3">Advertisement</p>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Ad Space</span>
                </div>
              </div>

              {relatedTools && relatedTools.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Related Tools</h3>
                  <div className="space-y-2">
                    {relatedTools.map(t => (
                      <Link
                        key={t.slug}
                        to={`/tools/${category.slug}/${t.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <t.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{t.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
