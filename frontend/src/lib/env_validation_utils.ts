export function env_validationFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function env_validationValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const ENV_VALIDATION_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
