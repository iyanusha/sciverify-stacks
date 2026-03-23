export interface Method_registryEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction8 = { type: 'create'; payload: Omit<Method_registryEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity8> } | { type: 'delete'; id: string };
