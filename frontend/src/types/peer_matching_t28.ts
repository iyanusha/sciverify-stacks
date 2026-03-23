export interface Peer_matchingEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction28 = { type: 'create'; payload: Omit<Peer_matchingEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity28> } | { type: 'delete'; id: string };
