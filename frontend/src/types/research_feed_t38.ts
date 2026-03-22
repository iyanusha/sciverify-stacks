export interface Research_feedEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction38 = { type: 'create'; payload: Omit<Research_feedEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity38> } | { type: 'delete'; id: string };
