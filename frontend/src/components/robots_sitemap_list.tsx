import { Robots_sitemapItem } from './robots_sitemap_item';

interface Item { title: string; value: string; description?: string; }

export function Robots_sitemapList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Robots_sitemapItem key={i} {...item} />)}</div>;
}
