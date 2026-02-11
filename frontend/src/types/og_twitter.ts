export interface Og_twitterConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Og_twitterRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Og_twitterFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
