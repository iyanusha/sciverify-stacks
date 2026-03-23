export interface Paper_viewerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction28 = { type: 'create'; payload: Omit<Paper_viewerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity28> } | { type: 'delete'; id: string };
