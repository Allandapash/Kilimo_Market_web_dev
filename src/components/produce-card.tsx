
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Produce } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProduceCardProps {
  listing: Produce;
}

export function ProduceCard({ listing }: ProduceCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            className="object-cover"
            data-ai-hint={listing.aiHint}
          />
           <Badge variant="secondary" className="absolute top-2 right-2">
            {listing.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-2">{listing.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{listing.quantity} {listing.unit} available</p>
        <p className="text-2xl font-bold text-primary mt-2">
          ${listing.price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground"> / {listing.unit}</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/listing/${listing.id}`}>
            View Listing <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
