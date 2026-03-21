export function admin_controlsCalc24(values: number[]): { sum: number; avg: number } {
  if (!values.length) return { sum: 0, avg: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return { sum, avg: sum / values.length };
}
export const ADMIN_CONTROLS_O24 = { limit: 50, offset: 0 } as const;
