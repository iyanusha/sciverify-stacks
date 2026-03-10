export interface Footer_linksConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Footer_linksRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Footer_linksFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
