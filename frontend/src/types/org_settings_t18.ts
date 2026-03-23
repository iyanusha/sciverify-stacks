export interface Org_settingsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction18 = { type: 'create'; payload: Omit<Org_settingsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity18> } | { type: 'delete'; id: string };
