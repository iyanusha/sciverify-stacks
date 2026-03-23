export interface Ethics_reviewEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Ethics_reviewQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Ethics_reviewAction38 = { type: 'create'; payload: Omit<Ethics_reviewEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Ethics_reviewEntity38> } | { type: 'delete'; id: string };
