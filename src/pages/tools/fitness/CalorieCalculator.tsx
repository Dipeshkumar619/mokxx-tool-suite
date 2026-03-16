import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function CalorieCalculator() {
  const data = findTool("fitness", "calorie-calculator")!;
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState("1.55");
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

  const result = useMemo(() => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h) return null;
    const wKg = unit === "imperial" ? w * 0.453592 : w;
    const hCm = unit === "imperial" ? h * 2.54 : h;
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * wKg + 6.25 * hCm - 5 * a + 5;
    } else {
      bmr = 10 * wKg + 6.25 * hCm - 5 * a - 161;
    }
    const tdee = bmr * parseFloat(activity);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee), cut: Math.round(tdee - 500), bulk: Math.round(tdee + 500) };
  }, [age, weight, height, gender, activity, unit]);

  const activities = [
    { value: "1.2", label: "Sedentary (office job)" },
    { value: "1.375", label: "Light (1-3 days/week)" },
    { value: "1.55", label: "Moderate (3-5 days/week)" },
    { value: "1.725", label: "Active (6-7 days/week)" },
    { value: "1.9", label: "Very Active (2x/day)" },
  ];

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What formula is used?", a: "The Mifflin-St Jeor equation, which is considered the most accurate for estimating BMR." },
        { q: "What is TDEE?", a: "Total Daily Energy Expenditure — the total calories you burn per day including activity." },
      ]}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          {(["imperial", "metric"] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${unit === u ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
              {u === "imperial" ? "Imperial" : "Metric"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["male", "female"] as const).map(g => (
            <button key={g} onClick={() => setGender(g)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${gender === g ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label-text block mb-2">Age</label>
            <input type="number" placeholder="e.g., 25" value={age} onChange={e => setAge(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
          <div>
            <label className="label-text block mb-2">Weight ({unit === "imperial" ? "lbs" : "kg"})</label>
            <input type="number" placeholder={unit === "imperial" ? "e.g., 180" : "e.g., 82"} value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
          <div>
            <label className="label-text block mb-2">Height ({unit === "imperial" ? "inches" : "cm"})</label>
            <input type="number" placeholder={unit === "imperial" ? "e.g., 70" : "e.g., 178"} value={height} onChange={e => setHeight(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
        </div>
        <div>
          <label className="label-text block mb-2">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all">
            {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
            {[
              { label: "BMR", value: result.bmr },
              { label: "Maintenance", value: result.tdee },
              { label: "Fat Loss", value: result.cut },
              { label: "Muscle Gain", value: result.bulk },
            ].map(item => (
              <div key={item.label} className="result-box text-center">
                <p className="text-2xl font-bold text-foreground">{item.value.toLocaleString()}</p>
                <p className="label-text mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
