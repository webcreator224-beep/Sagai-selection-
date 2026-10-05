import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast, setIsSizeChartOpen } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to Sagai Selection Bridal Edits!');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-10 pb-8 border-t border-border-hairline">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <span className="font-serif text-xl text-primary uppercase tracking-tight font-bold">
              Sagai Selection
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
            Handcrafted Indian Traditional Wear & Contemporary Ethnic Silhouettes. Balancing architectural minimalism with warm artisanal luxury for celebratory occasions.
          </p>

          {/* Location & Direct Contact Info */}
          <div className="space-y-1.5 text-xs text-on-surface border-l-2 border-primary pl-3 py-0.5">
            <p className="font-semibold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              Junagadh Flagship Boutique
            </p>
            <p className="text-text-muted text-[11px]">
              Opp. Town Hall, MG Road, Junagadh, Gujarat - 362001
            </p>
            <a
              href="https://wa.me/918767897945"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline pt-1"
            >
              <span className="material-symbols-outlined text-[16px] text-green-700">chat</span>
              WhatsApp Concierge: +91 87678 97945
            </a>
          </div>

          <div className="flex items-center gap-4 text-on-surface-variant pt-1">
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[20px]">
              share
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[20px]">
              photo_camera
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[20px]">
              local_activity
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-[20px]">
              public
            </span>
          </div>
        </div>

        {/* Company Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-primary tracking-widest">
            Company
          </h4>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('collections-kurtas-and-suit-sets')} className="hover:text-primary transition-colors cursor-pointer">
                Our Boutiques
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('lookbook')} className="hover:text-primary transition-colors cursor-pointer">
                The Ethnic Journal
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
                Careers
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('collections-kurtas-and-suit-sets')} className="hover:text-primary transition-colors cursor-pointer">
                Artisanal Heritage
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Concierge Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-primary tracking-widest">
            Customer Concierge
          </h4>
          <ul className="space-y-2 text-xs text-on-surface-variant">
            <li>
              <button onClick={() => navigateTo('checkout')} className="hover:text-primary transition-colors cursor-pointer">
                Track Order
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('checkout')} className="hover:text-primary transition-colors cursor-pointer">
                Shipping & Delivery
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('checkout')} className="hover:text-primary transition-colors cursor-pointer">
                Returns & Exchanges
              </button>
            </li>
            <li>
              <button onClick={() => setIsSizeChartOpen(true)} className="hover:text-primary transition-colors cursor-pointer font-medium text-primary">
                Royal Silhouette Size Guide
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-primary tracking-widest">
            Newsletter
          </h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Subscribe for exclusive bridal edits, preview sales, and receive 10% off your inaugural order.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-surface-container-lowest px-3 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none border border-border-hairline"
              required
            />
            <button
              type="submit"
              className="bg-primary text-on-primary text-xs uppercase font-semibold px-4 py-2 hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 pt-6 border-t border-border-hairline flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <p>© 2025 Sagai Selection. All Rights Reserved. Crafted with reverence for Indian craft.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            100% Safe & Secure Payments
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">credit_card</span>
            UPI / Cards / NetBanking
          </span>
        </div>
      </div>
    </footer>
  );
};
