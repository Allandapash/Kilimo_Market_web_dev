"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Scale, ShoppingCart, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ListingMap } from '@/components/listing-map';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import type { Produce } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export default function ListingClientPage({ listing }: { listing: Produce }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  
  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(listing, quantity);
      toast({
        title: "Item Added to Cart",
        description: `${quantity} ${listing.unit} of ${listing.name} added.`,
        action: <Button onClick={() => router.push('/cart')}>View Cart</Button>
      })
    }
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(listing.quantity, prev + amount)));
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={listing.image}
              alt={listing.name}
              fill
              className="object-cover"
              data-ai-hint={listing.aiHint}
              priority
            />
          </div>
          <h2 className="text-2xl font-bold font-headline mb-2">Location</h2>
          <ListingMap listing={listing} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {listing.category}
              </Badge>
              <CardTitle className="text-4xl font-headline">{listing.name}</CardTitle>
              <CardDescription className="text-lg">
                From <span className="font-semibold text-primary">{listing.farmName}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-4">
                ${listing.price.toFixed(2)}
                <span className="text-base font-normal text-muted-foreground"> / {listing.unit}</span>
              </p>
              <p className="text-foreground/90 font-body mb-6">{listing.description}</p>
              <Separator className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Scale className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Available Quantity: {listing.quantity} {listing.unit}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Available from: {format(listing.availability, 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>{listing.farmName}</span>
                </div>
              </div>
              <Separator className="my-4" />
                <div className="flex items-center gap-4 mb-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="h-10 w-10">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                      type="number"
                      className="w-16 h-10 text-center border-x-0 rounded-none focus-visible:ring-0"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(listing.quantity, Number(e.target.value))))}
                      min="1"
                      max={listing.quantity}
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="h-10 w-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              <Button size="lg" className="w-full text-base bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
