import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { findTool } from "@/data/tools";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIMEZONES = [
  { label: "UTC", offset: 0 },
  { label: "EST (New York)", offset: -5 },
  { label: "CST (Chicago)", offset: -6 },
  { label: "MST (Denver)", offset: -7 },
  { label: "PST (Los Angeles)", offset: -8 },
  { label: "GMT (London)", offset: 0 },
  { label: "CET (Paris)", offset: 1 },
  { label: "EET (Helsinki)", offset: 2 },
  { label: "MSK (Moscow)", offset: 3 },
  { label: "GST (Dubai)", offset: 4 },
  { label: "IST (India)", offset: 5.5 },
  { label: "ICT (Bangkok)", offset: 7 },
  { label: "CST (Beijing)", offset: 8 },
  { label: "JST (Tokyo)", offset: 9 },
  { label: "AEST (Sydney)", offset: 10 },
  { label: "NZST (Auckland)", offset: 12 },
];

export default function TimezoneConverter() {
  const data = findTool("developer", "timezone-converter")!;
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [fromTz, setFromTz] = useState("UTC");
  const [copied, setCopied] = useState(false);

  const conversions = useMemo(() => {
    if (!date) return [];
    const fromOffset = TIMEZONES.find(t => t.label === fromTz)?.offset ?? 0;
    const inputDate = new Date(date);
    const utcTime = inputDate.getTime() - fromOffset * 60 * 60 * 1000;

    return TIMEZONES.filter(tz => tz.label !== fromTz).map(tz => {
      const converted = new Date(utcTime + tz.offset * 60 * 60 * 1000);
      return {
        label: tz.label,
        time: converted.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        diff: tz.offset - fromOffset,
      };
    });
  }, [date, fromTz]);

  const copyAll = () => {
    const text = conversions.map(c => `${c.label}: ${c.time}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      category={data.category}
      tool={data.tool}
      relatedTools={data.category.tools.filter(t => t.slug !== data.tool.slug)}
      faq={[
        { q: "Are daylight saving time changes included?", a: "This tool uses fixed UTC offsets. For DST-aware conversions, verify with your system clock during DST transitions." },
        { q: "How many timezones are supported?", a: "Currently 16 major timezones covering all populated regions worldwide." },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text block mb-2">Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
            />
          </div>
          <div>
            <label className="label-text block mb-2">From Timezone</label>
            <select
              value={fromTz}
              onChange={e => setFromTz(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-secondary border-0 ring-1 ring-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
            >
              {TIMEZONES.map(tz => (
                <option key={tz.label} value={tz.label}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        {conversions.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <p className="label-text">Converted Times</p>
              <Button variant="ghost" size="sm" onClick={copyAll}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied" : "Copy All"}
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden ring-1 ring-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Timezone</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Local Time</th>
                    <th className="text-right px-4 py-2 font-medium text-muted-foreground">Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {conversions.map(c => (
                    <tr key={c.label} className="border-t border-border">
                      <td className="px-4 py-2 font-medium text-foreground">{c.label}</td>
                      <td className="px-4 py-2 text-foreground">{c.time}</td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {c.diff > 0 ? `+${c.diff}` : c.diff}h
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
