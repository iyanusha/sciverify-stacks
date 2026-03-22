export interface Funding_trackerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction38 = { type: 'create'; payload: Omit<Funding_trackerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity38> } | { type: 'delete'; id: string };
