export const SCORE_CATEGORIES = [
  "First Impression",
  "Value Proposition",
  "Trust & Credibility",
  "User Experience",
  "Content Quality",
  "Visual Design",
  "Performance",
  "Mobile Experience",
  "Accessibility",
  "Call-to-Action Clarity",
] as const;

export type ScoreCategory = (typeof SCORE_CATEGORIES)[number];

export interface CategoryScore {
  category: ScoreCategory;
  score: number;
  comment: string;
}

export type Verdict = "yes" | "maybe" | "no";

export interface PersonaReview {
  personaId: string;
  personaName: string;
  personaBackground: string;
  waveNumber: number;
  firstImpression: string;
  positives: string[];
  concerns: string[];
  categoryScores: CategoryScore[];
  overallScore: number;
  verdict: Verdict;
  verdictExplanation: string;
  topConcern: string;
  topPraise: string;
  audienceSegment: string;
  recommendation: string;
}

export interface VerdictBreakdown {
  yes: number;
  maybe: number;
  no: number;
}

export interface CategoryAverage {
  category: ScoreCategory;
  averageScore: number;
}

export interface AudienceFitRow {
  segment: string;
  fitScore: number;
  recommendation: string;
  personaCount: number;
}

export interface Recommendation {
  priority: "Critical" | "High" | "Medium";
  title: string;
  description: string;
  mentionCount: number;
  totalPersonas: number;
}

export interface AggregateData {
  overallScore: number;
  totalReviews: number;
  verdictBreakdown: VerdictBreakdown;
  recommendPercentage: number;
  categoryAverages: CategoryAverage[];
  audienceFit: AudienceFitRow[];
  topRecommendations: Recommendation[];
}

export type WaveStatus = "idle" | "processing" | "complete" | "error";

export interface WaveInfo {
  number: number;
  name: string;
  status: WaveStatus;
  personaCount: number;
}

export const WAVE_DEFINITIONS: { number: number; name: string }[] = [
  { number: 1, name: "Technical" },
  { number: 2, name: "Business" },
  { number: 3, name: "Users" },
  { number: 4, name: "Specialists" },
  { number: 5, name: "Edge Cases" },
];

export interface WaveResponse {
  success: boolean;
  waveNumber: number;
  reviews: PersonaReview[];
  error?: string;
}

export interface SavedReview {
  id: string;
  url: string;
  reviews: PersonaReview[];
  aggregate: AggregateData | null;
  createdAt: string;
}
