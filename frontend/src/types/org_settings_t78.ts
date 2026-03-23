export interface Org_settingsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction78 = { type: 'create'; payload: Omit<Org_settingsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity78> } | { type: 'delete'; id: string };
