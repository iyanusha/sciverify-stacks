import { Wallet_improvementsItem } from './wallet_improvements_item';

interface Item { title: string; value: string; description?: string; }

export function Wallet_improvementsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Wallet_improvementsItem key={i} {...item} />)}</div>;
}
