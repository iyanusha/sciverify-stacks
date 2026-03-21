export function layout_systemFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function layout_systemValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const LAYOUT_SYSTEM_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
