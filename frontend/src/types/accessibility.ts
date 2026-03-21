export interface AccessibilityConfig { enabled: boolean; interval: number; maxItems: number; }
export interface AccessibilityRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type AccessibilityFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
