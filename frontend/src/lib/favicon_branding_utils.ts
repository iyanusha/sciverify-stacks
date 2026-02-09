export function favicon_brandingFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function favicon_brandingValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const FAVICON_BRANDING_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
