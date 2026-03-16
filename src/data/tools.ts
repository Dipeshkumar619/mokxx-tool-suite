import { 
  Dumbbell, Heart, Flame, Beef, PieChart,
  Youtube, Download, Image, ImageMinus, FileImage,
  Braces, Binary, Fingerprint, Clock, Regex,
  FileText, Type, CaseSensitive, ArrowDownAZ, ListFilter,
  Search, Tag, Hash, Eye,
  LucideIcon
} from "lucide-react";

export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    name: "Fitness Tools",
    slug: "fitness",
    description: "Calculate your fitness metrics instantly",
    icon: Dumbbell,
    color: "text-primary",
    tools: [
      { name: "One Rep Max Calculator", slug: "one-rep-max-calculator", description: "Estimate your one-rep max from submaximal lifts", icon: Dumbbell },
      { name: "BMI Calculator", slug: "bmi-calculator", description: "Calculate your Body Mass Index quickly", icon: Heart },
      { name: "Calorie Calculator", slug: "calorie-calculator", description: "Estimate daily caloric needs based on your goals", icon: Flame },
      { name: "Protein Intake Calculator", slug: "protein-intake-calculator", description: "Find your optimal daily protein intake", icon: Beef },
      { name: "Macro Calculator", slug: "macro-calculator", description: "Calculate your ideal macronutrient split", icon: PieChart },
    ],
  },
  {
    name: "Digital Media Tools",
    slug: "media",
    description: "Download, compress, and convert media files",
    icon: Youtube,
    color: "text-accent",
    tools: [
      { name: "YouTube Thumbnail Downloader", slug: "youtube-thumbnail-downloader", description: "Download any YouTube video thumbnail in HD", icon: Youtube },
      { name: "YouTube Video Downloader", slug: "youtube-video-downloader", description: "Download YouTube videos in multiple formats", icon: Download },
      { name: "Instagram Video Downloader", slug: "instagram-video-downloader", description: "Save Instagram videos and reels offline", icon: Download },
      { name: "Image Compressor", slug: "image-compressor", description: "Compress images without losing quality", icon: Image },
      { name: "Image Converter", slug: "image-converter", description: "Convert images between formats (PNG, JPG, WebP)", icon: FileImage },
      { name: "Background Remover", slug: "background-remover", description: "Remove image backgrounds instantly", icon: ImageMinus },
    ],
  },
  {
    name: "Developer Tools",
    slug: "developer",
    description: "Essential utilities for developers",
    icon: Braces,
    color: "text-primary",
    tools: [
      { name: "JSON Formatter", slug: "json-formatter", description: "Format and validate JSON data beautifully", icon: Braces },
      { name: "Base64 Encoder / Decoder", slug: "base64-encoder-decoder", description: "Encode or decode Base64 strings", icon: Binary },
      { name: "UUID Generator", slug: "uuid-generator", description: "Generate unique UUIDs instantly", icon: Fingerprint },
      { name: "Timestamp Converter", slug: "timestamp-converter", description: "Convert between Unix timestamps and dates", icon: Clock },
      { name: "Regex Tester", slug: "regex-tester", description: "Test and debug regular expressions", icon: Regex },
    ],
  },
  {
    name: "Text Tools",
    slug: "text",
    description: "Analyze, format, and transform text",
    icon: FileText,
    color: "text-primary",
    tools: [
      { name: "Word Counter", slug: "word-counter", description: "Count words, characters, sentences, and paragraphs", icon: FileText },
      { name: "Character Counter", slug: "character-counter", description: "Count characters with and without spaces", icon: Type },
      { name: "Case Converter", slug: "case-converter", description: "Convert text between uppercase, lowercase, and more", icon: CaseSensitive },
      { name: "Text Sorter", slug: "text-sorter", description: "Sort lines of text alphabetically or numerically", icon: ArrowDownAZ },
      { name: "Duplicate Line Remover", slug: "duplicate-line-remover", description: "Remove duplicate lines from text", icon: ListFilter },
    ],
  },
  {
    name: "SEO Tools",
    slug: "seo",
    description: "Optimize your website for search engines",
    icon: Search,
    color: "text-primary",
    tools: [
      { name: "Meta Tag Generator", slug: "meta-tag-generator", description: "Generate meta tags for better SEO", icon: Tag },
      { name: "Slug Generator", slug: "slug-generator", description: "Create URL-friendly slugs from text", icon: Hash },
      { name: "Keyword Density Checker", slug: "keyword-density-checker", description: "Analyze keyword frequency in your content", icon: Search },
      { name: "Open Graph Preview Tool", slug: "open-graph-preview", description: "Preview how your page looks when shared", icon: Eye },
    ],
  },
];

export function findTool(categorySlug: string, toolSlug: string): { category: Category; tool: Tool } | null {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return null;
  const tool = category.tools.find(t => t.slug === toolSlug);
  if (!tool) return null;
  return { category, tool };
}

export function searchTools(query: string): { category: Category; tool: Tool }[] {
  const q = query.toLowerCase();
  const results: { category: Category; tool: Tool }[] = [];
  for (const category of categories) {
    for (const tool of category.tools) {
      if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || category.name.toLowerCase().includes(q)) {
        results.push({ category, tool });
      }
    }
  }
  return results;
}
