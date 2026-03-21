import { Dark_mode_applyItem } from './dark_mode_apply_item';

interface Item { title: string; value: string; description?: string; }

export function Dark_mode_applyList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Dark_mode_applyItem key={i} {...item} />)}</div>;
}
