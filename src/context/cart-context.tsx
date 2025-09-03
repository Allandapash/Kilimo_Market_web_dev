"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Produce, CartItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Produce, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Produce, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, orderQuantity: i.orderQuantity + quantity } : i
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, { ...item, orderQuantity: quantity }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, orderQuantity: quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
