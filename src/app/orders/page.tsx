
"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useOrders } from "@/context/order-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PackageOpen, Download, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/lib/types";

export default function OrdersPage() {
    const { orders, isMounted } = useOrders();

    const generateReceipt = (order: Order): string => {
        const subtotal = order.items.reduce((sum, item) => sum + item.price * item.orderQuantity, 0);
        let receipt = `========================================\n`;
        receipt += `      Kilimo_Market Africa Receipt\n`;
        receipt += `========================================\n\n`;
        receipt += `Order ID: ${order.id}\n`;
        receipt += `Order Date: ${format(new Date(order.orderDate), 'MMMM dd, yyyy, h:mm a')}\n\n`;
        receipt += `----------------------------------------\n`;
        receipt += `  Items\n`;
        receipt += `----------------------------------------\n\n`;

        order.items.forEach(item => {
            const itemTotal = (item.orderQuantity * item.price).toFixed(2);
            receipt += `${item.name}\n`;
            receipt += `  ${item.orderQuantity} ${item.unit} x Ksh ${item.price.toFixed(2)} .......... Ksh ${itemTotal}\n\n`;
        });
        
        receipt += `----------------------------------------\n`;
        
        receipt += `Subtotal:      Ksh ${subtotal.toFixed(2)}\n`;
        if (order.serviceFee) {
            receipt += `Service Fee:   Ksh ${order.serviceFee.toFixed(2)}\n`;
        }
        if (order.deliveryFee) {
            receipt += `Delivery Fee:  Ksh ${order.deliveryFee.toFixed(2)}\n`;
        }
        receipt += `----------------------------------------\n`;
        receipt += `Total:         Ksh ${order.total.toFixed(2)}\n`;
        receipt += `----------------------------------------\n\n`;
        receipt += `Thank you for your purchase!\n`;
        
        return receipt;
    };

    const handleDownloadReceipt = (order: Order) => {
        const receiptContent = generateReceipt(order);
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Kilimo_Market-Africa-Receipt-${order.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isMounted) {
         return (
            <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground mb-4" />
                <h1 className="text-xl font-bold font-headline mb-2">Loading Orders...</h1>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
                <PackageOpen className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold font-headline mb-2">No Orders Yet</h1>
                <p className="text-muted-foreground mb-6">You haven't placed any orders. Start by browsing the available produce.</p>
                <Button asChild>
                    <Link href="/dashboard">Browse Produce</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Your Orders</h1>
                <p className="text-muted-foreground">Here is a history of all your purchases.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {orders.map(order => (
                    <AccordionItem value={order.id} key={order.id} className="border-b-0">
                         <Card>
                            <AccordionTrigger className="p-6 text-left hover:no-underline">
                                <div className="flex justify-between w-full items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg font-headline">Order #{order.id.slice(-6)}</h3>
                                        <p className="text-sm text-muted-foreground">{format(new Date(order.orderDate), 'MMMM dd, yyyy')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">Ksh {order.total.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                                    </div>

                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 pt-0">
                                <Separator className="mb-4" />
                                <h4 className="font-semibold mb-2">Order Details:</h4>
                                <div className="space-y-3 mb-6">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                             <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.aiHint} />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-muted-foreground">{item.orderQuantity} {item.unit} &times; Ksh {item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">Ksh {(item.orderQuantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                                </div>
                                <Button onClick={() => handleDownloadReceipt(order)} variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Receipt
                                </Button>
                            </AccordionContent>
                         </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
