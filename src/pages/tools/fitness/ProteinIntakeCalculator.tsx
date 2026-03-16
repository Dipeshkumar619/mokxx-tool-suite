import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function ProteinIntakeCalculator() {
  const data = findTool("fitness", "protein-intake-calculator")!;
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [goal, setGoal] = useState("maintain");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (!w) return null;
    const wKg = unit === "imperial" ? w * 0.453592 : w;
    const multipliers: Record<string, [number, number]> = {
      lose: [1.6, 2.2],
      maintain: [1.2, 1.6],
      build: [1.6, 2.4],
      athlete: [2.0, 2.8],
    };
    const [low, high] = multipliers[goal];
    return { low: Math.round(wKg * low), high: Math.round(wKg * high), weightKg: Math.round(wKg) };
  }, [weight, unit, goal]);

  const goals = [
    { value: "lose", label: "Lose Fat" },
    { value: "maintain", label: "Maintain Weight" },
    { value: "build", label: "Build Muscle" },
    { value: "athlete", label: "Competitive Athlete" },
  ];

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "How much protein do I need?", a: "Most people need 1.2–2.2g per kg of bodyweight, depending on their goals and activity level." },
        { q: "Can I eat too much protein?", a: "For healthy individuals, high protein intake (up to 3g/kg) is generally safe but offers diminishing returns." },
      ]}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          {(["imperial", "metric"] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${unit === u ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
              {u === "imperial" ? "Imperial (lbs)" : "Metric (kg)"}
            </button>
          ))}
        </div>
        <div>
          <label className="label-text block mb-2">Body Weight ({unit === "imperial" ? "lbs" : "kg"})</label>
          <input type="number" placeholder={unit === "imperial" ? "e.g., 180" : "e.g., 82"} value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
        </div>
        <div>
          <label className="label-text block mb-2">Goal</label>
          <div className="grid grid-cols-2 gap-2">
            {goals.map(g => (
              <button key={g.value} onClick={() => setGoal(g.value)} className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${goal === g.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
        {result && (
          <div className="result-box animate-fade-in text-center">
            <p className="label-text mb-2">Daily Protein Intake</p>
            <p className="text-3xl font-bold text-foreground">{result.low}g – {result.high}g</p>
            <p className="text-sm text-muted-foreground mt-2">Based on {result.weightKg} kg body weight</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
