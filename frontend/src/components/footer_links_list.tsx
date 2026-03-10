import { Footer_linksItem } from './footer_links_item';

interface Item { title: string; value: string; description?: string; }

export function Footer_linksList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Footer_linksItem key={i} {...item} />)}</div>;
}
