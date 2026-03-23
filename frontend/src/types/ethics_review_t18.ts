export interface Ethics_reviewEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction18 = { type: 'create'; payload: Omit<Ethics_reviewEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity18> } | { type: 'delete'; id: string };
