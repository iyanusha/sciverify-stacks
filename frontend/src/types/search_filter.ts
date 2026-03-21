export interface Search_filterConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Search_filterRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Search_filterFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
