'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Publication, SearchFilters } from '@/types/publication';
import { rankResults, applyFilters } from '@/lib/searchUtils';

const PAGE_SIZE = 10;

type SortBy = 'relevance' | 'date' | 'title';

interface UsePublicationSearchReturn {
  results: Publication[];
  loading: boolean;
  error: string | null;
  query: string;
  setQuery: (q: string) => void;
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  total: number;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  hasResults: boolean;
  isEmpty: boolean;
  isFiltered: boolean;
}

export function usePublicationSearch(
  publications: Publication[]
): UsePublicationSearchReturn {
  const [query, setQueryRaw] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [results, setResults] = useState<Publication[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setQuery = useCallback((q: string) => {
    setQueryRaw(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(q);
      setPage(1);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let filtered = applyFilters(publications, { ...filters, query: debouncedQuery });

      if (debouncedQuery.trim()) {
        filtered = rankResults(filtered, debouncedQuery);
      }

      if (sortBy === 'date') {
        filtered = [...filtered].sort((a, b) => b.submittedAt - a.submittedAt);
      } else if (sortBy === 'title') {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      }

      setTotal(filtered.length);
      const start = (page - 1) * PAGE_SIZE;
      setResults(filtered.slice(start, start + PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, filters, page, sortBy, publications]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasResults = results.length > 0;
  const isEmpty = !loading && total === 0;
  const isFiltered = Boolean(
    debouncedQuery.trim() ||
      filters.status ||
      filters.author ||
      filters.keyword ||
      filters.dateFrom ||
      filters.dateTo
  );

  return {
    results,
    loading,
    error,
    query,
    setQuery,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    total,
    sortBy,
    setSortBy,
    hasResults,
    isEmpty,
    isFiltered,
  };
}
