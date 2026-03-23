export interface Funding_trackerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction28 = { type: 'create'; payload: Omit<Funding_trackerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity28> } | { type: 'delete'; id: string };
