import { Focus_managementItem } from './focus_management_item';

interface Item { title: string; value: string; description?: string; }

export function Focus_managementList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Focus_managementItem key={i} {...item} />)}</div>;
}
