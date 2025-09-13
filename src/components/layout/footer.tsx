
import Link from 'next/link';
import { Leaf, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 justify-center md:justify-start">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                Kilimo_Market Africa
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting farmers directly with buyers for a fresher, more sustainable food system in Africa.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary">Marketplace</Link></li>
              <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary">Login/Register</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kilimo_Market Africa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
