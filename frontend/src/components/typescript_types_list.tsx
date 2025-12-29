import { Typescript_typesItem } from './typescript_types_item';

interface Item { title: string; value: string; description?: string; }

export function Typescript_typesList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Typescript_typesItem key={i} {...item} />)}</div>;
}
