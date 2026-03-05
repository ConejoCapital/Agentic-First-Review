"use client";

import { motion } from "framer-motion";
import { Check, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WaveStatus } from "@/lib/types";
import { WAVE_DEFINITIONS } from "@/lib/types";

interface ReviewProgressProps {
  waveStatuses: WaveStatus[];
  totalReviewed: number;
  isPro: boolean;
}

export function ReviewProgress({
  waveStatuses,
  totalReviewed,
  isPro,
}: ReviewProgressProps) {
  return (
    <div className="w-full">
      {/* Wave circles */}
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {WAVE_DEFINITIONS.map((wave, i) => {
          const status = waveStatuses[i] || "idle";
          const isLocked = !isPro && i > 0;

          return (
            <div key={wave.number} className="flex flex-col items-center gap-2">
              {/* Circle */}
              <div className="relative">
                {status === "processing" ? (
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-50"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                  </motion.div>
                ) : status === "complete" ? (
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="h-5 w-5 text-emerald-600" />
                  </motion.div>
                ) : status === "error" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-300 bg-red-50">
                    <span className="text-sm font-bold text-red-500">!</span>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2",
                      isLocked
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-300 bg-white"
                    )}
                  >
                    {isLocked ? (
                      <Lock className="h-4 w-4 text-gray-400" />
                    ) : (
                      <span className="text-sm font-medium text-gray-400">
                        {wave.number}
                      </span>
                    )}
                  </div>
                )}

                {/* Pro badge on locked waves */}
                {isLocked && status === "idle" && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    Pro
                  </span>
                )}
              </div>

              {/* Wave name */}
              <span
                className={cn(
                  "text-xs font-medium",
                  status === "complete"
                    ? "text-emerald-600"
                    : status === "processing"
                      ? "text-indigo-600"
                      : isLocked
                        ? "text-gray-400"
                        : "text-gray-500"
                )}
              >
                {wave.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connecting lines between circles */}
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
                  status === "complete" ? "bg-emerald-300" : "bg-gray-200"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Persona counter */}
      <motion.div
        className="mt-6 text-center"
        key={totalReviewed}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <span className="text-2xl font-bold text-gray-900">
          {totalReviewed}
        </span>
        <span className="text-lg text-gray-400">/100</span>
        <p className="mt-1 text-sm text-gray-500">agents reviewed</p>
      </motion.div>
    </div>
  );
}
