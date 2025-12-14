// Art Marketplace Types

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'artist' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Artist {
  id: string;
  userId: string;
  bio?: string;
  photo?: string;
  phone?: string;
  website?: string;
  portfolio: string[];
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  artistId: string;
  artist: {
    id: string;
    name: string;
    photo?: string;
  };
  images: string[];
  stock: number;
  status: 'pending' | 'approved' | 'rejected';
  artType: string;
  dimensions?: string;
  medium?: string;
  year?: number;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  artwork: Artwork;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: string;
  createdAt: Date;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  artType?: string;
  artistId?: string;
}
