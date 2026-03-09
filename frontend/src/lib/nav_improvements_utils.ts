export function nav_improvementsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function nav_improvementsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const NAV_IMPROVEMENTS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
