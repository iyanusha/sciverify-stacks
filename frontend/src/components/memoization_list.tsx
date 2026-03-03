import { MemoizationItem } from './memoization_item';

interface Item { title: string; value: string; description?: string; }

export function MemoizationList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <MemoizationItem key={i} {...item} />)}</div>;
}
