export interface High_contrastConfig { enabled: boolean; interval: number; maxItems: number; }
export interface High_contrastRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type High_contrastFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
