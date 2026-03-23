export interface Org_settingsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Org_settingsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Org_settingsAction68 = { type: 'create'; payload: Omit<Org_settingsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Org_settingsEntity68> } | { type: 'delete'; id: string };
