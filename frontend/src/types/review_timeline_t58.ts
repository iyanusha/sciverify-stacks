export interface Review_timelineEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction58 = { type: 'create'; payload: Omit<Review_timelineEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity58> } | { type: 'delete'; id: string };
