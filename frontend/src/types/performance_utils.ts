export interface Performance_utilsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Performance_utilsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Performance_utilsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
