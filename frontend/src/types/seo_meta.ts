export interface Seo_metaConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Seo_metaRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Seo_metaFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
