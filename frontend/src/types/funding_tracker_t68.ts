export interface Funding_trackerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction68 = { type: 'create'; payload: Omit<Funding_trackerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity68> } | { type: 'delete'; id: string };
