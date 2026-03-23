export interface Metrics_dashEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction18 = { type: 'create'; payload: Omit<Metrics_dashEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity18> } | { type: 'delete'; id: string };
