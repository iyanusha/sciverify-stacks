export interface Lazy_componentsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Lazy_componentsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Lazy_componentsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
