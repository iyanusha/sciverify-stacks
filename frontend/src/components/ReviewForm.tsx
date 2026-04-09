'use client';

import { useEffect, useReducer, useCallback } from 'react';
import { Review, ReviewCriteria, ReviewScore } from '@/types/review';
import {
  DEFAULT_CRITERIA,
  calculateWeightedScore,
  getRecommendationFromScore,
  formatScore,
} from '@/lib/reviewUtils';
import ScoreSlider from './ScoreSlider';
import RecommendationBadge from './RecommendationBadge';

interface ReviewFormProps {
  publicationId: string;
  onSubmit: (review: Omit<Review, 'id' | 'submittedAt'>) => void;
  reviewerId: string;
  criteria?: ReviewCriteria[];
}

interface FormState {
  scores: ReviewScore[];
  touched: Set<string>;
  errors: Record<string, string>;
  draftSaved: boolean;
}

type FormAction =
  | { type: 'SET_SCORE'; payload: ReviewScore }
  | { type: 'MARK_TOUCHED'; criteriaId: string }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'DRAFT_SAVED' }
  | { type: 'RESTORE_DRAFT'; scores: ReviewScore[] };

function initScores(criteria: ReviewCriteria[]): ReviewScore[] {
  return criteria.map((c) => ({ criteriaId: c.id, score: 3 }));
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_SCORE': {
      const scores = state.scores.map((s) =>
        s.criteriaId === action.payload.criteriaId ? action.payload : s
      );
      return { ...state, scores, draftSaved: false };
    }
    case 'MARK_TOUCHED': {
      const touched = new Set(state.touched);
      touched.add(action.criteriaId);
      return { ...state, touched };
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'DRAFT_SAVED':
      return { ...state, draftSaved: true };
    case 'RESTORE_DRAFT':
      return { ...state, scores: action.scores };
    default:
      return state;
  }
}

export default function ReviewForm({
  publicationId,
  onSubmit,
  reviewerId,
  criteria = DEFAULT_CRITERIA,
}: ReviewFormProps) {
  const draftKey = `review_draft_${publicationId}`;

  const [state, dispatch] = useReducer(formReducer, {
    scores: initScores(criteria),
    touched: new Set(),
    errors: {},
    draftSaved: false,
  });

  // Restore draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ReviewScore[];
        dispatch({ type: 'RESTORE_DRAFT', scores: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, [draftKey]);

  // Auto-save draft every 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(state.scores));
      dispatch({ type: 'DRAFT_SAVED' });
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.scores, draftKey]);

  const handleScoreChange = useCallback((score: ReviewScore) => {
    dispatch({ type: 'SET_SCORE', payload: score });
    dispatch({ type: 'MARK_TOUCHED', criteriaId: score.criteriaId });
  }, []);

  const overallScore = calculateWeightedScore(state.scores, criteria);
  const recommendation = getRecommendationFromScore(overallScore);

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    const untouched = criteria.filter((c) => !state.touched.has(c.id));
    if (untouched.length > 0) {
      errors.touched = `Please interact with all sliders before submitting.`;
    }
    const totalComments = state.scores.filter((s) => s.comment?.trim()).length;
    if (totalComments === 0) {
      errors.comment = 'Please add at least one comment to support your scores.';
    }
    return errors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    dispatch({ type: 'SET_ERRORS', errors });
    if (Object.keys(errors).length > 0) return;

    localStorage.removeItem(draftKey);
    onSubmit({
      publicationId,
      reviewerId,
      scores: state.scores,
      overallScore,
      recommendation,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-800">Submit Your Review</h3>
        {state.draftSaved && (
          <span className="text-xs text-gray-400 animate-pulse">Draft saved</span>
        )}
      </div>

      {criteria.map((c) => {
        const score = state.scores.find((s) => s.criteriaId === c.id) ?? {
          criteriaId: c.id,
          score: 3,
        };
        return (
          <ScoreSlider
            key={c.id}
            criteria={c}
            value={score}
            onChange={handleScoreChange}
          />
        );
      })}

      {Object.values(state.errors).map((msg, i) => (
        <p key={i} role="alert" className="text-sm text-red-600">
          {msg}
        </p>
      ))}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Weighted score</p>
            <p className="text-3xl font-bold text-gray-900">{formatScore(overallScore)}</p>
            <p className="text-xs text-gray-400">out of 5.0</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Recommendation</p>
            <RecommendationBadge recommendation={recommendation} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
}
