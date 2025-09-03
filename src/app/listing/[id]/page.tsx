import { getProduceListingById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ListingClientPage from './listing-client-page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getProduceListingById(params.id);

  if (!listing) {
    notFound();
  }

  return <ListingClientPage listing={listing} />;
}
