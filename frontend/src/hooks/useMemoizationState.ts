"use client";
import { useState, useCallback } from 'react';

export function useMemoizationState<T>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  const update = useCallback((next: T) => setValue(next), []);
  const reset = useCallback(() => setValue(initial), [initial]);
  return { value, update, reset };
}
