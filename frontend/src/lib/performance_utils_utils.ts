export function performance_utilsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function performance_utilsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const PERFORMANCE_UTILS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
