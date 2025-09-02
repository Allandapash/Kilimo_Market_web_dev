"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { Produce } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BrowseMapProps {
  listings: Produce[];
}

export default function BrowseMap({ listings }: BrowseMapProps) {
  const [selected, setSelected] = useState<Produce | null>(null);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <Card className="h-[60vh] flex items-center justify-center">
            <CardContent className="text-center">
                <p className="text-destructive font-semibold">Map is not available.</p>
                <p className="text-muted-foreground">Google Maps API key is missing.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <div className="h-[60vh] w-full">
        <Map
          defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
          defaultZoom={9}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'agrilink-map'}
        >
          {listings.map((listing) => (
            <AdvancedMarker
              key={listing.id}
              position={listing.location}
              onClick={() => setSelected(listing)}
            >
              <Pin
                background={'hsl(var(--primary))'}
                borderColor={'hsl(var(--primary-foreground))'}
                glyphColor={'hsl(var(--primary-foreground))'}
              />
            </AdvancedMarker>
          ))}

          {selected && (
            <InfoWindow
              position={selected.location}
              onCloseClick={() => setSelected(null)}
              minWidth={250}
            >
              <div className="p-2 font-body">
                <div className="relative w-full h-24 mb-2 rounded-md overflow-hidden">
                    <Image src={selected.image} alt={selected.name} fill className="object-cover" data-ai-hint={selected.aiHint}/>
                </div>
                <h3 className="font-bold font-headline text-md">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.farmName}</p>
                <p className="text-lg font-bold text-primary my-1">${selected.price.toFixed(2)} / {selected.unit}</p>
                <Button asChild size="sm" className="w-full mt-2">
                  <Link href={`/listing/${selected.id}`}>View Details</Link>
                </Button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </Card>
  );
}
