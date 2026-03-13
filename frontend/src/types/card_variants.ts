export interface Card_variantsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Card_variantsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Card_variantsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
