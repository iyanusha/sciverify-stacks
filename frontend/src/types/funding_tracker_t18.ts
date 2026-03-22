export interface Funding_trackerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction18 = { type: 'create'; payload: Omit<Funding_trackerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity18> } | { type: 'delete'; id: string };
