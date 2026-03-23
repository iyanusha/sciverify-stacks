export interface Reviewer_boardEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction28 = { type: 'create'; payload: Omit<Reviewer_boardEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity28> } | { type: 'delete'; id: string };
