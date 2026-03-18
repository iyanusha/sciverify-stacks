export interface Table_componentConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Table_componentRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Table_componentFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
