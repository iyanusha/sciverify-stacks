export interface Impact_metricsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Impact_metricsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Impact_metricsAction18 = { type: 'create'; payload: Omit<Impact_metricsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Impact_metricsEntity18> } | { type: 'delete'; id: string };
