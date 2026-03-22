export interface Funding_trackerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction58 = { type: 'create'; payload: Omit<Funding_trackerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity58> } | { type: 'delete'; id: string };
