export interface Funding_trackerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction78 = { type: 'create'; payload: Omit<Funding_trackerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity78> } | { type: 'delete'; id: string };
