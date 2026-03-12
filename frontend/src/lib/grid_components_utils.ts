export function grid_componentsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function grid_componentsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export const GRID_COMPONENTS_DEFAULTS = { pageSize: 20, timeout: 30000 } as const;
