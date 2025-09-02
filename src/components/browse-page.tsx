"use client";

import { useState, useMemo } from 'react';
import type { Produce } from '@/lib/types';
import { produceCategories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { List, Map as MapIcon } from 'lucide-react';
import { ProduceCard } from './produce-card';
// import BrowseMap from './browse-map';

interface BrowsePageProps {
  listings: Produce[];
}

export default function BrowsePage({ listings }: BrowsePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesSearch =
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = category === 'All' || listing.category === category;
      
      return matchesSearch && matchesCategory;
    });
  }, [listings, searchTerm, category]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-center mb-2">Find Fresh Produce</h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">Browse listings from local farms. Filter by category or search for what you need.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by produce, farm, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 lg:w-2/3 bg-card"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-1/2 lg:w-1/3 bg-card">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {produceCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <ProduceCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No listings found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </>
  );
}
