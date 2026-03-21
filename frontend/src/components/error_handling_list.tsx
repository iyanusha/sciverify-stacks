import { Error_handlingItem } from './error_handling_item';

interface Item { title: string; value: string; description?: string; }

export function Error_handlingList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Error_handlingItem key={i} {...item} />)}</div>;
}
