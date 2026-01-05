import { Responsive_designItem } from './responsive_design_item';

interface Item { title: string; value: string; description?: string; }

export function Responsive_designList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Responsive_designItem key={i} {...item} />)}</div>;
}
