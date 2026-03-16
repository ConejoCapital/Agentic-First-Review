"use client";

import { motion } from "framer-motion";
import type { VerdictBreakdown } from "@/lib/types";

interface VerdictChartProps {
  breakdown: VerdictBreakdown;
}

export function VerdictChart({ breakdown }: VerdictChartProps) {
  const total = breakdown.yes + breakdown.maybe + breakdown.no;
  if (total === 0) return null;

  const items = [
    {
      label: "Yes",
      count: breakdown.yes,
      percent: (breakdown.yes / total) * 100,
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
    },
    {
      label: "Maybe",
      count: breakdown.maybe,
      percent: (breakdown.maybe / total) * 100,
      color: "bg-amber-400",
      textColor: "text-amber-400",
    },
    {
      label: "No",
      count: breakdown.no,
      percent: (breakdown.no / total) * 100,
      color: "bg-red-500",
      textColor: "text-red-400",
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-3 w-3 rounded-full ${item.color}`} />
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {item.count} ({item.percent.toFixed(0)}%)
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted">
            <motion.div
              className={`h-full rounded-full ${item.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${item.percent}%` }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.15,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
