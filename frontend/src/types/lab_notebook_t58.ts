export interface Lab_notebookEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction58 = { type: 'create'; payload: Omit<Lab_notebookEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity58> } | { type: 'delete'; id: string };
