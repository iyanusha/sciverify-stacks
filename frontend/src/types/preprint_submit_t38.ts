export interface Preprint_submitEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Preprint_submitQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Preprint_submitAction38 = { type: 'create'; payload: Omit<Preprint_submitEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Preprint_submitEntity38> } | { type: 'delete'; id: string };
