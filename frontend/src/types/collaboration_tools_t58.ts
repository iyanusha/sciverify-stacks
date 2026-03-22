export interface Collaboration_toolsEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction58 = { type: 'create'; payload: Omit<Collaboration_toolsEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity58> } | { type: 'delete'; id: string };
