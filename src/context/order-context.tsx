
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem, Order } from '@/lib/types';

interface OrderContextType {
  orders: Order[];
  isMounted: boolean;
  addOrder: (items: CartItem[], total: number, serviceFee: number, deliveryFee: number | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load orders from localStorage on the client side after mount
  useEffect(() => {
    setIsMounted(true);
    try {
        const item = window.localStorage.getItem('mavunolink-africa-orders');
        if (item) {
            setOrders(JSON.parse(item));
        }
    } catch (error) {
        console.error("Failed to parse orders from local storage", error);
    }
  }, []);
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    // Only run this effect on the client and after initial mount
    if (isMounted) {
        try {
            window.localStorage.setItem('mavunolink-africa-orders', JSON.stringify(orders));
        } catch (error) {
            console.error("Failed to save orders to local storage", error);
        }
    }
  }, [orders, isMounted]);


  const addOrder = (items: CartItem[], total: number, serviceFee: number, deliveryFee: number | null) => {
    const newOrder: Order = {
      id: new Date().getTime().toString(), // Simple unique ID
      items,
      total,
      orderDate: new Date().toJSON(), // Store as string to be JSON serializable
      serviceFee,
      deliveryFee,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, isMounted }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
