export interface Preprint_submitEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction48 = { type: 'create'; payload: Omit<Preprint_submitEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity48> } | { type: 'delete'; id: string };
