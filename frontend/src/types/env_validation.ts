export interface Env_validationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Env_validationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Env_validationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
