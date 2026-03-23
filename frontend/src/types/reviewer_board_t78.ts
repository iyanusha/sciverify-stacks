export interface Reviewer_boardEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction78 = { type: 'create'; payload: Omit<Reviewer_boardEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity78> } | { type: 'delete'; id: string };
