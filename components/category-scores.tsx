"use client";

import { motion } from "framer-motion";
import type { CategoryAverage } from "@/lib/types";

interface CategoryScoresProps {
  categories: CategoryAverage[];
}

function getScoreColor(score: number): {
  bar: string;
  text: string;
  bg: string;
} {
  if (score >= 7) return { bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" };
  if (score >= 4) return { bar: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" };
  return { bar: "bg-red-500", text: "text-red-700", bg: "bg-red-50" };
}

export function CategoryScores({ categories }: CategoryScoresProps) {
  const sorted = [...categories].sort(
    (a, b) => b.averageScore - a.averageScore
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">
        Category Scores
      </h3>
      <div className="space-y-3">
        {sorted.map((cat, i) => {
          const colors = getScoreColor(cat.averageScore);
          return (
            <div key={cat.category} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-sm text-gray-600">
                {cat.category}
              </span>
              <div className="flex-1 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className={`h-3 rounded-full ${colors.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.averageScore / 10) * 100}%` }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: i * 0.06,
                  }}
                />
              </div>
              <span
                className={`w-10 text-right text-sm font-semibold ${colors.text}`}
              >
                {cat.averageScore.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
