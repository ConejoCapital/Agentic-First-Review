"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateMarkdownReport } from "@/lib/report-generator";
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
      // Fallback for older browsers
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
    a.download = `review-report-${new Date().toISOString().split("T")[0]}.md`;
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
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : copied
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
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
            ? "cursor-not-allowed border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
        )}
      >
        <Download className="h-4 w-4" />
        Download as Markdown
      </button>
    </div>
  );
}
