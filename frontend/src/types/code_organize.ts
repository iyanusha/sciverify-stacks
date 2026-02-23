export interface Code_organizeConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Code_organizeRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Code_organizeFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
