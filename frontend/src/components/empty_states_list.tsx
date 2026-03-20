import { Empty_statesItem } from './empty_states_item';

interface Item { title: string; value: string; description?: string; }

export function Empty_statesList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Empty_statesItem key={i} {...item} />)}</div>;
}
