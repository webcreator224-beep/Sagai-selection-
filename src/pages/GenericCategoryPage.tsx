import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface GenericCategoryPageProps {
  title: string;
  categoryKey: 'sarees-and-lehengas' | 'festive-collection' | 'occasion-wear';
  description: string;
}

export const GenericCategoryPage: React.FC<GenericCategoryPageProps> = ({
  title,
  categoryKey,
  description
}) => {
  const { navigateTo, openQuickAdd, toggleWishlist, wishlist } = useShop();

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category === categoryKey || p.category === 'kurtas-and-suit-sets'
  );

  return (
    <div className="flex flex-col w-full bg-canvas-base py-8 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Category Header */}
        <div className="border-b border-border-hairline pb-6 space-y-2">
          <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest block">
            Curated Royal Couture
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-medium">{title}</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((p) => {
            const isWished = wishlist.includes(p.id);
            return (
              <article key={p.id} className="group relative flex flex-col bg-surface-container-lowest border border-border-hairline shadow-sm">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-low cursor-pointer">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onClick={() => navigateTo('products-gulabi-embroidered-chanderi-kurta-set', p)}
                  />

                  {p.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-primary text-on-primary text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                        {p.badge}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-canvas-base/80 hover:bg-canvas-base flex items-center justify-center transition-colors shadow-sm z-10 cursor-pointer ${
                      isWished ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>
                      favorite
                    </span>
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-surface/95 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:flex flex-col gap-1.5 z-20 shadow-md">
                    <button
                      onClick={() => openQuickAdd(p)}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Quick Add / Select Size
                    </button>
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">{p.tagline}</span>
                    <h3
                      onClick={() => navigateTo('products-gulabi-embroidered-chanderi-kurta-set', p)}
                      className="text-xs font-semibold text-on-surface hover:text-primary transition-colors line-clamp-1 mt-0.5 cursor-pointer"
                    >
                      {p.title}
                    </h3>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-border-hairline">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-xs text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-text-muted line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {p.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 rounded-full shadow-sm"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
