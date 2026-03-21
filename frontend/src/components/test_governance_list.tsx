import { Test_governanceItem } from './test_governance_item';

interface Item { title: string; value: string; description?: string; }

export function Test_governanceList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Test_governanceItem key={i} {...item} />)}</div>;
}
