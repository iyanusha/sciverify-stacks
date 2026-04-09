export interface ReviewCriteria {
  id: string;
  label: string;
  description: string;
  weight: number;
}

export interface ReviewScore {
  criteriaId: string;
  score: number;
  comment?: string;
}

export interface Review {
  id: string;
  publicationId: string;
  reviewerId: string;
  scores: ReviewScore[];
  overallScore: number;
  recommendation: 'accept' | 'minor-revision' | 'major-revision' | 'reject';
  submittedAt: number;
  txHash?: string;
}
