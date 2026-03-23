export interface Impact_metricsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Impact_metricsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Impact_metricsAction78 = { type: 'create'; payload: Omit<Impact_metricsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Impact_metricsEntity78> } | { type: 'delete'; id: string };
