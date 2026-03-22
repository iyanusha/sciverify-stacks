export interface Citation_graphEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction28 = { type: 'create'; payload: Omit<Citation_graphEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity28> } | { type: 'delete'; id: string };
