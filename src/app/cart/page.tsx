
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useOrders } from '@/context/order-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { kenyanCounties } from '@/lib/data';
import { calculateDeliveryFee } from '@/ai/flows/calculate-delivery-fee';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DeliveryType = 'pickup' | 'delivery';
type UrgencyType = 'Standard' | 'Express';

export default function CartPage() {
    const { cartItems, removeItem, updateItemQuantity, clearCart } = useCart();
    const { addOrder } = useOrders();
    const router = useRouter();
    const { toast } = useToast();
    const [isPaying, setIsPaying] = useState(false);
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
    const [deliveryRegion, setDeliveryRegion] = useState<string>('');
    const [urgency, setUrgency] = useState<UrgencyType>('Standard');
    const [isCalculatingFee, setIsCalculatingFee] = useState(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.orderQuantity, 0);
    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee + (deliveryFee || 0);
    const totalWeight = cartItems.reduce((sum, item) => sum + (item.unit === 'kg' ? item.orderQuantity : item.orderQuantity * 0.5), 0); // Estimate non-kg items as 0.5kg

    const handleCalculateFee = async () => {
        if (!deliveryRegion) {
            setCalculationError("Please select a delivery region.");
            return;
        }
        setIsCalculatingFee(true);
        setCalculationError(null);
        setDeliveryFee(null);
        try {
            const result = await calculateDeliveryFee({
                totalWeight,
                urgency,
                destinationRegion: deliveryRegion,
            });
            setDeliveryFee(result.deliveryFee);
            toast({
                title: "Delivery Fee Calculated",
                description: result.reasoning,
            });
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            if (errorMessage.includes('503') || errorMessage.toLowerCase().includes('overloaded')) {
                setCalculationError("The delivery calculation service is currently unavailable. Please try again in a moment.");
            } else {
                setCalculationError("Could not calculate delivery fee. Please try again.");
            }
            console.error(e);
        } finally {
            setIsCalculatingFee(false);
        }
    }

    const handlePlaceOrder = () => {
        setIsPaying(true);
        setTimeout(() => {
            addOrder(cartItems, total);
            toast({
                title: "Order Placed!",
                description: "Thank you for your purchase. You can monitor your order in the 'My Orders' page.",
            });
            clearCart();
            router.push('/orders');
            setIsPaying(false);
        }, 1500);
    }
    
    const canProceed = deliveryType === 'pickup' || (deliveryType === 'delivery' && deliveryFee !== null);


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
    <div className="container mx-auto max-w-5xl px-4 py-12">
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
                            <p className="text-sm font-bold text-primary">Ksh {item.price.toFixed(2)} / {item.unit}</p>
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
                 <Card>
                    <CardHeader>
                        <CardTitle>Logistics</CardTitle>
                        <CardDescription>Choose how you want to receive your order.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RadioGroup defaultValue="pickup" onValueChange={(value: DeliveryType) => {
                            setDeliveryType(value)
                            setDeliveryFee(null)
                            setCalculationError(null)
                        }}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pickup" id="pickup" />
                                <Label htmlFor="pickup">Self Pickup (Free)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="delivery" id="delivery" />
                                <Label htmlFor="delivery">Home Delivery</Label>
                            </div>
                        </RadioGroup>

                        {deliveryType === 'delivery' && (
                            <div className="space-y-4 p-4 border rounded-md">
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label>Delivery Region</Label>
                                         <Select value={deliveryRegion} onValueChange={setDeliveryRegion}>
                                            <SelectTrigger><SelectValue placeholder="Select County" /></SelectTrigger>
                                            <SelectContent>
                                            {kenyanCounties.map(county => (
                                                <SelectItem key={county} value={county}>{county}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Urgency</Label>
                                        <Select value={urgency} onValueChange={(v: UrgencyType) => setUrgency(v)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Standard">Standard (3-5 days)</SelectItem>
                                                <SelectItem value="Express">Express (1-2 days)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button onClick={handleCalculateFee} disabled={isCalculatingFee || !deliveryRegion}>
                                    {isCalculatingFee ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                    Calculate Delivery Fee
                                </Button>
                                {calculationError && (
                                    <Alert variant="destructive" className="mt-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Calculation Failed</AlertTitle>
                                        <AlertDescription>{calculationError}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">Ksh {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Service Fee (5%)</span>
                            <span className="font-semibold">Ksh {serviceFee.toFixed(2)}</span>
                        </div>
                        {deliveryFee !== null && (
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold">Ksh {deliveryFee.toFixed(2)}</span>
                            </div>
                        )}
                        <Separator />
                         <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>Ksh {total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="w-full" disabled={!canProceed}>Proceed to Payment</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Complete Your Order</DialogTitle>
                                    <DialogDescription>
                                        Review your order details and complete the payment.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-semibold">Ksh {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Service Fee (5%)</span>
                                        <span className="font-semibold">Ksh {serviceFee.toFixed(2)}</span>
                                    </div>
                                    {deliveryFee && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span className="font-semibold">Ksh {deliveryFee.toFixed(2)}</span>
                                    </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-bold">Total to Pay</span>
                                        <span className="font-bold text-primary">Ksh {total.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">M-Pesa Phone Number</Label>
                                        <Input id="phone" defaultValue="254700000000" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handlePlaceOrder} className="w-full" disabled={isPaying}>
                                        {isPaying ? 'Processing...' : `Pay Ksh ${total.toFixed(2)} via M-Pesa`}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}

    