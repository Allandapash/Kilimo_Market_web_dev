
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

export enum UserRole {
    Buyer = 'buyer',
    Farmer = 'farmer',
    TransportProvider = 'transport_provider',
}

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isMounted: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: User[] = [
    { id: '1', name: 'Alice Buyer', email: 'buyer@test.com', role: UserRole.Buyer },
    { id: '2', name: 'Bob Farmer', email: 'farmer@test.com', role: UserRole.Farmer },
    { id: '3', name: 'Charles Transporter', email: 'driver@test.com', role: UserRole.TransportProvider }
];

const COOKIE_NAME = 'kilimo-market-african-user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
        const storedUser = Cookies.get(COOKIE_NAME);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from cookie", error);
        Cookies.remove(COOKIE_NAME);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (foundUser) { // In real app, you'd also check password hash
                setUser(foundUser);
                Cookies.set(COOKIE_NAME, JSON.stringify(foundUser), { expires: 7 }); // Expires in 7 days
                resolve();
            } else {
                reject(new Error('Invalid email or password.'));
            }
        }, 500);
    });
  };

  const register = async (name: string, email: string, pass: string, role: UserRole): Promise<void> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                return reject(new Error('A user with this email already exists.'));
            }
            const newUser: User = {
                id: (MOCK_USERS.length + 1).toString(),
                name,
                email,
                role
            };
            MOCK_USERS.push(newUser); // Add to mock DB
            console.log("Registered users:", MOCK_USERS);
            resolve();
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(COOKIE_NAME);
  };

  return (
    <AuthContext.Provider value={{ user, isMounted, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
