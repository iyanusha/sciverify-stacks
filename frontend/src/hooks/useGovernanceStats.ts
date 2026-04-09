'use client';

import { useMemo } from 'react';
import { Proposal, Vote } from '@/types/governance';
import { getProposalSummary, computeParticipationRate } from '@/lib/governanceUtils';

interface GovernanceStatsData {
  totalProposals: number;
  activeCount: number;
  passedCount: number;
  failedCount: number;
  pendingCount: number;
  executedCount: number;
  participationRate: number;
  uniqueVoters: number;
  totalVoteWeight: number;
  avgVoteWeight: number;
}

export function useGovernanceStats(
  proposals: Proposal[],
  votes: Vote[],
  eligibleCount = 1000
): GovernanceStatsData {
  return useMemo(() => {
    const summary = getProposalSummary(proposals);
    const participationRate = computeParticipationRate(votes, eligibleCount);
    const uniqueVoterSet = new Set(votes.map((v) => v.voter));
    const uniqueVoters = uniqueVoterSet.size;
    const totalVoteWeight = votes.reduce((acc, v) => acc + v.weight, 0);
    const avgVoteWeight = uniqueVoters > 0 ? Math.round(totalVoteWeight / uniqueVoters) : 0;

    return {
      totalProposals: summary.total,
      activeCount: summary.active,
      passedCount: summary.passed,
      failedCount: summary.failed,
      pendingCount: summary.pending,
      executedCount: summary.executed,
      participationRate,
      uniqueVoters,
      totalVoteWeight,
      avgVoteWeight,
    };
  }, [proposals, votes, eligibleCount]);
}
