export interface Impact_metricsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Impact_metricsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Impact_metricsAction38 = { type: 'create'; payload: Omit<Impact_metricsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Impact_metricsEntity38> } | { type: 'delete'; id: string };
