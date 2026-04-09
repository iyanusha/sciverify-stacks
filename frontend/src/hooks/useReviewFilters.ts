'use client';

import { useState, useMemo } from 'react';
import { Review } from '@/types/review';
import { compareReviews } from '@/lib/reviewUtils';

type ReviewSortBy = 'date' | 'score-high' | 'score-low';
type ReviewFilter = 'all' | 'accept' | 'minor-revision' | 'major-revision' | 'reject';

interface UseReviewFiltersReturn {
  filteredReviews: Review[];
  sortBy: ReviewSortBy;
  setSortBy: (s: ReviewSortBy) => void;
  filter: ReviewFilter;
  setFilter: (f: ReviewFilter) => void;
  totalFiltered: number;
}

export function useReviewFilters(reviews: Review[]): UseReviewFiltersReturn {
  const [sortBy, setSortBy] = useState<ReviewSortBy>('date');
  const [filter, setFilter] = useState<ReviewFilter>('all');

  const filteredReviews = useMemo(() => {
    let result = reviews;

    if (filter !== 'all') {
      result = result.filter((r) => r.recommendation === filter);
    }

    switch (sortBy) {
      case 'score-high':
        result = [...result].sort((a, b) => b.overallScore - a.overallScore);
        break;
      case 'score-low':
        result = [...result].sort((a, b) => a.overallScore - b.overallScore);
        break;
      case 'date':
      default:
        result = [...result].sort(compareReviews);
    }

    return result;
  }, [reviews, sortBy, filter]);

  return {
    filteredReviews,
    sortBy,
    setSortBy,
    filter,
    setFilter,
    totalFiltered: filteredReviews.length,
  };
}
