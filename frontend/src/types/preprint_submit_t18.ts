export interface Preprint_submitEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction18 = { type: 'create'; payload: Omit<Preprint_submitEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity18> } | { type: 'delete'; id: string };
