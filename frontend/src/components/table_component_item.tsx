interface Table_componentItemProps { title: string; value: string; description?: string; }

export function Table_componentItem({ title, value, description }: Table_componentItemProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <div>
        <div className="text-sm font-medium text-gray-700">{title}</div>
        {description && <div className="text-xs text-gray-400">{description}</div>}
      </div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}
