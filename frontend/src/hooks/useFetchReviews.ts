'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Review } from '@/types/review';
import { compareReviews } from '@/lib/reviewUtils';

// In-memory cache keyed by publicationId
const reviewCache = new Map<string, Review[]>();

// Sample mock data — replace with actual contract reads once deployed
const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    publicationId: 'pub-001',
    reviewerId: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    scores: [
      { criteriaId: 'originality', score: 4, comment: 'Novel approach to decentralized review.' },
      { criteriaId: 'methodology', score: 5 },
      { criteriaId: 'clarity', score: 4 },
      { criteriaId: 'significance', score: 4 },
      { criteriaId: 'references', score: 3 },
      { criteriaId: 'reproducibility', score: 4 },
    ],
    overallScore: 4.15,
    recommendation: 'accept',
    submittedAt: 1741000000000,
    txHash: '0xabc123def456',
  },
  {
    id: 'rev-002',
    publicationId: 'pub-001',
    reviewerId: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    scores: [
      { criteriaId: 'originality', score: 3 },
      { criteriaId: 'methodology', score: 4, comment: 'Solid methodology but limited sample size.' },
      { criteriaId: 'clarity', score: 3 },
      { criteriaId: 'significance', score: 3 },
      { criteriaId: 'references', score: 4 },
      { criteriaId: 'reproducibility', score: 3 },
    ],
    overallScore: 3.3,
    recommendation: 'minor-revision',
    submittedAt: 1741500000000,
  },
];

interface UseFetchReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchReviews(publicationId: string): UseFetchReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>(() => reviewCache.get(publicationId) ?? []);
  const [loading, setLoading] = useState(!reviewCache.has(publicationId));
  const [error, setError] = useState<string | null>(null);
  const fetchCountRef = useRef(0);

  const fetch = useCallback(async () => {
    const currentFetch = ++fetchCountRef.current;
    setLoading(true);
    setError(null);

    try {
      // TODO: replace with actual Clarity read-only call
      await new Promise((res) => setTimeout(res, 300));
      if (currentFetch !== fetchCountRef.current) return; // stale

      const data = MOCK_REVIEWS
        .filter((r) => r.publicationId === publicationId)
        .sort(compareReviews);

      reviewCache.set(publicationId, data);
      setReviews(data);
    } catch (err) {
      if (currentFetch !== fetchCountRef.current) return;
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      if (currentFetch === fetchCountRef.current) setLoading(false);
    }
  }, [publicationId]);

  useEffect(() => {
    if (!reviewCache.has(publicationId)) {
      fetch();
    }

    function handleReviewSubmitted(e: Event) {
      const detail = (e as CustomEvent<{ publicationId: string }>).detail;
      if (detail.publicationId === publicationId) {
        reviewCache.delete(publicationId);
        fetch();
      }
    }

    window.addEventListener('review_submitted', handleReviewSubmitted);
    return () => window.removeEventListener('review_submitted', handleReviewSubmitted);
  }, [publicationId, fetch]);

  return { reviews, loading, error, refetch: fetch };
}
