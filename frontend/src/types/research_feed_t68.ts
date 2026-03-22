export interface Research_feedEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Research_feedQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Research_feedAction68 = { type: 'create'; payload: Omit<Research_feedEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Research_feedEntity68> } | { type: 'delete'; id: string };
