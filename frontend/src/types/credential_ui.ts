export interface Credential_uiConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Credential_uiRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Credential_uiFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
