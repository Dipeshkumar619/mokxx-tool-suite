import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function KeywordDensityChecker() {
  const data = findTool("seo", "keyword-density-checker")!;
  const [text, setText] = useState("");
  const [minLength, setMinLength] = useState("3");

  const results = useMemo(() => {
    if (!text.trim()) return { words: 0, keywords: [] };
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const total = words.length;
    const min = parseInt(minLength) || 1;
    const freq: Record<string, number> = {};
    for (const w of words) {
      if (w.length >= min) freq[w] = (freq[w] || 0) + 1;
    }
    const keywords = Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(2) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);
    return { words: total, keywords };
  }, [text, minLength]);

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is keyword density?", a: "Keyword density is the percentage of times a word appears in a text relative to the total word count." },
        { q: "What's a good keyword density?", a: "Generally 1-3% is considered optimal for SEO. Over-optimization (keyword stuffing) can hurt rankings." },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="label-text block mb-2">Enter your content</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your article or content here..." rows={8} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="flex items-center gap-3">
          <label className="label-text">Min word length:</label>
          <input type="number" min="1" max="10" value={minLength} onChange={e => setMinLength(e.target.value)} className="w-20 h-9 px-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          <span className="text-sm text-muted-foreground">Total words: {results.words}</span>
        </div>
        {results.keywords.length > 0 && (
          <div className="animate-fade-in">
            <div className="rounded-lg ring-1 ring-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Keyword</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Count</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {results.keywords.map(k => (
                    <tr key={k.word} className="border-t border-border">
                      <td className="px-4 py-2.5 font-mono text-foreground">{k.word}</td>
                      <td className="px-4 py-2.5 text-right text-foreground">{k.count}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{k.density}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
