export interface Review_timelineEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction28 = { type: 'create'; payload: Omit<Review_timelineEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity28> } | { type: 'delete'; id: string };
