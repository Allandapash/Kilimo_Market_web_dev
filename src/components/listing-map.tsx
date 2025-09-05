"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { Produce } from '@/lib/types';

interface ListingMapProps {
    listing: Produce;
}

export function ListingMap({ listing }: ListingMapProps) {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
        return (
            <Card className="h-64 w-full overflow-hidden rounded-lg border flex items-center justify-center">
                <CardContent className="text-center p-6">
                     <p className="text-destructive font-semibold">Map is not available.</p>
                     <p className="text-muted-foreground text-sm">Google Maps API key is missing or invalid.</p>
                </CardContent>
            </Card>
        )
    };

    return (
        <Card className="h-64 w-full overflow-hidden rounded-lg border flex items-center justify-center">
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
        </Card>
    )
}
