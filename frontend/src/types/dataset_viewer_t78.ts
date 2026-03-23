export interface Dataset_viewerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dataset_viewerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dataset_viewerAction78 = { type: 'create'; payload: Omit<Dataset_viewerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Dataset_viewerEntity78> } | { type: 'delete'; id: string };
