export interface Contract_hooksConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Contract_hooksRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Contract_hooksFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
