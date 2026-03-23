export interface Grant_proposalsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Grant_proposalsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Grant_proposalsAction78 = { type: 'create'; payload: Omit<Grant_proposalsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Grant_proposalsEntity78> } | { type: 'delete'; id: string };
