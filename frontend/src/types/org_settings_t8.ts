export interface Org_settingsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction8 = { type: 'create'; payload: Omit<Org_settingsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity8> } | { type: 'delete'; id: string };
