'use client';

import { Review } from '@/types/review';
import { calculateConsensus, formatScore, getScoreCategory, groupByRecommendation } from '@/lib/reviewUtils';

interface PublicationRatingProps {
  reviews: Review[];
  showDetails?: boolean;
}

const STAR_COLORS = {
  excellent: 'text-emerald-500',
  good: 'text-green-500',
  average: 'text-yellow-500',
  poor: 'text-red-500',
};

function StarRating({ score }: { score: number }) {
  const filled = Math.round((score - 1) / (5 - 1) * 5);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${formatScore(score)} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`h-4 w-4 ${n <= filled ? 'text-yellow-400' : 'text-gray-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function PublicationRating({ reviews, showDetails = false }: PublicationRatingProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <StarRating score={0} />
        <span className="text-xs text-gray-400">No reviews yet</span>
      </div>
    );
  }

  const { meanScore } = calculateConsensus(reviews);
  const category = getScoreCategory(meanScore);
  const byRec = groupByRecommendation(reviews);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <StarRating score={meanScore} />
        <span className={`text-sm font-bold tabular-nums ${STAR_COLORS[category]}`}>
          {formatScore(meanScore)}
        </span>
        <span className="text-xs text-gray-400">
          ({reviews.length} review{reviews.length === 1 ? '' : 's'})
        </span>
      </div>

      {showDetails && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {Object.entries(byRec).map(([rec, count]) => (
            <span key={rec} className="capitalize">
              {count} {rec.replace('-', ' ')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
