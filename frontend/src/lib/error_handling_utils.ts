export function error_handlingFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function error_handlingValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const ERROR_HANDLING_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
