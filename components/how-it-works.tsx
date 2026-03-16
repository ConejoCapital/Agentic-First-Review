"use client";

import { motion } from "framer-motion";
import { Globe, Users, FileText } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Submit Your URL",
    description:
      "Enter any website URL. We scrape and analyze the content an AI agent would see.",
  },
  {
    icon: Users,
    title: "100 AI Agents Analyze It",
    description:
      "5 waves of 20 expert personas — developers, investors, designers, and more — evaluate your site.",
  },
  {
    icon: FileText,
    title: "Get Your Agentic SEO Report",
    description:
      "Scores, verdicts, recommendations, and a downloadable report for the agentic web.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface/50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center font-display text-3xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="rounded-2xl bg-white card-shadow p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                <step.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                Step {i + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
