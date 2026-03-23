export interface Collaboration_toolsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction38 = { type: 'create'; payload: Omit<Collaboration_toolsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity38> } | { type: 'delete'; id: string };
