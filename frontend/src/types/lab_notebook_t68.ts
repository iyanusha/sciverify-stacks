export interface Lab_notebookEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Lab_notebookQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Lab_notebookAction68 = { type: 'create'; payload: Omit<Lab_notebookEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Lab_notebookEntity68> } | { type: 'delete'; id: string };
