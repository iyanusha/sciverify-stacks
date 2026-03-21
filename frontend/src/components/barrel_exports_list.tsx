import { Barrel_exportsItem } from './barrel_exports_item';

interface Item { title: string; value: string; description?: string; }

export function Barrel_exportsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Barrel_exportsItem key={i} {...item} />)}</div>;
}
