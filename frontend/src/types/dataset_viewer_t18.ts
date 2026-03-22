export interface Dataset_viewerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dataset_viewerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dataset_viewerAction18 = { type: 'create'; payload: Omit<Dataset_viewerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Dataset_viewerEntity18> } | { type: 'delete'; id: string };
