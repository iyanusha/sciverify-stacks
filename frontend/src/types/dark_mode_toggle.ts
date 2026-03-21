export interface Dark_mode_toggleConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_toggleRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Dark_mode_toggleFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
