"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Bell, Menu, ShoppingCart, Package } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Browse' },
  { href: '/sell', label: 'Sell' },
  { href: '/orders', label: 'My Orders' },
  { href: '/trends', label: 'Trends' },
];

export function Header() {
  const pathname = usePathname();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.orderQuantity, 0);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            (pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/listing'))) ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              AgriLink
            </span>
          </Link>
          <NavLinks />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col space-y-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="font-bold">AgriLink</span>
                    </Link>
                    <NavLinks className="flex-col !space-x-0 space-y-2 items-start" />
                     <div className="mt-4 flex flex-col space-y-2">
                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Register</Link>
                        </Button>
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartItemCount}</Badge>
                )}
                <span className="sr-only">Cart</span>
            </Link>
          </Button>
            <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
