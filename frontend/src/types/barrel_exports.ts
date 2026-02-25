export interface Barrel_exportsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Barrel_exportsRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Barrel_exportsFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
