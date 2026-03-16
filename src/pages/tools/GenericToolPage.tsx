import { useParams } from "react-router-dom";
import { findTool } from "@/data/tools";
import ToolLayout from "@/components/ToolLayout";

export default function GenericToolPage() {
  const { categorySlug, toolSlug } = useParams<{ categorySlug: string; toolSlug: string }>();
  const data = findTool(categorySlug || "", toolSlug || "");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Tool not found</p>
      </div>
    );
  }

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: `How does ${data.tool.name} work?`, a: `${data.tool.description}. This tool processes everything in your browser for maximum privacy and speed.` },
      ]}
    >
      <div className="text-center py-12">
        <data.tool.icon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{data.tool.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{data.tool.description}</p>
        <p className="text-xs text-muted-foreground">This tool is coming soon. Check back later!</p>
      </div>
    </ToolLayout>
  );
}
