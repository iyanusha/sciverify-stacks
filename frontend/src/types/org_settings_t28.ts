export interface Org_settingsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction28 = { type: 'create'; payload: Omit<Org_settingsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity28> } | { type: 'delete'; id: string };
