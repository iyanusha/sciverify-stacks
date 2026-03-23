export interface Reviewer_boardEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction58 = { type: 'create'; payload: Omit<Reviewer_boardEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity58> } | { type: 'delete'; id: string };
