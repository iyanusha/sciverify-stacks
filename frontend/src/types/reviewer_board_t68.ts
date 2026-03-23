export interface Reviewer_boardEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reviewer_boardQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reviewer_boardAction68 = { type: 'create'; payload: Omit<Reviewer_boardEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Reviewer_boardEntity68> } | { type: 'delete'; id: string };
