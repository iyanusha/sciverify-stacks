export interface Reputation_displayConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Reputation_displayRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Reputation_displayFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
