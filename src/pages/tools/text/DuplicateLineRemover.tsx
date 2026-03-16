import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function DuplicateLineRemover() {
  const data = findTool("text", "duplicate-line-remover")!;
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [stats, setStats] = useState<{ original: number; unique: number; removed: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const removeDuplicates = (caseSensitive: boolean) => {
    const lines = text.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) { seen.add(key); unique.push(line); }
    }
    setResult(unique.join("\n"));
    setStats({ original: lines.length, unique: unique.length, removed: lines.length - unique.length });
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "Are empty lines removed?", a: "Empty lines are treated as duplicates of each other, so only the first empty line is kept." },
        { q: "What about whitespace?", a: "Lines are compared exactly as-is (including whitespace) unless you use case-insensitive mode." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Enter text (one item per line)</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder={"apple\nbanana\napple\ncherry\nbanana"} rows={6} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="flex gap-2">
          <Button size="lg" onClick={() => removeDuplicates(true)}>Remove Duplicates</Button>
          <Button size="lg" variant="outline" onClick={() => removeDuplicates(false)}>Case Insensitive</Button>
        </div>
        {stats && (
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            <div className="result-box text-center"><p className="text-xl font-bold text-foreground">{stats.original}</p><p className="label-text mt-1">Original</p></div>
            <div className="result-box text-center"><p className="text-xl font-bold text-foreground">{stats.unique}</p><p className="label-text mt-1">Unique</p></div>
            <div className="result-box text-center"><p className="text-xl font-bold text-destructive">{stats.removed}</p><p className="label-text mt-1">Removed</p></div>
          </div>
        )}
        {result && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="label-text">Result</label>
              <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}{copied ? "Copied" : "Copy"}</Button>
            </div>
            <pre className="result-box text-sm font-mono whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
