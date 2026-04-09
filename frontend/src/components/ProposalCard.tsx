'use client';

import { Proposal } from '@/types/governance';
import { formatBlocksRemaining, getVoteResult, isQuorumReached } from '@/lib/governanceUtils';
import ProposalStatusBadge from './ProposalStatusBadge';
import VoteProgressBar from './VoteProgressBar';

interface ProposalCardProps {
  proposal: Proposal;
  currentBlock?: number;
}

const RESULT_STYLES = {
  passing: 'text-green-600',
  failing: 'text-red-600',
  pending: 'text-gray-400',
};

export default function ProposalCard({ proposal, currentBlock = 147000 }: ProposalCardProps) {
  const timeLeft = formatBlocksRemaining(proposal.endBlock, currentBlock);
  const result = getVoteResult(proposal);

  function truncateAddress(addr: string): string {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <article className="proposal-card rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.002] duration-150">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs text-gray-400 font-mono">#{proposal.id}</span>
            <ProposalStatusBadge status={proposal.status} />
          </div>
          <a
            href={`/governance/${proposal.id}`}
            className="group block"
          >
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-accent-600 line-clamp-2">
              {proposal.title}
            </h3>
          </a>
          <p className="mt-1 text-xs text-gray-400">
            Proposed by {truncateAddress(proposal.proposer)}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          {proposal.status === 'active' && (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-600 font-medium">
              {timeLeft}
            </span>
          )}
          {result !== 'pending' && (
            <span className={`font-semibold capitalize ${RESULT_STYLES[result]}`}>
              {result}
            </span>
          )}
        </div>
      </div>

      {isQuorumReached(proposal) && (
        <p className="mt-2 text-xs text-green-600 font-medium">✓ Quorum reached</p>
      )}

      <div className="mt-4">
        <VoteProgressBar
          votesFor={proposal.votesFor}
          votesAgainst={proposal.votesAgainst}
          quorum={proposal.quorumRequired}
        />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <a
          href={`/governance/${proposal.id}`}
          className="text-xs font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1"
        >
          View Details
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </article>
  );
}
