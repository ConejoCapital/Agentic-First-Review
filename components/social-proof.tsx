"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";

const signals = [
  {
    icon: Sparkles,
    label: "Powered by Claude AI",
    description: "State-of-the-art language model",
  },
  {
    icon: Shield,
    label: "100 Expert Personas",
    description: "Diverse perspectives on your site",
  },
  {
    icon: Zap,
    label: "Results in Under a Minute",
    description: "Fast, actionable insights",
  },
];

export function SocialProof() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="flex items-center gap-3 rounded-full bg-white shadow-sm px-5 py-2.5"
            >
              <signal.icon className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {signal.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
