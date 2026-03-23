export interface Metrics_dashEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction78 = { type: 'create'; payload: Omit<Metrics_dashEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity78> } | { type: 'delete'; id: string };
