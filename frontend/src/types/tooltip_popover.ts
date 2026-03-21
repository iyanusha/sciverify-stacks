export interface Tooltip_popoverConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Tooltip_popoverRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Tooltip_popoverFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
