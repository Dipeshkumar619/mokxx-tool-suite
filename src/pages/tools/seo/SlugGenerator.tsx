import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function SlugGenerator() {
  const data = findTool("seo", "slug-generator")!;
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const copy = () => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[{ q: "What is a slug?", a: "A slug is a URL-friendly version of a string, typically used in URLs for blog posts or pages." }]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Enter Title or Text</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="e.g., My Blog Post Title!" className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
        </div>
        {slug && (
          <div className="result-box flex items-center justify-between animate-fade-in">
            <code className="text-sm font-mono text-foreground">{slug}</code>
            <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
