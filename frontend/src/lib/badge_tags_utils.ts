export function badge_tagsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function badge_tagsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const BADGE_TAGS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
