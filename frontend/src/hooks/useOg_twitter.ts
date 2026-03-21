"use client";
import { useState, useCallback, useEffect } from 'react';

interface Og_twitterState { data: unknown; loading: boolean; error: string | null; }

export function useOg_twitter() {
  const [state, setState] = useState<Og_twitterState>({ data: null, loading: false, error: null });

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
