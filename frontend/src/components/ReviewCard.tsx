'use client';

import { useState } from 'react';
import { Review } from '@/types/review';
import { formatScore } from '@/lib/reviewUtils';
import RecommendationBadge from './RecommendationBadge';
import ScoreBreakdown from './ScoreBreakdown';

interface ReviewCardProps {
  review: Review;
}

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(review.submittedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="review-card rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-sm shrink-0">
            {review.reviewerId.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {truncateAddress(review.reviewerId)}
            </p>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-0.5">Score</p>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              {formatScore(review.overallScore)}
            </p>
          </div>
          <RecommendationBadge recommendation={review.recommendation} size="sm" />
        </div>
      </div>

      {review.txHash && (
        <p className="mt-2 text-xs text-gray-400">
          TX:{' '}
          <a
            href={`https://explorer.stacks.co/txid/${review.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-accent-600 hover:text-accent-700"
          >
            {review.txHash.slice(0, 10)}...
          </a>
        </p>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 text-xs font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1"
        aria-expanded={expanded}
      >
        {expanded ? 'Hide breakdown' : 'View breakdown'}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4">
          <ScoreBreakdown review={review} />
        </div>
      )}
    </div>
  );
}
