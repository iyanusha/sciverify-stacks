import { Env_validationItem } from './env_validation_item';

interface Item { title: string; value: string; description?: string; }

export function Env_validationList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Env_validationItem key={i} {...item} />)}</div>;
}
