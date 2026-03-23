export interface Preprint_submitEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction78 = { type: 'create'; payload: Omit<Preprint_submitEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity78> } | { type: 'delete'; id: string };
