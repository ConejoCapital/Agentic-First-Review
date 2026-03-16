"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Try it out with 20 expert personas",
    features: [
      "20 personas (Wave 1: Technical)",
      "3 reviews per day",
      "Basic report with scores",
      "Copy-to-clipboard report export",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Full 100-persona analysis across all 5 waves",
    features: [
      "100 personas (all 5 waves)",
      "Unlimited reviews",
      "Full report + audience fit",
      "Shareable results link",
      "Priority processing",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState(false);

  const handleProClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe is not configured yet. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.");
        setLoading(false);
      }
    } catch {
      alert("Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-4 text-center font-display text-3xl text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple Pricing
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-muted-foreground"
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
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? "border-2 border-accent bg-white card-shadow"
                  : "border border-border bg-white card-shadow"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {plan.highlight && (
                <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-background">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.highlight ? (
                <button
                  onClick={handleProClick}
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover glow-accent disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    plan.cta
                  )}
                </button>
              ) : (
                <a
                  href="#"
                  className="mt-8 block rounded-xl border border-border py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
