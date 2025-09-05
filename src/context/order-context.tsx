
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem, Order } from '@/lib/types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getInitialOrders = (): Order[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const item = window.localStorage.getItem('agrilink-orders');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Failed to parse orders from local storage", error);
        return [];
    }
};


export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(getInitialOrders);

  useEffect(() => {
    try {
        window.localStorage.setItem('agrilink-orders', JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to save orders to local storage", error);
    }
  }, [orders]);


  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: new Date().getTime().toString(), // Simple unique ID
      items,
      total,
      orderDate: new Date().toJSON(), // Store as string to be JSON serializable
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
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
