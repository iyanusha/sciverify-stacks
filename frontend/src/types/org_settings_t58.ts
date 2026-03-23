export interface Org_settingsEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction58 = { type: 'create'; payload: Omit<Org_settingsEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity58> } | { type: 'delete'; id: string };
