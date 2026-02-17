"use client";

import { motion } from "framer-motion";
import { Globe, Users, FileText } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Paste Your URL",
    description:
      "Enter any website or GitHub repository URL. We'll scrape and analyze the content.",
  },
  {
    icon: Users,
    title: "100 AI Agents Review It",
    description:
      "5 waves of 20 expert personas — developers, investors, designers, and more — evaluate your site.",
  },
  {
    icon: FileText,
    title: "Get an Actionable Report",
    description:
      "Scores, verdicts, recommendations, and audience fit analysis you can copy and act on.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-gray-900"
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
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50">
                <step.icon className="h-7 w-7 text-indigo-600" />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
                Step {i + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
