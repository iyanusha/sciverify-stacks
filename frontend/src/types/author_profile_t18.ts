export interface Author_profileEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction18 = { type: 'create'; payload: Omit<Author_profileEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity18> } | { type: 'delete'; id: string };
