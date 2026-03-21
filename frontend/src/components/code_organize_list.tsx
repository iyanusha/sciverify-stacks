import { Code_organizeItem } from './code_organize_item';

interface Item { title: string; value: string; description?: string; }

export function Code_organizeList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Code_organizeItem key={i} {...item} />)}</div>;
}
