'use client';

import { Review } from '@/types/review';

interface RecommendationBadgeProps {
  recommendation: Review['recommendation'];
  size?: 'sm' | 'md';
}

const CONFIG: Record<Review['recommendation'], { label: string; icon: string; classes: string }> = {
  accept: {
    label: 'Accept',
    icon: '✓',
    classes: 'recommendation-badge recommendation-badge--accept bg-green-50 text-green-700 border-green-200',
  },
  'minor-revision': {
    label: 'Minor Revision',
    icon: '~',
    classes: 'recommendation-badge recommendation-badge--minor bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  'major-revision': {
    label: 'Major Revision',
    icon: '~',
    classes: 'recommendation-badge recommendation-badge--major bg-orange-50 text-orange-700 border-orange-200',
  },
  reject: {
    label: 'Reject',
    icon: '✗',
    classes: 'recommendation-badge recommendation-badge--reject bg-red-50 text-red-700 border-red-200',
  },
};

export default function RecommendationBadge({ recommendation, size = 'md' }: RecommendationBadgeProps) {
  const cfg = CONFIG[recommendation];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${sizeClass} ${cfg.classes}`}>
      <span aria-hidden="true" className="font-bold">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
