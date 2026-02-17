import type {
  PersonaReview,
  AggregateData,
  CategoryAverage,
  VerdictBreakdown,
  AudienceFitRow,
  Recommendation,
} from "./types";
import { SCORE_CATEGORIES } from "./types";

export function computeAggregate(reviews: PersonaReview[]): AggregateData {
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

  const overallScore =
    reviews.reduce((sum, r) => sum + r.overallScore, 0) / totalReviews;

  const verdictBreakdown: VerdictBreakdown = { yes: 0, maybe: 0, no: 0 };
  reviews.forEach((r) => {
    verdictBreakdown[r.verdict]++;
  });

  const recommendPercentage =
    ((verdictBreakdown.yes + verdictBreakdown.maybe * 0.5) / totalReviews) * 100;

  const categoryAverages: CategoryAverage[] = SCORE_CATEGORIES.map((cat) => {
    const scores = reviews
      .map((r) => r.categoryScores.find((cs) => cs.category === cat))
      .filter(Boolean)
      .map((cs) => cs!.score);
    const avg =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return { category: cat, averageScore: avg };
  });

  // Audience fit
  const segmentMap = new Map<string, { scores: number[]; recs: string[] }>();
  reviews.forEach((r) => {
    if (!r.audienceSegment) return;
    const existing = segmentMap.get(r.audienceSegment);
    if (existing) {
      existing.scores.push(r.overallScore);
      if (r.recommendation) existing.recs.push(r.recommendation);
    } else {
      segmentMap.set(r.audienceSegment, {
        scores: [r.overallScore],
        recs: r.recommendation ? [r.recommendation] : [],
      });
    }
  });

  const audienceFit: AudienceFitRow[] = Array.from(segmentMap.entries())
    .map(([segment, data]) => ({
      segment,
      fitScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
      recommendation: data.recs[0] || "No specific recommendation",
      personaCount: data.scores.length,
    }))
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 8);

  // Top recommendations from concerns
  const concernCounts = new Map<string, { count: number; descs: string[] }>();
  reviews.forEach((r) => {
    if (r.topConcern) {
      const key = r.topConcern.toLowerCase().trim().slice(0, 60);
      const existing = concernCounts.get(key);
      if (existing) {
        existing.count++;
        existing.descs.push(r.topConcern);
      } else {
        concernCounts.set(key, { count: 1, descs: [r.topConcern] });
      }
    }
  });

  const topRecommendations: Recommendation[] = Array.from(concernCounts.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([, data], i) => ({
      priority: (i < 2 ? "Critical" : i < 5 ? "High" : "Medium") as
        | "Critical"
        | "High"
        | "Medium",
      title: data.descs[0].slice(0, 80),
      description: data.descs[0],
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
