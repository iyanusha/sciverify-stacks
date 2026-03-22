export interface Author_profileEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction48 = { type: 'create'; payload: Omit<Author_profileEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity48> } | { type: 'delete'; id: string };
