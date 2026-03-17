import { Tooltip_popoverItem } from './tooltip_popover_item';

interface Item { title: string; value: string; description?: string; }

export function Tooltip_popoverList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Tooltip_popoverItem key={i} {...item} />)}</div>;
}
