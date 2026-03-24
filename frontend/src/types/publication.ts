export interface Publication {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  doi?: string;
  submittedAt: number;
  reviewStatus: 'pending' | 'approved' | 'rejected';
  registryId: number;
}

export interface SearchFilters {
  query: string;
  status?: string;
  dateFrom?: number;
  dateTo?: number;
  author?: string;
  keyword?: string;
}

export interface SearchResult {
  publications: Publication[];
  total: number;
  page: number;
  pageSize: number;
}
