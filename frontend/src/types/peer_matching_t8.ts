export interface Peer_matchingEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction8 = { type: 'create'; payload: Omit<Peer_matchingEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity8> } | { type: 'delete'; id: string };
