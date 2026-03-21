import { AccessibilityItem } from './accessibility_item';

interface Item { title: string; value: string; description?: string; }

export function AccessibilityList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <AccessibilityItem key={i} {...item} />)}</div>;
}
