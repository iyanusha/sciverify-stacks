export interface Voting_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Voting_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Voting_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
