import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function MacroCalculator() {
  const data = findTool("fitness", "macro-calculator")!;
  const [calories, setCalories] = useState("");
  const [split, setSplit] = useState("balanced");

  const splits: Record<string, { protein: number; carbs: number; fat: number; label: string }> = {
    balanced: { protein: 30, carbs: 40, fat: 30, label: "Balanced (30/40/30)" },
    lowCarb: { protein: 40, carbs: 20, fat: 40, label: "Low Carb (40/20/40)" },
    highCarb: { protein: 25, carbs: 55, fat: 20, label: "High Carb (25/55/20)" },
    keto: { protein: 25, carbs: 5, fat: 70, label: "Keto (25/5/70)" },
    highProtein: { protein: 40, carbs: 35, fat: 25, label: "High Protein (40/35/25)" },
  };

  const result = useMemo(() => {
    const cal = parseFloat(calories);
    if (!cal) return null;
    const s = splits[split];
    return {
      protein: Math.round((cal * s.protein / 100) / 4),
      carbs: Math.round((cal * s.carbs / 100) / 4),
      fat: Math.round((cal * s.fat / 100) / 9),
      pPct: s.protein,
      cPct: s.carbs,
      fPct: s.fat,
    };
  }, [calories, split]);

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What are macros?", a: "Macronutrients are protein, carbohydrates, and fat — the three main nutrients your body needs in large amounts." },
        { q: "Which split should I use?", a: "Balanced works for most people. Use low carb or keto for fat loss, high carb for endurance athletes, and high protein for muscle building." },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="label-text block mb-2">Daily Calories</label>
          <input type="number" placeholder="e.g., 2000" value={calories} onChange={e => setCalories(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
        </div>
        <div>
          <label className="label-text block mb-2">Macro Split</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(splits).map(([key, val]) => (
              <button key={key} onClick={() => setSplit(key)} className={`px-4 py-3 text-sm font-medium rounded-lg transition-all text-left ${split === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {val.label}
              </button>
            ))}
          </div>
        </div>
        {result && (
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            {[
              { label: "Protein", grams: result.protein, pct: result.pPct, color: "text-blue-600" },
              { label: "Carbs", grams: result.carbs, pct: result.cPct, color: "text-green-600" },
              { label: "Fat", grams: result.fat, pct: result.fPct, color: "text-yellow-600" },
            ].map(item => (
              <div key={item.label} className="result-box text-center">
                <p className={`text-2xl font-bold ${item.color}`}>{item.grams}g</p>
                <p className="label-text mt-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.pct}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
