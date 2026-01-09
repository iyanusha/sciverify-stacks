export interface Wallet_improvementsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Wallet_improvementsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Wallet_improvementsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
