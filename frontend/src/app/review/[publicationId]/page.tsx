'use client';

import { use } from 'react';
import { useFetchReviews } from '@/hooks/useFetchReviews';
import { useSubmitReview } from '@/hooks/useSubmitReview';
import { useWallet } from '@/hooks/useWallet';
import ReviewsList from '@/components/ReviewsList';
import ReviewForm from '@/components/ReviewForm';
import { Review } from '@/types/review';

// Sample publication data — replace with actual contract reads
const PUBLICATIONS: Record<string, { title: string; abstract: string }> = {
  'pub-001': {
    title: 'Decentralized Peer Review Using Blockchain Consensus Mechanisms',
    abstract:
      'We propose a novel framework for scientific peer review that leverages blockchain technology to create transparent, tamper-proof review records. Our system uses Clarity smart contracts on the Stacks blockchain to record reviewer decisions and reputation scores immutably.',
  },
  'pub-002': {
    title: 'Reproducibility Crisis in Machine Learning Research: A Systematic Analysis',
    abstract:
      'This paper analyzes 500 published machine learning papers and evaluates their reproducibility. We find that fewer than 30% of results can be reproduced with the original code and data.',
  },
};

interface PageProps {
  params: Promise<{ publicationId: string }>;
}

export default function ReviewPage({ params }: PageProps) {
  const { publicationId } = use(params);
  const { reviews, loading, error } = useFetchReviews(publicationId);
  const { submitReview, submitting, error: submitError, txId } = useSubmitReview();
  const { isConnected, getAddress } = useWallet();

  const publication = PUBLICATIONS[publicationId];
  const address = getAddress() ?? '';

  async function handleSubmit(review: Omit<Review, 'id' | 'submittedAt'>) {
    await submitReview(publicationId, review);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {publication ? (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{publication.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{publication.abstract}</p>
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Publication Review</h1>
          <p className="mt-1 text-sm text-gray-500">ID: {publicationId}</p>
        </div>
      )}

      <section aria-label="Existing reviews" className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Reviews {!loading && `(${reviews.length})`}
        </h2>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <ReviewsList reviews={reviews} loading={loading} />
      </section>

      <section aria-label="Submit review">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Submit Your Review</h2>
        {!isConnected ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
            <p className="text-sm text-gray-500">
              Connect your Stacks wallet to submit a review.
            </p>
          </div>
        ) : (
          <>
            {txId ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
                <p className="text-sm font-medium text-green-700">
                  Review submitted successfully!
                </p>
                <a
                  href={`https://explorer.stacks.co/txid/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-green-600 hover:text-green-700"
                >
                  View transaction →
                </a>
              </div>
            ) : (
              <>
                {submitError && (
                  <p className="mb-3 text-sm text-red-600">{submitError}</p>
                )}
                {submitting && (
                  <p className="mb-3 text-sm text-gray-500 animate-pulse">Submitting review...</p>
                )}
                <ReviewForm
                  publicationId={publicationId}
                  reviewerId={address}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
