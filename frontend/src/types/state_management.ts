export interface State_managementConfig { enabled: boolean; interval: number; maxItems: number; }
export interface State_managementRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type State_managementFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
