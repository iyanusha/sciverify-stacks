export interface Metrics_dashEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction38 = { type: 'create'; payload: Omit<Metrics_dashEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity38> } | { type: 'delete'; id: string };
