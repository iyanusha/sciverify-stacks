'use client';

import { useState } from 'react';
import { ReviewCriteria, ReviewScore } from '@/types/review';

interface ScoreSliderProps {
  criteria: ReviewCriteria;
  value: ReviewScore;
  onChange: (score: ReviewScore) => void;
}

const SCORE_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Below average',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

const SCORE_COLORS: Record<number, string> = {
  1: 'text-red-600',
  2: 'text-orange-500',
  3: 'text-yellow-500',
  4: 'text-green-500',
  5: 'text-emerald-600',
};

export default function ScoreSlider({ criteria, value, onChange }: ScoreSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...value, score: Number(e.target.value) });
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange({ ...value, comment: e.target.value });
  }

  const scoreColor = SCORE_COLORS[value.score] ?? 'text-gray-600';

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-gray-800">{criteria.label}</span>
          <span className="text-xs text-gray-400 font-normal">
            ({Math.round(criteria.weight * 100)}% weight)
          </span>
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="relative ml-1 rounded-full h-4 w-4 border border-gray-300 text-gray-400 text-[10px] font-bold leading-none flex items-center justify-center hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500"
            aria-label={`Info: ${criteria.description}`}
          >
            ?
            {showTooltip && (
              <div className="absolute left-full top-0 ml-2 z-10 w-56 rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-xs text-gray-600 font-normal text-left">
                {criteria.description}
              </div>
            )}
          </button>
        </div>
        <div className={`text-right shrink-0 ${scoreColor}`}>
          <span className="text-lg font-bold tabular-nums">{value.score}</span>
          <span className="text-xs ml-1">{SCORE_LABELS[value.score]}</span>
        </div>
      </div>

      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value.score}
        onChange={handleScoreChange}
        aria-label={`${criteria.label} score`}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={value.score}
        aria-valuetext={`${value.score} - ${SCORE_LABELS[value.score]}`}
        className="w-full h-2 appearance-none rounded-full bg-gray-200 cursor-pointer accent-accent-600"
      />

      <div className="flex justify-between mt-1 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="text-[10px] text-gray-400">{n}</span>
        ))}
      </div>

      <textarea
        value={value.comment ?? ''}
        onChange={handleCommentChange}
        placeholder={`Optional comment on ${criteria.label.toLowerCase()}...`}
        rows={2}
        className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/30"
      />
    </div>
  );
}
