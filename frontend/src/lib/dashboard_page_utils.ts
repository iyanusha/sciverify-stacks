export function dashboard_pageFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function dashboard_pageValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const DASHBOARD_PAGE_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
