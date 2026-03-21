import { Search_filterItem } from './search_filter_item';

interface Item { title: string; value: string; description?: string; }

export function Search_filterList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Search_filterItem key={i} {...item} />)}</div>;
}
