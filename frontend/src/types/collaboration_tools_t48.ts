export interface Collaboration_toolsEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction48 = { type: 'create'; payload: Omit<Collaboration_toolsEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity48> } | { type: 'delete'; id: string };
