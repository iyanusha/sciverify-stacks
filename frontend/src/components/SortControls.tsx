'use client';

type SortBy = 'relevance' | 'date' | 'title';

interface SortControlsProps {
  value: SortBy;
  onChange: (sort: SortBy) => void;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Title' },
];

export default function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm">
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === opt.value
              ? 'bg-accent-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
