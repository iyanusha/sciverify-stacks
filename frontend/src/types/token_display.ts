export interface Token_displayConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Token_displayRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Token_displayFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
