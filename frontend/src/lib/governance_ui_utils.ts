export function governance_uiFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function governance_uiValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const GOVERNANCE_UI_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
