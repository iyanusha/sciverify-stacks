export interface Test_reviewConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_reviewRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_reviewFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
