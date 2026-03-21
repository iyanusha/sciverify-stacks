export interface Dark_mode_varsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_varsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Dark_mode_varsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
