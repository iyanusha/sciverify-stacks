'use client';

import { useState, useEffect } from 'react';

interface UseVoteReturn {
  voting: boolean;
  error: string | null;
  txId: string | null;
  hasVoted: boolean;
  voteWeight: number | null;
  vote: (proposalId: number, support: boolean) => Promise<void>;
}

export function useVote(proposalId: number, address: string | null): UseVoteReturn {
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteWeight, setVoteWeight] = useState<number | null>(null);

  const localKey = address ? `voted_${proposalId}_${address}` : null;

  // Check localStorage for prior vote
  useEffect(() => {
    if (!localKey) return;
    setHasVoted(!!localStorage.getItem(localKey));
  }, [localKey]);

  // Fetch vote weight from reputation-token contract
  useEffect(() => {
    if (!address) return;

    async function fetchWeight() {
      try {
        const { callReadOnlyFunction, standardPrincipalCV, cvToValue } = await import(
          '@stacks/transactions'
        );
        const result = await callReadOnlyFunction({
          contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? 'ST000000000000000000002AMW42H',
          contractName: 'reputation-token',
          functionName: 'get-balance',
          functionArgs: [standardPrincipalCV(address!)],
          network: 'mainnet' as unknown as Parameters<typeof callReadOnlyFunction>[0]['network'],
          senderAddress: address!,
        });
        const balance = Number(cvToValue(result));
        setVoteWeight(balance);
      } catch {
        setVoteWeight(null);
      }
    }

    fetchWeight();
  }, [address]);

  async function vote(proposalId: number, support: boolean): Promise<void> {
    if (!address) {
      setError('Wallet not connected');
      return;
    }

    if (hasVoted) {
      setError('You have already voted on this proposal');
      return;
    }

    setVoting(true);
    setError(null);

    try {
      const { openContractCall } = await import('@stacks/connect');
      const { uintCV, boolCV } = await import('@stacks/transactions');

      await openContractCall({
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? 'ST000000000000000000002AMW42H',
        contractName: 'governance',
        functionName: 'vote',
        functionArgs: [uintCV(proposalId), boolCV(support)],
        onFinish: ({ txId: id }: { txId: string }) => {
          setTxId(id);
          if (localKey) localStorage.setItem(localKey, id);
          setHasVoted(true);
          window.dispatchEvent(new CustomEvent('vote_cast', { detail: { proposalId, support } }));
        },
        onCancel: () => {
          setError('Transaction cancelled');
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cast vote');
    } finally {
      setVoting(false);
    }
  }

  return { voting, error, txId, hasVoted, voteWeight, vote };
}
