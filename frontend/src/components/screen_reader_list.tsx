import { Screen_readerItem } from './screen_reader_item';

interface Item { title: string; value: string; description?: string; }

export function Screen_readerList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Screen_readerItem key={i} {...item} />)}</div>;
}
