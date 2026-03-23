export interface Method_registryEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Method_registryQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Method_registryAction38 = { type: 'create'; payload: Omit<Method_registryEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Method_registryEntity38> } | { type: 'delete'; id: string };
