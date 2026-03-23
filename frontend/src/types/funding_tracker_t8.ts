export interface Funding_trackerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Funding_trackerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Funding_trackerAction8 = { type: 'create'; payload: Omit<Funding_trackerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Funding_trackerEntity8> } | { type: 'delete'; id: string };
