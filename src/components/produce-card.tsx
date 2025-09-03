
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Tag, ArrowRight, Package } from 'lucide-react';
import type { Produce } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

interface ProduceCardProps {
  listing: Produce;
}

export function ProduceCard({ listing }: ProduceCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code runs only on the client, after hydration
    setFormattedDate(format(listing.availability, 'MMM dd'));
  }, [listing.availability]);

  return (
    <div className="group h-full w-full [perspective:1000px]">
      <div className="relative h-full w-full rounded-lg shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
             <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{listing.category}</Badge>
                <CardTitle className="font-headline text-2xl">{listing.name}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                    <MapPin className="mr-1 h-4 w-4" /> {listing.farmName}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <p className="text-3xl font-bold text-primary">${listing.price.toFixed(2)}<span className="text-base font-normal text-muted-foreground"> / {listing.unit}</span></p>
                <div className="space-y-2 text-sm pt-2 text-muted-foreground">
                    <div className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        <span>{listing.quantity} {listing.unit} available</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Available from: {formattedDate || '...'}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/listing/${listing.id}`}>
                        Place Order <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 h-full w-full rounded-lg bg-card text-card-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
           <Card className="flex flex-col h-full overflow-hidden">
                <div className="relative aspect-[4/3] w-full h-full">
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    data-ai-hint={listing.aiHint}
                  />
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
