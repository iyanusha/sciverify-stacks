export interface Grid_componentsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Grid_componentsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Grid_componentsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
