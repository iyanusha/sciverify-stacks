export function keyboard_navFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function keyboard_navValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const KEYBOARD_NAV_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
