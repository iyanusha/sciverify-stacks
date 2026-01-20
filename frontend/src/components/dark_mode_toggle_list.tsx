import { Dark_mode_toggleItem } from './dark_mode_toggle_item';

interface Item { title: string; value: string; description?: string; }

export function Dark_mode_toggleList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Dark_mode_toggleItem key={i} {...item} />)}</div>;
}
