import { State_managementItem } from './state_management_item';

interface Item { title: string; value: string; description?: string; }

export function State_managementList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <State_managementItem key={i} {...item} />)}</div>;
}
