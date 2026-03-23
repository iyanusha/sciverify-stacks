export interface Impact_metricsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Impact_metricsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Impact_metricsAction8 = { type: 'create'; payload: Omit<Impact_metricsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Impact_metricsEntity8> } | { type: 'delete'; id: string };
