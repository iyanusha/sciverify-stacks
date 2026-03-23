export interface Conf_calendarEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction78 = { type: 'create'; payload: Omit<Conf_calendarEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity78> } | { type: 'delete'; id: string };
