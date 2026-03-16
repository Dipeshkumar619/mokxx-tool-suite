import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const formats = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/jpeg", label: "JPEG", ext: "jpg" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

export default function ImageConverter() {
  const data = findTool("media", "image-converter")!;
  const [original, setOriginal] = useState<{ file: File; url: string } | null>(null);
  const [format, setFormat] = useState("image/png");
  const [converted, setConverted] = useState<{ url: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setOriginal({ file, url: URL.createObjectURL(file) });
    setConverted(null);
  };

  const convert = () => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (blob) setConverted({ url: URL.createObjectURL(blob), size: blob.size });
      }, format, 0.92);
    };
    img.src = original.url;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const ext = formats.find(f => f.value === format)?.ext || "png";

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What formats are supported?", a: "You can convert between PNG, JPEG, and WebP formats." },
        { q: "Is quality preserved?", a: "JPEG and WebP use 92% quality by default. PNG is lossless." },
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
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>

        {original && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="label-text block mb-2">Convert to</label>
              <div className="flex gap-2">
                {formats.map(f => (
                  <button key={f.value} onClick={() => { setFormat(f.value); setConverted(null); }} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${format === f.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <Button size="lg" onClick={convert}>Convert Image</Button>
            <div className="result-box text-center">
              <p className="label-text">Original: {original.file.name} ({formatSize(original.file.size)})</p>
            </div>
            {converted && (
              <div className="space-y-3 animate-fade-in">
                <div className="result-box text-center">
                  <p className="text-lg font-bold text-foreground">{formatSize(converted.size)}</p>
                  <p className="label-text mt-1">Converted ({ext.toUpperCase()})</p>
                </div>
                <a href={converted.url} download={`converted.${ext}`}>
                  <Button size="lg"><Download className="w-4 h-4 mr-2" /> Download {ext.toUpperCase()}</Button>
                </a>
              </div>
            )}
            <div className="rounded-lg overflow-hidden ring-1 ring-border">
              <img src={original.url} alt="Preview" className="w-full max-h-96 object-contain bg-muted" />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
