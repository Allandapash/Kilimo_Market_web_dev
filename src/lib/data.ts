import type { Produce } from './types';

const today = new Date();

// This is a mock database. In a real app, you'd use a proper database.
// We make it a global to persist data across requests in a dev environment.
declare global {
  var __listings: Produce[] | undefined;
}

const initialListings: Produce[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    category: 'Vegetable',
    quantity: 100,
    unit: 'kg',
    price: 2.5,
    location: { lat: 34.0522, lng: -118.2437 },
    farmName: 'Sunset Farms',
    availability: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: 'Freshly harvested organic carrots, full of flavor and nutrients. Perfect for roasting, salads, or juicing.',
    image: 'https://picsum.photos/seed/carrots/600/400',
    aiHint: 'organic carrots'
  },
  {
    id: '2',
    name: 'Gala Apples',
    category: 'Fruit',
    quantity: 250,
    unit: 'lbs',
    price: 1.8,
    location: { lat: 34.1522, lng: -118.4437 },
    farmName: 'Orchard Valley',
    availability: new Date(new Date().setDate(new Date().getDate() + 3)),
    description: 'Crisp and sweet Gala apples, ideal for snacking, baking, and making applesauce.',
    image: 'https://picsum.photos/seed/apples/600/400',
    aiHint: 'gala apples'
  },
  {
    id: '3',
    name: 'Heirloom Tomatoes',
    category: 'Vegetable',
    quantity: 75,
    unit: 'kg',
    price: 4.0,
    location: { lat: 33.9522, lng: -118.3437 },
    farmName: 'Green Thumb Gardens',
    availability: new Date(new Date().setDate(new Date().getDate() + 1)),
    description: 'Juicy and flavorful heirloom tomatoes in a variety of colors and shapes. Taste the difference!',
    image: 'https://picsum.photos/seed/tomatoes/600/400',
    aiHint: 'heirloom tomatoes'
  },
  {
    id: '4',
    name: 'Hard Red Wheat',
    category: 'Grain',
    quantity: 500,
    unit: 'lbs',
    price: 0.9,
    location: { lat: 34.0522, lng: -118.5437 },
    farmName: 'Golden Plains Grains',
    availability: new Date(new Date().setDate(new Date().getDate() + 30)),
    description: 'High-quality hard red wheat, perfect for milling your own flour. Excellent for breads and pasta.',
    image: 'https://picsum.photos/seed/wheat/600/400',
    aiHint: 'wheat grain'
  },
  {
    id: '5',
    name: 'Sweet Corn',
    category: 'Vegetable',
    quantity: 300,
    unit: 'item',
    price: 0.75,
    location: { lat: 34.0822, lng: -118.1437 },
    farmName: 'Cornfield County',
    availability: new Date(new Date().setDate(new Date().getDate() + 5)),
    description: 'Tender and sweet corn on the cob. A summer classic for grilling or boiling.',
    image: 'https://picsum.photos/seed/corn/600/400',
    aiHint: 'sweet corn'
  },
  {
    id: '6',
    name: 'Fresh Strawberries',
    category: 'Fruit',
    quantity: 50,
    unit: 'lbs',
    price: 5.5,
    location: { lat: 33.8522, lng: -118.2037 },
    farmName: 'Berry Patch Farms',
    availability: new Date(new Date().setDate(new Date().getDate() + 2)),
    description: 'Plump, red, and juicy strawberries, picked at the peak of ripeness.',
    image: 'https://picsum.photos/seed/strawberries/600/400',
    aiHint: 'fresh strawberries'
  }
];

if (process.env.NODE_ENV === 'production') {
  global.__listings = initialListings;
} else {
  if (!global.__listings) {
    global.__listings = initialListings;
  }
}

const listings = global.__listings!;


export async function getProduceListings(): Promise<Produce[]> {
  // Simulate a database call
  return new Promise(resolve => setTimeout(() => resolve(listings), 500));
}

export async function getProduceListingById(id: string): Promise<Produce | undefined> {
  // Simulate a database call
  return new Promise(resolve => setTimeout(() => resolve(listings.find(item => item.id === id)), 300));
}

export async function addProduceListing(listing: Omit<Produce, 'id' | 'location' | 'aiHint'>) {
    const newListing: Produce = {
        ...listing,
        id: (listings.length + 1).toString(),
        location: { lat: 34.0522 + (Math.random() - 0.5) * 0.5, lng: -118.2437 + (Math.random() - 0.5) * 0.5 }, // Randomize location slightly
        aiHint: listing.name.toLowerCase(),
        image: listing.image || `https://picsum.photos/seed/${listing.name.split(" ").join("-")}/600/400`,
    };
    listings.unshift(newListing); // Add to the beginning of the list
    return newListing;
}

export const produceCategories = ['All', 'Vegetable', 'Fruit', 'Grain', 'Legume', 'Meat', 'Dairy', 'Other'];