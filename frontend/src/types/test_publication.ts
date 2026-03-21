export interface Test_publicationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_publicationRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_publicationFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
