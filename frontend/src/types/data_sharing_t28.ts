export interface Data_sharingEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction28 = { type: 'create'; payload: Omit<Data_sharingEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity28> } | { type: 'delete'; id: string };
