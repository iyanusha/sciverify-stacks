'use client';

import { useState } from 'react';
import { Review } from '@/types/review';

type SubmitPayload = Omit<Review, 'id' | 'submittedAt' | 'txHash'>;

interface UseSubmitReviewReturn {
  submitting: boolean;
  error: string | null;
  txId: string | null;
  submitReview: (publicationId: string, review: SubmitPayload) => Promise<void>;
}

export function useSubmitReview(): UseSubmitReviewReturn {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  async function submitReview(publicationId: string, review: SubmitPayload): Promise<void> {
    setSubmitting(true);
    setError(null);
    setTxId(null);

    try {
      const { openContractCall } = await import('@stacks/connect');

      const { principalCV, uintCV, stringAsciiCV, tupleCV, listCV } = await import('@stacks/transactions');

      const scoresCV = listCV(
        review.scores.map((s) =>
          tupleCV({
            'criteria-id': stringAsciiCV(s.criteriaId),
            score: uintCV(s.score),
          })
        )
      );

      await openContractCall({
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? 'ST000000000000000000002AMW42H',
        contractName: 'review-protocol',
        functionName: 'submit-review',
        functionArgs: [
          principalCV(publicationId),
          scoresCV,
          uintCV(Math.round(review.overallScore * 100)),
          stringAsciiCV(review.recommendation),
        ],
        onFinish: ({ txId: id }: { txId: string }) => {
          setTxId(id);
          // Notify other hooks that a review was submitted
          window.dispatchEvent(new CustomEvent('review_submitted', { detail: { publicationId } }));
        },
        onCancel: () => {
          setError('Transaction cancelled by user.');
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  return { submitting, error, txId, submitReview };
}
