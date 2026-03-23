export interface Preprint_submitEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction58 = { type: 'create'; payload: Omit<Preprint_submitEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity58> } | { type: 'delete'; id: string };
