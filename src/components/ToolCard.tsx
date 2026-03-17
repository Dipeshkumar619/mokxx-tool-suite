import { Link } from "react-router-dom";
import { Tool, Category } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  category: Category;
}

export default function ToolCard({ tool, category }: ToolCardProps) {
  return (
    <Link to={`/tools/${category.slug}/${tool.slug}`} className="tool-card flex items-start gap-4 group">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <tool.icon className="w-5 h-5 text-primary" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
      </div>
    </Link>
  );
}
