import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function OneRepMaxCalculator() {
  const data = findTool("fitness", "one-rep-max-calculator")!;
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (!w || !r || r < 1 || r > 30) return null;
    // Brzycki formula
    const orm = w * (36 / (37 - r));
    return Math.round(orm * 10) / 10;
  }, [weight, reps]);

  const percentages = useMemo(() => {
    if (!result) return [];
    return [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map(p => ({
      pct: p,
      weight: Math.round(result * (p / 100) * 10) / 10,
    }));
  }, [result]);

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result} lbs`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is a one rep max (1RM)?", a: "Your one rep max is the maximum weight you can lift for a single repetition with proper form. It's used to program training intensity." },
        { q: "How accurate is this calculator?", a: "This uses the Brzycki formula, which is most accurate for sets of 1-10 reps. For higher rep ranges, accuracy decreases." },
        { q: "Should I test my actual 1RM?", a: "Testing a true 1RM can be risky without proper spotters and experience. Using a calculator from submaximal lifts is generally safer." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text block mb-2">Weight Lifted</label>
            <input
              type="number"
              placeholder="e.g., 225"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
            />
          </div>
          <div>
            <label className="label-text block mb-2">Reps Performed</label>
            <input
              type="number"
              placeholder="e.g., 5"
              value={reps}
              onChange={e => setReps(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
            />
          </div>
        </div>

        {result && (
          <div className="animate-fade-in">
            <div className="result-box flex items-center justify-between">
              <div>
                <p className="label-text mb-1">Estimated One Rep Max</p>
                <p className="text-3xl font-bold text-foreground">{result} <span className="text-lg font-normal text-muted-foreground">lbs</span></p>
              </div>
              <Button variant="outline" size="icon" onClick={copyResult} className="shrink-0">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-foreground mb-3">Percentage Chart</h3>
              <div className="rounded-lg overflow-hidden ring-1 ring-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Percentage</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {percentages.map(({ pct, weight }) => (
                      <tr key={pct} className="border-t border-border">
                        <td className="px-4 py-2 text-foreground">{pct}%</td>
                        <td className="px-4 py-2 text-right font-medium text-foreground">{weight} lbs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
