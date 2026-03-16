import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { categories } from "@/data/tools";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Category not found</h1>
            <Link to="/" className="text-primary hover:underline text-sm">Go home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <category.icon className={`w-8 h-8 ${category.color}`} />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{category.name}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{category.description}</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map(tool => (
              <ToolCard key={tool.slug} tool={tool} category={category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
