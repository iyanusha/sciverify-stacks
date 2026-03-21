import { Badge_tagsItem } from './badge_tags_item';

interface Item { title: string; value: string; description?: string; }

export function Badge_tagsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Badge_tagsItem key={i} {...item} />)}</div>;
}
