"use client";

import { motion } from "framer-motion";
import { Users, ThumbsUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AggregateData } from "@/lib/types";

interface AggregateSummaryProps {
  aggregate: AggregateData;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const color =
    score >= 7
      ? "text-emerald-400"
      : score >= 5
        ? "text-amber-400"
        : "text-red-400";
  const strokeColor =
    score >= 7
      ? "stroke-emerald-400"
      : score >= 5
        ? "stroke-amber-400"
        : "stroke-red-400";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          className="score-ring-bg"
          strokeWidth="8"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          className={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className={cn("text-3xl font-bold", color)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-sm text-muted-foreground">/ 10</span>
      </div>
    </div>
  );
}

export function AggregateSummary({ aggregate }: AggregateSummaryProps) {
  const total =
    aggregate.verdictBreakdown.yes +
    aggregate.verdictBreakdown.maybe +
    aggregate.verdictBreakdown.no;

  const yesPercent = total > 0 ? (aggregate.verdictBreakdown.yes / total) * 100 : 0;
  const maybePercent = total > 0 ? (aggregate.verdictBreakdown.maybe / total) * 100 : 0;
  const noPercent = total > 0 ? (aggregate.verdictBreakdown.no / total) * 100 : 0;

  return (
    <motion.div
      className="rounded-2xl border border-border bg-surface p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        Review Summary
      </h2>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center">
          <ScoreRing score={aggregate.overallScore} />
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Overall Score
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Verdict Breakdown
          </h3>

          <div className="flex items-center gap-3">
            <span className="w-14 text-right text-sm font-medium text-muted-foreground">
              Yes
            </span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-3 rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${yesPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="w-16 text-sm text-muted-foreground">
              {aggregate.verdictBreakdown.yes} ({yesPercent.toFixed(0)}%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-14 text-right text-sm font-medium text-muted-foreground">
              Maybe
            </span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-3 rounded-full bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${maybePercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />
            </div>
            <span className="w-16 text-sm text-muted-foreground">
              {aggregate.verdictBreakdown.maybe} ({maybePercent.toFixed(0)}%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-14 text-right text-sm font-medium text-muted-foreground">
              No
            </span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-3 rounded-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${noPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <span className="w-16 text-sm text-muted-foreground">
              {aggregate.verdictBreakdown.no} ({noPercent.toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-accent">
            <Users className="h-4 w-4" />
            <span className="text-xl font-bold">{aggregate.totalReviews}</span>
          </div>
          <span className="text-xs text-muted-foreground">personas reviewed</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xl font-bold">
              {aggregate.recommendPercentage.toFixed(0)}%
            </span>
          </div>
          <span className="text-xs text-muted-foreground">would recommend</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="h-4 w-4" />
            <span className="text-xl font-bold">
              {aggregate.overallScore.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">average score</span>
        </div>
      </div>
    </motion.div>
  );
}
