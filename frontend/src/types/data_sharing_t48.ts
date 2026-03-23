export interface Data_sharingEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction48 = { type: 'create'; payload: Omit<Data_sharingEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity48> } | { type: 'delete'; id: string };
