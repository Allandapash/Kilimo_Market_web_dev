
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
    price: 150,
    location: { lat: -1.286389, lng: 36.817223 }, // Nairobi
    farmName: 'Sunset Farms',
    availability: new Date('2024-09-08T12:00:00Z'),
    description: 'Freshly harvested organic carrots, full of flavor and nutrients. Perfect for roasting, salads, or juicing.',
    image: 'https://picsum.photos/seed/carrots/600/400',
    aiHint: 'fresh carrots',
    region: 'Nairobi',
    mpesaNumber: '254712345678',
  },
  {
    id: '2',
    name: 'Gala Apples',
    category: 'Fruit',
    quantity: 250,
    unit: 'kg',
    price: 220,
    location: { lat: 0.5143, lng: 35.2699 }, // Eldoret
    farmName: 'Orchard Valley',
    availability: new Date('2024-09-04T12:00:00Z'),
    description: 'Crisp and sweet Gala apples, ideal for snacking, baking, and making applesauce.',
    image: 'https://picsum.photos/seed/apples/600/400',
    aiHint: 'red apples',
    region: 'Uasin Gishu',
    mpesaNumber: '254723456789',
  },
  {
    id: '3',
    name: 'Heirloom Tomatoes',
    category: 'Vegetable',
    quantity: 75,
    unit: 'kg',
    price: 250,
    location: { lat: -0.1022, lng: 34.7617 }, // Kisumu
    farmName: 'Green Thumb Gardens',
    availability: new Date('2024-09-02T12:00:00Z'),
    description: 'Juicy and flavorful heirloom tomatoes in a variety of colors and shapes. Taste the difference!',
    image: 'https://picsum.photos/seed/tomatoes/600/400',
    aiHint: 'fresh tomatoes',
    region: 'Kisumu',
    mpesaNumber: '254734567890',
  },
  {
    id: '4',
    name: 'Hard Red Wheat',
    category: 'Grain',
    quantity: 500,
    unit: 'kg',
    price: 80,
    location: { lat: -0.2827, lng: 36.0711 }, // Nakuru
    farmName: 'Golden Plains Grains',
    availability: new Date('2024-10-01T12:00:00Z'),
    description: 'High-quality hard red wheat, perfect for milling your own flour. Excellent for breads and pasta.',
    image: 'https://picsum.photos/seed/wheat/600/400',
    aiHint: 'wheat field',
    region: 'Nakuru',
    mpesaNumber: '254745678901',
  },
  {
    id: '5',
    name: 'Sweet Corn',
    category: 'Vegetable',
    quantity: 300,
    unit: 'item',
    price: 50,
    location: { lat: -1.0927, lng: 37.0121 }, // Thika
    farmName: 'Cornfield County',
    availability: new Date('2024-09-06T12:00:00Z'),
    description: 'Tender and sweet corn on the cob. A summer classic for grilling or boiling.',
    image: 'https://picsum.photos/seed/corn/600/400',
    aiHint: 'corn cobs',
    region: 'Kiambu',
    mpesaNumber: '254756789012',
  },
  {
    id: '6',
    name: 'Fresh Strawberries',
    category: 'Fruit',
    quantity: 50,
    unit: 'kg',
    price: 450,
    location: { lat: -0.424, lng: 36.9416 }, // Nyeri
    farmName: 'Berry Patch Farms',
    availability: new Date('2024-09-03T12:00:00Z'),
    description: 'Plump, red, and juicy strawberries, picked at the peak of ripeness.',
    image: 'https://picsum.photos/seed/strawberries/600/400',
    aiHint: 'fresh strawberries',
    region: 'Nyeri',
    mpesaNumber: '254767890123',
  }
];

// Initialize the listings data. In development, this preserves the data across hot reloads.
if (process.env.NODE_ENV !== 'production') {
  if (!global.__listings) {
    global.__listings = [...initialListings];
  }
}

const getListingsStore = (): Produce[] => {
    if (process.env.NODE_ENV === 'production') {
        // In a real app this would fetch from a database
        return [...initialListings];
    }
    // In dev, use the global variable to persist state
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
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => resolve(listings), 50));
}

export async function getProduceListingById(id: string): Promise<Produce | undefined> {
  const listings = getListingsStore();
  const listing = listings.find(item => item.id === id)
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => resolve(listing), 50));
}

export async function addProduceListing(listing: Omit<Produce, 'id' | 'location' | 'aiHint'>) {
    const currentListings = getListingsStore();
    const newId = (Math.max(0, ...currentListings.map(l => parseInt(l.id))) + 1).toString();
    
    // Simple mapping of region to approximate coordinates
    const regionCoordinates: Record<string, {lat: number, lng: number}> = {
        'Nairobi': { lat: -1.286389, lng: 36.817223 },
        'Mombasa': { lat: -4.0435, lng: 39.6682 },
        'Kisumu': { lat: -0.1022, lng: 34.7617 },
        'Nakuru': { lat: -0.2827, lng: 36.0711 },
        'Eldoret': { lat: 0.5143, lng: 35.2699 },
        'Uasin Gishu': { lat: 0.5143, lng: 35.2699 },
        'Kiambu': { lat: -1.1726, lng: 36.8306 },
        'Nyeri': { lat: -0.424, lng: 36.9416 },
    };

    const baseLocation = regionCoordinates[listing.region] || { lat: -1.28, lng: 36.81 };

    const newListing: Produce = {
        ...listing,
        id: newId,
        location: { lat: baseLocation.lat + (Math.random() - 0.5) * 0.1, lng: baseLocation.lng + (Math.random() - 0.5) * 0.1 },
        aiHint: listing.name.toLowerCase(),
        image: listing.image || `https://picsum.photos/seed/${listing.name.split(" ").join("-").toLowerCase()}/600/400`,
    };
    
    const newListings = [newListing, ...currentListings];
    setListingsStore(newListings);
    
    return newListing;
}

export const produceCategories = ['All', 'Vegetable', 'Fruit', 'Grain', 'Legume', 'Meat', 'Dairy', 'Other'];

export const kenyanCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos",
  "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a",
  "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri",
  "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];
