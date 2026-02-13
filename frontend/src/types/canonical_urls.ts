export interface Canonical_urlsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Canonical_urlsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Canonical_urlsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
