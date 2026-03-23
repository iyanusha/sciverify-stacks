export interface Citation_graphEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Citation_graphQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Citation_graphAction48 = { type: 'create'; payload: Omit<Citation_graphEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Citation_graphEntity48> } | { type: 'delete'; id: string };
