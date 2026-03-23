export interface Author_profileEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction28 = { type: 'create'; payload: Omit<Author_profileEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity28> } | { type: 'delete'; id: string };
