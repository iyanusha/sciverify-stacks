import { Contract_hooksItem } from './contract_hooks_item';

interface Item { title: string; value: string; description?: string; }

export function Contract_hooksList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Contract_hooksItem key={i} {...item} />)}</div>;
}
