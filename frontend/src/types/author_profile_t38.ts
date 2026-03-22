export interface Author_profileEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction38 = { type: 'create'; payload: Omit<Author_profileEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity38> } | { type: 'delete'; id: string };
