
import type { Produce } from './types';

// This is a mock database. In a real app, you'd use a proper database.
// We use a global variable to persist data across requests in a dev environment.
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
    availability: new Date('2024-09-08T12:00:00Z'),
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
    availability: new Date('2024-09-04T12:00:00Z'),
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
    availability: new Date('2024-09-02T12:00:00Z'),
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
    availability: new Date('2024-10-01T12:00:00Z'),
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
    availability: new Date('2024-09-06T12:00:00Z'),
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
    availability: new Date('2024-09-03T12:00:00Z'),
    description: 'Plump, red, and juicy strawberries, picked at the peak of ripeness.',
    image: 'https://picsum.photos/seed/strawberries/600/400',
    aiHint: 'fresh strawberries'
  }
];

// Initialize the listings data. In development, this preserves the data across hot reloads.
if (process.env.NODE_ENV !== 'production') {
  if (!global.__listings) {
    global.__listings = [...initialListings];
  }
}

const getListingsStore = () => {
    if (process.env.NODE_ENV === 'production') {
        // In production, you'd fetch from a real database.
        // For this mock, we'll just use the initial list.
        // A better mock would involve a more persistent store.
        return [...initialListings];
    }
    return global.__listings!;
}

const setListingsStore = (newListings: Produce[]) => {
    if (process.env.NODE_ENV !== 'production') {
        global.__listings = newListings;
    }
    // In a real app, this would write to a database.
}

export async function getProduceListings(): Promise<Produce[]> {
  const listings = getListingsStore();
  return new Promise(resolve => setTimeout(() => resolve([...listings]), 50));
}

export async function getProduceListingById(id: string): Promise<Produce | undefined> {
  const listings = getListingsStore();
  return new Promise(resolve => setTimeout(() => resolve(listings.find(item => item.id === id)), 50));
}

export async function addProduceListing(listing: Omit<Produce, 'id' | 'location' | 'aiHint'>) {
    const currentListings = getListingsStore();
    const newId = (Math.max(0, ...currentListings.map(l => parseInt(l.id))) + 1).toString();
    
    const newListing: Produce = {
        ...listing,
        id: newId,
        location: { lat: 34.0522 + (Math.random() - 0.5) * 0.5, lng: -118.2437 + (Math.random() - 0.5) * 0.5 },
        aiHint: listing.name.toLowerCase(),
        image: listing.image || `https://picsum.photos/seed/${listing.name.split(" ").join("-")}/600/400`,
    };
    
    const newListings = [newListing, ...currentListings];
    setListingsStore(newListings);
    
    return newListing;
}

export const produceCategories = ['All', 'Vegetable', 'Fruit', 'Grain', 'Legume', 'Meat', 'Dairy', 'Other'];
