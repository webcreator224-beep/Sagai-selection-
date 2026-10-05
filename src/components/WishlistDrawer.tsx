import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    openQuickAdd,
    navigateTo
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-canvas-base h-full shadow-2xl flex flex-col justify-between border-l border-border-hairline">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1f0107] text-on-primary flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <h3 className="font-serif text-lg font-medium text-tertiary-fixed uppercase tracking-wider">
              Saved Heritage Couture ({wishedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="text-on-primary/70 hover:text-white p-1 cursor-pointer transition-colors"
            title="Close Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]">favorite_border</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-primary font-medium">Your Wishlist is Empty</h4>
                <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                  Save your cherished Chanderi silks, Chikankari Anarkalis, and handcrafted trousseau garments to review later.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateTo('collections-kurtas-and-suit-sets');
                }}
                className="bg-primary text-on-primary px-6 py-3 text-xs uppercase font-bold tracking-widest shadow-md hover:bg-primary-container transition-all cursor-pointer"
              >
                Explore Royal Collection
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">
                Your Cherished Selections:
              </p>
              {wishedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface-container-lowest p-3 border border-border-hairline shadow-sm flex gap-3 items-center group relative"
                >
                  <div
                    className="w-20 h-24 bg-surface-container-low shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('products-gulabi-embroidered-chanderi-kurta-set', p);
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block truncate">
                      {p.subCategory} • {p.fabric}
                    </span>
                    <h4
                      className="text-xs font-semibold text-on-surface truncate cursor-pointer hover:text-primary transition-colors"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigateTo('products-gulabi-embroidered-chanderi-kurta-set', p);
                      }}
                    >
                      {p.title}
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-sm text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] line-through text-text-muted">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openQuickAdd(p);
                        }}
                        className="bg-primary text-on-primary px-3 py-1 text-[10px] uppercase font-bold tracking-wider hover:bg-primary-container transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px]">add_shopping_bag</span>
                        Move to Bag
                      </button>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-text-muted hover:text-error text-[10px] uppercase font-semibold transition-colors cursor-pointer flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishedProducts.length > 0 && (
          <div className="p-4 bg-surface-subtle border-t border-border-hairline space-y-2">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateTo('collections-kurtas-and-suit-sets');
              }}
              className="w-full bg-primary text-on-primary py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-all cursor-pointer"
            >
              <span>Continue Shopping</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
