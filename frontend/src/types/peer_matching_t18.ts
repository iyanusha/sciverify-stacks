export interface Peer_matchingEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction18 = { type: 'create'; payload: Omit<Peer_matchingEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity18> } | { type: 'delete'; id: string };
