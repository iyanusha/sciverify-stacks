'use client';

interface VoteProgressBarProps {
  votesFor: number;
  votesAgainst: number;
  quorum: number;
}

function formatVotes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function VoteProgressBar({ votesFor, votesAgainst, quorum }: VoteProgressBarProps) {
  const total = votesFor + votesAgainst;
  const forPct = total > 0 ? (votesFor / total) * 100 : 50;
  const againstPct = total > 0 ? (votesAgainst / total) * 100 : 50;
  const quorumPct = quorum > 0 ? Math.min(100, (total / quorum) * 100) : 100;
  const quorumLinePos = quorum > 0 ? Math.min(100, (quorum / (total || quorum)) * 100) : 100;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span className="text-green-600 font-medium">
          For {formatVotes(votesFor)} ({forPct.toFixed(0)}%)
        </span>
        <span className="text-red-600 font-medium">
          Against {formatVotes(votesAgainst)} ({againstPct.toFixed(0)}%)
        </span>
      </div>

      <div className="relative h-3 w-full rounded-full overflow-hidden bg-gray-100">
        <div
          className="vote-bar-for absolute left-0 top-0 h-full rounded-l-full transition-all duration-500"
          style={{ width: `${forPct}%` }}
          title={`For: ${formatVotes(votesFor)}`}
        />
        <div
          className="vote-bar-against absolute right-0 top-0 h-full rounded-r-full transition-all duration-500"
          style={{ width: `${againstPct}%` }}
          title={`Against: ${formatVotes(votesAgainst)}`}
        />
        {total > 0 && total < quorum && (
          <div
            className="quorum-line absolute top-0 h-full border-l-2 border-dashed border-gray-400 z-10"
            style={{ left: `${quorumLinePos}%` }}
            title={`Quorum required: ${formatVotes(quorum)}`}
          />
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
        <span>Quorum: {quorumPct.toFixed(0)}%</span>
        <span>{formatVotes(total)} total votes</span>
      </div>
    </div>
  );
}
