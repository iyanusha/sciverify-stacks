export interface Conf_calendarEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction68 = { type: 'create'; payload: Omit<Conf_calendarEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity68> } | { type: 'delete'; id: string };
