export interface Metrics_dashEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction8 = { type: 'create'; payload: Omit<Metrics_dashEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity8> } | { type: 'delete'; id: string };
