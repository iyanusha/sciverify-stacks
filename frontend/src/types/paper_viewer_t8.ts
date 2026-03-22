export interface Paper_viewerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction8 = { type: 'create'; payload: Omit<Paper_viewerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity8> } | { type: 'delete'; id: string };
