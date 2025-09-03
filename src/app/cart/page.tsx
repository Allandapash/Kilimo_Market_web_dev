"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
    const { cartItems, removeItem, updateItemQuantity, clearCart } = useCart();
    const { toast } = useToast();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.orderQuantity, 0);

    const handlePlaceOrder = () => {
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your items will be on their way shortly."
        });
        clearCart();
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
                <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold font-headline mb-2">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any produce yet.</p>
                <Button asChild>
                    <Link href="/dashboard">Continue Shopping</Link>
                </Button>
            </div>
        )
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold font-headline mb-8">Your Shopping Cart</h1>
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                    <Card key={item.id} className="flex items-center p-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden mr-4">
                            <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.aiHint} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-semibold font-headline">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.farmName}</p>
                            <p className="text-sm font-bold text-primary">${item.price.toFixed(2)} / {item.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.id, item.orderQuantity - 1)} className="h-9 w-9">
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input 
                                    type="number"
                                    className="w-12 h-9 text-center border-x-0 rounded-none focus-visible:ring-0"
                                    value={item.orderQuantity}
                                    onChange={(e) => updateItemQuantity(item.id, Math.max(1, Math.min(item.quantity, Number(e.target.value))))}
                                    min="1"
                                    max={item.quantity}
                                />
                                <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.id, item.orderQuantity + 1)} className="h-9 w-9">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Taxes</span>
                            <span className="font-semibold">Calculated at checkout</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span className="font-semibold">Calculated at checkout</span>
                        </div>
                        <Separator />
                         <div className="flex justify-between font-bold text-lg">
                            <span>Estimated Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
