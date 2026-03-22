export interface Citation_graphEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction18 = { type: 'create'; payload: Omit<Citation_graphEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity18> } | { type: 'delete'; id: string };
