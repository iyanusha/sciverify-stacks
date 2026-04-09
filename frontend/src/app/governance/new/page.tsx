'use client';

import ProposalForm from '@/components/ProposalForm';
import { useWallet } from '@/hooks/useWallet';

export default function NewProposalPage() {
  const { isConnected } = useWallet();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <a href="/governance" className="mb-6 block text-sm text-gray-500 hover:text-gray-700">
        ← Back to Governance
      </a>

      <h1 className="mb-2 text-2xl font-bold text-gray-900">Create Proposal</h1>
      <p className="mb-8 text-sm text-gray-500">
        Submit a governance proposal for the SciVerify community to vote on. Your proposal will be
        active for voting once confirmed on chain.
      </p>

      {!isConnected ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-14 text-center">
          <p className="text-sm text-gray-500">Connect your Stacks wallet to create a proposal.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ProposalForm
            onSuccess={(txId) => {
              console.info('Proposal tx:', txId);
            }}
          />
        </div>
      )}
    </main>
  );
}
