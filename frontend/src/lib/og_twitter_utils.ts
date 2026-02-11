export function og_twitterFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function og_twitterValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const OG_TWITTER_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
