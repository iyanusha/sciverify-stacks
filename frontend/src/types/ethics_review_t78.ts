export interface Ethics_reviewEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction78 = { type: 'create'; payload: Omit<Ethics_reviewEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity78> } | { type: 'delete'; id: string };
