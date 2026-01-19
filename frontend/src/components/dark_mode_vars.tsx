"use client";
import type { ReactNode } from 'react';

interface Dark_mode_varsProps {
  children?: ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  loading?: boolean;
  className?: string;
}

export function Dark_mode_vars({ children, variant = 'default', loading, className = '' }: Dark_mode_varsProps) {
  const styles = {
    default: { background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb' },
    primary: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
    accent: { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' },
  };
  if (loading) return <div className="animate-pulse bg-gray-200 rounded-xl h-32" />;
  return (
    <div className={`rounded-xl p-5 ${className}`} style={styles[variant]}>
      {children}
    </div>
  );
}
