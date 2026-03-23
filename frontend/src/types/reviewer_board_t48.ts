export interface Reviewer_boardEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction48 = { type: 'create'; payload: Omit<Reviewer_boardEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity48> } | { type: 'delete'; id: string };
