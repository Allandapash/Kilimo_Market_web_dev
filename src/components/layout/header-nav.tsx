
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, ShoppingCart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';
import { useAuth, UserRole } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const baseNavItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const buyerNavItems = [
  { href: '/orders', label: 'My Orders' },
];

const farmerNavItems = [
  { href: '/sell', label: 'Sell' },
  { href: '/trends', label: 'Trends' },
];

const transportProviderNavItems = [
    // Placeholder for future logistics dashboard
    // { href: '/logistics', label: 'Logistics' },
];


export function HeaderNav() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout, isMounted } = useAuth();

  const getNavItems = () => {
    if (!user) {
        return baseNavItems;
    }
    switch (user.role) {
        case UserRole.Buyer:
            return [...baseNavItems, ...buyerNavItems];
        case UserRole.Farmer:
            return [...baseNavItems, ...farmerNavItems];
        case UserRole.TransportProvider:
            return [...baseNavItems, ...transportProviderNavItems];
        default:
            return baseNavItems;
    }
  }

  const NavLinks = ({ className }: { className?: string }) => {
    const navItems = getNavItems();
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {navItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                (pathname === item.href || (pathname.startsWith('/listing') && item.href === '/dashboard') || (pathname.startsWith('/dashboard') && item.href === '/dashboard')) ? 'text-primary' : 'text-muted-foreground'
                )}
            >
                {item.label}
            </Link>
            )
        )}
        </nav>
    );
  };
  
  return (
    <>
        <div className="hidden md:flex flex-grow">
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
                <div className="flex flex-col space-y-4 pt-6">
                 {isMounted && <NavLinks className="flex-col !space-x-0 space-y-2 items-start" />}
                </div>
            </SheetContent>
            </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
            {isMounted && (
                <>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    
                    {user?.role === UserRole.Buyer && (
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

                    {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    ) : (
                    <div className="hidden md:flex items-center gap-2">
                        <Button asChild variant="ghost">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Register</Link>
                        </Button>
                    </div>
                    )}
                </>
            )}
        </div>
    </>
  );
}
