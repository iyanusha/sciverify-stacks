'use client';

import { useState } from 'react';
import { SearchFilters } from '@/types/publication';
import KeywordTag from './KeywordTag';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function SearchFiltersPanel({ filters, onChange }: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(true);
  const [keywordInput, setKeywordInput] = useState('');
  const [activeKeywords, setActiveKeywords] = useState<string[]>(
    filters.keyword ? filters.keyword.split(',').filter(Boolean) : []
  );

  function update(patch: Partial<SearchFilters>) {
    onChange({ ...filters, ...patch });
  }

  function handleKeywordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && keywordInput.trim()) {
      e.preventDefault();
      const newKw = keywordInput.trim();
      if (!activeKeywords.includes(newKw)) {
        const updated = [...activeKeywords, newKw];
        setActiveKeywords(updated);
        update({ keyword: updated.join(',') });
      }
      setKeywordInput('');
    }
  }

  function removeKeyword(kw: string) {
    const updated = activeKeywords.filter((k) => k !== kw);
    setActiveKeywords(updated);
    update({ keyword: updated.join(',') });
  }

  function toTimestamp(dateStr: string): number | undefined {
    if (!dateStr) return undefined;
    return new Date(dateStr).getTime();
  }

  function toDateString(ts: number | undefined): string {
    if (!ts) return '';
    return new Date(ts).toISOString().split('T')[0];
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-700"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm2 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Filters
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4 space-y-5">
          {/* Status */}
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </legend>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex cursor-pointer items-center gap-1.5">
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={(filters.status ?? '') === opt.value}
                    onChange={() => update({ status: opt.value || undefined })}
                    className="h-3.5 w-3.5 border-gray-300 text-accent-600 focus:ring-accent-500"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Author */}
          <div>
            <label htmlFor="filter-author" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Author
            </label>
            <input
              id="filter-author"
              type="text"
              value={filters.author ?? ''}
              onChange={(e) => update({ author: e.target.value || undefined })}
              placeholder="Filter by author name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>

          {/* Keywords */}
          <div>
            <label htmlFor="filter-keyword" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Keywords
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {activeKeywords.map((kw) => (
                <KeywordTag key={kw} label={kw} onRemove={() => removeKeyword(kw)} active />
              ))}
            </div>
            <input
              id="filter-keyword"
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="Type keyword and press Enter"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>

          {/* Date range */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Date Range</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="filter-from" className="sr-only">From date</label>
                <input
                  id="filter-from"
                  type="date"
                  value={toDateString(filters.dateFrom)}
                  onChange={(e) => update({ dateFrom: toTimestamp(e.target.value) })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
              <span className="flex items-center text-gray-400">–</span>
              <div className="flex-1">
                <label htmlFor="filter-to" className="sr-only">To date</label>
                <input
                  id="filter-to"
                  type="date"
                  value={toDateString(filters.dateTo)}
                  onChange={(e) => update({ dateTo: toTimestamp(e.target.value) })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
            </div>
          </div>

          {/* Reset */}
          {(filters.status || filters.author || activeKeywords.length > 0 || filters.dateFrom || filters.dateTo) && (
            <button
              onClick={() => {
                setActiveKeywords([]);
                setKeywordInput('');
                onChange({ query: filters.query });
              }}
              className="w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
