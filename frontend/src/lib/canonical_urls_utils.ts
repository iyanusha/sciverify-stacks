export function canonical_urlsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function canonical_urlsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const CANONICAL_URLS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
