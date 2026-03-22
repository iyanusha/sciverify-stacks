export interface Author_profileEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction78 = { type: 'create'; payload: Omit<Author_profileEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity78> } | { type: 'delete'; id: string };
