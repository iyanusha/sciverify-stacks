export interface Proposal_formConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Proposal_formRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Proposal_formFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
