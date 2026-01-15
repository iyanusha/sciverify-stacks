"use client";
import { useState, useCallback, useEffect } from 'react';

interface Credential_uiState { data: unknown; loading: boolean; error: string | null; }

export function useCredential_ui() {
  const [state, setState] = useState<Credential_uiState>({ data: null, loading: false, error: null });

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
