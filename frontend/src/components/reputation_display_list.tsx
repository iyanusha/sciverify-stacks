import { Reputation_displayItem } from './reputation_display_item';

interface Item { title: string; value: string; description?: string; }

export function Reputation_displayList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Reputation_displayItem key={i} {...item} />)}</div>;
}
