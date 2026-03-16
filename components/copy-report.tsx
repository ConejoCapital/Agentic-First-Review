"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateMarkdownReport, generatePlainTextReport } from "@/lib/report-generator";
import type { PersonaReview, AggregateData } from "@/lib/types";

interface CopyReportProps {
  url: string;
  reviews: PersonaReview[];
  aggregate: AggregateData | null;
  disabled?: boolean;
}

export function CopyReport({
  url,
  reviews,
  aggregate,
  disabled = false,
}: CopyReportProps) {
  const [copied, setCopied] = useState(false);

  const getReport = () => {
    if (!aggregate) return "";
    return generateMarkdownReport(url, reviews, aggregate);
  };

  const handleCopy = async () => {
    const report = getReport();
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = report;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const report = getReport();
    if (!report) return;
    const blob = new Blob([report], { type: "text/markdown" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `seo-report-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  const handleDownloadTxt = () => {
    if (!aggregate) return;
    const report = generatePlainTextReport(url, reviews, aggregate);
    const blob = new Blob([report], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `website-review-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleCopy}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
          disabled
            ? "cursor-not-allowed bg-muted text-muted-foreground"
            : copied
              ? "bg-emerald-600 text-white"
              : "bg-accent text-background hover:bg-accent-hover active:scale-[0.98]"
        )}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Full Report
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all",
          disabled
            ? "cursor-not-allowed border-border text-muted-foreground"
            : "border-border text-foreground hover:bg-muted active:scale-[0.98]"
        )}
      >
        <Download className="h-4 w-4" />
        Download as Markdown
      </button>

      <button
        onClick={handleDownloadTxt}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all",
          disabled
            ? "cursor-not-allowed border-border text-muted-foreground"
            : "border-border text-foreground hover:bg-muted active:scale-[0.98]"
        )}
      >
        <Download className="h-4 w-4" />
        Download .txt for Coding Tools
      </button>
    </div>
  );
}
