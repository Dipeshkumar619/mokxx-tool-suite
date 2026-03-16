import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function BMICalculator() {
  const data = findTool("fitness", "bmi-calculator")!;
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return null;
    let bmi: number;
    if (unit === "imperial") {
      bmi = (w / (h * h)) * 703;
    } else {
      bmi = w / ((h / 100) * (h / 100));
    }
    return Math.round(bmi * 10) / 10;
  }, [weight, height, unit]);

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { label: "Normal weight", color: "text-green-600" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-600" };
    return { label: "Obese", color: "text-red-600" };
  };

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is BMI?", a: "Body Mass Index (BMI) is a measure of body fat based on height and weight. It applies to adult men and women." },
        { q: "Is BMI accurate?", a: "BMI is a useful screening tool but doesn't measure body fat directly. Athletes may have a high BMI due to muscle mass." },
      ]}
    >
      <div className="space-y-6">
        <div className="flex gap-2 mb-2">
          {(["imperial", "metric"] as const).map(u => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${unit === u ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              {u === "imperial" ? "Imperial (lbs/in)" : "Metric (kg/cm)"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text block mb-2">Weight ({unit === "imperial" ? "lbs" : "kg"})</label>
            <input type="number" placeholder={unit === "imperial" ? "e.g., 180" : "e.g., 82"} value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
          <div>
            <label className="label-text block mb-2">Height ({unit === "imperial" ? "inches" : "cm"})</label>
            <input type="number" placeholder={unit === "imperial" ? "e.g., 70" : "e.g., 178"} value={height} onChange={e => setHeight(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
        </div>
        {result && (
          <div className="result-box animate-fade-in">
            <p className="label-text mb-1">Your BMI</p>
            <p className="text-3xl font-bold text-foreground">{result}</p>
            <p className={`text-sm font-medium mt-1 ${getCategory(result).color}`}>{getCategory(result).label}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
