export interface Data_sharingEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction38 = { type: 'create'; payload: Omit<Data_sharingEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity38> } | { type: 'delete'; id: string };
