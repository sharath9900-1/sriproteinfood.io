import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, Review } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addOrder: (order: Order) => void;
  addReview: (orderId: string, review: Review) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  addOrder: () => {},
  addReview: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.email!.split('@')[0],
          orders: []
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.email!.split('@')[0],
          orders: []
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addOrder = (order: Order) => {
    if (user) {
      const updatedUser = {
        ...user,
        orders: [order, ...(user.orders || [])]
      };
      setUser(updatedUser);
    }
  };

  const addReview = (orderId: string, review: Review) => {
    if (user) {
      const updatedOrders = user.orders.map(order => 
        order.id === orderId 
          ? { ...order, review }
          : order
      );
      
      setUser({
        ...user,
        orders: updatedOrders
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const signup = async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      signup, 
      logout, 
      addOrder,
      addReview 
    }}>
      {children}
    </AuthContext.Provider>
  );
};