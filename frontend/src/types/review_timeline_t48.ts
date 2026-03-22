export interface Review_timelineEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction48 = { type: 'create'; payload: Omit<Review_timelineEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity48> } | { type: 'delete'; id: string };
