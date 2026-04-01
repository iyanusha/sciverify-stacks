'use client';

import { Review, ReviewCriteria, ReviewScore } from '@/types/review';
import { DEFAULT_CRITERIA, formatScore } from '@/lib/reviewUtils';

interface ScoreBreakdownProps {
  review: Review;
  criteria?: ReviewCriteria[];
}

function scoreCellClass(score: number): string {
  if (score <= 2) return 'score-cell-low';
  if (score === 3) return 'score-cell-mid';
  return 'score-cell-high';
}

export default function ScoreBreakdown({ review, criteria = DEFAULT_CRITERIA }: ScoreBreakdownProps) {
  const criteriaMap = new Map(criteria.map((c) => [c.id, c]));
  const scoreMap = new Map(review.scores.map((s) => [s.criteriaId, s]));

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Criteria
            </th>
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Weight
            </th>
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Score
            </th>
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Contribution
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {criteria.map((c) => {
            const score = scoreMap.get(c.id);
            if (!score) return null;
            const contribution = score.score * c.weight;
            return (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-700">{c.label}</p>
                  {score.comment && (
                    <p className="mt-0.5 text-xs text-gray-500 italic">{score.comment}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-gray-500">
                  {Math.round(c.weight * 100)}%
                </td>
                <td className={`px-4 py-3 text-center font-semibold rounded ${scoreCellClass(score.score)}`}>
                  {score.score}
                </td>
                <td className="px-4 py-3 text-center text-gray-600 tabular-nums">
                  {formatScore(contribution)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-gray-50 border-t-2 border-gray-200">
          <tr>
            <td colSpan={3} className="px-4 py-3 font-semibold text-gray-800 text-right">
              Weighted Total
            </td>
            <td className="px-4 py-3 text-center font-bold text-gray-900 tabular-nums">
              {formatScore(review.overallScore)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
