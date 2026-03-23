export interface Method_registryEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction58 = { type: 'create'; payload: Omit<Method_registryEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity58> } | { type: 'delete'; id: string };
