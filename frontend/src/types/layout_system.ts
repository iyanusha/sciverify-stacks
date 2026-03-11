export interface Layout_systemConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Layout_systemRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Layout_systemFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
