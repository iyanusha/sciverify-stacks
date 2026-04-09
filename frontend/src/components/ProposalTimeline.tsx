'use client';

import { Proposal } from '@/types/governance';
import { formatBlocksRemaining } from '@/lib/governanceUtils';

interface ProposalTimelineProps {
  proposal: Proposal;
  currentBlock?: number;
}

interface TimelineStep {
  label: string;
  block: number;
  done: boolean;
  active: boolean;
}

export default function ProposalTimeline({ proposal, currentBlock = 147000 }: ProposalTimelineProps) {
  const steps: TimelineStep[] = [
    {
      label: 'Created',
      block: proposal.startBlock - 100,
      done: true,
      active: false,
    },
    {
      label: 'Voting Start',
      block: proposal.startBlock,
      done: currentBlock >= proposal.startBlock,
      active: currentBlock >= proposal.startBlock && currentBlock < proposal.endBlock,
    },
    {
      label: 'Voting End',
      block: proposal.endBlock,
      done: currentBlock > proposal.endBlock,
      active: currentBlock === proposal.endBlock,
    },
    {
      label: proposal.executedAt ? 'Executed' : 'Execution',
      block: proposal.endBlock + 1000,
      done: !!proposal.executedAt,
      active: false,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Timeline</h3>
      <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
        {steps.map((step, i) => (
          <li key={i} className="ml-5">
            <span
              className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${
                step.done ? 'bg-green-500' : step.active ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'
              }`}
              aria-hidden="true"
            />
            <div>
              <p className={`text-sm font-medium ${step.done || step.active ? 'text-gray-800' : 'text-gray-400'}`}>
                {step.label}
              </p>
              <p className="text-xs text-gray-400">
                Block {step.block.toLocaleString()}
                {step.active && (
                  <span className="ml-1 text-blue-500">
                    · {formatBlocksRemaining(step.block, currentBlock)}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
