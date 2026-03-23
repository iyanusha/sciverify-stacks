export interface Author_profileEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction8 = { type: 'create'; payload: Omit<Author_profileEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity8> } | { type: 'delete'; id: string };
