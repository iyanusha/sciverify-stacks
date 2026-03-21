import { Canonical_urlsItem } from './canonical_urls_item';

interface Item { title: string; value: string; description?: string; }

export function Canonical_urlsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Canonical_urlsItem key={i} {...item} />)}</div>;
}
