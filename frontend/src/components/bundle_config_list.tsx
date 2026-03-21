import { Bundle_configItem } from './bundle_config_item';

interface Item { title: string; value: string; description?: string; }

export function Bundle_configList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Bundle_configItem key={i} {...item} />)}</div>;
}
