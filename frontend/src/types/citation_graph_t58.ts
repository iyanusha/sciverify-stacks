export interface Citation_graphEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction58 = { type: 'create'; payload: Omit<Citation_graphEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity58> } | { type: 'delete'; id: string };
