export interface Collaboration_toolsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction18 = { type: 'create'; payload: Omit<Collaboration_toolsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity18> } | { type: 'delete'; id: string };
