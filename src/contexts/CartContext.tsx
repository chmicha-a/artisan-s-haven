import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Artwork } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((artwork: Artwork) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        toast({
          title: 'Déjà dans le panier',
          description: 'Cette œuvre est déjà dans votre panier.',
        });
        return prev;
      }
      toast({
        title: 'Ajouté au panier',
        description: `"${artwork.title}" a été ajouté à votre panier.`,
      });
      return [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          artwork,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast({
      title: 'Retiré du panier',
      description: 'L\'œuvre a été retirée de votre panier.',
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items.reduce(
    (acc, item) => acc + item.artwork.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
