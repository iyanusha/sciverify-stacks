export function form_validationFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function form_validationValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const FORM_VALIDATION_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
