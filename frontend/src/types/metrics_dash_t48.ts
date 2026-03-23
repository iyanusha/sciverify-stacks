export interface Metrics_dashEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction48 = { type: 'create'; payload: Omit<Metrics_dashEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity48> } | { type: 'delete'; id: string };
