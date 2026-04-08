'use client';

import { useState } from 'react';
import { ProposalAction } from '@/types/governance';

interface CreatePayload {
  title: string;
  description: string;
  action: ProposalAction;
}

interface UseCreateProposalReturn {
  creating: boolean;
  error: string | null;
  txId: string | null;
  createProposal: (data: CreatePayload) => Promise<string | null>;
}

export function useCreateProposal(): UseCreateProposalReturn {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  async function createProposal(data: CreatePayload): Promise<string | null> {
    setCreating(true);
    setError(null);

    try {
      const { openContractCall } = await import('@stacks/connect');
      const { stringUtf8CV, stringAsciiCV, tupleCV } = await import('@stacks/transactions');

      const payloadCV = tupleCV(
        Object.fromEntries(
          Object.entries(data.action.payload).map(([k, v]) => [
            k,
            stringAsciiCV(String(v)),
          ])
        )
      );

      let resolvedTxId: string | null = null;

      await openContractCall({
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? 'ST000000000000000000002AMW42H',
        contractName: 'governance',
        functionName: 'create-proposal',
        functionArgs: [
          stringUtf8CV(data.title),
          stringUtf8CV(data.description),
          stringAsciiCV(data.action.type),
          payloadCV,
        ],
        onFinish: ({ txId: id }: { txId: string }) => {
          resolvedTxId = id;
          setTxId(id);
        },
        onCancel: () => {
          setError('Transaction cancelled by user.');
        },
      });

      return resolvedTxId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create proposal');
      return null;
    } finally {
      setCreating(false);
    }
  }

  return { creating, error, txId, createProposal };
}
