import { Image_optimizeItem } from './image_optimize_item';

interface Item { title: string; value: string; description?: string; }

export function Image_optimizeList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Image_optimizeItem key={i} {...item} />)}</div>;
}
