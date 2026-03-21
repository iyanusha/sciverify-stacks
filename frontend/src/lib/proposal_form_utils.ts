export function proposal_formFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function proposal_formValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const PROPOSAL_FORM_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
