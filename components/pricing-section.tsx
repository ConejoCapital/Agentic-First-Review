"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const features = [
  "20 specialized AI agent reviewers",
  "Detailed scores across 10 categories",
  "Audience fit analysis",
  "Top recommendations",
  "Copy-to-clipboard report export",
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Free Demo
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          All features unlocked. No sign-up required.
        </motion.p>

        <motion.div
          className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 p-8 shadow-lg shadow-indigo-100/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            Demo Mode
          </div>
          <h3 className="text-xl font-bold text-gray-900">Full Access</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-gray-900">$0</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            20 AI agents analyze your site — no payment required
          </p>

          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
