export interface Error_handlingConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Error_handlingRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Error_handlingFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
