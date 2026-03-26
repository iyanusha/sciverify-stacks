'use client';

import { SearchFilters } from '@/types/publication';
import KeywordTag from './KeywordTag';

interface ActiveFilterBadgesProps {
  filters: SearchFilters;
  query: string;
  onRemoveFilter: (key: keyof SearchFilters) => void;
  onClearAll: () => void;
}

function toDateLabel(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ActiveFilterBadges({
  filters,
  query,
  onRemoveFilter,
  onClearAll,
}: ActiveFilterBadgesProps) {
  const chips: { key: keyof SearchFilters; label: string }[] = [];

  if (query.trim()) chips.push({ key: 'query', label: `"${query}"` });
  if (filters.status) chips.push({ key: 'status', label: `Status: ${filters.status}` });
  if (filters.author) chips.push({ key: 'author', label: `Author: ${filters.author}` });
  if (filters.keyword) chips.push({ key: 'keyword', label: `Keyword: ${filters.keyword}` });
  if (filters.dateFrom) chips.push({ key: 'dateFrom', label: `From: ${toDateLabel(filters.dateFrom)}` });
  if (filters.dateTo) chips.push({ key: 'dateTo', label: `To: ${toDateLabel(filters.dateTo)}` });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2" role="status" aria-label="Active filters">
      <span className="text-xs font-medium text-gray-500">Filters:</span>
      {chips.map((chip) => (
        <KeywordTag
          key={chip.key}
          label={chip.label}
          onRemove={() => onRemoveFilter(chip.key)}
          active
        />
      ))}
      <button
        onClick={onClearAll}
        className="ml-1 text-xs font-medium text-accent-600 hover:text-accent-700 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
