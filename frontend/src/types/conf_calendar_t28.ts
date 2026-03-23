export interface Conf_calendarEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction28 = { type: 'create'; payload: Omit<Conf_calendarEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity28> } | { type: 'delete'; id: string };
