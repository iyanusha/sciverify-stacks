export interface Dashboard_pageConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dashboard_pageRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Dashboard_pageFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
