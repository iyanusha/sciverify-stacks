export interface Robots_sitemapConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Robots_sitemapRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Robots_sitemapFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
