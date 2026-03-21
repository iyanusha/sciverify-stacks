export interface Screen_readerConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Screen_readerRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Screen_readerFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
