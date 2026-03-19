export interface PaginationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface PaginationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type PaginationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
