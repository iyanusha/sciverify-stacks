export interface Metrics_dashEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction58 = { type: 'create'; payload: Omit<Metrics_dashEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity58> } | { type: 'delete'; id: string };
