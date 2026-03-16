import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function TimestampConverter() {
  const data = findTool("developer", "timestamp-converter")!;
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<{ label: string; value: string }[] | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const now = () => {
    const d = new Date();
    showResults(d);
    setTimestamp(Math.floor(d.getTime() / 1000).toString());
    setDateStr("");
  };

  const fromTimestamp = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;
    const d = new Date(ts.toString().length <= 10 ? ts * 1000 : ts);
    showResults(d);
  };

  const fromDate = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return;
    showResults(d);
    setTimestamp(Math.floor(d.getTime() / 1000).toString());
  };

  const showResults = (d: Date) => {
    setResult([
      { label: "Unix (seconds)", value: Math.floor(d.getTime() / 1000).toString() },
      { label: "Unix (milliseconds)", value: d.getTime().toString() },
      { label: "ISO 8601", value: d.toISOString() },
      { label: "UTC String", value: d.toUTCString() },
      { label: "Local String", value: d.toLocaleString() },
      { label: "Date", value: d.toLocaleDateString() },
      { label: "Time", value: d.toLocaleTimeString() },
    ]);
  };

  const copy = (val: string, i: number) => { navigator.clipboard.writeText(val); setCopied(i); setTimeout(() => setCopied(null), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds since January 1, 1970 (UTC), used to represent a point in time." },
        { q: "Seconds vs milliseconds?", a: "Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits). This tool handles both." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text block mb-2">Unix Timestamp</label>
            <input type="text" placeholder="e.g., 1700000000" value={timestamp} onChange={e => setTimestamp(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
          <div>
            <label className="label-text block mb-2">Date String</label>
            <input type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" onClick={fromTimestamp}>Convert Timestamp</Button>
          <Button size="lg" variant="outline" onClick={fromDate}>Convert Date</Button>
          <Button size="lg" variant="outline" onClick={now}>Current Time</Button>
        </div>
        {result && (
          <div className="space-y-2 animate-fade-in">
            {result.map((r, i) => (
              <div key={r.label} className="result-box flex items-center justify-between">
                <div>
                  <p className="label-text text-xs">{r.label}</p>
                  <p className="text-sm font-mono text-foreground">{r.value}</p>
                </div>
                <button onClick={() => copy(r.value, i)} className="shrink-0 ml-2 text-muted-foreground hover:text-foreground transition-colors">
                  {copied === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
