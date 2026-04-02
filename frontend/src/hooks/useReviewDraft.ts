'use client';

import { useState, useEffect, useRef } from 'react';
import { ReviewScore } from '@/types/review';

interface UseReviewDraftReturn {
  draftScores: ReviewScore[] | null;
  saveDraft: (scores: ReviewScore[]) => void;
  clearDraft: () => void;
  draftSavedAt: number | null;
}

export function useReviewDraft(publicationId: string): UseReviewDraftReturn {
  const draftKey = `review_draft_${publicationId}`;
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const [draftScores, setDraftScores] = useState<ReviewScore[] | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { scores: ReviewScore[]; savedAt: number };
        setDraftScores(parsed.scores);
        setDraftSavedAt(parsed.savedAt);
      }
    } catch {
      // corrupted draft — ignore
    }
  }, [draftKey]);

  function saveDraft(scores: ReviewScore[]): void {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const now = Date.now();
      const data = { scores, savedAt: now };
      localStorage.setItem(draftKey, JSON.stringify(data));
      setDraftSavedAt(now);
    }, 2000);
  }

  function clearDraft(): void {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    localStorage.removeItem(draftKey);
    setDraftScores(null);
    setDraftSavedAt(null);
  }

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  return { draftScores, saveDraft, clearDraft, draftSavedAt };
}
