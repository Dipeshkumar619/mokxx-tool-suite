import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function WordCounter() {
  const data = findTool("text", "word-counter")!;
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length || (text.trim().length > 0 ? 1 : 0) : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "How is reading time calculated?", a: "Reading time is estimated based on an average reading speed of 200 words per minute." },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="label-text block mb-2">Enter your text</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            rows={8}
            className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Words", value: stats.words },
            { label: "Characters", value: stats.chars },
            { label: "No Spaces", value: stats.charsNoSpaces },
            { label: "Sentences", value: stats.sentences },
            { label: "Paragraphs", value: stats.paragraphs },
            { label: "Reading Time", value: `${stats.readingTime} min` },
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
