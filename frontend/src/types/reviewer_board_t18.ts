export interface Reviewer_boardEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction18 = { type: 'create'; payload: Omit<Reviewer_boardEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity18> } | { type: 'delete'; id: string };
