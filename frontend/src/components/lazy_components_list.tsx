import { Lazy_componentsItem } from './lazy_components_item';

interface Item { title: string; value: string; description?: string; }

export function Lazy_componentsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Lazy_componentsItem key={i} {...item} />)}</div>;
}
