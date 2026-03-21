export interface Publication_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Publication_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Publication_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
