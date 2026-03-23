export interface Method_registryEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction48 = { type: 'create'; payload: Omit<Method_registryEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity48> } | { type: 'delete'; id: string };
