"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

    // Basic URL validation
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

      // Store content in sessionStorage for the review page
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
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/50 to-white" />

      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What would{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            20 AI agents
          </span>{" "}
          think of your website?
        </motion.h1>

        <motion.div
          className="mt-4 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-gray-500">
            Get feedback from AI{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={personaIndex}
                className="inline-block font-semibold text-indigo-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {PERSONA_TYPES[personaIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>

        {/* URL input form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your website URL..."
                className="w-full rounded-xl border border-gray-200 bg-white px-12 py-4 text-base text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-sm transition-all",
                isSubmitting
                  ? "cursor-not-allowed bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  Review
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}
        </motion.form>

        <motion.p
          className="mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          20 AI agents analyze your site and deliver actionable feedback
        </motion.p>
      </div>
    </section>
  );
}
