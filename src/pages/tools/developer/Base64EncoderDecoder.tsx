import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function Base64EncoderDecoder() {
  const data = findTool("developer", "base64-encoder-decoder")!;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setOutput(btoa(input));
      setError("");
    } catch { setError("Invalid input for encoding"); }
  };

  const decode = () => {
    try {
      setOutput(atob(input));
      setError("");
    } catch { setError("Invalid Base64 string"); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[{ q: "What is Base64?", a: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format." }]}
    >
      <div className="space-y-4">
        <div>
          <label className="label-text block mb-2">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or Base64 string..." rows={5} className="w-full px-4 py-3 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all resize-y" />
        </div>
        <div className="flex gap-2">
          <Button size="lg" onClick={encode}>Encode</Button>
          <Button size="lg" variant="outline" onClick={decode}>Decode</Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {output && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="label-text">Output</label>
              <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}{copied ? "Copied" : "Copy"}</Button>
            </div>
            <pre className="result-box text-sm font-mono break-all whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
