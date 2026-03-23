export interface Collaboration_toolsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Collaboration_toolsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Collaboration_toolsAction68 = { type: 'create'; payload: Omit<Collaboration_toolsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Collaboration_toolsEntity68> } | { type: 'delete'; id: string };
