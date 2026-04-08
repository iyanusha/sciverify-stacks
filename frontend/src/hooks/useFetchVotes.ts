'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Vote } from '@/types/governance';

// In-memory cache keyed by proposalId
const voteCache = new Map<number, Vote[]>();

const MOCK_VOTES: Vote[] = [
  {
    proposalId: 1,
    voter: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    support: true,
    weight: 2500,
    txHash: '0xabc123',
    timestamp: 1743600000000,
  },
  {
    proposalId: 1,
    voter: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    support: false,
    weight: 1800,
    txHash: '0xdef456',
    timestamp: 1743650000000,
  },
  {
    proposalId: 3,
    voter: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5NH7C3C56',
    support: true,
    weight: 3100,
    txHash: '0xghi789',
    timestamp: 1740200000000,
  },
];

interface UseFetchVotesReturn {
  votes: Vote[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchVotes(proposalId: number): UseFetchVotesReturn {
  const [votes, setVotes] = useState<Vote[]>(() => voteCache.get(proposalId) ?? []);
  const [loading, setLoading] = useState(!voteCache.has(proposalId));
  const [error, setError] = useState<string | null>(null);
  const fetchCountRef = useRef(0);

  const fetch = useCallback(async () => {
    const current = ++fetchCountRef.current;
    setLoading(true);
    setError(null);

    try {
      // TODO: replace with Clarity contract read
      await new Promise((res) => setTimeout(res, 250));
      if (current !== fetchCountRef.current) return;

      const data = MOCK_VOTES.filter((v) => v.proposalId === proposalId).sort(
        (a, b) => b.timestamp - a.timestamp
      );

      voteCache.set(proposalId, data);
      setVotes(data);
    } catch (err) {
      if (current !== fetchCountRef.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load votes');
    } finally {
      if (current === fetchCountRef.current) setLoading(false);
    }
  }, [proposalId]);

  useEffect(() => {
    if (!voteCache.has(proposalId)) fetch();

    function handleVoteCast(e: Event) {
      const detail = (e as CustomEvent<{ proposalId: number }>).detail;
      if (detail.proposalId === proposalId) {
        voteCache.delete(proposalId);
        fetch();
      }
    }

    window.addEventListener('vote_cast', handleVoteCast);
    return () => window.removeEventListener('vote_cast', handleVoteCast);
  }, [proposalId, fetch]);

  return { votes, loading, error, refetch: fetch };
}
