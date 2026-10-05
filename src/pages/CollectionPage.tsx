import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { FilterDrawer } from '../components/FilterDrawer';

export const CollectionPage: React.FC = () => {
  const {
    navigateTo,
    openQuickAdd,
    toggleWishlist,
    wishlist,
    setIsFilterDrawerOpen,
    setIsStylistOpen,
    searchQuery
  } = useShop();

  const [cols, setCols] = useState<3 | 4>(4);
  const [activeQuickCategory, setActiveQuickCategory] = useState('All Kurtas');
  const [sortOption, setSortOption] = useState('Featured & Bestselling');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreCount, setLoadMoreCount] = useState(8);

  // Active Filter Tags
  const [activeTags, setActiveTags] = useState<string[]>(['Chanderi Silk', 'Festive & Wedding', '₹3,000 – ₹8,000']);

  const removeTag = (tag: string) => {
    setActiveTags(prev => prev.filter(t => t !== tag));
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  // Filter products based on search query or quick category
  let displayedProducts = PRODUCTS.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
    }
    if (activeQuickCategory === 'Anarkalis') return p.subCategory === 'Anarkalis';
    if (activeQuickCategory === 'Sharara Sets') return p.subCategory === 'Sharara Sets';
    if (activeQuickCategory === 'Straight Silks') return p.subCategory === 'Straight Silks';
    return true;
  });

  // Sort logic
  if (sortOption === 'Price: Low to High') {
    displayedProducts = [...displayedProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'Price: High to Low') {
    displayedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
  }

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setLoadMoreCount(12);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full bg-canvas-base">
      <FilterDrawer />

      {/* Top Editorial Announcement Marquee */}
      <div className="w-full bg-surface-subtle py-2 px-4 lg:px-12 border-b border-border-hairline">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-on-surface uppercase tracking-widest font-semibold">
              Handcrafted in Chanderi & Varanasi
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-on-surface-variant">
            <span>Complimentary Custom Hemming & Alterations</span>
            <span>•</span>
            <span>Dispatch Within 24-48 Hours</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <span>Festive Edition 2025</span>
          </div>
        </div>
      </div>

      {/* Collection Header & Breadcrumbs */}
      <section className="w-full px-4 lg:px-12 pt-6 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
            <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors cursor-pointer">
              Home
            </button>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            <span>Women</span>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Kurtas & Suit Sets</span>
          </nav>

          {/* Headline & Narrative Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-primary-fixed text-primary px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  The Heritage Edit
                </span>
                <span className="text-text-muted text-xs">148 Handcrafted Styles Found</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary font-medium tracking-tight">
                Kurtas & Handcrafted Suit Sets
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                A confluence of regal Chanderi silks, gossamer organza dupattas, and delicate resham embroidery. Crafted for celebratory gatherings, twilight sangeets, and effortless daily opulence.
              </p>
            </div>

            {/* Quick Filter Visual Tabs */}
            <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
              {['All Kurtas', 'Anarkalis', 'Sharara Sets', 'Straight Silks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveQuickCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeQuickCategory === cat
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bar: Filter Drawer Trigger, Quick Dropdowns, Sort, Grid View Toggle */}
      <section className="sticky top-20 z-30 w-full bg-surface/95 backdrop-blur-md shadow-sm px-4 lg:px-12 py-3 border-y border-border-hairline">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-1.5 bg-on-surface text-canvas-base px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>All Filters ({activeTags.length})</span>
            </button>

            {['Silhouette', 'Fabric: Chanderi', 'Occasion: Festive', 'Size'].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 text-xs text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0 border border-border-hairline"
              >
                <span>{label}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>
            ))}
          </div>

          {/* Right: Sort By & Grid View Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="sortDropdown" className="text-xs uppercase text-text-muted hidden sm:inline">
                Sort:
              </label>
              <select
                id="sortDropdown"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-surface-container-low text-on-surface text-xs px-2.5 py-1.5 focus:outline-none cursor-pointer border border-border-hairline"
              >
                <option>Featured & Bestselling</option>
                <option>New Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Handcrafted Curations</option>
              </select>
            </div>

            {/* Desktop Grid View Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-surface-container-low p-1 border border-border-hairline">
              <button
                onClick={() => setCols(3)}
                className={`p-1 transition-colors cursor-pointer ${
                  cols === 3 ? 'text-primary bg-canvas-base shadow-sm' : 'text-text-muted hover:text-primary'
                }`}
                title="3 Columns View"
              >
                <span className="material-symbols-outlined text-[18px]">view_comfy</span>
              </button>
              <button
                onClick={() => setCols(4)}
                className={`p-1 transition-colors cursor-pointer ${
                  cols === 4 ? 'text-primary bg-canvas-base shadow-sm' : 'text-text-muted hover:text-primary'
                }`}
                title="4 Columns View"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeTags.length > 0 && (
          <div className="max-w-7xl mx-auto pt-2.5 flex items-center gap-2 flex-wrap text-xs">
            <span className="uppercase text-[10px] text-text-muted font-semibold tracking-wider">Applied:</span>
            {activeTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-error transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            ))}
            <button
              onClick={clearAllTags}
              className="text-primary hover:underline font-semibold text-[10px] uppercase tracking-wider ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </section>

      {/* Main Product Showcase Grid */}
      <section className="w-full px-4 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 ${
              cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12`}
          >
            {displayedProducts.slice(0, loadMoreCount).map((p) => {
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
                        <span className="bg-primary text-on-primary text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                          {p.badge}
                        </span>
                      )}
                      {p.discountPct > 0 && (
                        <span className="bg-canvas-base/90 text-primary text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
                          {p.discountPct}% Off
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Button */}
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

                    {/* Express Badge */}
                    {p.expressDispatch && (
                      <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
                        <span className="bg-canvas-base/90 text-on-surface text-[9px] font-semibold uppercase px-1.5 py-0.5 tracking-wider flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined text-[11px] text-tertiary-fixed-dim">bolt</span> Express Dispatch
                        </span>
                      </div>
                    )}

                    {/* Desktop Quick Add Slide-Up Panel */}
                    <div className="absolute inset-x-0 bottom-0 bg-surface/95 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:flex flex-col gap-2 z-20 shadow-md">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-text-muted uppercase">Select Size:</span>
                        <span className="text-primary font-semibold cursor-pointer hover:underline">Size Chart</span>
                      </div>
                      <div className="grid grid-cols-6 gap-1">
                        {p.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => openQuickAdd(p)}
                            className="py-1 text-center text-[11px] font-medium bg-canvas-base hover:bg-primary hover:text-on-primary text-on-surface transition-colors shadow-sm cursor-pointer"
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => openQuickAdd(p)}
                        className="w-full bg-primary hover:bg-primary-container text-on-primary py-2 text-[11px] font-semibold tracking-wider uppercase transition-colors mt-1 cursor-pointer"
                      >
                        Quick Add To Bag
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-text-muted uppercase tracking-wider truncate max-w-[60%]">{p.tagline}</span>
                        <span className="text-secondary font-medium">{p.type}</span>
                      </div>
                      <h2
                        onClick={() => navigateTo('products-gulabi-embroidered-chanderi-kurta-set', p)}
                        className="font-title-md text-title-md text-on-surface font-medium hover:text-primary transition-colors line-clamp-1 mt-0.5 cursor-pointer"
                      >
                        {p.title}
                      </h2>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-border-hairline">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-sm text-primary">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-text-muted line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {p.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full shadow-sm"
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

      {/* Editorial Spotlight Break: Weaver's Handloom Mark */}
      <section className="w-full bg-surface-subtle my-6 py-12 px-4 lg:px-12 border-y border-border-hairline">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-tertiary-fixed-dim material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">The Weaver's Handloom Mark</span>
            </div>
            <h3 className="font-serif text-3xl font-normal text-on-surface">
              Rooted in Chanderi Weaving Tradition
            </h3>
            <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
              Every silk kurti set at Sagai Selection passes through master artisans in Madhya Pradesh and Varanasi. Using lightweight zari warps and hand-twisted silken wefts, these ensembles capture radiant light during evening ceremonies without the weight of conventional bridal wear.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <span>100% Certified Mulberry & Chanderi Silks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <span>Artisanal Direct Compensation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] w-full bg-surface-container-low shadow-md overflow-hidden border border-border-hairline">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh1GE1p6h2C4axcS8efaqIAeorceu02LkWogJu392YgM-SfhGEZajekzWYdRSi34k5EVzlo8cULLI9k1GVumbCyoUxhpmfiD5qUKqR5AQD1lrv0XbKQ0Byet-rVF6Y5EvJ1vY6IMnzlM5lfTCMFGUSBi8iFgBnXayYuB9r-DZIieomG3yXc0S8ZZ7q8KzQgi06pP0yRrQdyLSieu-AQl13s35WXkYkx1FqGSzoFuNoXyNOEyTh9oCo"
                alt="Chanderi Handloom Weaving Detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-on-primary p-3 shadow-md hidden sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-widest">Handcrafted Heritage</p>
              <p className="font-bold text-sm">148+ Artisanal Weavers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="w-full px-4 lg:px-12 py-8">
        <div className="max-w-md mx-auto flex flex-col items-center text-center gap-4">
          <div className="w-full flex items-center justify-between text-xs text-text-muted">
            <span>Showing {loadMoreCount} of 148 Styles</span>
            <span className="font-semibold text-primary">{Math.round((loadMoreCount / 148) * 100)}% Viewed</span>
          </div>

          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(loadMoreCount / 148) * 100}%` }}
            />
          </div>

          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="w-full sm:w-auto min-w-[260px] bg-on-surface hover:bg-primary text-canvas-base py-3 px-8 text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoadingMore ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                <span>Loading Heirloom Ensembles...</span>
              </>
            ) : (
              <>
                <span>Load More Styles</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </>
            )}
          </button>

          <p className="text-xs text-text-muted">
            Need assistance choosing the right silhouette for your event?{' '}
            <button onClick={() => setIsStylistOpen(true)} className="text-primary font-semibold underline cursor-pointer">
              Ask Master Stylist
            </button>
          </p>
        </div>
      </section>

      {/* Bespoke Made-to-Measure Concierge Banner */}
      <section className="w-full bg-primary text-on-primary px-4 lg:px-12 py-12 my-6 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-on-primary/10 px-3 py-1 text-[10px] tracking-widest uppercase text-tertiary-fixed font-semibold">
              <span className="material-symbols-outlined text-[14px]">architecture</span>
              Bespoke Custom Tailoring Service
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-on-primary">
              Perfect Lengths & Tailored Silhouettes For Your Celebrations
            </h3>
            <p className="text-xs sm:text-sm text-primary-fixed leading-relaxed">
              Order any Kurta, Anarkali, or Sharara Set with custom bust, sleeve length, or trouser alterations. Connect with our dedicated master tailor concierge on WhatsApp for complimentary sizing guidance.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-start lg:items-end">
            <a
              href="https://wa.me/918767897945"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-canvas-base text-primary hover:bg-surface-subtle text-xs font-semibold tracking-wider uppercase px-6 py-3 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              WhatsApp Concierge (+91 87678 97945)
            </a>
            <button
              onClick={() => setIsStylistOpen(true)}
              className="w-full sm:w-auto bg-on-primary/10 hover:bg-on-primary/20 text-on-primary text-xs font-semibold tracking-wider uppercase px-6 py-3 transition-all flex items-center justify-center gap-2 cursor-pointer border border-on-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              Book Virtual Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
