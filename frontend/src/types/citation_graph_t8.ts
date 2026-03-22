export interface Citation_graphEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction8 = { type: 'create'; payload: Omit<Citation_graphEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity8> } | { type: 'delete'; id: string };
