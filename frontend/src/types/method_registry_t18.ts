export interface Method_registryEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction18 = { type: 'create'; payload: Omit<Method_registryEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity18> } | { type: 'delete'; id: string };
