import { Review, ReviewCriteria, ReviewScore } from '@/types/review';

export const DEFAULT_CRITERIA: ReviewCriteria[] = [
  {
    id: 'originality',
    label: 'Originality',
    description: 'How novel and innovative is the research contribution?',
    weight: 0.25,
  },
  {
    id: 'methodology',
    label: 'Methodology',
    description: 'Are the research methods rigorous, appropriate and well-described?',
    weight: 0.25,
  },
  {
    id: 'clarity',
    label: 'Clarity',
    description: 'Is the paper clearly written, well-organized and easy to follow?',
    weight: 0.20,
  },
  {
    id: 'significance',
    label: 'Significance',
    description: 'How important is the contribution to the field?',
    weight: 0.15,
  },
  {
    id: 'references',
    label: 'References',
    description: 'Are citations adequate, accurate and up to date?',
    weight: 0.10,
  },
  {
    id: 'reproducibility',
    label: 'Reproducibility',
    description: 'Can the results be independently verified and reproduced?',
    weight: 0.05,
  },
];

export function calculateWeightedScore(
  scores: ReviewScore[],
  criteria: ReviewCriteria[]
): number {
  const criteriaMap = new Map(criteria.map((c) => [c.id, c]));
  let total = 0;
  let totalWeight = 0;

  for (const score of scores) {
    const criterion = criteriaMap.get(score.criteriaId);
    if (criterion) {
      total += score.score * criterion.weight;
      totalWeight += criterion.weight;
    }
  }

  return totalWeight > 0 ? total / totalWeight : 0;
}

export function getRecommendationFromScore(
  score: number
): Review['recommendation'] {
  if (score >= 4.0) return 'accept';
  if (score >= 3.0) return 'minor-revision';
  if (score >= 2.0) return 'major-revision';
  return 'reject';
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function calculateConsensus(
  reviews: Review[]
): { meanScore: number; stdDev: number; consensus: 'strong' | 'moderate' | 'weak' } {
  if (reviews.length === 0) {
    return { meanScore: 0, stdDev: 0, consensus: 'weak' };
  }

  const scores = reviews.map((r) => r.overallScore);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((acc, s) => acc + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  let consensus: 'strong' | 'moderate' | 'weak';
  if (stdDev < 0.5) consensus = 'strong';
  else if (stdDev < 1.0) consensus = 'moderate';
  else consensus = 'weak';

  return { meanScore: mean, stdDev, consensus };
}

export function groupByRecommendation(
  reviews: Review[]
): Record<string, number> {
  return reviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.recommendation] = (acc[r.recommendation] ?? 0) + 1;
    return acc;
  }, {});
}

export function normalizeScore(raw: number, min = 1, max = 5): number {
  return ((raw - min) / (max - min)) * 10;
}

export function denormalizeScore(normalized: number, min = 1, max = 5): number {
  return (normalized / 10) * (max - min) + min;
}

export function compareReviews(a: Review, b: Review): number {
  return b.submittedAt - a.submittedAt;
}

export function summarizeVotes(reviews: Review[]): {
  totalVoters: number;
  uniqueAddresses: number;
  meanScore: number;
  stdDev: number;
} {
  const { meanScore, stdDev } = calculateConsensus(reviews);
  const uniqueAddresses = new Set(reviews.map((r) => r.reviewerId)).size;
  return {
    totalVoters: reviews.length,
    uniqueAddresses,
    meanScore,
    stdDev,
  };
}

export function getScoreCategory(score: number): 'excellent' | 'good' | 'average' | 'poor' {
  if (score >= 4.5) return 'excellent';
  if (score >= 3.5) return 'good';
  if (score >= 2.5) return 'average';
  return 'poor';
}

export function canReviewerSubmit(reviews: Review[], reviewerId: string, publicationId: string): boolean {
  return !reviews.some(
    (r) => r.reviewerId === reviewerId && r.publicationId === publicationId
  );
}

export function getAverageByCategory(reviews: Review[]): Record<string, number> {
  const categoryScores: Record<string, number[]> = {};

  for (const review of reviews) {
    const category = getScoreCategory(review.overallScore);
    if (!categoryScores[category]) categoryScores[category] = [];
    categoryScores[category].push(review.overallScore);
  }

  const result: Record<string, number> = {};
  for (const [category, scores] of Object.entries(categoryScores)) {
    result[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  return result;
}
