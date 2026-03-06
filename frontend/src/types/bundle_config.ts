export interface Bundle_configConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Bundle_configRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Bundle_configFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
