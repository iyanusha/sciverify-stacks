export interface Method_registryEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction78 = { type: 'create'; payload: Omit<Method_registryEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity78> } | { type: 'delete'; id: string };
