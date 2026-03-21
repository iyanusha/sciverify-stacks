import { Dashboard_pageItem } from './dashboard_page_item';

interface Item { title: string; value: string; description?: string; }

export function Dashboard_pageList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Dashboard_pageItem key={i} {...item} />)}</div>;
}
