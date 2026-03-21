export function credential_uiFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function credential_uiValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const CREDENTIAL_UI_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
