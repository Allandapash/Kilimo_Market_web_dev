import BrowsePage from '@/components/browse-page';
import { getProduceListings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const listings = await getProduceListings();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BrowsePage listings={listings} />
    </div>
  );
}
