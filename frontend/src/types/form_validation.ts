export interface Form_validationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Form_validationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Form_validationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
