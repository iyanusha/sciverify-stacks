export interface Dataset_viewerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dataset_viewerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dataset_viewerAction48 = { type: 'create'; payload: Omit<Dataset_viewerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Dataset_viewerEntity48> } | { type: 'delete'; id: string };
