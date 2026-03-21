import { Review_uiItem } from './review_ui_item';

interface Item { title: string; value: string; description?: string; }

export function Review_uiList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Review_uiItem key={i} {...item} />)}</div>;
}
