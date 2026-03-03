export interface MemoizationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface MemoizationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type MemoizationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
