'use client';

import { Review } from '@/types/review';
import { calculateConsensus, formatScore, groupByRecommendation } from '@/lib/reviewUtils';
import ReviewCard from './ReviewCard';
import ScoreHistogram from './ScoreHistogram';
import RecommendationBadge from './RecommendationBadge';

interface ReviewsListProps {
  reviews: Review[];
  loading?: boolean;
}

export default function ReviewsList({ reviews, loading }: ReviewsListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
        <p className="text-sm text-gray-500">No reviews yet. Be the first to review this publication.</p>
      </div>
    );
  }

  const { meanScore, stdDev, consensus } = calculateConsensus(reviews);
  const byRecommendation = groupByRecommendation(reviews);

  const consensusColor = {
    strong: 'text-green-600',
    moderate: 'text-yellow-600',
    weak: 'text-red-600',
  }[consensus];

  return (
    <div>
      {/* Aggregate stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Mean Score</p>
          <p className="text-3xl font-bold text-gray-900">{formatScore(meanScore)}</p>
          <p className="text-xs text-gray-400">{reviews.length} review{reviews.length === 1 ? '' : 's'}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Consensus</p>
          <p className={`text-xl font-bold capitalize ${consensusColor}`}>{consensus}</p>
          <p className="text-xs text-gray-400">σ = {formatScore(stdDev)}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-2">Recommendations</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(byRecommendation).map(([rec, count]) => (
              <span key={rec} className="text-xs text-gray-500">
                <RecommendationBadge recommendation={rec as Review['recommendation']} size="sm" />
                <span className="ml-1 font-medium">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <ScoreHistogram reviews={reviews} />
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
