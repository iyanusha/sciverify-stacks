export interface Data_sharingEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction78 = { type: 'create'; payload: Omit<Data_sharingEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity78> } | { type: 'delete'; id: string };
