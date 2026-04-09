'use client';

import { useFetchProposals } from '@/hooks/useFetchProposals';
import ProposalCard from '@/components/ProposalCard';
import GovernanceStats from '@/components/GovernanceStats';

export default function GovernancePage() {
  const { proposals, loading, error, refetch } = useFetchProposals();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Governance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vote on proposals that shape the SciVerify protocol.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refetch}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition"
          >
            Refresh
          </button>
          <a
            href="/governance/new"
            className="rounded-lg bg-accent-600 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-accent-700 transition"
          >
            New Proposal
          </a>
        </div>
      </div>

      {!loading && !error && (
        <div className="mb-8">
          <GovernanceStats proposals={proposals} />
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && proposals.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <p className="text-sm text-gray-500">No proposals yet. Create the first one!</p>
        </div>
      )}

      {!loading && !error && proposals.length > 0 && (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </main>
  );
}
