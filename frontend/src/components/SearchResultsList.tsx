'use client';

import { Publication } from '@/types/publication';
import PublicationCard from './PublicationCard';

interface SearchResultsListProps {
  results: Publication[];
  total: number;
  page: number;
  totalPages: number;
  query?: string;
  onPageChange: (page: number) => void;
  onKeywordClick?: (keyword: string) => void;
}

function EmptyState({ query }: { query?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="h-16 w-16 text-gray-300"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <circle cx="28" cy="28" r="18" />
        <path d="M42 42l14 14" strokeLinecap="round" />
        <path d="M21 28h14M28 21v14" strokeLinecap="round" />
      </svg>
      <h3 className="mt-4 text-base font-semibold text-gray-700">No publications found</h3>
      {query ? (
        <p className="mt-1 text-sm text-gray-500">
          No results for <span className="font-medium">&ldquo;{query}&rdquo;</span>. Try adjusting your search or filters.
        </p>
      ) : (
        <p className="mt-1 text-sm text-gray-500">Try searching with different keywords or clearing your filters.</p>
      )}
    </div>
  );
}

export default function SearchResultsList({
  results,
  total,
  page,
  totalPages,
  query,
  onPageChange,
  onKeywordClick,
}: SearchResultsListProps) {
  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  const start = (page - 1) * 10 + 1;
  const end = Math.min(page * 10, total);

  return (
    <div>
      <p className="mb-4 text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{start}–{end}</span> of{' '}
        <span className="font-medium text-gray-700">{total}</span> results
      </p>

      <div className="space-y-3">
        {results.map((pub) => (
          <PublicationCard
            key={pub.id}
            publication={pub}
            query={query}
            onKeywordClick={onKeywordClick}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
