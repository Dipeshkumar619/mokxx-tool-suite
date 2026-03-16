import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function JSONFormatter() {
  const data = findTool("developer", "json-formatter")!;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is JSON?", a: "JSON (JavaScript Object Notation) is a lightweight data format used for storing and transporting data between a server and a client." },
        { q: "Is my data safe?", a: "Yes, all processing happens in your browser. No data is sent to any server." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            rows={8}
            className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y"
          />
        </div>
        <div className="flex gap-2">
          <Button size="lg" onClick={format}>Format JSON</Button>
          <Button size="lg" variant="outline" onClick={minify}>Minify</Button>
        </div>
        {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        {output && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="label-text">Output</label>
              <Button variant="ghost" size="sm" onClick={copy}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="result-box text-sm font-mono overflow-x-auto whitespace-pre">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
