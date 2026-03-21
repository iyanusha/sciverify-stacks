export function typescript_typesFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function typescript_typesValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const TYPESCRIPT_TYPES_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
