export interface Author_profileEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Author_profileQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Author_profileAction68 = { type: 'create'; payload: Omit<Author_profileEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Author_profileEntity68> } | { type: 'delete'; id: string };
