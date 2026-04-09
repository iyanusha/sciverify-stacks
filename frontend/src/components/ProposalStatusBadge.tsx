'use client';

import { ProposalStatus } from '@/types/governance';

interface ProposalStatusBadgeProps {
  status: ProposalStatus;
}

const CONFIG: Record<ProposalStatus, { label: string; classes: string; pulse?: boolean }> = {
  active: {
    label: 'Active',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
    pulse: true,
  },
  passed: {
    label: 'Passed',
    classes: 'bg-green-50 text-green-700 border-green-200',
  },
  failed: {
    label: 'Failed',
    classes: 'bg-red-50 text-red-700 border-red-200',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-gray-50 text-gray-600 border-gray-200',
  },
  executed: {
    label: 'Executed',
    classes: 'bg-purple-50 text-purple-700 border-purple-200',
  },
};

export default function ProposalStatusBadge({ status }: ProposalStatusBadgeProps) {
  const cfg = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`}
    >
      {cfg.pulse ? (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" aria-hidden="true" />
      )}
      {cfg.label}
    </span>
  );
}
