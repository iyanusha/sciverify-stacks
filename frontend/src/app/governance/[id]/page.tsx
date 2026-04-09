'use client';

import { use } from 'react';
import { useFetchProposals } from '@/hooks/useFetchProposals';
import { useFetchVotes } from '@/hooks/useFetchVotes';
import { useVote } from '@/hooks/useVote';
import { useWallet } from '@/hooks/useWallet';
import VoteButtons from '@/components/VoteButtons';
import VoteProgressBar from '@/components/VoteProgressBar';
import QuorumIndicator from '@/components/QuorumIndicator';
import ProposalStatusBadge from '@/components/ProposalStatusBadge';
import VoteHistoryList from '@/components/VoteHistoryList';
import ProposalTimeline from '@/components/ProposalTimeline';
import { canVote, formatBlocksRemaining, getVoteResult } from '@/lib/governanceUtils';

const CURRENT_BLOCK = 147000;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProposalDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const proposalId = Number(id);
  const { proposals, loading } = useFetchProposals();
  const { votes, loading: votesLoading } = useFetchVotes(proposalId);
  const { isConnected, getAddress } = useWallet();

  const proposal = proposals.find((p) => p.id === proposalId);
  const address = getAddress();
  const { vote, voting, error: voteError, txId, hasVoted, voteWeight } = useVote(proposalId, address ?? null);

  const proposalVotes = votes;

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-4">
          <div className="h-8 animate-pulse rounded bg-gray-100 w-2/3" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-center">
        <p className="text-gray-500">Proposal #{id} not found.</p>
        <a href="/governance" className="mt-3 block text-sm text-accent-600 hover:text-accent-700">
          ← Back to Governance
        </a>
      </main>
    );
  }

  const votable = canVote(proposal, CURRENT_BLOCK);
  const result = getVoteResult(proposal);
  const timeLeft = formatBlocksRemaining(proposal.endBlock, CURRENT_BLOCK);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <a href="/governance" className="mb-6 block text-sm text-gray-500 hover:text-gray-700">
        ← Back to Governance
      </a>

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs text-gray-400 font-mono">#{proposal.id}</span>
            <ProposalStatusBadge status={proposal.status} />
            {result !== 'pending' && (
              <span className={`text-xs font-semibold capitalize ${result === 'passing' ? 'text-green-600' : 'text-red-600'}`}>
                {result}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{proposal.title}</h1>
          <p className="mt-1 text-xs text-gray-400">
            Proposed by <span className="font-mono">{proposal.proposer.slice(0, 8)}...</span>
            {proposal.status === 'active' && <span className="ml-2">{timeLeft}</span>}
          </p>
        </div>
        <QuorumIndicator
          votes={proposal.votesFor + proposal.votesAgainst}
          quorum={proposal.quorumRequired}
        />
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Description</h2>
        <p className="text-sm leading-relaxed text-gray-600">{proposal.description}</p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Vote Distribution</h2>
        <VoteProgressBar
          votesFor={proposal.votesFor}
          votesAgainst={proposal.votesAgainst}
          quorum={proposal.quorumRequired}
        />
      </div>

      {isConnected && votable && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Cast Your Vote</h2>
          {voteError && <p className="mb-3 text-sm text-red-600">{voteError}</p>}
          {txId && (
            <p className="mb-3 text-sm text-green-600 font-medium">
              Vote submitted!{' '}
              <a href={`https://explorer.stacks.co/txid/${txId}`} target="_blank" rel="noopener noreferrer" className="underline">
                View tx →
              </a>
            </p>
          )}
          <VoteButtons
            proposalId={proposal.id}
            onVote={vote}
            hasVoted={hasVoted}
            voting={voting}
            voteWeight={voteWeight}
          />
        </div>
      )}

      <div className="mb-6">
        <ProposalTimeline proposal={proposal} currentBlock={CURRENT_BLOCK} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {votesLoading ? (
          <div className="h-20 animate-pulse rounded bg-gray-50" />
        ) : (
          <VoteHistoryList votes={proposalVotes} />
        )}
      </div>
    </main>
  );
}
