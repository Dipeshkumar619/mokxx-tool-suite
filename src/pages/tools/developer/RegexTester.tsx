import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function RegexTester() {
  const data = findTool("developer", "regex-tester")!;
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m: RegExpExecArray | null;
      const r = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = r.exec(testStr)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.groups });
        if (!m[0]) r.lastIndex++;
      }
      return { matches, error: null, regex };
    } catch (e: any) {
      return { matches: [], error: e.message, regex: null };
    }
  }, [pattern, flags, testStr]);

  const highlighted = useMemo(() => {
    if (!result?.regex || !testStr || result.matches.length === 0) return null;
    try {
      const r = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; highlight: boolean }[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = r.exec(testStr)) !== null) {
        if (m.index > lastIndex) parts.push({ text: testStr.slice(lastIndex, m.index), highlight: false });
        parts.push({ text: m[0], highlight: true });
        lastIndex = m.index + m[0].length;
        if (!m[0]) { r.lastIndex++; lastIndex++; }
      }
      if (lastIndex < testStr.length) parts.push({ text: testStr.slice(lastIndex), highlight: false });
      return parts;
    } catch { return null; }
  }, [result, testStr, pattern, flags]);

  const flagOptions = [
    { flag: "g", label: "Global" },
    { flag: "i", label: "Case Insensitive" },
    { flag: "m", label: "Multiline" },
    { flag: "s", label: "Dotall" },
  ];

  const toggleFlag = (f: string) => setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f);

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What are regex flags?", a: "Flags modify how the pattern is applied: g (global), i (case-insensitive), m (multiline), s (dotall — dot matches newline)." },
        { q: "What regex flavor is used?", a: "JavaScript's built-in RegExp engine, which supports most common regex features." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Regular Expression</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono">/</span>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g., (\w+)@(\w+)\.\w+" className="flex-1 h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
            <span className="text-muted-foreground font-mono">/{flags}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {flagOptions.map(f => (
            <button key={f.flag} onClick={() => toggleFlag(f.flag)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${flags.includes(f.flag) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
              {f.flag} — {f.label}
            </button>
          ))}
        </div>
        <div>
          <label className="label-text block mb-2">Test String</label>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)} placeholder="Enter text to test against..." rows={5} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        {result?.error && <p className="text-sm text-destructive">{result.error}</p>}
        {highlighted && (
          <div className="animate-fade-in">
            <label className="label-text block mb-2">Matches ({result!.matches.length})</label>
            <div className="result-box font-mono text-sm whitespace-pre-wrap break-all">
              {highlighted.map((p, i) => p.highlight ? <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{p.text}</mark> : <span key={i}>{p.text}</span>)}
            </div>
          </div>
        )}
        {result && result.matches.length > 0 && (
          <div className="animate-fade-in">
            <label className="label-text block mb-2">Match Details</label>
            <div className="space-y-1">
              {result.matches.map((m, i) => (
                <div key={i} className="result-box text-sm font-mono flex justify-between">
                  <span className="text-foreground">"{m.match}"</span>
                  <span className="text-muted-foreground">index {m.index}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
