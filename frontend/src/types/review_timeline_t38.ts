export interface Review_timelineEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Review_timelineQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Review_timelineAction38 = { type: 'create'; payload: Omit<Review_timelineEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Review_timelineEntity38> } | { type: 'delete'; id: string };
