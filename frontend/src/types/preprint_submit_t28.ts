export interface Preprint_submitEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction28 = { type: 'create'; payload: Omit<Preprint_submitEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity28> } | { type: 'delete'; id: string };
