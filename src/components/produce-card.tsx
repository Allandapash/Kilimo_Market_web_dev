"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';
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
            <CardHeader className="p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    data-ai-hint={listing.aiHint}
                  />
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <Badge variant="secondary" className="mb-2">{listing.category}</Badge>
              <CardTitle className="text-lg font-headline mb-1">
                {listing.name}
              </CardTitle>
              <CardDescription className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="mr-1 h-4 w-4" />
                {listing.farmName}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0 bg-card">
              <p className="text-xl font-bold text-primary">${listing.price.toFixed(2)} / {listing.unit}</p>
              <div className="text-xs text-muted-foreground font-semibold">Hover to see details</div>
            </CardFooter>
          </Card>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 h-full w-full rounded-lg bg-card text-card-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
           <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{listing.name}</CardTitle>
                    <CardDescription>{listing.farmName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <p className="font-body text-sm line-clamp-4">{listing.description}</p>
                     <div className="space-y-2 text-sm pt-2">
                        <div className="flex items-center">
                            <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{listing.quantity} {listing.unit} available</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>From {formattedDate || '...'}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/listing/${listing.id}`}>
                            View Listing <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
