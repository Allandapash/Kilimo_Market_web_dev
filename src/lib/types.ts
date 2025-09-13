
import type { StaticImageData } from "next/image";

export interface Produce {
  id: string;
  name: string;
  category: 'Vegetable' | 'Fruit' | 'Grain' | 'Legume' | 'Meat' | 'Dairy' | 'Other';
  quantity: number;
  unit: 'kg' | 'lbs' | 'item' | 'bunch' | 'Litre';
  price: number;
  location: {
    lat: number;
    lng: number;
  };
  farmName: string;
  availability: Date;
  description: string;
  image: string;
  aiHint: string;
  region: string;
  mpesaNumber: string;
}

export interface CartItem extends Produce {
    orderQuantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  orderDate: string; // Stored as ISO string
  serviceFee: number;
  deliveryFee: number | null;
}
