export interface Dataset_viewerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dataset_viewerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dataset_viewerAction8 = { type: 'create'; payload: Omit<Dataset_viewerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Dataset_viewerEntity8> } | { type: 'delete'; id: string };
