export interface Conf_calendarEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction18 = { type: 'create'; payload: Omit<Conf_calendarEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity18> } | { type: 'delete'; id: string };
