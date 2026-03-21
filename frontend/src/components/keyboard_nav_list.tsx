import { Keyboard_navItem } from './keyboard_nav_item';

interface Item { title: string; value: string; description?: string; }

export function Keyboard_navList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Keyboard_navItem key={i} {...item} />)}</div>;
}
