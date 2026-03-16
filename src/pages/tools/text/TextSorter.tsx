import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function TextSorter() {
  const data = findTool("text", "text-sorter")!;
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const sort = (type: string) => {
    const lines = text.split("\n").filter(l => l.trim());
    switch (type) {
      case "az": setResult(lines.sort((a, b) => a.localeCompare(b)).join("\n")); break;
      case "za": setResult(lines.sort((a, b) => b.localeCompare(a)).join("\n")); break;
      case "short": setResult(lines.sort((a, b) => a.length - b.length).join("\n")); break;
      case "long": setResult(lines.sort((a, b) => b.length - a.length).join("\n")); break;
      case "reverse": setResult(lines.reverse().join("\n")); break;
      case "random": setResult(lines.sort(() => Math.random() - 0.5).join("\n")); break;
    }
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "How does sorting work?", a: "Each line of text is treated as a separate item. Lines are sorted based on the method you choose." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Enter text (one item per line)</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder={"banana\napple\ncherry\ndate"} rows={6} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[["az", "A → Z"], ["za", "Z → A"], ["short", "Shortest"], ["long", "Longest"], ["reverse", "Reverse"], ["random", "Random"]].map(([k, l]) => (
            <Button key={k} variant="outline" onClick={() => sort(k)}>{l}</Button>
          ))}
        </div>
        {result && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="label-text">Sorted Result</label>
              <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}{copied ? "Copied" : "Copy"}</Button>
            </div>
            <pre className="result-box text-sm font-mono whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
