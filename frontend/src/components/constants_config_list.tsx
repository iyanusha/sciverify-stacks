import { Constants_configItem } from './constants_config_item';

interface Item { title: string; value: string; description?: string; }

export function Constants_configList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Constants_configItem key={i} {...item} />)}</div>;
}
