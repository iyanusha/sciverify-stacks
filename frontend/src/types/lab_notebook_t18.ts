export interface Lab_notebookEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction18 = { type: 'create'; payload: Omit<Lab_notebookEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity18> } | { type: 'delete'; id: string };
