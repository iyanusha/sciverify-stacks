export interface Method_registryEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction28 = { type: 'create'; payload: Omit<Method_registryEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity28> } | { type: 'delete'; id: string };
