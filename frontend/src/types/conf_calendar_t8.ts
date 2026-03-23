export interface Conf_calendarEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction8 = { type: 'create'; payload: Omit<Conf_calendarEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity8> } | { type: 'delete'; id: string };
