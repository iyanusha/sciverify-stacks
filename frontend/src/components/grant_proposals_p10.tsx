"use client";
import { useState } from 'react';
interface Grant_proposalsP10Props { title?: string; data?: Record<string, number>; onAction?: () => void; }
export function Grant_proposalsP10({ title = 'Add grant proposal tracker', data, onAction }: Grant_proposalsP10Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-green-600 hover:text-green-700">
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {expanded && data && <pre className="text-xs text-gray-500 mt-2">{JSON.stringify(data, null, 2)}</pre>}
      {onAction && <button onClick={onAction} className="mt-3 text-xs px-3 py-1 bg-green-600 text-white rounded-lg">Action</button>}
    </div>
  );
}
