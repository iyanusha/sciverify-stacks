export interface Utility_helpersConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Utility_helpersRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Utility_helpersFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
