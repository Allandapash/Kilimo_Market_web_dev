"use client";

import { Card, CardContent } from '@/components/ui/card';
// import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { Produce } from '@/lib/types';

interface ListingMapProps {
    listing: Produce;
}

export function ListingMap({ listing }: ListingMapProps) {
    // if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;

    return (
        <Card className="h-64 w-full overflow-hidden rounded-lg border flex items-center justify-center">
             <CardContent className="text-center">
                <p className="text-muted-foreground">Map functionality is temporarily disabled.</p>
            </CardContent>
            {/* <Map
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
            </Map> */}
        </Card>
    )
}
