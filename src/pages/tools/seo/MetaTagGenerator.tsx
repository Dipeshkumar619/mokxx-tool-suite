import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function MetaTagGenerator() {
  const data = findTool("seo", "meta-tag-generator")!;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);

  const code = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    title && `<title>${title}</title>`,
    desc && `<meta name="description" content="${desc}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    author && `<meta name="author" content="${author}">`,
    "",
    "<!-- Open Graph -->",
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    image && `<meta property="og:image" content="${image}">`,
    `<meta property="og:type" content="website">`,
    "",
    "<!-- Twitter Card -->",
    `<meta name="twitter:card" content="summary_large_image">`,
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
    image && `<meta name="twitter:image" content="${image}">`,
  ].filter(Boolean).join("\n");

  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const fields = [
    { label: "Page Title", value: title, set: setTitle, placeholder: "My Awesome Page", hint: `${title.length}/60 characters` },
    { label: "Description", value: desc, set: setDesc, placeholder: "A brief description of your page...", hint: `${desc.length}/160 characters` },
    { label: "Keywords", value: keywords, set: setKeywords, placeholder: "keyword1, keyword2, keyword3" },
    { label: "Page URL", value: url, set: setUrl, placeholder: "https://example.com/page" },
    { label: "Image URL", value: image, set: setImage, placeholder: "https://example.com/image.jpg" },
    { label: "Author", value: author, set: setAuthor, placeholder: "John Doe" },
  ];

  return (
    <ToolLayout category={data.category} tool={data.tool} relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "What are meta tags?", a: "Meta tags are HTML elements that provide metadata about a webpage to search engines and social media platforms." },
        { q: "Why are Open Graph tags important?", a: "Open Graph tags control how your page appears when shared on Facebook, LinkedIn, and other social platforms." },
      ]}
    >
      <div className="space-y-4">
        {fields.map(f => (
          <div key={f.label}>
            <div className="flex justify-between mb-2">
              <label className="label-text">{f.label}</label>
              {f.hint && <span className="text-xs text-muted-foreground">{f.hint}</span>}
            </div>
            <input type="text" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
          </div>
        ))}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <label className="label-text">Generated Meta Tags</label>
            <Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}{copied ? "Copied" : "Copy"}</Button>
          </div>
          <pre className="result-box text-xs font-mono whitespace-pre-wrap overflow-x-auto">{code}</pre>
        </div>
      </div>
    </ToolLayout>
  );
}
