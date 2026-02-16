import { Mobile_menuItem } from './mobile_menu_item';

interface Item { title: string; value: string; description?: string; }

export function Mobile_menuList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Mobile_menuItem key={i} {...item} />)}</div>;
}
