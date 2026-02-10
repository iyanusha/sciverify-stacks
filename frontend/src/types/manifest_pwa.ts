export interface Manifest_pwaConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Manifest_pwaRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Manifest_pwaFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
