export interface Preprint_submitEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction8 = { type: 'create'; payload: Omit<Preprint_submitEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity8> } | { type: 'delete'; id: string };
