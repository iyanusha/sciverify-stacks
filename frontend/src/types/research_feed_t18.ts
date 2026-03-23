export interface Research_feedEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction18 = { type: 'create'; payload: Omit<Research_feedEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity18> } | { type: 'delete'; id: string };
