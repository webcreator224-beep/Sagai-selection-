import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { NavCategory } from '../types';

export const HomePage: React.FC = () => {
  const { navigateTo, openQuickAdd, toggleWishlist, wishlist } = useShop();

  // Interactive Lookbook Hotspot state
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const lookbookHotspots = [
    {
      top: '30%',
      left: '42%',
      product: PRODUCTS[0], // Gulabi Embroidered Kurta
      label: 'Gulabi Embroidered Straight Kurta with Palazzo & Dupatta',
      price: 4499,
      fabric: 'Pure Chanderi Silk with Zari'
    },
    {
      top: '55%',
      left: '52%',
      product: PRODUCTS[1], // Chandni Ivory
      label: 'Chandni Ivory Chikankari Anarkali',
      price: 5899,
      fabric: 'Hand-embroidered Lucknowi'
    },
    {
      top: '75%',
      left: '38%',
      product: PRODUCTS[0],
      label: 'Matching Chanderi Silk Palazzo',
      price: 4499,
      fabric: 'Chanderi Blend'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-canvas-base">
      {/* HERO BANNER CAROUSEL */}
      <section className="relative w-full h-[75vh] min-h-[460px] max-h-[700px] overflow-hidden bg-surface-container-low flex items-center justify-center">
        {/* Background Image - Restored Previous Hero Kurti Image */}
        <img
          src="/src/assets/images/hero_kurti_models_1791216818601.jpg"
          alt="2026 Edition - Model Wearing Luxury Handcrafted Kurti Set"
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92]"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0107]/95 via-[#1f0107]/45 to-black/30" />

        {/* Content Box */}
        <div className="relative max-w-4xl mx-auto text-center px-4 text-on-primary space-y-3 sm:space-y-4 pt-10 sm:pt-12">
          <span className="bg-[#4c0311] text-tertiary-fixed px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md inline-block border border-tertiary-fixed/30">
            2026 EDITION
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light text-on-primary tracking-tight leading-tight">
            Festive Reverie 2026
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-primary-fixed max-w-2xl mx-auto font-normal leading-relaxed px-2">
            Handcrafted Chanderi Kurtas, Royal Anarkalis, Chikankari Ensembles & Pure Silk Dupattas Crafted for Modern Royal Celebrations.
          </p>
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 px-4 sm:px-0">
            <button
              onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
              className="w-full sm:w-auto bg-canvas-base text-primary hover:bg-surface-subtle px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase font-bold tracking-widest shadow-xl transition-all cursor-pointer"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => navigateTo('lookbook')}
              className="w-full sm:w-auto bg-primary/40 hover:bg-primary/70 text-on-primary border border-on-primary/40 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase font-bold tracking-widest transition-all cursor-pointer"
            >
              Explore Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE VALUE BADGES */}
      <section className="w-full bg-surface-subtle py-4 border-y border-border-hairline px-4 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-on-surface-variant font-medium">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            <span>EXPRESS SHIPPING (Orders over ₹1,999)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">architecture</span>
            <span>CUSTOM BESPOKE FIT CONCIERGE</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span>100% AUTHENTIC SILKS & ZARI</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">published_with_changes</span>
            <span>SEAMLESS 7-DAY EXCHANGE</span>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS GALLERY */}
      <section className="w-full px-4 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest block">
                Curated Festive & Daily Elegance
              </span>
              <h2 className="font-serif text-3xl font-normal text-primary">New Arrivals</h2>
            </div>
            <button
              onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
              className="text-xs font-semibold uppercase text-primary hover:underline tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <span>View All 148 Styles</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {PRODUCTS.slice(0, 5).map((p) => {
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

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      {p.badge && (
                        <span className="bg-primary text-on-primary text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                          {p.badge}
                        </span>
                      )}
                      {p.discountPct > 0 && (
                        <span className="bg-canvas-base/90 text-primary text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
                          {p.discountPct}% Off
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
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

                    {/* Quick Add Overlay */}
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
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                        {p.tagline}
                      </span>
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
      </section>

      {/* ARTISANAL LEGACY EDITORIAL BANNER */}
      <section className="relative w-full bg-primary text-on-primary py-16 px-4 lg:px-12 overflow-hidden my-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-tertiary-fixed text-xs font-semibold uppercase tracking-widest block">
              ARTISANAL LEGACY • PURE WEAVES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-on-primary leading-tight">
              The Heritage Craftsmanship
            </h2>
            <p className="text-sm text-primary-fixed leading-relaxed max-w-xl">
              Where generations of master weaver lineage meet tailored modern contours. Designed specifically for the celebrations that become cherished memories.
            </p>
            <button
              onClick={() => navigateTo('festive-collection')}
              className="mt-2 bg-canvas-base text-primary hover:bg-surface-subtle px-8 py-3 text-xs uppercase font-semibold tracking-widest transition-all cursor-pointer shadow-md inline-block"
            >
              Shop Festive Edit
            </button>
          </div>
          <div className="lg:col-span-6">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh1GE1p6h2C4axcS8efaqIAeorceu02LkWogJu392YgM-SfhGEZajekzWYdRSi34k5EVzlo8cULLI9k1GVumbCyoUxhpmfiD5qUKqR5AQD1lrv0XbKQ0Byet-rVF6Y5EvJ1vY6IMnzlM5lfTCMFGUSBi8iFgBnXayYuB9r-DZIieomG3yXc0S8ZZ7q8KzQgi06pP0yRrQdyLSieu-AQl13s35WXkYkx1FqGSzoFuNoXyNOEyTh9oCo"
              alt="Artisanal Handloom Weaving Detail"
              className="w-full h-80 object-cover border border-on-primary/20 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SIGNATURE CATEGORIES */}
      <section className="w-full px-4 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-normal text-primary">Signature Categories</h2>
              <p className="text-xs text-text-muted mt-1">Discover handcrafted ethnic silhouettes tailored for every occasion</p>
            </div>
            <button
              onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
              className="text-xs font-semibold uppercase text-primary hover:underline tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <span>View All Categories</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Daily & Workwear Kurtis',
                tag: 'EVERYDAY COMFORT',
                price: 'Starting from ₹1,499',
                image: '/src/assets/images/hd_cat_daily_kurti_1791218227218.jpg',
                screen: 'collections-kurtas-and-suit-sets' as NavCategory
              },
              {
                title: 'Festive Anarkalis & Shararas',
                tag: 'WEDDING GUEST',
                price: 'Starting from ₹3,999',
                image: '/src/assets/images/hd_cat_anarkali_1791218247597.jpg',
                screen: 'festive-collection' as NavCategory
              },
              {
                title: 'Silk & Handloom Sets',
                tag: 'HEIRLOOM EDIT',
                price: 'Starting from ₹3,499',
                image: '/src/assets/images/hd_cat_silk_kurta_1791218264210.jpg',
                screen: 'collections-kurtas-and-suit-sets' as NavCategory
              },
              {
                title: 'Sarees & Lehengas',
                tag: 'GRAND OCCASIONS',
                price: 'Starting from ₹6,999',
                image: '/src/assets/images/hd_cat_lehenga_1791218281117.jpg',
                screen: 'sarees-and-lehengas' as NavCategory
              }
            ].map((cat, i) => (
              <div
                key={i}
                onClick={() => navigateTo(cat.screen)}
                className="group relative h-96 overflow-hidden bg-surface-container-low cursor-pointer border border-border-hairline shadow-sm"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-on-primary space-y-1">
                  <span className="text-[10px] font-semibold text-tertiary-fixed uppercase tracking-widest block">
                    {cat.tag}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-on-primary">{cat.title}</h3>
                  <p className="text-xs text-primary-fixed opacity-90">{cat.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK (INTERACTIVE LOOKBOOK HOTSPOTS) */}
      <section className="w-full bg-surface-subtle py-16 px-4 lg:px-12 border-y border-border-hairline">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">Shop the Look</h2>
            <p className="text-xs text-text-muted">Bring the entire festive vibe together with curated styling</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Model Hotspot Display */}
            <div className="lg:col-span-7 relative bg-surface-container-low border border-border-hairline shadow-md overflow-hidden aspect-[4/5] max-h-[600px] mx-auto w-full">
              <img
                src="/src/assets/images/hd_look_model_1791218298130.jpg"
                alt="Shop the look model ensemble"
                className="w-full h-full object-cover object-top"
              />

              {/* Hotspot Dots */}
              {lookbookHotspots.map((hs, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHotspot(idx)}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    activeHotspot === idx
                      ? 'bg-primary text-on-primary ring-4 ring-primary/40 scale-125'
                      : 'bg-canvas-base/90 text-on-surface hover:scale-110'
                  }`}
                  style={{ top: hs.top, left: hs.left }}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </button>
              ))}
            </div>

            {/* Selected Hotspot Item Details */}
            <div className="lg:col-span-5 bg-canvas-base p-6 border border-border-hairline shadow-md space-y-4">
              <div className="aspect-[3/4] max-h-72 w-full overflow-hidden bg-surface-container-low border border-border-hairline">
                <img
                  src={lookbookHotspots[activeHotspot].product.image}
                  alt={lookbookHotspots[activeHotspot].label}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest block">
                  {lookbookHotspots[activeHotspot].fabric}
                </span>
                <h3 className="font-serif text-lg font-medium text-on-surface">
                  {lookbookHotspots[activeHotspot].label}
                </h3>
                <p className="text-sm font-bold text-primary">
                  ₹{lookbookHotspots[activeHotspot].price.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => navigateTo('products-gulabi-embroidered-chanderi-kurta-set', lookbookHotspots[activeHotspot].product)}
                  className="flex-1 bg-primary text-on-primary hover:bg-primary-container py-3 text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-sm text-center"
                >
                  CHOOSE OPTIONS
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border-hairline">
                <button
                  onClick={() => setActiveHotspot(prev => (prev > 0 ? prev - 1 : lookbookHotspots.length - 1))}
                  className="hover:text-primary cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  <span>Previous</span>
                </button>
                <span>{activeHotspot + 1} / {lookbookHotspots.length}</span>
                <button
                  onClick={() => setActiveHotspot(prev => (prev < lookbookHotspots.length - 1 ? prev + 1 : 0))}
                  className="hover:text-primary cursor-pointer flex items-center gap-1"
                >
                  <span>Next</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEHIND THE WEAVE EDITORIAL BANNER */}
      <section className="relative w-full bg-on-surface text-canvas-base py-20 px-4 lg:px-12 text-center overflow-hidden">
        <img
          src="/src/assets/images/hd_behind_weave_1791218319649.jpg"
          alt="Behind the Weave"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative max-w-2xl mx-auto space-y-4">
          <span className="text-tertiary-fixed text-xs font-semibold uppercase tracking-widest block">
            BEHIND THE WEAVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight">
            A Symphony of Needle & Loom
          </h2>
          <button
            onClick={() => navigateTo('collections-kurtas-and-suit-sets')}
            className="w-14 h-14 rounded-full bg-canvas-base/20 hover:bg-canvas-base/40 text-canvas-base flex items-center justify-center mx-auto transition-transform hover:scale-110 cursor-pointer shadow-2xl backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[28px] pl-1">play_arrow</span>
          </button>
        </div>
      </section>

      {/* PRESS LOGOS */}
      <section className="w-full py-12 px-4 lg:px-12 border-b border-border-hairline bg-canvas-base">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <span className="text-[10px] font-semibold uppercase text-text-muted tracking-widest block">
            FEATURED IN & CELEBRATED BY
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 font-serif text-lg md:text-xl text-on-surface-variant/80 font-bold tracking-widest opacity-80">
            <span>VOGUE</span>
            <span>HARPER'S BAZAAR</span>
            <span>ELLE</span>
            <span>FEMINA</span>
            <span>THE TIMES OF INDIA</span>
            <span>GRAZIA</span>
          </div>
        </div>
      </section>
    </div>
  );
};
