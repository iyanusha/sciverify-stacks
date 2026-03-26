'use client';

interface KeywordTagProps {
  label: string;
  onClick?: () => void;
  onRemove?: () => void;
  active?: boolean;
  count?: number;
  title?: string;
}

export default function KeywordTag({ label, onClick, onRemove, active = false, count, title }: KeywordTagProps) {
  return (
    <span
      className={`keyword-tag inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${
        active
          ? 'border-accent-300 bg-accent-50 text-accent-700'
          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={title ?? (onClick ? `Filter by ${label}` : undefined)}
      aria-label={onClick ? `Filter by keyword: ${label}` : label}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {label}
      {count !== undefined && (
        <span className="ml-0.5 rounded-full bg-current/10 px-1 text-[10px] tabular-nums">{count}</span>
      )}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove keyword ${label}`}
          className="ml-0.5 rounded-full text-current opacity-60 hover:opacity-100 focus:outline-none"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 4.586L9.293 1.293a1 1 0 111.414 1.414L7.414 6l3.293 3.293a1 1 0 01-1.414 1.414L6 7.414l-3.293 3.293a1 1 0 01-1.414-1.414L4.586 6 1.293 2.707A1 1 0 012.707 1.293L6 4.586z" />
          </svg>
        </button>
      )}
    </span>
  );
}
