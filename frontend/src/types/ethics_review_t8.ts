export interface Ethics_reviewEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction8 = { type: 'create'; payload: Omit<Ethics_reviewEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity8> } | { type: 'delete'; id: string };
