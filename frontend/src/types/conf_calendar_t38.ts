export interface Conf_calendarEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Conf_calendarQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Conf_calendarAction38 = { type: 'create'; payload: Omit<Conf_calendarEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Conf_calendarEntity38> } | { type: 'delete'; id: string };
