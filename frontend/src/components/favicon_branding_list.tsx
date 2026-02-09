import { Favicon_brandingItem } from './favicon_branding_item';

interface Item { title: string; value: string; description?: string; }

export function Favicon_brandingList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Favicon_brandingItem key={i} {...item} />)}</div>;
}
