"use client";

import { cn } from "@/lib/utils";
import type { Recommendation } from "@/lib/types";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

function PriorityBadge({ priority }: { priority: Recommendation["priority"] }) {
  const config = {
    Critical: "bg-red-50 text-red-700 border-red-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    Medium: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config[priority]
      )}
    >
      {priority}
    </span>
  );
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">
        Top Recommendations
      </h3>
      <ol className="space-y-4">
        {recommendations.map((rec, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <PriorityBadge priority={rec.priority} />
                <span className="text-sm font-semibold text-gray-900">
                  {rec.title}
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-600">{rec.description}</p>
              <span className="text-xs text-gray-400">
                Mentioned by {rec.mentionCount}/{rec.totalPersonas} personas
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
