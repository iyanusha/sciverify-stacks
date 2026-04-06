import { Proposal, ProposalStatus, Vote } from '@/types/governance';

export function calculateQuorumProgress(votes: number, quorum: number): number {
  if (quorum === 0) return 100;
  return Math.min(100, (votes / quorum) * 100);
}

export function isQuorumReached(proposal: Proposal): boolean {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  return totalVotes >= proposal.quorumRequired;
}

export function getVoteResult(proposal: Proposal): 'passing' | 'failing' | 'pending' {
  if (!isQuorumReached(proposal)) return 'pending';
  return proposal.votesFor > proposal.votesAgainst ? 'passing' : 'failing';
}

const BLOCKS_PER_SECOND = 0.1; // ~10s/block on Stacks
const SECONDS_PER_DAY = 86400;

export function formatBlocksRemaining(endBlock: number, currentBlock: number): string {
  const blocksLeft = endBlock - currentBlock;
  if (blocksLeft <= 0) return 'Ended';

  const secondsLeft = blocksLeft / BLOCKS_PER_SECOND;
  const daysLeft = Math.floor(secondsLeft / SECONDS_PER_DAY);
  const hoursLeft = Math.floor((secondsLeft % SECONDS_PER_DAY) / 3600);

  if (daysLeft > 0) return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
  if (hoursLeft > 0) return `${hoursLeft} hour${hoursLeft === 1 ? '' : 's'} left`;
  return `${blocksLeft} block${blocksLeft === 1 ? '' : 's'} left`;
}

export function getProposalStatusColor(status: ProposalStatus): string {
  const colors: Record<ProposalStatus, string> = {
    active: 'text-blue-600',
    passed: 'text-green-600',
    failed: 'text-red-600',
    pending: 'text-gray-500',
    executed: 'text-purple-600',
  };
  return colors[status] ?? 'text-gray-500';
}

export function summarizeVotes(votes: Vote[]): {
  totalVoters: number;
  uniqueAddresses: number;
  forWeight: number;
  againstWeight: number;
  turnout: number;
} {
  const forWeight = votes.filter((v) => v.support).reduce((acc, v) => acc + v.weight, 0);
  const againstWeight = votes.filter((v) => !v.support).reduce((acc, v) => acc + v.weight, 0);
  const uniqueAddresses = new Set(votes.map((v) => v.voter)).size;
  const totalWeight = forWeight + againstWeight;
  const turnout = totalWeight > 0 ? Math.round((totalWeight / (totalWeight + 1)) * 100) : 0;

  return {
    totalVoters: votes.length,
    uniqueAddresses,
    forWeight,
    againstWeight,
    turnout,
  };
}

export function canVote(proposal: Proposal, currentBlock: number): boolean {
  return (
    proposal.status === 'active' &&
    currentBlock >= proposal.startBlock &&
    currentBlock <= proposal.endBlock
  );
}

export function sortProposalsByStatus(proposals: Proposal[]): Proposal[] {
  const order: ProposalStatus[] = ['active', 'pending', 'passed', 'failed', 'executed'];
  return [...proposals].sort(
    (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
  );
}

export function computeParticipationRate(votes: Vote[], eligibleCount: number): number {
  if (eligibleCount === 0) return 0;
  const unique = new Set(votes.map((v) => v.voter)).size;
  return Math.round((unique / eligibleCount) * 100);
}
