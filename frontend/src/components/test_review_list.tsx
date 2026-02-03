import { Test_reviewItem } from './test_review_item';

interface Item { title: string; value: string; description?: string; }

export function Test_reviewList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Test_reviewItem key={i} {...item} />)}</div>;
}
