export function mobile_menuFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function mobile_menuValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const MOBILE_MENU_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
