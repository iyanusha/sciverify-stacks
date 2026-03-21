export function tooltip_popoverFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function tooltip_popoverValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const TOOLTIP_POPOVER_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
