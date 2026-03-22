export interface Collaboration_toolsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction28 = { type: 'create'; payload: Omit<Collaboration_toolsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity28> } | { type: 'delete'; id: string };
