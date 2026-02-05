export function test_credentialFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function test_credentialValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const TEST_CREDENTIAL_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
