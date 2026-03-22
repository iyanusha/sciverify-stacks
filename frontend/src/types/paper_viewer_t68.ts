export interface Paper_viewerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Paper_viewerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Paper_viewerAction68 = { type: 'create'; payload: Omit<Paper_viewerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Paper_viewerEntity68> } | { type: 'delete'; id: string };
