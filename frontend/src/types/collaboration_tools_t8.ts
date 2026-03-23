export interface Collaboration_toolsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction8 = { type: 'create'; payload: Omit<Collaboration_toolsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity8> } | { type: 'delete'; id: string };
