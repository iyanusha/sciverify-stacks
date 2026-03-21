import { Token_displayItem } from './token_display_item';

interface Item { title: string; value: string; description?: string; }

export function Token_displayList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Token_displayItem key={i} {...item} />)}</div>;
}
