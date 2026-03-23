export interface Metrics_dashEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Metrics_dashQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Metrics_dashAction68 = { type: 'create'; payload: Omit<Metrics_dashEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Metrics_dashEntity68> } | { type: 'delete'; id: string };
