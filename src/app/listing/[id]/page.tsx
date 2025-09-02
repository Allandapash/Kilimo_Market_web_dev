import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduceListingById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Scale, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await getProduceListingById(params.id);

  if (!listing) {
    notFound();
  }

  const MapLocation = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;
    return (
        <div className="h-64 w-full overflow-hidden rounded-lg border">
            <Map
                defaultCenter={listing.location}
                defaultZoom={14}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={`listing-map-${listing.id}`}
            >
                <AdvancedMarker position={listing.location}>
                    <Pin 
                        background={'hsl(var(--primary))'}
                        borderColor={'hsl(var(--primary-foreground))'}
                        glyphColor={'hsl(var(--primary-foreground))'}
                    />
                </AdvancedMarker>
            </Map>
        </div>
    )
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
          <MapLocation />
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
                  <span>Farm Location</span>
                </div>
              </div>
              <Separator className="my-4" />
              <Button size="lg" className="w-full text-base bg-accent text-accent-foreground hover:bg-accent/90">
                <ShoppingCart className="mr-2 h-5 w-5" /> Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
