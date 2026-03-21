export function publication_dashboardCalc35(values: number[]): { sum: number; avg: number } {
  if (!values.length) return { sum: 0, avg: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return { sum, avg: sum / values.length };
}
export const PUBLICATION_DASHBOARD_O35 = { limit: 50, offset: 0 } as const;
