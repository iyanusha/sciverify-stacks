export interface Method_registryEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction68 = { type: 'create'; payload: Omit<Method_registryEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity68> } | { type: 'delete'; id: string };
