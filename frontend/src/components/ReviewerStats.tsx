'use client';

import { Review } from '@/types/review';
import { calculateConsensus, formatScore, getRecommendationFromScore } from '@/lib/reviewUtils';

interface ReviewerStatsProps {
  reviewerId: string;
  allReviews: Review[];
}

export default function ReviewerStats({ reviewerId, allReviews }: ReviewerStatsProps) {
  const myReviews = allReviews.filter((r) => r.reviewerId === reviewerId);

  if (myReviews.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 text-center">
        No reviews submitted yet.
      </div>
    );
  }

  const meanGiven =
    myReviews.reduce((acc, r) => acc + r.overallScore, 0) / myReviews.length;

  // Agreement rate: percentage of my reviews where my recommendation matches consensus
  let agreements = 0;
  for (const review of myReviews) {
    const pubReviews = allReviews.filter((r) => r.publicationId === review.publicationId);
    if (pubReviews.length < 2) continue;
    const { meanScore } = calculateConsensus(pubReviews);
    const consensusRec = getRecommendationFromScore(meanScore);
    if (consensusRec === review.recommendation) agreements++;
  }
  const pubsWithMultiple = myReviews.filter(
    (r) => allReviews.filter((a) => a.publicationId === r.publicationId).length >= 2
  ).length;
  const agreementRate =
    pubsWithMultiple > 0 ? Math.round((agreements / pubsWithMultiple) * 100) : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-700">Your Review Stats</h3>
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-gray-50 p-3">
          <dt className="text-xs text-gray-500">Total Reviews</dt>
          <dd className="mt-1 text-2xl font-bold text-gray-900">{myReviews.length}</dd>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <dt className="text-xs text-gray-500">Mean Score Given</dt>
          <dd className="mt-1 text-2xl font-bold text-gray-900">{formatScore(meanGiven)}</dd>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <dt className="text-xs text-gray-500">Agreement Rate</dt>
          <dd className="mt-1 text-2xl font-bold text-gray-900">
            {agreementRate !== null ? `${agreementRate}%` : 'N/A'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
