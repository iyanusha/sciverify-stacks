export function lazy_componentsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function lazy_componentsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const LAZY_COMPONENTS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
