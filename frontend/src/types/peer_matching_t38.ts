export interface Peer_matchingEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Peer_matchingQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Peer_matchingAction38 = { type: 'create'; payload: Omit<Peer_matchingEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Peer_matchingEntity38> } | { type: 'delete'; id: string };
