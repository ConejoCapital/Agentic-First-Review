"use client";

import { cn } from "@/lib/utils";
import type { AudienceFitRow } from "@/lib/types";

interface AudienceFitProps {
  rows: AudienceFitRow[];
}

function FitBadge({ score }: { score: number }) {
  const color =
    score >= 7
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : score >= 5
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-700 border-red-200";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold",
        color
      )}
    >
      {score.toFixed(1)}
    </span>
  );
}

export function AudienceFit({ rows }: AudienceFitProps) {
  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white card-shadow p-6">
      <h3 className="mb-5 text-lg font-semibold text-foreground">
        Audience Fit
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Audience Segment
              </th>
              <th className="pb-3 pr-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fit Score
              </th>
              <th className="pb-3 pr-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Personas
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recommendation
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.segment}
                className={cn(
                  "border-b border-border/50",
                  i % 2 === 1 && "bg-surface/50"
                )}
              >
                <td className="py-3 pr-4 font-medium text-foreground">
                  {row.segment}
                </td>
                <td className="py-3 pr-4 text-center">
                  <FitBadge score={row.fitScore} />
                </td>
                <td className="py-3 pr-4 text-center text-muted-foreground">
                  {row.personaCount}
                </td>
                <td className="py-3 text-muted-foreground">{row.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
