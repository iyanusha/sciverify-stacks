import { Table_componentItem } from './table_component_item';

interface Item { title: string; value: string; description?: string; }

export function Table_componentList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Table_componentItem key={i} {...item} />)}</div>;
}
