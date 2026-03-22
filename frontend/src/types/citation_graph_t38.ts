export interface Citation_graphEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction38 = { type: 'create'; payload: Omit<Citation_graphEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity38> } | { type: 'delete'; id: string };
