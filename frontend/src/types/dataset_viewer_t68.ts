export interface Dataset_viewerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Dataset_viewerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Dataset_viewerAction68 = { type: 'create'; payload: Omit<Dataset_viewerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Dataset_viewerEntity68> } | { type: 'delete'; id: string };
