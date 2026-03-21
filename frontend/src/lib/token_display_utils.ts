export function token_displayFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function token_displayValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const TOKEN_DISPLAY_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
