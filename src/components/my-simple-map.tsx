"use client";

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card } from './ui/card';
import { CardContent } from './ui/card';

export default function MySimpleMap() {
  const position = { lat: -1.286389, lng: 36.817223 }; // Nairobi

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
    return (
        <Card className="h-[400px] w-full flex items-center justify-center">
            <CardContent className="text-center p-6">
                <p className="text-destructive font-semibold">Map is not available.</p>
                <p className="text-muted-foreground text-sm">Google Maps API key is missing or invalid.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="h-[400px] w-full overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={10}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'my-simple-map'}
        >
            <AdvancedMarker position={position} />
        </Map>
    </Card>
  );
}
