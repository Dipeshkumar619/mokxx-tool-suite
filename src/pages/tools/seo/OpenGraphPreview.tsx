import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";

export default function OpenGraphPreview() {
  const data = findTool("seo", "open-graph-preview")!;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const domain = url ? (() => { try { return new URL(url).hostname; } catch { return url; } })() : "example.com";

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What is Open Graph?", a: "Open Graph is a protocol that controls how your content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter." },
        { q: "What image size should I use?", a: "The recommended size is 1200x630 pixels for best display across all platforms." },
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {[
            { label: "Page Title", value: title, set: setTitle, placeholder: "My Awesome Page" },
            { label: "Description", value: desc, set: setDesc, placeholder: "A brief description of your page content" },
            { label: "Image URL", value: image, set: setImage, placeholder: "https://example.com/og-image.jpg" },
            { label: "Page URL", value: url, set: setUrl, placeholder: "https://example.com/page" },
          ].map(f => (
            <div key={f.label}>
              <label className="label-text block mb-2">{f.label}</label>
              <input type="text" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
            </div>
          ))}
        </div>

        {(title || desc) && (
          <div className="space-y-6 animate-fade-in">
            {/* Facebook/LinkedIn Preview */}
            <div>
              <label className="label-text block mb-3">Facebook / LinkedIn Preview</label>
              <div className="rounded-lg ring-1 ring-border overflow-hidden max-w-lg">
                <div className="aspect-[1.91/1] bg-muted flex items-center justify-center overflow-hidden">
                  {image ? <img src={image} alt="OG Preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} /> : <span className="text-sm text-muted-foreground">No image provided</span>}
                </div>
                <div className="p-3 bg-secondary">
                  <p className="text-xs text-muted-foreground uppercase">{domain}</p>
                  <p className="font-semibold text-foreground text-sm mt-1 line-clamp-2">{title || "Page Title"}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{desc || "Page description"}</p>
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div>
              <label className="label-text block mb-3">Twitter / X Preview</label>
              <div className="rounded-xl ring-1 ring-border overflow-hidden max-w-lg">
                <div className="aspect-[2/1] bg-muted flex items-center justify-center overflow-hidden">
                  {image ? <img src={image} alt="Twitter Preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} /> : <span className="text-sm text-muted-foreground">No image</span>}
                </div>
                <div className="p-3 bg-secondary">
                  <p className="font-semibold text-foreground text-sm line-clamp-1">{title || "Page Title"}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{desc || "Page description"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{domain}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
