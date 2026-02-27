import { Utility_helpersItem } from './utility_helpers_item';

interface Item { title: string; value: string; description?: string; }

export function Utility_helpersList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Utility_helpersItem key={i} {...item} />)}</div>;
}
