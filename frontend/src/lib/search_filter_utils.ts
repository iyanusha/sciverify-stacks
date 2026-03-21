export function search_filterFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function search_filterValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const SEARCH_FILTER_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
