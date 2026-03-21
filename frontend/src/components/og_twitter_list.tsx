import { Og_twitterItem } from './og_twitter_item';

interface Item { title: string; value: string; description?: string; }

export function Og_twitterList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Og_twitterItem key={i} {...item} />)}</div>;
}
