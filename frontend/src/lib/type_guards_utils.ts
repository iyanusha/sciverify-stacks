export function type_guardsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function type_guardsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const TYPE_GUARDS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
