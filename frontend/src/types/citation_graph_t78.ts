export interface Citation_graphEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction78 = { type: 'create'; payload: Omit<Citation_graphEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity78> } | { type: 'delete'; id: string };
