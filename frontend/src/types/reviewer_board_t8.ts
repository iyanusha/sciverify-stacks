export interface Reviewer_boardEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction8 = { type: 'create'; payload: Omit<Reviewer_boardEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity8> } | { type: 'delete'; id: string };
