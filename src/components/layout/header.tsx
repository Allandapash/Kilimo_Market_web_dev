"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf, Bell, Menu, ShoppingCart, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';

const baseNavItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/trends', label: 'Trends' },
];

const roleNavItems = {
    'Farmer': [{ href: '/sell', label: 'Sell' }],
    'Buyer': [{ href: '/orders', label: 'My Orders' }],
};

type NavItem = { href: string; label: string };

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  
  const [navItems, setNavItems] = useState<NavItem[]>(baseNavItems);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user) {
        const userRole = user.role as keyof typeof roleNavItems;
        const additionalItems = roleNavItems[userRole] || [];
        setNavItems([...baseNavItems, ...additionalItems]);
    } else {
        setNavItems(baseNavItems);
    }
  }, [user, isMounted]);

  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
        )
      )}
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
                     <div className="mt-4 flex flex-col space-y-2 border-t pt-4">
                        {isMounted && user ? (
                           <Button onClick={handleLogout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                        ) : isMounted && (
                          <>
                            <Button asChild variant="outline">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                          </>
                        )}
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
          
          {isMounted && user?.role !== 'Farmer' && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartItems.reduce((sum, item) => sum + item.orderQuantity, 0)}</Badge>
                  )}
                  <span className="sr-only">Cart</span>
              </Link>
            </Button>
          )}

          <div className="hidden md:flex items-center gap-2">
            {isMounted && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserCircle className="h-8 w-8" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isMounted && (
              <>
                <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
