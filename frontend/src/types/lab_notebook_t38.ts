export interface Lab_notebookEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction38 = { type: 'create'; payload: Omit<Lab_notebookEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity38> } | { type: 'delete'; id: string };
