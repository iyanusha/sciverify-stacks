export interface Metrics_dashEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction28 = { type: 'create'; payload: Omit<Metrics_dashEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity28> } | { type: 'delete'; id: string };
