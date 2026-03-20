export interface Empty_statesConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Empty_statesRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Empty_statesFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
