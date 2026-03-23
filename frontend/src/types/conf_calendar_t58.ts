export interface Conf_calendarEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction58 = { type: 'create'; payload: Omit<Conf_calendarEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity58> } | { type: 'delete'; id: string };
