export interface Paper_viewerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction58 = { type: 'create'; payload: Omit<Paper_viewerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity58> } | { type: 'delete'; id: string };
