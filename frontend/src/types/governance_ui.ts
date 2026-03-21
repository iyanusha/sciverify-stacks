export interface Governance_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Governance_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Governance_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
