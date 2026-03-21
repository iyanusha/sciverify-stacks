export function card_variantsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function card_variantsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const CARD_VARIANTS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
