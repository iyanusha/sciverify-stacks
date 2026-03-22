export interface Lab_notebookEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction8 = { type: 'create'; payload: Omit<Lab_notebookEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity8> } | { type: 'delete'; id: string };
