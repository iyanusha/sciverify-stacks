export interface Review_timelineEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction8 = { type: 'create'; payload: Omit<Review_timelineEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity8> } | { type: 'delete'; id: string };
