export interface Paper_viewerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction38 = { type: 'create'; payload: Omit<Paper_viewerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity38> } | { type: 'delete'; id: string };
