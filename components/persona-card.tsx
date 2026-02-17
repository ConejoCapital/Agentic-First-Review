"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ThumbsUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonaReview, Verdict } from "@/lib/types";

interface PersonaCardProps {
  review: PersonaReview;
}

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const config = {
    yes: { label: "Yes", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    maybe: { label: "Maybe", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    no: { label: "No", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  };
  const c = config[verdict];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", c.bg, c.text, c.border)}>
      {c.label}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 7
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : score >= 5
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-700 border-red-200";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold", color)}>
      {score.toFixed(1)}
    </span>
  );
}

function WaveBadge({ wave }: { wave: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
      Wave {wave}
    </span>
  );
}

export function PersonaCard({ review }: PersonaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <span className="truncate text-sm font-semibold text-gray-900">
            {review.personaName}
          </span>
          <ScoreBadge score={review.overallScore} />
          <VerdictBadge verdict={review.verdict} />
          <WaveBadge wave={review.waveNumber} />
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-gray-100 px-4 pb-5 pt-4">
              {/* Background */}
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Background
                </h4>
                <p className="text-sm text-gray-600">
                  {review.personaBackground}
                </p>
              </div>

              {/* First Impression */}
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  First Impression
                </h4>
                <p className="text-sm text-gray-700">
                  {review.firstImpression}
                </p>
              </div>

              {/* Positives */}
              {review.positives.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Positives
                  </h4>
                  <ul className="space-y-1">
                    {review.positives.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns */}
              {review.concerns.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Concerns
                  </h4>
                  <ul className="space-y-1">
                    {review.concerns.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Score table */}
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Category Scores
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {review.categoryScores.map((cs) => {
                    const color =
                      cs.score >= 7
                        ? "text-emerald-600"
                        : cs.score >= 5
                          ? "text-amber-600"
                          : "text-red-600";
                    return (
                      <div
                        key={cs.category}
                        className="flex items-center justify-between border-b border-gray-50 py-1"
                      >
                        <span className="text-xs text-gray-500">
                          {cs.category}
                        </span>
                        <span className={cn("text-xs font-bold", color)}>
                          {cs.score}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verdict explanation */}
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Verdict Explanation
                </h4>
                <p className="text-sm text-gray-600">
                  {review.verdictExplanation}
                </p>
              </div>

              {/* Top concern & praise */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-emerald-50 p-3">
                  <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Top Praise
                  </h5>
                  <p className="text-xs text-emerald-700">
                    {review.topPraise}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                    Top Concern
                  </h5>
                  <p className="text-xs text-red-700">{review.topConcern}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
