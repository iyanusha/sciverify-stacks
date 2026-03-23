export interface Peer_matchingEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction58 = { type: 'create'; payload: Omit<Peer_matchingEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity58> } | { type: 'delete'; id: string };
