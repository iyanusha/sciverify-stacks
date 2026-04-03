'use client';

import { use, useState } from 'react';
import { useFetchReviews } from '@/hooks/useFetchReviews';
import { useSubmitReview } from '@/hooks/useSubmitReview';
import { useWallet } from '@/hooks/useWallet';
import ReviewsList from '@/components/ReviewsList';
import ReviewForm from '@/components/ReviewForm';
import PublicationRating from '@/components/PublicationRating';
import ConsensusMeter from '@/components/ConsensusMeter';
import { Review } from '@/types/review';

const PUBLICATIONS: Record<string, { title: string; abstract: string; authors: string[]; doi?: string }> = {
  'pub-001': {
    title: 'Decentralized Peer Review Using Blockchain Consensus Mechanisms',
    abstract:
      'We propose a novel framework for scientific peer review that leverages blockchain technology to create transparent, tamper-proof review records. Our system uses Clarity smart contracts on the Stacks blockchain to record reviewer decisions and reputation scores immutably.',
    authors: ['Dr. Amara Osei', 'Prof. Kwame Mensah', 'Dr. Fatima Al-Hassan'],
    doi: '10.1234/sciverify.2025.001',
  },
};

type TabId = 'overview' | 'reviews' | 'submit';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const { reviews, loading, error } = useFetchReviews(id);
  const { submitReview, submitting, error: submitError, txId } = useSubmitReview();
  const { isConnected, getAddress } = useWallet();

  const publication = PUBLICATIONS[id];
  const address = getAddress() ?? '';

  async function handleSubmit(review: Omit<Review, 'id' | 'submittedAt'>) {
    await submitReview(id, review);
  }

  const TABS: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'submit', label: 'Submit Review' },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {publication?.title ?? `Publication ${id}`}
        </h1>
        {publication?.authors && (
          <p className="mt-1 text-sm text-gray-500">{publication.authors.join(', ')}</p>
        )}
        {publication?.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-xs text-accent-600 hover:text-accent-700"
          >
            DOI: {publication.doi}
          </a>
        )}

        <div className="mt-3">
          <PublicationRating reviews={reviews} showDetails />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-6" aria-label="Publication sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent-600 text-accent-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && publication && (
        <div>
          <h2 className="mb-2 text-base font-semibold text-gray-800">Abstract</h2>
          <p className="text-sm leading-relaxed text-gray-600">{publication.abstract}</p>
          {reviews.length >= 2 && (
            <div className="mt-6">
              <ConsensusMeter reviews={reviews} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <ReviewsList reviews={reviews} loading={loading} />
        </div>
      )}

      {activeTab === 'submit' && (
        <div>
          {!isConnected ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
              <p className="text-sm text-gray-500">Connect your wallet to submit a review.</p>
            </div>
          ) : txId ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="font-medium text-green-700">Review submitted!</p>
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
              {submitError && <p className="mb-3 text-sm text-red-600">{submitError}</p>}
              {submitting && <p className="mb-3 text-sm text-gray-500 animate-pulse">Submitting...</p>}
              <ReviewForm publicationId={id} reviewerId={address} onSubmit={handleSubmit} />
            </>
          )}
        </div>
      )}
    </main>
  );
}
