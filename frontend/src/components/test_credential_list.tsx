import { Test_credentialItem } from './test_credential_item';

interface Item { title: string; value: string; description?: string; }

export function Test_credentialList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Test_credentialItem key={i} {...item} />)}</div>;
}
