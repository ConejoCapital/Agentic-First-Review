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
    yes: { label: "Yes", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    maybe: { label: "Maybe", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    no: { label: "No", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
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
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : score >= 5
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
        : "bg-red-500/10 text-red-400 border-red-500/20";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold", color)}>
      {score.toFixed(1)}
    </span>
  );
}

function WaveBadge({ wave }: { wave: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
      Wave {wave}
    </span>
  );
}

export function PersonaCard({ review }: PersonaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="rounded-xl border border-border bg-surface transition-shadow hover:shadow-md hover:shadow-black/20"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <span className="truncate text-sm font-semibold text-foreground">
            {review.personaName}
          </span>
          <ScoreBadge score={review.overallScore} />
          <VerdictBadge verdict={review.verdict} />
          <WaveBadge wave={review.waveNumber} />
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-border px-4 pb-5 pt-4">
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Background
                </h4>
                <p className="text-sm text-muted-foreground">
                  {review.personaBackground}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  First Impression
                </h4>
                <p className="text-sm text-foreground">
                  {review.firstImpression}
                </p>
              </div>

              {review.positives.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Positives
                  </h4>
                  <ul className="space-y-1">
                    {review.positives.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {review.concerns.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-400">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Concerns
                  </h4>
                  <ul className="space-y-1">
                    {review.concerns.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category Scores
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {review.categoryScores.map((cs) => {
                    const color =
                      cs.score >= 7
                        ? "text-emerald-400"
                        : cs.score >= 5
                          ? "text-amber-400"
                          : "text-red-400";
                    return (
                      <div
                        key={cs.category}
                        className="flex items-center justify-between border-b border-border/50 py-1"
                      >
                        <span className="text-xs text-muted-foreground">
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

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Verdict Explanation
                </h4>
                <p className="text-sm text-muted-foreground">
                  {review.verdictExplanation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-emerald-500/10 p-3">
                  <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Top Praise
                  </h5>
                  <p className="text-xs text-emerald-300">
                    {review.topPraise}
                  </p>
                </div>
                <div className="rounded-lg bg-red-500/10 p-3">
                  <h5 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                    Top Concern
                  </h5>
                  <p className="text-xs text-red-300">{review.topConcern}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
