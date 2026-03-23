export interface Impact_metricsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Impact_metricsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Impact_metricsAction68 = { type: 'create'; payload: Omit<Impact_metricsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Impact_metricsEntity68> } | { type: 'delete'; id: string };
