import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

export default function ImageCompressor() {
  const data = findTool("media", "image-compressor")!;
  const [quality, setQuality] = useState(80);
  const [original, setOriginal] = useState<{ file: File; url: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setOriginal({ file, url });
    setCompressed(null);
    compress(file, quality);
  };

  const compress = (file: File, q: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (blob) setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
      }, "image/jpeg", q / 100);
    };
    img.src = URL.createObjectURL(file);
  };

  const updateQuality = (q: number) => {
    setQuality(q);
    if (original) compress(original.file, q);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "How does compression work?", a: "Images are re-encoded using the HTML5 Canvas API at a lower JPEG quality setting, reducing file size." },
        { q: "Is my image uploaded anywhere?", a: "No. All processing happens locally in your browser. Your images never leave your device." },
      ]}
    >
      <div className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        >
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Click or drag & drop an image</p>
          <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WebP</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>

        {original && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <div className="flex justify-between mb-2">
                <label className="label-text">Quality: {quality}%</label>
              </div>
              <input type="range" min="10" max="100" value={quality} onChange={e => updateQuality(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="result-box text-center">
                <p className="text-lg font-bold text-foreground">{formatSize(original.file.size)}</p>
                <p className="label-text mt-1">Original</p>
              </div>
              {compressed && (
                <div className="result-box text-center">
                  <p className="text-lg font-bold text-foreground">{formatSize(compressed.size)}</p>
                  <p className="label-text mt-1">Compressed ({Math.round((1 - compressed.size / original.file.size) * 100)}% smaller)</p>
                </div>
              )}
            </div>
            {compressed && (
              <div className="flex gap-2">
                <a href={compressed.url} download={`compressed-${original.file.name}`}>
                  <Button size="lg"><Download className="w-4 h-4 mr-2" /> Download</Button>
                </a>
              </div>
            )}
            <div className="rounded-lg overflow-hidden ring-1 ring-border">
              <img src={compressed?.url || original.url} alt="Preview" className="w-full max-h-96 object-contain bg-muted" />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
