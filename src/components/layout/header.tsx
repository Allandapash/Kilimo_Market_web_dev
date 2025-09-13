
"use client";

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { HeaderNav } from './header-nav';


export function Header() {
  const { isMounted } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block">
                  Kilimo_Market Africa
                </span>
              </Link>
            </div>
            {isMounted ? <HeaderNav /> : <div className="h-8 w-full animate-pulse bg-muted rounded-md" /> }
      </div>
    </header>
  );
}
