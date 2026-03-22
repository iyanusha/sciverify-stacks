export interface Paper_viewerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction78 = { type: 'create'; payload: Omit<Paper_viewerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity78> } | { type: 'delete'; id: string };
