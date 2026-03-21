export function footer_linksFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function footer_linksValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const FOOTER_LINKS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
