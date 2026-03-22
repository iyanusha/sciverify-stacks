export interface Author_profileEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction58 = { type: 'create'; payload: Omit<Author_profileEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity58> } | { type: 'delete'; id: string };
