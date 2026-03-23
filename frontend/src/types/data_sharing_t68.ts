export interface Data_sharingEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Data_sharingQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Data_sharingAction68 = { type: 'create'; payload: Omit<Data_sharingEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Data_sharingEntity68> } | { type: 'delete'; id: string };
