export interface Typescript_typesConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Typescript_typesRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Typescript_typesFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
