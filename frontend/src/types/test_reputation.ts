export interface Test_reputationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_reputationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_reputationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
