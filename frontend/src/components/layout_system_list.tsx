import { Layout_systemItem } from './layout_system_item';

interface Item { title: string; value: string; description?: string; }

export function Layout_systemList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Layout_systemItem key={i} {...item} />)}</div>;
}
