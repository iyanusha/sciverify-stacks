export function bundle_configFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function bundle_configValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const BUNDLE_CONFIG_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
