export interface Research_feedEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction78 = { type: 'create'; payload: Omit<Research_feedEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity78> } | { type: 'delete'; id: string };
