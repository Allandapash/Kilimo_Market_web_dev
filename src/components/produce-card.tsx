import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Tag } from 'lucide-react';
import type { Produce } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ProduceCardProps {
  listing: Produce;
}

export function ProduceCard({ listing }: ProduceCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/listing/${listing.id}`}>
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={listing.image}
              alt={listing.name}
              fill
              className="object-cover"
              data-ai-hint={listing.aiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2">{listing.category}</Badge>
        <CardTitle className="text-lg font-headline mb-1">
          <Link href={`/listing/${listing.id}`}>{listing.name}</Link>
        </CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="mr-1 h-4 w-4" />
          {listing.farmName}
        </CardDescription>
        <p className="font-body text-sm line-clamp-2">{listing.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0 bg-card">
        <div className='flex flex-col'>
            <p className="text-xl font-bold text-primary">${listing.price.toFixed(2)} / {listing.unit}</p>
            <p className="text-xs text-muted-foreground flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                Available from {format(listing.availability, 'MMM dd')}
            </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/listing/${listing.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
