export interface Nav_improvementsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Nav_improvementsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Nav_improvementsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
