export interface Test_governanceConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Test_governanceRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Test_governanceFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
