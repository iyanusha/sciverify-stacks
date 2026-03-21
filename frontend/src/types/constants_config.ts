export interface Constants_configConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Constants_configRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Constants_configFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
