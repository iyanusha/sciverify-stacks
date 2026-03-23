export interface Org_settingsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction38 = { type: 'create'; payload: Omit<Org_settingsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity38> } | { type: 'delete'; id: string };
