'use client';

import { Review } from '@/types/review';

interface ScoreHistogramProps {
  reviews: Review[];
}

export default function ScoreHistogram({ reviews }: ScoreHistogramProps) {
  const buckets: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const r of reviews) {
    const rounded = Math.round(r.overallScore) as 1 | 2 | 3 | 4 | 5;
    const key = Math.max(1, Math.min(5, rounded)) as 1 | 2 | 3 | 4 | 5;
    buckets[key] = (buckets[key] ?? 0) + 1;
  }

  const maxCount = Math.max(...Object.values(buckets), 1);

  const barColors: Record<number, string> = {
    1: 'bg-red-400',
    2: 'bg-orange-400',
    3: 'bg-yellow-400',
    4: 'bg-green-400',
    5: 'bg-emerald-500',
  };

  return (
    <div aria-label="Score distribution histogram">
      <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Score Distribution
      </p>
      <div className="flex items-end gap-1 h-16">
        {[1, 2, 3, 4, 5].map((score) => {
          const count = buckets[score] ?? 0;
          const heightPct = (count / maxCount) * 100;
          return (
            <div
              key={score}
              className="flex flex-1 flex-col items-center gap-1"
              title={`Score ${score}: ${count} review${count === 1 ? '' : 's'}`}
            >
              <span className="text-[10px] text-gray-400 tabular-nums">{count || ''}</span>
              <div
                className={`w-full rounded-t transition-all ${barColors[score]}`}
                style={{ height: `${Math.max(heightPct, count > 0 ? 8 : 0)}%` }}
                role="img"
                aria-label={`${count} reviews with score ${score}`}
              />
              <span className="text-[10px] text-gray-500">{score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
