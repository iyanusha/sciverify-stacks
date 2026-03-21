export interface Test_credentialConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_credentialRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_credentialFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
