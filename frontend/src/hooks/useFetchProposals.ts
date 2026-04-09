'use client';

import { useState, useEffect, useCallback } from 'react';
import { Proposal } from '@/types/governance';
import { sortProposalsByStatus } from '@/lib/governanceUtils';

// Placeholder proposals — replace with actual Clarity read-only contract calls
// when the governance contract is deployed.
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: 'Increase Minimum Reviewer Reputation Score to 150',
    description:
      'This proposal raises the minimum reputation score required to participate as a peer reviewer from 100 to 150. Higher threshold ensures review quality and reduces low-effort submissions.',
    proposer: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    status: 'active',
    votesFor: 8400,
    votesAgainst: 3200,
    quorumRequired: 10000,
    startBlock: 145000,
    endBlock: 148000,
    createdAt: 1743500000000,
  },
  {
    id: 2,
    title: 'Add Reproducibility Criterion to Review Protocol',
    description:
      'Amend the review-protocol contract to require reviewers to explicitly evaluate reproducibility as a mandatory criterion with a minimum weight of 10%.',
    proposer: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    status: 'pending',
    votesFor: 0,
    votesAgainst: 0,
    quorumRequired: 10000,
    startBlock: 149000,
    endBlock: 152000,
    createdAt: 1744000000000,
  },
  {
    id: 3,
    title: 'Allocate 5% of Protocol Revenue to Open Science Fund',
    description:
      'Redirect 5% of all protocol fees collected by the publication-registry contract to a community-controlled open science fund for supporting underfunded research projects.',
    proposer: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5NH7C3C56',
    status: 'passed',
    votesFor: 15800,
    votesAgainst: 2100,
    quorumRequired: 10000,
    startBlock: 140000,
    endBlock: 143000,
    createdAt: 1740000000000,
    executedAt: 1741000000000,
  },
];

interface UseFetchProposalsReturn {
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchProposals(): UseFetchProposalsReturn {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with callReadOnlyFunction to governance contract
      await new Promise((res) => setTimeout(res, 400));
      setProposals(sortProposalsByStatus(MOCK_PROPOSALS));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load proposals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { proposals, loading, error, refetch: fetch };
}
