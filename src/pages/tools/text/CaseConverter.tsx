import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CaseConverter() {
  const data = findTool("text", "case-converter")!;
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = (type: string) => {
    switch (type) {
      case "upper": setResult(text.toUpperCase()); break;
      case "lower": setResult(text.toLowerCase()); break;
      case "title": setResult(text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())); break;
      case "sentence": setResult(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()); break;
      case "toggle": setResult(text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("")); break;
    }
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[{ q: "What case formats are supported?", a: "Uppercase, lowercase, title case, sentence case, and toggle case." }]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Enter text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste your text here..." rows={5} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[["upper", "UPPERCASE"], ["lower", "lowercase"], ["title", "Title Case"], ["sentence", "Sentence case"], ["toggle", "tOGGLE"]].map(([k, l]) => (
            <Button key={k} size="lg" variant="outline" onClick={() => convert(k)}>{l}</Button>
          ))}
        </div>
        {result && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="label-text">Result</label>
              <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}{copied ? "Copied" : "Copy"}</Button>
            </div>
            <pre className="result-box text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
