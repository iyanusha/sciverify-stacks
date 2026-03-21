export interface Image_optimizeConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Image_optimizeRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Image_optimizeFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
