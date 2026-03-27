import { Publication, SearchFilters } from '@/types/publication';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that',
  'these', 'those', 'it', 'its', 'not', 'no',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s\W]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function scoreMatch(pub: Publication, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  let score = 0;
  const titleTokens = tokenize(pub.title);
  const abstractTokens = tokenize(pub.abstract);
  const keywordTokens = pub.keywords.flatMap((k) => tokenize(k));
  const authorTokens = pub.authors.flatMap((a) => tokenize(a));

  for (const token of tokens) {
    if (titleTokens.some((t) => t.includes(token))) score += 3;
    if (abstractTokens.some((t) => t.includes(token))) score += 1;
    if (keywordTokens.some((t) => t.includes(token))) score += 2;
    if (authorTokens.some((t) => t.includes(token))) score += 2;
  }

  return score;
}

export function rankResults(publications: Publication[], query: string): Publication[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return publications;

  return publications
    .map((pub) => ({ pub, score: scoreMatch(pub, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ pub }) => pub);
}

export function highlightMatch(text: string, query: string): string {
  const tokens = tokenize(query);
  if (tokens.length === 0) return text;

  const pattern = tokens
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function applyFilters(publications: Publication[], filters: SearchFilters): Publication[] {
  let results = publications;

  if (filters.status) {
    results = results.filter((p) => p.reviewStatus === filters.status);
  }

  if (filters.author) {
    const authorLower = filters.author.toLowerCase();
    results = results.filter((p) =>
      p.authors.some((a) => a.toLowerCase().includes(authorLower))
    );
  }

  if (filters.keyword) {
    const kwLower = filters.keyword.toLowerCase();
    results = results.filter((p) =>
      p.keywords.some((k) => k.toLowerCase().includes(kwLower))
    );
  }

  if (filters.dateFrom) {
    results = results.filter((p) => p.submittedAt >= filters.dateFrom!);
  }

  if (filters.dateTo) {
    results = results.filter((p) => p.submittedAt <= filters.dateTo!);
  }

  return results;
}

export function buildSearchUrl(filters: SearchFilters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.status) params.set('status', filters.status);
  if (filters.author) params.set('author', filters.author);
  if (filters.keyword) params.set('keyword', filters.keyword);
  if (filters.dateFrom) params.set('from', String(filters.dateFrom));
  if (filters.dateTo) params.set('to', String(filters.dateTo));
  return `/publications/search?${params.toString()}`;
}

export function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  const existing = getRecentSearches();
  const updated = [query, ...existing.filter((q) => q !== query)].slice(0, 5);
  localStorage.setItem('sciverify_recent_searches', JSON.stringify(updated));
}

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('sciverify_recent_searches');
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sciverify_recent_searches');
}

export function computeKeywordFrequency(publications: Publication[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const pub of publications) {
    for (const kw of pub.keywords) {
      const normalized = kw.toLowerCase().trim();
      freq.set(normalized, (freq.get(normalized) ?? 0) + 1);
    }
  }
  return freq;
}

export function getTopKeywords(publications: Publication[], limit = 10): { keyword: string; count: number }[] {
  const freq = computeKeywordFrequency(publications);
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({ keyword, count }));
}

export function getStatusCounts(publications: Publication[]): Record<string, number> {
  return publications.reduce<Record<string, number>>((acc, pub) => {
    acc[pub.reviewStatus] = (acc[pub.reviewStatus] ?? 0) + 1;
    return acc;
  }, {});
}
