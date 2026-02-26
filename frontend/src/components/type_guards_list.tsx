import { Type_guardsItem } from './type_guards_item';

interface Item { title: string; value: string; description?: string; }

export function Type_guardsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Type_guardsItem key={i} {...item} />)}</div>;
}
