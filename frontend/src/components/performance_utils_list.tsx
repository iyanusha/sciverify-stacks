import { Performance_utilsItem } from './performance_utils_item';

interface Item { title: string; value: string; description?: string; }

export function Performance_utilsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Performance_utilsItem key={i} {...item} />)}</div>;
}
