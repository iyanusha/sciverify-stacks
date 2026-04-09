'use client';

import { Review } from '@/types/review';
import { calculateConsensus, formatScore } from '@/lib/reviewUtils';

interface ConsensusMeterProps {
  reviews: Review[];
}

const CONSENSUS_CONFIG = {
  strong: {
    label: 'Strong Consensus',
    barClass: 'bg-green-500',
    textClass: 'text-green-700',
    barWidth: '90%',
    description: 'Reviewers are in close agreement.',
  },
  moderate: {
    label: 'Moderate Consensus',
    barClass: 'bg-yellow-500',
    textClass: 'text-yellow-700',
    barWidth: '60%',
    description: 'Some variation in reviewer opinions.',
  },
  weak: {
    label: 'Weak Consensus',
    barClass: 'bg-red-500',
    textClass: 'text-red-700',
    barWidth: '30%',
    description: 'Significant disagreement among reviewers.',
  },
};

export default function ConsensusMeter({ reviews }: ConsensusMeterProps) {
  if (reviews.length < 2) {
    return (
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs text-gray-500 text-center">
        Need at least 2 reviews to measure consensus.
      </div>
    );
  }

  const { meanScore, stdDev, consensus } = calculateConsensus(reviews);
  const cfg = CONSENSUS_CONFIG[consensus];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Consensus</p>
        <span className={`text-xs font-semibold ${cfg.textClass}`}>{cfg.label}</span>
      </div>

      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${cfg.barClass}`}
          style={{ width: cfg.barWidth }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">{cfg.description}</p>

      <div className="mt-3 flex justify-between text-xs text-gray-400 tabular-nums">
        <span>Mean: {formatScore(meanScore)}</span>
        <span>σ = {formatScore(stdDev)}</span>
        <span>{reviews.length} reviewer{reviews.length === 1 ? '' : 's'}</span>
      </div>
    </div>
  );
}
