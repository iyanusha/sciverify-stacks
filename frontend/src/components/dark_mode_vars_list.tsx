import { Dark_mode_varsItem } from './dark_mode_vars_item';

interface Item { title: string; value: string; description?: string; }

export function Dark_mode_varsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Dark_mode_varsItem key={i} {...item} />)}</div>;
}
