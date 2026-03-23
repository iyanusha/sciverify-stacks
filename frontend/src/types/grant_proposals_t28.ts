export interface Grant_proposalsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Grant_proposalsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Grant_proposalsAction28 = { type: 'create'; payload: Omit<Grant_proposalsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Grant_proposalsEntity28> } | { type: 'delete'; id: string };
