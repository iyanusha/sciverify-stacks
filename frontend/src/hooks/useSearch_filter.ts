"use client";
import { useState, useCallback, useEffect } from 'react';

interface Search_filterState { data: unknown; loading: boolean; error: string | null; }

export function useSearch_filter() {
  const [state, setState] = useState<Search_filterState>({ data: null, loading: false, error: null });

  const fetch = useCallback(async () => {
    setState(p => ({ ...p, loading: true, error: null }));
    try {
      setState(p => ({ ...p, data: {}, loading: false }));
    } catch (err) {
      setState(p => ({ ...p, error: err instanceof Error ? err.message : 'Failed', loading: false }));
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { ...state, refetch: fetch };
}
