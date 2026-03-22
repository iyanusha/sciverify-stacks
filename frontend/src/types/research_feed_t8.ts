export interface Research_feedEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction8 = { type: 'create'; payload: Omit<Research_feedEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity8> } | { type: 'delete'; id: string };
