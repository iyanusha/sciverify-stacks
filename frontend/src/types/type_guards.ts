export interface Type_guardsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Type_guardsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Type_guardsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
