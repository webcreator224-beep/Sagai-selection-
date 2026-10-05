import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { NavCategory } from '../types';

export const Header: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    setIsStylistOpen,
    setIsWishlistOpen
  } = useShop();

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 30) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide header completely
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> reveal header
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; screen: NavCategory }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Kurtas & Suit Sets', screen: 'collections-kurtas-and-suit-sets' },
    { label: 'Featured Garment', screen: 'products-gulabi-embroidered-chanderi-kurta-set' },
    { label: 'Sarees & Lehengas', screen: 'sarees-and-lehengas' },
    { label: 'Festive Collection', screen: 'festive-collection' },
    { label: 'Occasion & Bespoke', screen: 'occasion-wear' },
    { label: `Bag & Checkout (${cart.length})`, screen: 'checkout' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('collections-kurtas-and-suit-sets');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#1a0106] text-on-primary shadow-2xl transition-transform duration-300 ease-in-out ${
      showHeader ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Top Announcement Bar - Extra Dense & Darker Royal Maroon */}
      <div className="bg-[#120004] text-on-primary py-1 px-4 lg:px-12 text-xs tracking-wide border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="hidden md:flex items-center gap-4 text-on-primary/90 text-xs shrink-0">
            <div className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => navigateTo('home')}>
              <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">pin_drop</span>
              <span className="text-[11px] font-medium text-tertiary-fixed">Junagadh Boutique</span>
            </div>
            <a
              href="https://wa.me/918767897945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 cursor-pointer hover:underline text-green-400 font-semibold"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              <span className="text-[11px]">+91 87678 97945</span>
            </a>
            <div className="flex items-center gap-0.5 cursor-pointer">
              <span className="font-semibold text-tertiary-fixed text-[11px]">INR (₹)</span>
              <span className="material-symbols-outlined text-[13px]">expand_more</span>
            </div>
          </div>

          {/* Moving Ticker Marquee Container */}
          <div className="flex-1 overflow-hidden relative mx-2 py-0.5">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-bold tracking-widest uppercase text-[10px] sm:text-[11px] text-tertiary-fixed">
              <span>✨ Extra 10% Off on All Prepaid Orders</span>
              <span className="opacity-50">•</span>
              <span>🚚 Free Shipping Across India on Orders Above ₹1,999</span>
              <span className="opacity-50">•</span>
              <span>📍 Junagadh Boutique Open Daily</span>
              <span className="opacity-50">•</span>
              <span>💬 WhatsApp Order Support: +91 87678 97945</span>
              <span className="opacity-50">•</span>
              <span>✨ Extra 10% Off on All Prepaid Orders</span>
              <span className="opacity-50">•</span>
              <span>🚚 Free Shipping Across India on Orders Above ₹1,999</span>
              <span className="opacity-50">•</span>
              <span>📍 Junagadh Boutique Open Daily</span>
              <span className="opacity-50">•</span>
              <span>💬 WhatsApp Order Support: +91 87678 97945</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-on-primary/90 text-xs shrink-0">
            <span
              className="cursor-pointer hover:underline text-[11px]"
              onClick={() => navigateTo('checkout')}
            >
              Track Order
            </span>
            <span className="opacity-40 text-[10px]">|</span>
            <span
              className="cursor-pointer hover:underline text-[11px]"
              onClick={() => navigateTo('lookbook')}
            >
              The Ethnic Journal
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Branding - Ultra Dense Dark Maroon Row */}
      <div className="h-14 bg-[#230109] max-w-7xl mx-auto px-4 lg:px-12 flex items-center justify-between gap-4 border-b border-white/10">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFn0eU5rW9oA5mdyxSFChP-OfdJDKH3MR0u5z4Pyjca7g3BLaucJvsJReZLXvuZ4Zf9fHkCtaR5VhK9zdGBmsks3ONMIxEQNXqoYXTPC21B23fQ5Mm-8_bdq0FWvHG36U24QX75UCEn_ohTppt5Xv6W7XCQYjFXKEKTVYzJ7v4XBOpB42w8tVGkXa-B0MCYAMBhF0GikJJQqcluR7Ifxaepg0b7Zz7wyCjCrNJ-UCaskbOmtcsOodc"
              alt="Sagai Selection Logo"
              className="h-6 w-auto object-contain brightness-125"
            />
            <span className="font-serif text-base sm:text-lg text-tertiary-fixed font-bold uppercase tracking-tight whitespace-nowrap">
              Sagai Selection
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop) - Dark Sleek Input */}
        <div className="hidden md:flex flex-1 max-w-sm flex-col justify-center">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-black/40 px-3 py-1 border border-white/15 focus-within:border-tertiary-fixed">
            <span className="material-symbols-outlined text-primary-fixed/70 text-[16px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kurtas, Chikankari, lehengas..."
              className="w-full bg-transparent border-0 text-xs text-on-primary focus:outline-none placeholder:text-primary-fixed/60"
            />
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-5 text-primary-fixed shrink-0">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden flex items-center text-primary-fixed hover:text-tertiary-fixed cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* AI Concierge Trigger Icon */}
          <button
            onClick={() => setIsStylistOpen(true)}
            className="flex items-center text-tertiary-fixed hover:text-white transition-colors relative cursor-pointer bg-white/10 px-2.5 py-1 rounded-sm border border-tertiary-fixed/30"
            title="Ask AI Master Stylist"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="hidden sm:inline ml-1 text-xs font-bold text-tertiary-fixed">AI Stylist</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative flex items-center text-primary-fixed hover:text-tertiary-fixed cursor-pointer transition-colors"
            title="Saved Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: wishlist.length > 0 ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
            <span className="absolute -top-2 -right-2 bg-tertiary-fixed text-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
              {wishlist.length}
            </span>
          </button>

          {/* Bag */}
          <button
            onClick={() => navigateTo('checkout')}
            className="relative flex items-center text-primary-fixed hover:text-tertiary-fixed cursor-pointer"
            title="Shopping Bag"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="absolute -top-2 -right-2 bg-tertiary-fixed text-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          </button>

          {/* Account */}
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[14px]">person</span>
            </div>
            <span className="hidden lg:inline text-xs font-medium text-primary-fixed hover:text-tertiary-fixed transition-colors">
              Account
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Input Overlay */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-[#1a0106] border-b border-white/10">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/40 px-3 py-1.5 border border-white/20">
            <span className="material-symbols-outlined text-primary-fixed/70 text-[18px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kurtas, Chikankari, lehengas..."
              className="w-full bg-transparent text-xs text-on-primary focus:outline-none placeholder:text-primary-fixed/60"
            />
          </form>
        </div>
      )}

      {/* Navigation Links Bar - Darker & Denser with Clear Primary Maroon Active Indicator */}
      <div className="bg-[#180105] border-t border-white/5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <nav className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 whitespace-nowrap py-1 text-xs">
            {navItems.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative uppercase tracking-wider transition-all px-3 py-1 cursor-pointer text-xs font-semibold flex items-center gap-1.5 rounded-xs ${
                    isActive
                      ? 'bg-[#4c0311] text-tertiary-fixed font-bold border-b-2 border-tertiary-fixed shadow-md'
                      : 'text-on-primary/80 hover:text-tertiary-fixed hover:bg-white/5 border-b-2 border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse inline-block" />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
