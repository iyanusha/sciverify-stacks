import { Api_routesItem } from './api_routes_item';

interface Item { title: string; value: string; description?: string; }

export function Api_routesList({ items }: { items: Item[] }) {
  if (!items.length) return <div className="text-center text-gray-400 py-8">No items found</div>;
  return <div>{items.map((item, i) => <Api_routesItem key={i} {...item} />)}</div>;
}
