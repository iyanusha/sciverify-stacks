export interface Review_timelineEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction68 = { type: 'create'; payload: Omit<Review_timelineEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity68> } | { type: 'delete'; id: string };
