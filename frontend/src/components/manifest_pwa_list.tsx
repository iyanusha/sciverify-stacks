import { Manifest_pwaItem } from './manifest_pwa_item';

interface Item { title: string; value: string; description?: string; }

export function Manifest_pwaList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Manifest_pwaItem key={i} {...item} />)}</div>;
}
