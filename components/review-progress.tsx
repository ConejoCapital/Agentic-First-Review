"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WaveStatus } from "@/lib/types";
import { WAVE_DEFINITIONS } from "@/lib/types";

interface ReviewProgressProps {
  waveStatuses: WaveStatus[];
  totalReviewed: number;
  maxPersonas: number;
  isPro?: boolean;
}

export function ReviewProgress({
  waveStatuses,
  totalReviewed,
  maxPersonas,
  isPro = false,
}: ReviewProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {WAVE_DEFINITIONS.map((wave, i) => {
          const status = waveStatuses[i] || "idle";
          const locked = !isPro && i > 0;

          return (
            <div key={wave.number} className="flex flex-col items-center gap-2">
              <div className="relative">
                {locked && status === "idle" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-muted">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                ) : status === "processing" ? (
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-accent/10"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  </motion.div>
                ) : status === "complete" ? (
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                ) : status === "error" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/10">
                    <span className="text-sm font-bold text-red-400">!</span>
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-surface">
                    <span className="text-sm font-medium text-muted-foreground">
                      {wave.number}
                    </span>
                  </div>
                )}
              </div>

              <span
                className={cn(
                  "text-xs font-medium",
                  locked
                    ? "text-muted-foreground"
                    : status === "complete"
                      ? "text-emerald-400"
                      : status === "processing"
                        ? "text-accent"
                        : "text-muted-foreground"
                )}
              >
                {wave.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-0">
          {WAVE_DEFINITIONS.map((_, i) => {
            if (i === WAVE_DEFINITIONS.length - 1) return null;
            const status = waveStatuses[i] || "idle";
            return (
              <div
                key={i}
                className={cn(
                  "h-0.5 w-8 sm:w-16",
                  status === "complete" ? "bg-emerald-500/50" : "bg-border"
                )}
              />
            );
          })}
        </div>
      </div>

      <motion.div
        className="mt-6 text-center"
        key={totalReviewed}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <span className="text-2xl font-bold text-foreground">
          {totalReviewed}
        </span>
        <span className="text-lg text-muted-foreground">/{maxPersonas}</span>
        <p className="mt-1 text-sm text-muted-foreground">personas reviewed</p>
      </motion.div>
    </div>
  );
}
