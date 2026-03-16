import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function CharacterCounter() {
  const data = findTool("text", "character-counter")!;
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const total = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const special = total - letters - digits - spaces - (text.match(/[\n\r\t]/g) || []).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { total, noSpaces, letters, digits, spaces, special: Math.max(0, special), words };
  }, [text]);

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "How are characters counted?", a: "Every single character is counted including spaces, punctuation, and special characters." },
        { q: "What counts as a special character?", a: "Anything that is not a letter, digit, or whitespace — such as @, #, $, %, etc." },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="label-text block mb-2">Enter your text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text here..." rows={8} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Characters", value: stats.total },
            { label: "Without Spaces", value: stats.noSpaces },
            { label: "Letters", value: stats.letters },
            { label: "Digits", value: stats.digits },
            { label: "Spaces", value: stats.spaces },
            { label: "Special Chars", value: stats.special },
            { label: "Words", value: stats.words },
          ].map(item => (
            <div key={item.label} className="result-box text-center">
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="label-text mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
