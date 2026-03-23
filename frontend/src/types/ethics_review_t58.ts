export interface Ethics_reviewEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction58 = { type: 'create'; payload: Omit<Ethics_reviewEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity58> } | { type: 'delete'; id: string };
