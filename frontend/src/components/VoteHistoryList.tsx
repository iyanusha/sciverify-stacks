'use client';

import { Vote } from '@/types/governance';

interface VoteHistoryListProps {
  votes: Vote[];
}

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 8)}...${addr.slice(-4)}`;
}

export default function VoteHistoryList({ votes }: VoteHistoryListProps) {
  const sorted = [...votes].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-700">
        Vote History ({votes.length} address{votes.length === 1 ? '' : 'es'} voted)
      </h3>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No votes yet.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {sorted.map((vote) => (
            <li key={vote.txHash} className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  {vote.voter.slice(2, 4).toUpperCase()}
                </div>
                <span className="font-mono text-xs text-gray-600">{truncateAddress(vote.voter)}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    vote.support
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {vote.support ? 'For' : 'Against'}
                </span>
                <span className="text-xs text-gray-400 tabular-nums">
                  {vote.weight.toLocaleString()} pts
                </span>
                <span className="text-xs text-gray-300">
                  {new Date(vote.timestamp).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
