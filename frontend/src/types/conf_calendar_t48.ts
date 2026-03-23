export interface Conf_calendarEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction48 = { type: 'create'; payload: Omit<Conf_calendarEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity48> } | { type: 'delete'; id: string };
