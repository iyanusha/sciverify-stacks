"use client";
import { useState, useCallback, useEffect } from 'react';

interface Seo_metaState { data: unknown; loading: boolean; error: string | null; }

export function useSeo_meta() {
  const [state, setState] = useState<Seo_metaState>({ data: null, loading: false, error: null });

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
