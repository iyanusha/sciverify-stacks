export interface Collaboration_toolsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction78 = { type: 'create'; payload: Omit<Collaboration_toolsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity78> } | { type: 'delete'; id: string };
