export interface Research_feedEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction28 = { type: 'create'; payload: Omit<Research_feedEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity28> } | { type: 'delete'; id: string };
