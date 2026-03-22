export interface Peer_matchingEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction48 = { type: 'create'; payload: Omit<Peer_matchingEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity48> } | { type: 'delete'; id: string };
