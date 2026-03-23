export interface Grant_proposalsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Grant_proposalsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Grant_proposalsAction68 = { type: 'create'; payload: Omit<Grant_proposalsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Grant_proposalsEntity68> } | { type: 'delete'; id: string };
