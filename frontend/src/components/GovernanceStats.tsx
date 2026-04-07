'use client';

import { Proposal, Vote } from '@/types/governance';
import { computeParticipationRate } from '@/lib/governanceUtils';

interface GovernanceStatsProps {
  proposals: Proposal[];
  votes?: Vote[];
  eligibleCount?: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function GovernanceStats({ proposals, votes = [], eligibleCount = 1000 }: GovernanceStatsProps) {
  const totalProposals = proposals.length;
  const activeCount = proposals.filter((p) => p.status === 'active').length;
  const passedCount = proposals.filter((p) => p.status === 'passed' || p.status === 'executed').length;
  const participationRate = computeParticipationRate(votes, eligibleCount);

  const allVoteWeights = votes.reduce((acc, v) => acc + v.weight, 0);
  const uniqueVoters = new Set(votes.map((v) => v.voter)).size;
  const avgWeight = uniqueVoters > 0 ? Math.round(allVoteWeights / uniqueVoters) : 0;

  return (
    <div className="governance-stats grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Proposals"
        value={totalProposals}
        sub={`${activeCount} active · ${passedCount} passed`}
      />
      <StatCard
        label="Participation Rate"
        value={`${participationRate}%`}
        sub={`${uniqueVoters} unique voters`}
      />
      <StatCard
        label="Avg Vote Weight"
        value={avgWeight.toLocaleString()}
        sub="reputation tokens per voter"
      />
    </div>
  );
}
