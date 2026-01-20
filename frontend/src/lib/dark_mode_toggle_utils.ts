export function dark_mode_toggleFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function dark_mode_toggleValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const DARK_MODE_TOGGLE_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
