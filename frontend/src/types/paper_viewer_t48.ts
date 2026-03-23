export interface Paper_viewerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction48 = { type: 'create'; payload: Omit<Paper_viewerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity48> } | { type: 'delete'; id: string };
