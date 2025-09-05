"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

export function MapProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return <>{children}</>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      {children}
    </APIProvider>
  );
}
