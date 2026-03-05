"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "20 AI agents analyze your site — no payment required",
    features: [
      "20 specialized AI agent reviewers",
      "1 review per day",
      "Basic report with scores",
      "Copy-to-clipboard export",
    ],
    cta: "Get Started Free",
    ctaHref: "#",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Full 100-persona analysis with your own key",
    features: [
      "100 personas (all 5 waves)",
      "Unlimited reviews",
      "Bring your own Anthropic key",
      "Full report + audience fit",
      "Shareable results link",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/pricing",
    highlight: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple Pricing
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Start free, upgrade when you need more.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-indigo-200 bg-indigo-50/30 shadow-lg shadow-indigo-100/50"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {plan.highlight && (
                <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-gray-500">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
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
                href={plan.ctaHref}
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
