export interface Grant_proposalsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Grant_proposalsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Grant_proposalsAction38 = { type: 'create'; payload: Omit<Grant_proposalsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Grant_proposalsEntity38> } | { type: 'delete'; id: string };
