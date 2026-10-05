import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ACCESSORIES } from '../data/products';

export const CheckoutBagPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    promoCode,
    applyPromoCode,
    showToast,
    navigateTo,
    toggleWishlist,
    setIsSizeChartOpen
  } = useShop();

  const [inputCode, setInputCode] = useState(promoCode || 'FESTIVE10');
  const [addressForm, setAddressForm] = useState({
    pincode: '110024',
    name: 'Radhika Mehra',
    flat: 'B-14, Anand Lok, Ground Floor',
    street: 'August Kranti Marg, Near Siri Fort',
    city: 'New Delhi',
    phone: '+91 98112 45890',
    isPrimary: true,
    isGiftNote: true
  });

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);

  // Math Calculations
  const bagTotalOriginal = cart.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const bagTotalCurrent = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const celebratoryDiscount = bagTotalOriginal - bagTotalCurrent;

  const isPrepaidDiscount = promoCode === 'FESTIVE10' || promoCode === 'SAGAI10';
  const prepaidSavings = isPrepaidDiscount ? Math.round(bagTotalCurrent * 0.10) : 0;
  const finalTotal = bagTotalCurrent - prepaidSavings;

  const giftThreshold = 8500;
  const diffForGift = Math.max(0, giftThreshold - bagTotalCurrent);
  const giftProgressPct = Math.min(100, Math.round((bagTotalCurrent / giftThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  const handleProceedCheckout = () => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }
    if (checkoutStep === 1) {
      setCheckoutStep(2);
      showToast('Step 2: Shipping & Bespoke Fitting Details Saved.');
    } else if (checkoutStep === 2) {
      setCheckoutStep(3);
      showToast('Step 3: Select Payment Mode (Instant UPI / Cards / COD).');
    } else if (checkoutStep === 3) {
      setCheckoutStep(4);
      showToast('Order Confirmed! Royalty status dispatched to Radhika Mehra.');
    } else {
      showToast('Thank you for shopping with Sagai Selection!');
      navigateTo('home');
    }
  };

  return (
    <div className="flex flex-col w-full bg-canvas-base">
      {/* Checkout Progress Bar */}
      <div className="w-full bg-surface-subtle py-4 border-b border-border-hairline">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <nav aria-label="Checkout Steps" className="flex items-center justify-between max-w-3xl mx-auto text-xs">
            <div className={`flex items-center gap-2 font-medium ${checkoutStep >= 1 ? 'text-primary' : 'text-text-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${checkoutStep >= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
                1
              </span>
              <span className="uppercase tracking-wider">Shopping Bag</span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${checkoutStep >= 2 ? 'bg-primary' : 'bg-surface-container-high'}`} />

            <div className={`flex items-center gap-2 font-medium ${checkoutStep >= 2 ? 'text-primary' : 'text-text-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${checkoutStep >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
                2
              </span>
              <span className="uppercase tracking-wider hidden sm:inline">Shipping & Bespoke</span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${checkoutStep >= 3 ? 'bg-primary' : 'bg-surface-container-high'}`} />

            <div className={`flex items-center gap-2 font-medium ${checkoutStep >= 3 ? 'text-primary' : 'text-text-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${checkoutStep >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
                3
              </span>
              <span className="uppercase tracking-wider hidden sm:inline">Payment</span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${checkoutStep >= 4 ? 'bg-primary' : 'bg-surface-container-high'}`} />

            <div className={`flex items-center gap-2 font-medium ${checkoutStep >= 4 ? 'text-primary' : 'text-text-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${checkoutStep >= 4 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
                4
              </span>
              <span className="uppercase tracking-wider hidden sm:inline">Confirmation</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Bag Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-8 lg:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 cols): Items & Shipping Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h1 className="font-serif text-3xl font-medium text-primary">My Shopping Bag</h1>
              <span className="text-xs uppercase text-text-muted font-semibold tracking-wider">
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
              </span>
            </div>

            {/* Gift Progress Meter */}
            <div className="bg-surface-subtle p-4 shadow-sm border border-border-hairline space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-festive-maroon-dark font-medium">
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                    redeem
                  </span>
                  {giftProgressPct >= 100
                    ? 'Complimentary Heirloom Silk Potli Unlocked!'
                    : 'Complimentary Heirloom Silk Potli Unlocked at ₹8,500'}
                </span>
                <span className="font-bold text-primary">
                  ₹{bagTotalCurrent.toLocaleString('en-IN')} / ₹{giftThreshold.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="w-full h-1.5 bg-surface-container-highest overflow-hidden rounded-full">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${giftProgressPct}%` }}
                />
              </div>

              <p className="text-xs text-on-surface-variant">
                {diffForGift > 0 ? (
                  <>Add garments worth <strong className="text-primary font-bold">₹{diffForGift.toLocaleString('en-IN')}</strong> more to receive a complimentary hand-embroidered Zari Potli with Express Air Shipping.</>
                ) : (
                  <>You have earned the complimentary Hand-embroidered Zari Potli & Express Air Shipping!</>
                )}
              </p>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="bg-surface-container-lowest p-8 text-center border border-border-hairline space-y-4">
                <p className="text-sm text-text-muted">Your shopping bag is currently empty.</p>
                <button
                  onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
                  className="bg-primary text-on-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Explore Kurtas & Suit Sets
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-container-lowest p-4 shadow-sm border border-border-hairline flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div className="w-full sm:w-36 h-48 sm:h-44 flex-shrink-0 bg-surface-container-low overflow-hidden border border-border-hairline">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full h-full min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-bold text-rose-gold tracking-widest">
                            {item.product.fabric}
                          </span>
                          <span className="bg-tertiary-fixed/30 text-tertiary text-[10px] px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            {item.product.expressDispatch ? 'Ready to Ship' : 'Dispatch in 48h'}
                          </span>
                        </div>
                        <h2 className="font-semibold text-sm text-on-surface truncate">
                          {item.product.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-muted">
                          <span>Size: <strong className="text-on-surface font-medium">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-on-surface font-medium">{item.color}</strong></span>
                          {item.bespokeAlteration && (
                            <>
                              <span>•</span>
                              <span className="text-primary-container font-medium flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[15px]">straighten</span> Custom Hemmed: +0
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-2 flex items-center justify-between border-t border-border-hairline">
                        <div className="flex items-center bg-surface-container-low px-2 py-1 gap-2 border border-border-hairline">
                          <span className="text-[10px] text-text-muted uppercase font-semibold">Qty</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-text-muted hover:text-primary font-bold px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold text-on-surface px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-text-muted hover:text-primary font-bold px-1"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="flex items-baseline gap-1.5 justify-end">
                            <span className="font-bold text-sm text-primary">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                            <span className="text-xs text-text-muted line-through">₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                          <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">
                            Save {item.product.discountPct}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 flex items-center gap-6 text-xs text-text-muted border-t border-border-hairline">
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeFromCart(item.id);
                          }}
                          className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">bookmark</span>
                          <span>Move to Wishlist</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 hover:text-error transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Delivery Address & Fitting Section */}
            <div className="bg-surface-container-lowest p-6 shadow-sm border border-border-hairline space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-on-surface font-medium">Delivery Address & Fitting</h3>
                <button
                  onClick={() => showToast('Address loaded from Radhika Mehra profile.')}
                  className="text-xs font-semibold uppercase text-primary hover:underline cursor-pointer"
                >
                  Select Saved
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Pincode *</label>
                  <input
                    type="text"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Full Name *</label>
                  <input
                    type="text"
                    value={addressForm.name}
                    onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Flat / Mansion / Suite No. *</label>
                  <input
                    type="text"
                    value={addressForm.flat}
                    onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Street & Locality *</label>
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">City *</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Contact Phone *</label>
                  <input
                    type="tel"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="bg-surface-container-low px-3 py-2 text-xs text-on-surface focus:outline-none border border-border-hairline"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 text-xs text-on-surface-variant">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={addressForm.isPrimary}
                    onChange={(e) => setAddressForm({ ...addressForm, isPrimary: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Make this my primary billing and shipping address</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={addressForm.isGiftNote}
                    onChange={(e) => setAddressForm({ ...addressForm, isGiftNote: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">card_giftcard</span>
                    Complimentary Hand-written Luxury Calligraphy Note (Included for Gifting)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-36">
            <div className="bg-surface-container-lowest p-6 shadow-md border border-border-hairline flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                <h2 className="font-serif text-xl text-on-surface font-medium">Order Summary</h2>
                <span className="bg-surface-subtle text-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest border border-border-hairline">
                  Express Air
                </span>
              </div>

              {/* Promo Code Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                  Promo Code or Heritage Voucher
                </label>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter code (FESTIVE10)"
                    className="w-full bg-surface-container-low px-3 py-2 text-xs uppercase text-primary font-bold focus:outline-none border border-border-hairline"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary text-xs uppercase font-semibold px-4 py-2 hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {isPrepaidDiscount && (
                  <div className="flex items-center justify-between bg-surface-subtle px-3 py-2 border border-border-hairline text-xs">
                    <div className="flex items-center gap-1.5 text-primary font-medium">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>'FESTIVE10' Applied (10% Off Prepaid)</span>
                    </div>
                    <button
                      onClick={() => applyPromoCode('')}
                      className="text-error hover:underline text-[10px] font-semibold uppercase cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Summary Breakdown */}
              <div className="flex flex-col gap-2 text-xs text-on-surface-variant pt-2">
                <div className="flex justify-between items-center">
                  <span>Bag Total ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="text-on-surface font-medium">₹{bagTotalOriginal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-secondary font-medium">
                  <span>Celebratory Discount</span>
                  <span>-₹{celebratoryDiscount.toLocaleString('en-IN')}</span>
                </div>
                {isPrepaidDiscount && (
                  <div className="flex justify-between items-center text-primary font-medium">
                    <span>Prepaid Code Savings (FESTIVE10)</span>
                    <span>-₹{prepaidSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Bespoke Alteration Concierge
                    <span className="material-symbols-outlined text-[14px] text-text-muted" title="Tailored to your measurements">
                      info
                    </span>
                  </span>
                  <span className="text-festive-maroon-dark uppercase text-[10px] font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Shipping & Duties</span>
                  <span className="text-festive-maroon-dark uppercase text-[10px] font-bold">Free</span>
                </div>

                <div className="h-0.5 bg-border-hairline my-2" />

                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="font-serif text-lg text-on-surface font-semibold">Total Payable</span>
                    <p className="text-[10px] text-text-muted">Includes all applicable GST & Luxury Surcharge</p>
                  </div>
                  <span className="font-bold text-xl text-primary">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-primary text-on-primary h-12 flex items-center justify-center gap-2 text-xs uppercase font-semibold tracking-widest hover:bg-festive-maroon-dark transition-all duration-200 shadow-md cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                <span>
                  {checkoutStep === 1
                    ? 'Proceed to Secure Checkout'
                    : checkoutStep === 2
                    ? 'Continue to Payment'
                    : checkoutStep === 3
                    ? 'Confirm & Pay ₹' + finalTotal.toLocaleString('en-IN')
                    : 'Order Complete'}
                </span>
              </button>

              {/* Supported Payment Modes */}
              <div className="bg-surface-subtle p-3 space-y-1.5 text-xs text-on-surface-variant border border-border-hairline">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="uppercase text-text-muted font-semibold tracking-widest">Supported Modes</span>
                  <span className="uppercase text-primary font-bold">Instant UPI / Cards / COD</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-on-surface font-medium pt-1">
                  {['GPay', 'PhonePe', 'Visa', 'Mastercard', 'NetBanking'].map((m) => (
                    <span key={m} className="bg-surface-container px-2 py-0.5 uppercase border border-border-hairline">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-1.5 pt-2 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                  <span>100% Authentic Handloom Silk & Zari Weaves</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">sync</span>
                  <span>7-Day Hassle-Free Doorstep Size Exchange</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">security</span>
                  <span>256-Bit Bank Grade Payment Encryption</span>
                </div>
              </div>
            </div>

            {/* Bespoke Fit Assured Box */}
            <div className="bg-primary text-on-primary p-4 shadow-sm flex items-center justify-between border border-on-primary/10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-tertiary-fixed tracking-widest block">
                  Bespoke Fit Assured
                </span>
                <p className="text-xs text-on-primary/90">Need custom armhole or palazzo hem length adjustment?</p>
              </div>
              <button
                onClick={() => setIsSizeChartOpen(true)}
                className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase px-4 py-2 hover:bg-tertiary-fixed-dim transition-colors whitespace-nowrap cursor-pointer"
              >
                Add Specs
              </button>
            </div>
          </div>
        </div>

        {/* FREQUENTLY PAIRED WITH YOUR GARMENTS */}
        <section className="mt-16 pt-12 border-t border-border-hairline">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase text-rose-gold tracking-widest block">
                Complete Your Royal Ensemble
              </span>
              <h3 className="font-serif text-2xl text-primary font-medium">Frequently Paired with Your Garments</h3>
            </div>
            <button
              onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
              className="text-xs uppercase font-semibold text-on-surface hover:text-primary tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <span>View Accessories Wardrobe</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACCESSORIES.map((acc) => (
              <div key={acc.id} className="bg-surface-container-lowest p-3 shadow-sm border border-border-hairline flex flex-col justify-between group">
                <div className="w-full aspect-[3/4] bg-surface-container-low overflow-hidden relative">
                  <img
                    src={acc.image}
                    alt={acc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {acc.badge && (
                    <span className="absolute top-2 left-2 bg-primary text-on-primary text-[9px] uppercase px-1.5 py-0.5 font-bold tracking-wider">
                      {acc.badge}
                    </span>
                  )}
                </div>
                <div className="pt-3 space-y-1">
                  <span className="text-[10px] uppercase text-text-muted tracking-wider block">{acc.category}</span>
                  <h4 className="text-xs font-semibold text-on-surface truncate">{acc.title}</h4>
                  <div className="flex items-center justify-between pt-2 border-t border-border-hairline">
                    <span className="font-bold text-xs text-primary">₹{acc.price.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => showToast(`Added "${acc.title}" to Shopping Bag`)}
                      className="bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface text-[10px] font-semibold uppercase px-2.5 py-1 tracking-wider transition-colors cursor-pointer border border-border-hairline"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
