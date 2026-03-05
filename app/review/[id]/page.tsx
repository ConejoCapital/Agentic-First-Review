"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import type {
  PersonaReview,
  AggregateData,
  WaveStatus,
  WaveResponse,
  CategoryAverage,
  VerdictBreakdown,
  AudienceFitRow,
  Recommendation,
} from "@/lib/types";
import { WAVE_DEFINITIONS, SCORE_CATEGORIES } from "@/lib/types";
import { ReviewProgress } from "@/components/review-progress";
import { AggregateSummary } from "@/components/aggregate-summary";
import { CategoryScores } from "@/components/category-scores";
import { PersonaCard } from "@/components/persona-card";
import { Recommendations } from "@/components/recommendations";
import { CopyReport } from "@/components/copy-report";
import { AudienceFit } from "@/components/audience-fit";

// ---------------------------------------------------------------------------
// Aggregate computation helpers
// ---------------------------------------------------------------------------

function computeAggregate(reviews: PersonaReview[]): AggregateData {
  if (reviews.length === 0) {
    return {
      overallScore: 0,
      totalReviews: 0,
      verdictBreakdown: { yes: 0, maybe: 0, no: 0 },
      recommendPercentage: 0,
      categoryAverages: SCORE_CATEGORIES.map((c) => ({
        category: c,
        averageScore: 0,
      })),
      audienceFit: [],
      topRecommendations: [],
    };
  }

  const totalReviews = reviews.length;

  // Overall score
  const overallScore =
    reviews.reduce((sum, r) => sum + r.overallScore, 0) / totalReviews;

  // Verdict breakdown
  const verdictBreakdown: VerdictBreakdown = { yes: 0, maybe: 0, no: 0 };
  reviews.forEach((r) => {
    verdictBreakdown[r.verdict]++;
  });

  const recommendPercentage =
    ((verdictBreakdown.yes + verdictBreakdown.maybe * 0.5) / totalReviews) *
    100;

  // Category averages
  const categoryAverages: CategoryAverage[] = SCORE_CATEGORIES.map((cat) => {
    const scores = reviews
      .map((r) => r.categoryScores.find((cs) => cs.category === cat))
      .filter(Boolean)
      .map((cs) => cs!.score);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return { category: cat, averageScore: avg };
  });

  // Audience fit - group by segment
  const segmentMap = new Map<
    string,
    { scores: number[]; recommendations: string[] }
  >();
  reviews.forEach((r) => {
    if (!r.audienceSegment) return;
    const existing = segmentMap.get(r.audienceSegment);
    if (existing) {
      existing.scores.push(r.overallScore);
      if (r.recommendation) existing.recommendations.push(r.recommendation);
    } else {
      segmentMap.set(r.audienceSegment, {
        scores: [r.overallScore],
        recommendations: r.recommendation ? [r.recommendation] : [],
      });
    }
  });

  const audienceFit: AudienceFitRow[] = Array.from(segmentMap.entries())
    .map(([segment, data]) => ({
      segment,
      fitScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
      recommendation: data.recommendations[0] || "No specific recommendation",
      personaCount: data.scores.length,
    }))
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 8);

  // Top recommendations - extract from concerns and group
  const concernCounts = new Map<string, { count: number; descriptions: string[] }>();
  reviews.forEach((r) => {
    if (r.topConcern) {
      const key = r.topConcern.toLowerCase().trim().slice(0, 60);
      const existing = concernCounts.get(key);
      if (existing) {
        existing.count++;
        existing.descriptions.push(r.topConcern);
      } else {
        concernCounts.set(key, { count: 1, descriptions: [r.topConcern] });
      }
    }
  });

  const topRecommendations: Recommendation[] = Array.from(
    concernCounts.entries()
  )
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([, data], i) => ({
      priority: i < 2 ? "Critical" : i < 5 ? "High" : "Medium",
      title: data.descriptions[0].slice(0, 80),
      description: data.descriptions[0],
      mentionCount: data.count,
      totalPersonas: totalReviews,
    }));

  return {
    overallScore,
    totalReviews,
    verdictBreakdown,
    recommendPercentage,
    categoryAverages,
    audienceFit,
    topRecommendations,
  };
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function ReviewPage() {
  const params = useParams();
  const reviewId = params.id as string;

  // State
  const [url, setUrl] = useState<string>("");
  const [scrapedContent, setScrapedContent] = useState<string>("");
  const [reviews, setReviews] = useState<PersonaReview[]>([]);
  const [waveStatuses, setWaveStatuses] = useState<WaveStatus[]>(
    WAVE_DEFINITIONS.map(() => "idle" as WaveStatus)
  );
  const [, setCurrentWave] = useState(0);
  const [aggregate, setAggregate] = useState<AggregateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const processingRef = useRef(false);

  // Initialize from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`review-${reviewId}`);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setUrl(data.url || "");
          setScrapedContent(data.content || "");
        } catch {
          // ignore parse errors
        }
      }
    }
  }, [reviewId]);

  // Process a single wave
  const processWave = useCallback(
    async (waveNumber: number, content: string) => {
      const idx = waveNumber - 1;

      setWaveStatuses((prev) => {
        const next = [...prev];
        next[idx] = "processing";
        return next;
      });

      try {
        const res = await fetch("/api/review/wave", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewId,
            waveNumber,
            content,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: "Request failed" }));
          throw new Error(errData.error || `Wave ${waveNumber} failed`);
        }

        const data: WaveResponse = await res.json();

        if (!data.success) {
          throw new Error(data.error || `Wave ${waveNumber} failed`);
        }

        setReviews((prev) => [...prev, ...data.reviews]);
        setWaveStatuses((prev) => {
          const next = [...prev];
          next[idx] = "complete";
          return next;
        });

        return data.reviews;
      } catch (err: unknown) {
        setWaveStatuses((prev) => {
          const next = [...prev];
          next[idx] = "error";
          return next;
        });
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(`Wave ${waveNumber} error: ${message}`);
        return null;
      }
    },
    [reviewId]
  );

  // Start processing waves
  const startProcessing = useCallback(
    async (content: string) => {
      if (processingRef.current) return;
      processingRef.current = true;

      const maxWaves = 1; // Demo mode: 1 wave (20 personas)
      let allReviews: PersonaReview[] = [];

      for (let wave = 1; wave <= maxWaves; wave++) {
        setCurrentWave(wave);
        const waveReviews = await processWave(wave, content);
        if (!waveReviews) break;
        allReviews = [...allReviews, ...waveReviews];

        // Update aggregate after each wave
        const agg = computeAggregate(allReviews);
        setAggregate(agg);
      }

      setIsComplete(true);
      processingRef.current = false;

      // Try to save results
      try {
        await fetch(`/api/review/${reviewId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            reviews: allReviews,
            aggregate: computeAggregate(allReviews),
          }),
        });
      } catch {
        // Saving is best-effort
      }
    },
    [processWave, reviewId, url]
  );

  // Auto-start processing when content is available
  useEffect(() => {
    if (scrapedContent && !processingRef.current && reviews.length === 0) {
      startProcessing(scrapedContent);
    }
  }, [scrapedContent, startProcessing, reviews.length]);

  // Also update aggregate whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      setAggregate(computeAggregate(reviews));
    }
  }, [reviews]);

  // Overall progress percentage
  const progressPercent =
    (waveStatuses.filter((s) => s === "complete").length /
      WAVE_DEFINITIONS.length) *
    100;

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* Header bar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </a>
          <h1 className="text-sm font-semibold text-gray-900">
            Agentic First Review
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* URL being reviewed */}
        {url && (
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <span>Reviewing:</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline"
            >
              {url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* Overall progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Wave progress */}
        <div className="mb-10">
          <ReviewProgress
            waveStatuses={waveStatuses}
            totalReviewed={reviews.length}
          />
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results section */}
        {aggregate && reviews.length > 0 && (
          <div className="space-y-8">
            {/* Aggregate summary */}
            <AggregateSummary aggregate={aggregate} />

            {/* Category scores */}
            <CategoryScores categories={aggregate.categoryAverages} />

            {/* Recommendations */}
            {aggregate.topRecommendations.length > 0 && (
              <Recommendations
                recommendations={aggregate.topRecommendations}
              />
            )}

            {/* Audience fit */}
            {aggregate.audienceFit.length > 0 && (
              <AudienceFit rows={aggregate.audienceFit} />
            )}

            {/* Individual persona reviews */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Individual Reviews ({reviews.length})
              </h3>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <PersonaCard
                    key={`${review.personaId}-${review.waveNumber}`}
                    review={review}
                  />
                ))}
              </div>
            </div>

            {/* Copy report */}
            <div className="border-t border-gray-200 pt-8">
              <CopyReport
                url={url}
                reviews={reviews}
                aggregate={aggregate}
                disabled={!isComplete}
              />
              {!isComplete && (
                <p className="mt-2 text-xs text-gray-400">
                  Report export available after all waves complete
                </p>
              )}
            </div>
          </div>
        )}

        {/* Empty state while loading */}
        {reviews.length === 0 && !error && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-indigo-100" />
            <p className="text-sm text-gray-500">
              Processing your review... This may take a minute.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
