import { Nav_improvementsItem } from './nav_improvements_item';

interface Item { title: string; value: string; description?: string; }

export function Nav_improvementsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Nav_improvementsItem key={i} {...item} />)}</div>;
}
