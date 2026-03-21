import { High_contrastItem } from './high_contrast_item';

interface Item { title: string; value: string; description?: string; }

export function High_contrastList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <High_contrastItem key={i} {...item} />)}</div>;
}
