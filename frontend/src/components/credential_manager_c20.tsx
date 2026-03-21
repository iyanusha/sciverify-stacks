"use client";
import type { ReactNode } from 'react';
interface Props { children?: ReactNode; title?: string; loading?: boolean; }
export function Credential_managerC20({ children, title, loading }: Props) {
  if (loading) return <div className="animate-pulse bg-gray-200 rounded-lg h-24" />;
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      {title && <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>}
      {children}
    </div>
  );
}
