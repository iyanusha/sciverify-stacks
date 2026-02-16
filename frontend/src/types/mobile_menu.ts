export interface Mobile_menuConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Mobile_menuRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Mobile_menuFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
