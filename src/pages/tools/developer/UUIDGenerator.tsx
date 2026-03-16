import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function UUIDGenerator() {
  const data = findTool("developer", "uuid-generator")!;
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [count, setCount] = useState("1");
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const n = Math.min(Math.max(parseInt(count) || 1, 1), 50);
    setUuids(Array.from({ length: n }, () => crypto.randomUUID()));
  };

  const copyOne = (uuid: string, i: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across all devices and time." },
        { q: "What version UUIDs are generated?", a: "This tool generates v4 UUIDs, which are randomly generated." },
      ]}
    >
      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          <div>
            <label className="label-text block mb-2">Count</label>
            <input type="number" min="1" max="50" value={count} onChange={e => setCount(e.target.value)} className="w-24 h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
          <Button size="lg" onClick={generate}><RefreshCw className="w-4 h-4 mr-2" /> Generate</Button>
          <Button size="lg" variant="outline" onClick={copyAll}>
            {copied === -1 ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />} Copy All
          </Button>
        </div>
        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="result-box flex items-center justify-between font-mono text-sm">
              <span>{uuid}</span>
              <button onClick={() => copyOne(uuid, i)} className="shrink-0 ml-2 text-muted-foreground hover:text-foreground transition-colors">
                {copied === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
