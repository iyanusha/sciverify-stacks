export interface Keyboard_navConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Keyboard_navRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Keyboard_navFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
