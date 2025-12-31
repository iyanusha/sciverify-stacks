import { Loading_statesItem } from './loading_states_item';

interface Item { title: string; value: string; description?: string; }

export function Loading_statesList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Loading_statesItem key={i} {...item} />)}</div>;
}
