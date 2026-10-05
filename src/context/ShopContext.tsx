import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavCategory, Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  currentScreen: NavCategory;
  navigateTo: (screen: NavCategory, product?: Product) => void;
  selectedProduct: Product;
  setSelectedProduct: (p: Product) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number, bespokeAlteration?: boolean, bespokeNotes?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  isStylistOpen: boolean;
  setIsStylistOpen: (open: boolean) => void;
  
  isQuickAddOpen: boolean;
  quickAddProduct: Product | null;
  openQuickAdd: (p: Product) => void;
  closeQuickAdd: () => void;
  
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;

  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;

  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<NavCategory>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Pre-load cart with 2 items from HTML screens
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Gulabi
      size: 'M (38)',
      color: 'Gulabi Pink',
      quantity: 1,
      bespokeAlteration: true,
      bespokeNotes: 'Custom Hemmed: +0'
    },
    {
      id: 'cart-2',
      product: PRODUCTS[2], // Neelam Velvet
      size: 'L (40)',
      color: 'Deep Neelam Blue',
      quantity: 1,
      bespokeAlteration: false
    }
  ]);

  // Wishlist count defaults to 3 items
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-2', 'prod-3']);
  const [promoCode, setPromoCode] = useState<string>('FESTIVE10');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isStylistOpen, setIsStylistOpen] = useState<boolean>(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState<boolean>(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navigateTo = (screen: NavCategory, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    size: string,
    color: string,
    quantity = 1,
    bespokeAlteration = false,
    bespokeNotes = ''
  ) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        product,
        size,
        color,
        quantity,
        bespokeAlteration,
        bespokeNotes
      };
      setCart(prev => [...prev, newItem]);
    }

    showToast(`Added "${product.title}" (${size}) to Shopping Bag`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Garment removed from bag');
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'FESTIVE10' || formatted === 'SAGAI10') {
      setPromoCode('FESTIVE10');
      showToast('Promo Code FESTIVE10 Applied! 10% Off Prepaid Discount');
      return true;
    } else {
      showToast('Invalid Promo Code. Try FESTIVE10 for 10% Off!');
      return false;
    }
  };

  const openQuickAdd = (p: Product) => {
    setQuickAddProduct(p);
    setIsQuickAddOpen(true);
  };

  const closeQuickAdd = () => {
    setIsQuickAddOpen(false);
    setQuickAddProduct(null);
  };

  return (
    <ShopContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        promoCode,
        applyPromoCode,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        isStylistOpen,
        setIsStylistOpen,
        isQuickAddOpen,
        quickAddProduct,
        openQuickAdd,
        closeQuickAdd,
        isSizeChartOpen,
        setIsSizeChartOpen,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        isWishlistOpen,
        setIsWishlistOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
