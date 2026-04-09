'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Publication, SearchFilters } from '@/types/publication';
import { usePublicationSearch } from '@/hooks/usePublicationSearch';
import SearchBar from '@/components/SearchBar';
import SearchFiltersPanel from '@/components/SearchFilters';
import SearchResultsList from '@/components/SearchResultsList';
import SortControls from '@/components/SortControls';
import { buildSearchUrl } from '@/lib/searchUtils';

// Sample data — replace with contract reads in production
const SAMPLE_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-001',
    title: 'Decentralized Peer Review Using Blockchain Consensus Mechanisms',
    abstract:
      'We propose a novel framework for scientific peer review that leverages blockchain technology to create transparent, tamper-proof review records. Our system uses Clarity smart contracts on the Stacks blockchain to record reviewer decisions and reputation scores immutably.',
    authors: ['Dr. Amara Osei', 'Prof. Kwame Mensah', 'Dr. Fatima Al-Hassan'],
    keywords: ['blockchain', 'peer review', 'decentralization', 'smart contracts'],
    doi: '10.1234/sciverify.2025.001',
    submittedAt: 1740000000000,
    reviewStatus: 'approved',
    registryId: 1,
  },
  {
    id: 'pub-002',
    title: 'Reproducibility Crisis in Machine Learning Research: A Systematic Analysis',
    abstract:
      'This paper analyzes 500 published machine learning papers and evaluates their reproducibility. We find that fewer than 30% of results can be reproduced with the original code and data, and propose standardized reporting guidelines.',
    authors: ['Dr. Sarah Chen', 'Prof. Marcus Rodriguez'],
    keywords: ['reproducibility', 'machine learning', 'research integrity', 'methodology'],
    submittedAt: 1742500000000,
    reviewStatus: 'pending',
    registryId: 2,
  },
  {
    id: 'pub-003',
    title: 'Token-Incentivized Scientific Collaboration: Empirical Evidence',
    abstract:
      'Using data from 12 decentralized science platforms, we provide the first large-scale empirical analysis of token-based incentive systems in scientific collaboration. Findings suggest that well-designed token economies increase reviewer participation by 340%.',
    authors: ['Dr. Yuki Tanaka', 'Dr. Zainab Nkosi', 'Prof. Lars Eriksson'],
    keywords: ['DeSci', 'token economics', 'incentive design', 'collaboration'],
    doi: '10.1234/sciverify.2025.003',
    submittedAt: 1744000000000,
    reviewStatus: 'approved',
    registryId: 3,
  },
  {
    id: 'pub-004',
    title: 'Quantum Computing Applications in Cryptographic Protocol Verification',
    abstract:
      'We examine how quantum computing threatens existing cryptographic protocols used in blockchain systems and propose post-quantum alternatives suitable for decentralized science applications.',
    authors: ['Prof. Daniela Ferreira', 'Dr. Ahmed Khalil'],
    keywords: ['quantum computing', 'cryptography', 'blockchain security', 'post-quantum'],
    submittedAt: 1745000000000,
    reviewStatus: 'rejected',
    registryId: 4,
  },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') ?? '';
  const initialStatus = searchParams.get('status') ?? undefined;

  const {
    results,
    loading,
    error,
    query,
    setQuery,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    total,
    sortBy,
    setSortBy,
  } = usePublicationSearch(SAMPLE_PUBLICATIONS);

  // Sync URL params on mount
  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
    if (initialStatus) setFilters({ query: initialQuery, status: initialStatus });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFiltersChange(f: SearchFilters) {
    setFilters(f);
    setPage(1);
    const url = buildSearchUrl({ ...f, query });
    router.replace(url, { scroll: false });
  }

  function handleKeywordClick(keyword: string) {
    handleFiltersChange({ ...filters, keyword });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Search Publications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search across all verified publications on the SciVerify network.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <SearchFiltersPanel filters={filters} onChange={handleFiltersChange} />
        </aside>

        {/* Main search area */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 space-y-3">
            <SearchBar
              value={query}
              onChange={(q) => { setQuery(q); setPage(1); }}
              loading={loading}
            />
            <div className="flex items-center justify-between">
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="ml-auto">
                <SortControls value={sortBy} onChange={setSortBy} />
              </div>
            </div>
          </div>

          <SearchResultsList
            results={results}
            total={total}
            page={page}
            totalPages={totalPages}
            query={query}
            onPageChange={setPage}
            onKeywordClick={handleKeywordClick}
          />
        </div>
      </div>
    </main>
  );
}

export default function PublicationsSearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-16 text-sm text-gray-500">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
