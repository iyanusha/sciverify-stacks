export interface Reviewer_boardEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction38 = { type: 'create'; payload: Omit<Reviewer_boardEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity38> } | { type: 'delete'; id: string };
