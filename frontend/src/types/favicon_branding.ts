export interface Favicon_brandingConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Favicon_brandingRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Favicon_brandingFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
