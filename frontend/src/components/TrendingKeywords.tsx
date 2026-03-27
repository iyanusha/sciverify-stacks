'use client';

import { useMemo } from 'react';
import { Publication } from '@/types/publication';
import { getTopKeywords } from '@/lib/searchUtils';
import KeywordTag from './KeywordTag';

interface TrendingKeywordsProps {
  publications: Publication[];
  onKeywordClick: (keyword: string) => void;
  activeKeyword?: string;
}

export default function TrendingKeywords({
  publications,
  onKeywordClick,
  activeKeyword,
}: TrendingKeywordsProps) {
  const topKeywords = useMemo(() => getTopKeywords(publications, 12), [publications]);

  if (topKeywords.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Trending Keywords
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {topKeywords.map(({ keyword, count }) => (
          <KeywordTag
            key={keyword}
            label={keyword}
            count={count}
            onClick={() => onKeywordClick(keyword)}
            active={activeKeyword === keyword}
            title={`${count} publication${count === 1 ? '' : 's'} with this keyword`}
          />
        ))}
      </div>
    </div>
  );
}
