export function utility_helpersFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function utility_helpersValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const UTILITY_HELPERS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
