export interface Loading_statesConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Loading_statesRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Loading_statesFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
