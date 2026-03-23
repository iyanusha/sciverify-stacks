export interface Ethics_reviewEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction28 = { type: 'create'; payload: Omit<Ethics_reviewEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity28> } | { type: 'delete'; id: string };
