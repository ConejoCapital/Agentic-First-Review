"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const WarpShaderHero = dynamic(
  () => import("@/components/ui/warp-shader"),
  { ssr: false }
);

const PERSONA_TYPES = [
  "developers",
  "marketers",
  "designers",
  "investors",
  "security researchers",
  "UX specialists",
  "product managers",
  "founders",
];

export function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [personaIndex, setPersonaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonaIndex((i) => (i + 1) % PERSONA_TYPES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a URL");
      return;
    }

    let finalUrl = trimmedUrl;
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    try {
      new URL(finalUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to start review");
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          `review-${data.reviewId}`,
          JSON.stringify({ url: finalUrl, content: data.content })
        );
      }

      router.push(`/review/${data.reviewId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[600px] overflow-hidden px-4 pb-24 pt-20 sm:pt-32 hero-gradient">
      <WarpShaderHero />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Is your website ready for the{" "}
          <span className="text-[#00d4aa]">AI agent era</span>?
        </motion.h1>

        <motion.div
          className="mt-5 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-white/70">
            Scanning as{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={personaIndex}
                className="inline-block font-semibold text-[#00d4aa]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {PERSONA_TYPES[personaIndex]}
              </motion.span>
            </AnimatePresence>
            ...
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your website URL..."
                className="hero-input w-full rounded-xl px-12 py-4 text-base shadow-sm transition-all"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold transition-all",
                isSubmitting
                  ? "cursor-not-allowed bg-white/50 text-[#0a2540]"
                  : "bg-white text-[#0a2540] shadow-lg hover:shadow-xl"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  Scan My Site
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-300">{error}</p>
          )}
        </motion.form>

        <motion.p
          className="mt-6 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          AI agent personas analyze your site in under a minute
        </motion.p>
      </div>
    </section>
  );
}
