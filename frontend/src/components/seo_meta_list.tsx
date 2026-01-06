import { Seo_metaItem } from './seo_meta_item';

interface Item { title: string; value: string; description?: string; }

export function Seo_metaList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Seo_metaItem key={i} {...item} />)}</div>;
}
