
import Link from 'next/link';
import { Leaf, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02 2.31.02 3.91 1.76 3.91 4.02v5.02c0 2.31-1.65 4.07-4.01 4.07-2.31 0-4.01-1.76-4.01-4.07v-5.02c0-2.31 1.6-4.01 4.11-4.01-0.01 1.31-0.02 2.62-0.02 3.92 0 1.25-1.01 2.26-2.26 2.26s-2.26-1.01-2.26-2.26V.02h3.89z" />
        <path d="M10.265 14.07c-2.31 0-4.01 1.76-4.01 4.07v5.02c0 2.31 1.6 4.01 4.11 4.01 2.31-.02 3.91-1.76 3.91-4.02v-5.02c0-2.31-1.65-4.07-4.01-4.07z" />
    </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
     <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.61c.498-.326.955-.17.574.154L8.358 15.42l-.24 4.672c.45.002.658-.192.912-.432l2.21-2.15 4.598 3.397c.84.522 1.45.253 1.695-.733l2.814-13.256c.242-1.127-.446-1.632-1.24-1.302z" />
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 border-t text-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 justify-center md:justify-start">
              <Leaf className="h-8 w-8 text-green-700" />
              <span className="text-xl font-bold text-gray-900">
                Kilimo_Market Africa
              </span>
            </Link>
            <p className="text-sm">
              Connecting farmers directly with buyers for a fresher, more sustainable food system in Africa.
            </p>
          </div>
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-sm hover:text-green-800">About Us</Link></li>
              <li><Link href="/marketplace" className="text-sm hover:text-green-800">Marketplace</Link></li>
              <li><Link href="/#contact" className="text-sm hover:text-green-800">Contact Us</Link></li>
              <li><Link href="/login" className="text-sm hover:text-green-800">Login/Register</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Contact Us</h3>
            <ul className="space-y-2">
                <li><a href="mailto:info@kilimomarket.africa" className="text-sm hover:text-green-800 flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> info@kilimomarket.africa</a></li>
                <li><a href="mailto:support@kilimomarket.africa" className="text-sm hover:text-green-800 flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> support@kilimomarket.africa</a></li>
                <li><a href="mailto:partners@kilimomarket.africa" className="text-sm hover:text-green-800 flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> partners@kilimomarket.africa</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="hover:text-blue-600"><Twitter className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-blue-800"><Facebook className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-yellow-700"><Instagram className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-black"><TikTokIcon className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-blue-500"><TelegramIcon className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400/50 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kilimo_Market Africa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
