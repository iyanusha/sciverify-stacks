export interface Dark_mode_applyConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_applyRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Dark_mode_applyFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
