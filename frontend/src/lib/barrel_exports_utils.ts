export function barrel_exportsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function barrel_exportsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const BARREL_EXPORTS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
