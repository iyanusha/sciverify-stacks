export interface Ethics_reviewEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction68 = { type: 'create'; payload: Omit<Ethics_reviewEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity68> } | { type: 'delete'; id: string };
