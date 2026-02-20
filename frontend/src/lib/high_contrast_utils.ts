export function high_contrastFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function high_contrastValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const HIGH_CONTRAST_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
