'use client';

import { calculateQuorumProgress } from '@/lib/governanceUtils';

interface QuorumIndicatorProps {
  votes: number;
  quorum: number;
  size?: number;
}

export default function QuorumIndicator({ votes, quorum, size = 80 }: QuorumIndicatorProps) {
  const pct = calculateQuorumProgress(votes, quorum);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  let ringColor = '#ef4444'; // red
  if (pct >= 100) ringColor = '#16a34a'; // green
  else if (pct >= 50) ringColor = '#eab308'; // yellow

  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`Quorum: ${Math.round(pct)}% of ${quorum.toLocaleString()} votes reached`}
        role="img"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={6}
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        {/* Label */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.18}
          fontWeight="700"
          fill="#111827"
        >
          {Math.round(pct)}%
        </text>
        <text
          x={center}
          y={center + size * 0.14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.12}
          fill="#6b7280"
        >
          Quorum
        </text>
      </svg>
      <p className="text-xs text-gray-500 tabular-nums text-center">
        {votes.toLocaleString()} / {quorum.toLocaleString()}
      </p>
    </div>
  );
}
