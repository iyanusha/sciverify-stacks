export interface Badge_tagsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Badge_tagsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Badge_tagsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
