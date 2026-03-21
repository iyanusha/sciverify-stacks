export interface Responsive_designConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Responsive_designRecord { id: string; label: string; value: number; status: 'active' | 'inactive'; createdAt: number; }
export type Responsive_designFilter = { status?: 'active' | 'inactive'; search?: string; sortBy?: string; };
