import { Card_variantsItem } from './card_variants_item';

interface Item { title: string; value: string; description?: string; }

export function Card_variantsList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Card_variantsItem key={i} {...item} />)}</div>;
}
