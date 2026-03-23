export interface Peer_matchingEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction78 = { type: 'create'; payload: Omit<Peer_matchingEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity78> } | { type: 'delete'; id: string };
