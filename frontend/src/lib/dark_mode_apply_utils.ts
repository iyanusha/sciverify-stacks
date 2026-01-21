export function dark_mode_applyFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function dark_mode_applyValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const DARK_MODE_APPLY_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
