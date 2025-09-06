
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { useAuth, UserRole } from '@/context/auth-context';

export default function Home() {
  const { user, isMounted } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/1920/1080?random=15"
          alt="Hero background showing a vibrant farmer's market stall with fresh produce"
          fill
          className="object-cover"
          data-ai-hint="farmers market"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg">
            Connecting Farmers and Buyers
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            MavunoLink Africa is the premier marketplace for fresh, high-quality produce directly from the source. Discover, buy, and sell with confidence.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/dashboard">Browse Listings</Link>
            </Button>
            {isMounted && user?.role === UserRole.Farmer && (
                <Button asChild size="lg" variant="secondary">
                    <Link href="/sell">Sell Your Produce</Link>
                </Button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Fresh & Direct</h3>
              <p className="text-muted-foreground mt-2">
                Get produce straight from the farm to your business, ensuring peak freshness and quality.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Support Local</h3>
              <p className="text-muted-foreground mt-2">
                Empower local farmers and strengthen your community by purchasing directly from the source.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">AI-Powered Insights</h3>
              <p className="text-muted-foreground mt-2">
                Utilize our market trends analysis to make informed decisions for buying and selling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
