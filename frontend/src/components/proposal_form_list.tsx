import { Proposal_formItem } from './proposal_form_item';

interface Item { title: string; value: string; description?: string; }

export function Proposal_formList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Proposal_formItem key={i} {...item} />)}</div>;
}
