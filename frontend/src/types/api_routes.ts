export interface Api_routesConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Api_routesRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Api_routesFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
