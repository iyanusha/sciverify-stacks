export interface Review_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Review_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Review_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
