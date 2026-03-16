"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Sparkles, Users, LayoutGrid, Eye } from "lucide-react";

const stats = [
  { value: "100", label: "AI Personas", icon: Users },
  { value: "10", label: "Score Categories", icon: LayoutGrid },
  { value: "5", label: "Audience Segments", icon: Eye },
];

export function WhyAgentic() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center font-display text-3xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Agentic-First?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Problem */}
          <motion.div
            className="rounded-2xl border border-border bg-surface p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Traditional SEO is not enough
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                Google rankings don&apos;t tell you how AI agents perceive your site
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                Keyword stuffing means nothing to an agent parsing your content
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                AI agents evaluate trust, value, and clarity — not just keywords
              </li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            className="rounded-2xl border border-accent/20 bg-accent/5 p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              100 AI personas show you the truth
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                See exactly how diverse AI agents perceive and evaluate your site
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Get scored across 10 categories that matter in the agentic web
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Actionable recommendations ranked by how many agents flagged them
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-6"
            >
              <stat.icon className="h-5 w-5 text-accent" />
              <span className="text-3xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
