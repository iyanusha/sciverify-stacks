export interface Research_feedEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction58 = { type: 'create'; payload: Omit<Research_feedEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity58> } | { type: 'delete'; id: string };
