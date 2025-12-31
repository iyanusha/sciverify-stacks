export function loading_statesFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function loading_statesValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const LOADING_STATES_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
