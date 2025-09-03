import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduceListingById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Scale, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { ListingMap } from '@/components/listing-map';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getProduceListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={listing.image}
              alt={listing.name}
              fill
              className="object-cover"
              data-ai-hint={listing.aiHint}
              priority
            />
          </div>
          <h2 className="text-2xl font-bold font-headline mb-2">Location</h2>
          <ListingMap listing={listing} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {listing.category}
              </Badge>
              <CardTitle className="text-4xl font-headline">{listing.name}</CardTitle>
              <CardDescription className="text-lg">
                From <span className="font-semibold text-primary">{listing.farmName}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-4">
                ${listing.price.toFixed(2)}
                <span className="text-base font-normal text-muted-foreground"> / {listing.unit}</span>
              </p>
              <p className="text-foreground/90 font-body mb-6">{listing.description}</p>
              <Separator className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Scale className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Available Quantity: {listing.quantity} {listing.unit}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Available from: {format(listing.availability, 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>{listing.farmName}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <Button size="lg" className="w-full text-base bg-accent text-accent-foreground hover:bg-accent/90">
                <ShoppingCart className="mr-2 h-5 w-5" /> Buy Produce
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
