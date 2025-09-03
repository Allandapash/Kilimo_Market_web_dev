"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem, Order } from '@/lib/types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: new Date().getTime().toString(), // Simple unique ID
      items,
      total,
      orderDate: new Date(),
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
