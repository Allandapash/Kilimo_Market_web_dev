import BrowsePage from '@/components/browse-page';
import { getProduceListings } from '@/lib/data';

export default async function Home() {
  const listings = await getProduceListings();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BrowsePage listings={listings} />
    </div>
  );
}
