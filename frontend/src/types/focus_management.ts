export interface Focus_managementConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Focus_managementRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Focus_managementFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
