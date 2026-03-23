export interface Data_sharingEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction8 = { type: 'create'; payload: Omit<Data_sharingEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity8> } | { type: 'delete'; id: string };
