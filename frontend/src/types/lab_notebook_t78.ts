export interface Lab_notebookEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction78 = { type: 'create'; payload: Omit<Lab_notebookEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity78> } | { type: 'delete'; id: string };
