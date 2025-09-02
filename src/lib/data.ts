import type { Produce } from './types';

const today = new Date();

const listings: Produce[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    category: 'Vegetable',
    quantity: 100,
    unit: 'kg',
    price: 2.5,
    location: { lat: 34.0522, lng: -118.2437 },
    farmName: 'Sunset Farms',
    availability: new Date(today.setDate(today.getDate() + 7)),
    description: 'Freshly harvested organic carrots, full of flavor and nutrients. Perfect for roasting, salads, or juicing.',
    image: 'https://picsum.photos/600/400?random=1',
    aiHint: 'carrots organic'
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
    availability: new Date(today.setDate(today.getDate() + 3)),
    description: 'Crisp and sweet Gala apples, ideal for snacking, baking, and making applesauce.',
    image: 'https://picsum.photos/600/400?random=2',
    aiHint: 'apples gala'
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
    availability: new Date(today.setDate(today.getDate() + 1)),
    description: 'Juicy and flavorful heirloom tomatoes in a variety of colors and shapes. Taste the difference!',
    image: 'https://picsum.photos/600/400?random=3',
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
    availability: new Date(today.setDate(today.getDate() + 30)),
    description: 'High-quality hard red wheat, perfect for milling your own flour. Excellent for breads and pasta.',
    image: 'https://picsum.photos/600/400?random=4',
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
    availability: new Date(today.setDate(today.getDate() + 5)),
    description: 'Tender and sweet corn on the cob. A summer classic for grilling or boiling.',
    image: 'https://picsum.photos/600/400?random=5',
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
    availability: new Date(today.setDate(today.getDate() + 2)),
    description: 'Plump, red, and juicy strawberries, picked at the peak of ripeness.',
    image: 'https://picsum.photos/600/400?random=6',
    aiHint: 'strawberries fresh'
  }
];

export async function getProduceListings(): Promise<Produce[]> {
  // Simulate a database call
  return new Promise(resolve => setTimeout(() => resolve(listings), 500));
}

export async function getProduceListingById(id: string): Promise<Produce | undefined> {
  // Simulate a database call
  return new Promise(resolve => setTimeout(() => resolve(listings.find(item => item.id === id)), 300));
}

export const produceCategories = ['All', ...Array.from(new Set(listings.map(l => l.category)))];
